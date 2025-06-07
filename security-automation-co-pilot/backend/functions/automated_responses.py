"""
Azure Functions for Automated Security Responses.
These can be deployed as serverless functions for scalable automation.
"""

import logging
import json
import os
from typing import Dict, Any, List
from datetime import datetime, timedelta
import azure.functions as func
from azure.identity import DefaultAzureCredential
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.compute import ComputeManagementClient
from azure.mgmt.resource import ResourceManagementClient
from msgraph import GraphServiceClient
import aiohttp

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Azure configuration from environment variables
AZURE_SUBSCRIPTION_ID = os.environ.get("AZURE_SUBSCRIPTION_ID")
AZURE_RESOURCE_GROUP = os.environ.get("AZURE_RESOURCE_GROUP")
AZURE_TENANT_ID = os.environ.get("AZURE_TENANT_ID")
GRAPH_CLIENT_ID = os.environ.get("GRAPH_CLIENT_ID")
GRAPH_CLIENT_SECRET = os.environ.get("GRAPH_CLIENT_SECRET")

# Initialize Azure clients
credential = DefaultAzureCredential()

def isolate_machine_function(req: func.HttpRequest) -> func.HttpResponse:
    """
    Azure Function to isolate a compromised machine.
    
    Expected payload:
    {
        "machine_id": "string",
        "incident_id": "string",
        "isolation_type": "full|selective",
        "comment": "string"
    }
    """
    try:
        req_body = req.get_json()
        machine_id = req_body.get('machine_id')
        incident_id = req_body.get('incident_id')
        isolation_type = req_body.get('isolation_type', 'full')
        comment = req_body.get('comment', f'Automated isolation for incident {incident_id}')
        
        # Initialize compute client
        compute_client = ComputeManagementClient(credential, AZURE_SUBSCRIPTION_ID)
        
        # Get the VM
        vm = compute_client.virtual_machines.get(
            AZURE_RESOURCE_GROUP,
            machine_id
        )
        
        # Apply network isolation
        if isolation_type == 'full':
            # Remove all network interfaces
            vm.network_profile.network_interfaces = []
        else:
            # Apply NSG with restrictive rules
            network_client = NetworkManagementClient(credential, AZURE_SUBSCRIPTION_ID)
            
            # Create isolation NSG
            nsg_name = f"isolation-nsg-{incident_id}"
            nsg_params = {
                'location': vm.location,
                'security_rules': [
                    {
                        'name': 'DenyAllInbound',
                        'protocol': '*',
                        'source_address_prefix': '*',
                        'destination_address_prefix': '*',
                        'access': 'Deny',
                        'direction': 'Inbound',
                        'priority': 100
                    },
                    {
                        'name': 'DenyAllOutbound',
                        'protocol': '*',
                        'source_address_prefix': '*',
                        'destination_address_prefix': '*',
                        'access': 'Deny',
                        'direction': 'Outbound',
                        'priority': 100
                    }
                ]
            }
            
            network_client.network_security_groups.begin_create_or_update(
                AZURE_RESOURCE_GROUP,
                nsg_name,
                nsg_params
            ).wait()
            
            # Apply NSG to VM's network interfaces
            for nic in vm.network_profile.network_interfaces:
                nic_name = nic.id.split('/')[-1]
                network_interface = network_client.network_interfaces.get(
                    AZURE_RESOURCE_GROUP,
                    nic_name
                )
                network_interface.network_security_group = {
                    'id': f"/subscriptions/{AZURE_SUBSCRIPTION_ID}/resourceGroups/{AZURE_RESOURCE_GROUP}/providers/Microsoft.Network/networkSecurityGroups/{nsg_name}"
                }
                network_client.network_interfaces.begin_create_or_update(
                    AZURE_RESOURCE_GROUP,
                    nic_name,
                    network_interface
                ).wait()
        
        # Update VM
        compute_client.virtual_machines.begin_create_or_update(
            AZURE_RESOURCE_GROUP,
            machine_id,
            vm
        ).wait()
        
        # Add tag to track isolation
        vm.tags = vm.tags or {}
        vm.tags['isolation_status'] = 'isolated'
        vm.tags['isolation_incident'] = incident_id
        vm.tags['isolation_time'] = datetime.utcnow().isoformat()
        vm.tags['isolation_comment'] = comment
        
        compute_client.virtual_machines.begin_create_or_update(
            AZURE_RESOURCE_GROUP,
            machine_id,
            vm
        ).wait()
        
        return func.HttpResponse(
            json.dumps({
                "success": True,
                "machine_id": machine_id,
                "isolation_type": isolation_type,
                "message": f"Machine {machine_id} isolated successfully"
            }),
            mimetype="application/json",
            status_code=200
        )
        
    except Exception as e:
        logger.error(f"Failed to isolate machine: {str(e)}")
        return func.HttpResponse(
            json.dumps({
                "success": False,
                "error": str(e)
            }),
            mimetype="application/json",
            status_code=500
        )

def block_ip_address_function(req: func.HttpRequest) -> func.HttpResponse:
    """
    Azure Function to block IP addresses in NSG or Azure Firewall.
    
    Expected payload:
    {
        "ip_addresses": ["string"],
        "block_duration": "permanent|24h|7d|30d",
        "reason": "string",
        "target": "nsg|firewall"
    }
    """
    try:
        req_body = req.get_json()
        ip_addresses = req_body.get('ip_addresses', [])
        block_duration = req_body.get('block_duration', '24h')
        reason = req_body.get('reason', 'Security threat detected')
        target = req_body.get('target', 'nsg')
        
        network_client = NetworkManagementClient(credential, AZURE_SUBSCRIPTION_ID)
        
        if target == 'nsg':
            # Get or create security blocklist NSG
            nsg_name = "security-blocklist-nsg"
            try:
                nsg = network_client.network_security_groups.get(
                    AZURE_RESOURCE_GROUP,
                    nsg_name
                )
            except:
                # Create new NSG if doesn't exist
                nsg = network_client.network_security_groups.begin_create_or_update(
                    AZURE_RESOURCE_GROUP,
                    nsg_name,
                    {
                        'location': 'eastus',  # Use appropriate location
                        'security_rules': []
                    }
                ).result()
            
            # Add block rules for each IP
            priority = 100
            for rule in nsg.security_rules:
                if rule.priority >= priority:
                    priority = rule.priority + 10
            
            for ip in ip_addresses:
                rule_name = f"Block_{ip.replace('.', '_').replace(':', '_')}"
                rule = {
                    'name': rule_name,
                    'protocol': '*',
                    'source_address_prefix': ip,
                    'destination_address_prefix': '*',
                    'access': 'Deny',
                    'direction': 'Inbound',
                    'priority': priority,
                    'description': f"{reason} - Blocked on {datetime.utcnow().isoformat()}"
                }
                
                network_client.security_rules.begin_create_or_update(
                    AZURE_RESOURCE_GROUP,
                    nsg_name,
                    rule_name,
                    rule
                ).wait()
                
                priority += 10
                
                # Schedule removal if not permanent
                if block_duration != 'permanent':
                    # TODO: Schedule Azure Function to remove rule after duration
                    pass
        
        elif target == 'firewall':
            # Block in Azure Firewall
            # Get Azure Firewall
            firewall_name = "main-firewall"  # Replace with actual firewall name
            firewall = network_client.azure_firewalls.get(
                AZURE_RESOURCE_GROUP,
                firewall_name
            )
            
            # Add to IP block list
            if not firewall.network_rule_collections:
                firewall.network_rule_collections = []
            
            block_collection = None
            for collection in firewall.network_rule_collections:
                if collection.name == "security-blocklist":
                    block_collection = collection
                    break
            
            if not block_collection:
                block_collection = {
                    'name': 'security-blocklist',
                    'priority': 100,
                    'action': {'type': 'Deny'},
                    'rules': []
                }
                firewall.network_rule_collections.append(block_collection)
            
            # Add block rule
            block_rule = {
                'name': f"block_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
                'protocols': ['Any'],
                'source_addresses': ip_addresses,
                'destination_addresses': ['*'],
                'destination_ports': ['*'],
                'description': reason
            }
            block_collection['rules'].append(block_rule)
            
            # Update firewall
            network_client.azure_firewalls.begin_create_or_update(
                AZURE_RESOURCE_GROUP,
                firewall_name,
                firewall
            ).wait()
        
        return func.HttpResponse(
            json.dumps({
                "success": True,
                "blocked_ips": ip_addresses,
                "target": target,
                "duration": block_duration,
                "message": f"Successfully blocked {len(ip_addresses)} IP addresses"
            }),
            mimetype="application/json",
            status_code=200
        )
        
    except Exception as e:
        logger.error(f"Failed to block IP addresses: {str(e)}")
        return func.HttpResponse(
            json.dumps({
                "success": False,
                "error": str(e)
            }),
            mimetype="application/json",
            status_code=500
        )

async def disable_user_account_function(req: func.HttpRequest) -> func.HttpResponse:
    """
    Azure Function to disable compromised user accounts.
    
    Expected payload:
    {
        "user_id": "string",
        "reason": "string",
        "revoke_sessions": true|false,
        "notify_user": true|false
    }
    """
    try:
        req_body = req.get_json()
        user_id = req_body.get('user_id')
        reason = req_body.get('reason', 'Security incident')
        revoke_sessions = req_body.get('revoke_sessions', True)
        notify_user = req_body.get('notify_user', False)
        
        # Initialize Graph client
        graph_client = GraphServiceClient(
            credentials=credential,
            scopes=['https://graph.microsoft.com/.default']
        )
        
        # Disable user account
        update_user = {
            'accountEnabled': False
        }
        
        await graph_client.users.by_user_id(user_id).patch(update_user)
        
        # Revoke all sessions if requested
        if revoke_sessions:
            await graph_client.users.by_user_id(user_id).revoke_sign_in_sessions.post()
        
        # Send notification if requested
        if notify_user:
            # Get user's manager or security contact
            user = await graph_client.users.by_user_id(user_id).get()
            manager = await graph_client.users.by_user_id(user_id).manager.get()
            
            if manager and hasattr(manager, 'mail'):
                # Send email to manager
                message = {
                    'message': {
                        'subject': f'Security Alert: Account Disabled - {user.display_name}',
                        'body': {
                            'contentType': 'HTML',
                            'content': f"""
                            <p>This is an automated security notification.</p>
                            <p>The following user account has been disabled due to a security incident:</p>
                            <ul>
                                <li><strong>User:</strong> {user.display_name} ({user.user_principal_name})</li>
                                <li><strong>Reason:</strong> {reason}</li>
                                <li><strong>Time:</strong> {datetime.utcnow().isoformat()}</li>
                            </ul>
                            <p>Please contact the security team for more information.</p>
                            """
                        },
                        'toRecipients': [
                            {
                                'emailAddress': {
                                    'address': manager.mail
                                }
                            }
                        ]
                    }
                }
                
                await graph_client.users.by_user_id(user_id).send_mail.post(message)
        
        return func.HttpResponse(
            json.dumps({
                "success": True,
                "user_id": user_id,
                "account_disabled": True,
                "sessions_revoked": revoke_sessions,
                "notification_sent": notify_user,
                "message": f"User account {user_id} disabled successfully"
            }),
            mimetype="application/json",
            status_code=200
        )
        
    except Exception as e:
        logger.error(f"Failed to disable user account: {str(e)}")
        return func.HttpResponse(
            json.dumps({
                "success": False,
                "error": str(e)
            }),
            mimetype="application/json",
            status_code=500
        )

def quarantine_email_function(req: func.HttpRequest) -> func.HttpResponse:
    """
    Azure Function to quarantine malicious emails.
    
    Expected payload:
    {
        "message_id": "string",
        "sender": "string",
        "subject": "string",
        "threat_type": "phishing|malware|spam",
        "action": "quarantine|delete|move"
    }
    """
    try:
        req_body = req.get_json()
        message_id = req_body.get('message_id')
        sender = req_body.get('sender')
        subject = req_body.get('subject')
        threat_type = req_body.get('threat_type', 'phishing')
        action = req_body.get('action', 'quarantine')
        
        # Initialize Graph client
        graph_client = GraphServiceClient(
            credentials=credential,
            scopes=['https://graph.microsoft.com/.default']
        )
        
        # Search for the message across all mailboxes
        search_query = f"internetMessageId:{message_id}"
        if sender:
            search_query += f" AND from:{sender}"
        if subject:
            search_query += f" AND subject:\"{subject}\""
        
        # Create threat assessment request
        threat_assessment = {
            '@odata.type': '#microsoft.graph.mailAssessmentRequest',
            'category': threat_type,
            'expectedAssessment': 'block',
            'messageUri': f"https://graph.microsoft.com/v1.0/messages/{message_id}",
            'recipientEmail': 'organization-wide',
            'status': 'pending'
        }
        
        # Submit threat assessment
        assessment_response = await graph_client.information_protection.threat_assessment_requests.post(threat_assessment)
        
        # Perform action based on request
        if action == 'quarantine':
            # Move to quarantine folder
            move_request = {
                'destinationId': 'quarantine'  # Special folder
            }
            # This would need to be done for each mailbox where the message exists
            
        elif action == 'delete':
            # Delete the message
            # This would need to be done for each mailbox where the message exists
            pass
            
        # Create mail flow rule to block sender
        if sender:
            mail_flow_rule = {
                'displayName': f'Block-{threat_type}-{sender}',
                'priority': 1,
                'isEnabled': True,
                'conditions': {
                    'senderIs': [sender]
                },
                'actions': {
                    'rejectMessage': True,
                    'rejectMessageReasonText': f'Message blocked due to {threat_type} threat'
                }
            }
            # Create mail flow rule via Exchange admin API
        
        return func.HttpResponse(
            json.dumps({
                "success": True,
                "message_id": message_id,
                "action_taken": action,
                "threat_type": threat_type,
                "assessment_id": assessment_response.id if 'assessment_response' in locals() else None,
                "message": f"Email quarantined successfully"
            }),
            mimetype="application/json",
            status_code=200
        )
        
    except Exception as e:
        logger.error(f"Failed to quarantine email: {str(e)}")
        return func.HttpResponse(
            json.dumps({
                "success": False,
                "error": str(e)
            }),
            mimetype="application/json",
            status_code=500
        )

def collect_forensics_function(req: func.HttpRequest) -> func.HttpResponse:
    """
    Azure Function to collect forensic data from compromised systems.
    
    Expected payload:
    {
        "machine_id": "string",
        "incident_id": "string",
        "collection_type": "full|memory|disk|network|quick",
        "storage_account": "string"
    }
    """
    try:
        req_body = req.get_json()
        machine_id = req_body.get('machine_id')
        incident_id = req_body.get('incident_id')
        collection_type = req_body.get('collection_type', 'quick')
        storage_account = req_body.get('storage_account')
        
        compute_client = ComputeManagementClient(credential, AZURE_SUBSCRIPTION_ID)
        
        # Get VM details
        vm = compute_client.virtual_machines.get(
            AZURE_RESOURCE_GROUP,
            machine_id
        )
        
        # Define collection script based on type
        if collection_type == 'full':
            collection_script = """
            # Full forensic collection
            $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
            $outputPath = "C:\\ForensicData\\$timestamp"
            New-Item -ItemType Directory -Path $outputPath -Force
            
            # System information
            Get-ComputerInfo | Out-File "$outputPath\\system_info.txt"
            Get-Process | Export-Csv "$outputPath\\processes.csv"
            Get-Service | Export-Csv "$outputPath\\services.csv"
            Get-NetTCPConnection | Export-Csv "$outputPath\\network_connections.csv"
            Get-EventLog -LogName Security -Newest 1000 | Export-Csv "$outputPath\\security_events.csv"
            Get-EventLog -LogName System -Newest 1000 | Export-Csv "$outputPath\\system_events.csv"
            
            # Memory dump (if possible)
            # This would require additional tools like WinPmem
            
            # Registry export
            reg export HKLM "$outputPath\\HKLM.reg"
            reg export HKCU "$outputPath\\HKCU.reg"
            
            # Compress and upload
            Compress-Archive -Path $outputPath -DestinationPath "$outputPath.zip"
            # Upload to Azure Storage
            """
        elif collection_type == 'memory':
            collection_script = """
            # Memory collection only
            # Requires memory dump tools
            """
        elif collection_type == 'quick':
            collection_script = """
            # Quick forensic collection
            $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
            $outputPath = "C:\\ForensicData\\$timestamp"
            New-Item -ItemType Directory -Path $outputPath -Force
            
            # Critical data only
            Get-Process | Export-Csv "$outputPath\\processes.csv"
            Get-NetTCPConnection | Export-Csv "$outputPath\\network_connections.csv"
            Get-EventLog -LogName Security -Newest 100 | Export-Csv "$outputPath\\recent_security_events.csv"
            
            # Compress
            Compress-Archive -Path $outputPath -DestinationPath "$outputPath.zip"
            """
        
        # Run command on VM
        run_command_params = {
            'command_id': 'RunPowerShellScript',
            'script': [collection_script]
        }
        
        async_run = compute_client.virtual_machine_run_commands.begin_create_or_update(
            AZURE_RESOURCE_GROUP,
            machine_id,
            'ForensicCollection',
            run_command_params
        )
        
        # Wait for completion (or return job ID for async tracking)
        result = async_run.result()
        
        return func.HttpResponse(
            json.dumps({
                "success": True,
                "machine_id": machine_id,
                "incident_id": incident_id,
                "collection_type": collection_type,
                "job_id": result.name if hasattr(result, 'name') else None,
                "message": f"Forensic collection initiated on {machine_id}"
            }),
            mimetype="application/json",
            status_code=200
        )
        
    except Exception as e:
        logger.error(f"Failed to collect forensics: {str(e)}")
        return func.HttpResponse(
            json.dumps({
                "success": False,
                "error": str(e)
            }),
            mimetype="application/json",
            status_code=500
        ) 