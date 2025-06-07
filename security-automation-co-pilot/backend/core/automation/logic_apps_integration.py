"""
Logic Apps Integration for Security Automation Co-Pilot.
Enables integration with Azure Logic Apps and Microsoft Sentinel Playbooks.
"""

import aiohttp
import logging
from typing import Dict, List, Any, Optional
from datetime import datetime
import json
from azure.identity import DefaultAzureCredential
from azure.mgmt.logic import LogicManagementClient
from azure.mgmt.resource import ResourceManagementClient
from ...config.settings import settings
from ..database import create_audit_log

logger = logging.getLogger(__name__)

class LogicAppsIntegration:
    """
    Manages integration with Azure Logic Apps for automated workflows.
    """
    
    def __init__(self):
        self.credential = DefaultAzureCredential()
        self.logic_client = LogicManagementClient(
            credential=self.credential,
            subscription_id=settings.azure_subscription_id
        )
        self.resource_client = ResourceManagementClient(
            credential=self.credential,
            subscription_id=settings.azure_subscription_id
        )
        self.resource_group = settings.azure_resource_group
        
    async def list_logic_apps(self) -> List[Dict[str, Any]]:
        """List all Logic Apps in the resource group."""
        try:
            workflows = self.logic_client.workflows.list_by_resource_group(
                self.resource_group
            )
            
            logic_apps = []
            for workflow in workflows:
                logic_apps.append({
                    "id": workflow.id,
                    "name": workflow.name,
                    "location": workflow.location,
                    "state": workflow.state,
                    "created_time": workflow.created_time.isoformat() if workflow.created_time else None,
                    "changed_time": workflow.changed_time.isoformat() if workflow.changed_time else None,
                    "tags": workflow.tags or {}
                })
            
            return logic_apps
            
        except Exception as e:
            logger.error(f"Failed to list Logic Apps: {str(e)}")
            raise
    
    async def get_logic_app(self, workflow_name: str) -> Dict[str, Any]:
        """Get details of a specific Logic App."""
        try:
            workflow = self.logic_client.workflows.get(
                resource_group_name=self.resource_group,
                workflow_name=workflow_name
            )
            
            return {
                "id": workflow.id,
                "name": workflow.name,
                "location": workflow.location,
                "state": workflow.state,
                "definition": workflow.definition,
                "parameters": workflow.parameters,
                "created_time": workflow.created_time.isoformat() if workflow.created_time else None,
                "tags": workflow.tags or {}
            }
            
        except Exception as e:
            logger.error(f"Failed to get Logic App {workflow_name}: {str(e)}")
            raise
    
    async def trigger_logic_app(self, workflow_name: str, trigger_name: str = "manual",
                              inputs: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Trigger a Logic App workflow.
        
        Args:
            workflow_name: Name of the Logic App workflow
            trigger_name: Name of the trigger (default: "manual")
            inputs: Input data for the trigger
        """
        try:
            # Get the workflow trigger callback URL
            callback_url = self.logic_client.workflow_triggers.list_callback_url(
                resource_group_name=self.resource_group,
                workflow_name=workflow_name,
                trigger_name=trigger_name
            )
            
            # Trigger the workflow via HTTP request
            async with aiohttp.ClientSession() as session:
                headers = {"Content-Type": "application/json"}
                
                async with session.post(
                    callback_url.value,
                    json=inputs or {},
                    headers=headers
                ) as response:
                    if response.status == 202:  # Accepted
                        # Get run ID from response headers
                        run_id = response.headers.get("x-ms-workflow-run-id")
                        
                        # Log the trigger
                        await create_audit_log(
                            "logic_app_triggered",
                            "system",
                            {
                                "workflow_name": workflow_name,
                                "trigger_name": trigger_name,
                                "run_id": run_id,
                                "inputs": inputs
                            }
                        )
                        
                        return {
                            "success": True,
                            "run_id": run_id,
                            "status": "triggered",
                            "workflow_name": workflow_name
                        }
                    else:
                        error_text = await response.text()
                        raise Exception(f"Failed to trigger Logic App: {response.status} - {error_text}")
                        
        except Exception as e:
            logger.error(f"Failed to trigger Logic App {workflow_name}: {str(e)}")
            raise
    
    async def get_workflow_run_status(self, workflow_name: str, run_id: str) -> Dict[str, Any]:
        """Get the status of a Logic App workflow run."""
        try:
            run = self.logic_client.workflow_runs.get(
                resource_group_name=self.resource_group,
                workflow_name=workflow_name,
                run_name=run_id
            )
            
            return {
                "id": run.id,
                "name": run.name,
                "status": run.status,
                "start_time": run.start_time.isoformat() if run.start_time else None,
                "end_time": run.end_time.isoformat() if run.end_time else None,
                "correlation_id": run.correlation_id,
                "outputs": run.outputs,
                "error": run.error
            }
            
        except Exception as e:
            logger.error(f"Failed to get workflow run status: {str(e)}")
            raise
    
    async def list_workflow_runs(self, workflow_name: str, top: int = 50) -> List[Dict[str, Any]]:
        """List recent runs of a Logic App workflow."""
        try:
            runs = self.logic_client.workflow_runs.list(
                resource_group_name=self.resource_group,
                workflow_name=workflow_name,
                top=top
            )
            
            run_list = []
            for run in runs:
                run_list.append({
                    "id": run.id,
                    "name": run.name,
                    "status": run.status,
                    "start_time": run.start_time.isoformat() if run.start_time else None,
                    "end_time": run.end_time.isoformat() if run.end_time else None,
                    "trigger": run.trigger.name if run.trigger else None
                })
            
            return run_list
            
        except Exception as e:
            logger.error(f"Failed to list workflow runs: {str(e)}")
            raise

class SentinelPlaybooks:
    """
    Manages Microsoft Sentinel Playbooks (Logic Apps).
    """
    
    def __init__(self):
        self.logic_apps = LogicAppsIntegration()
        self.playbook_prefix = "SecurityPlaybook-"  # Common prefix for Sentinel playbooks
        
    async def list_sentinel_playbooks(self) -> List[Dict[str, Any]]:
        """List all Sentinel playbooks."""
        all_logic_apps = await self.logic_apps.list_logic_apps()
        
        # Filter for Sentinel playbooks (usually have specific tags or naming convention)
        playbooks = []
        for app in all_logic_apps:
            # Check if it's a Sentinel playbook by tags or name
            if (app.get("tags", {}).get("hidden-SentinelPlaybook") or 
                app["name"].startswith(self.playbook_prefix) or
                "sentinel" in app["name"].lower()):
                playbooks.append(app)
        
        return playbooks
    
    async def trigger_incident_playbook(self, incident_id: str, playbook_name: str,
                                      incident_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Trigger a Sentinel playbook for a specific incident.
        
        Args:
            incident_id: ID of the incident
            playbook_name: Name of the playbook to trigger
            incident_data: Incident details to pass to the playbook
        """
        # Prepare playbook inputs in Sentinel format
        playbook_inputs = {
            "incident": {
                "id": incident_id,
                "title": incident_data.get("title"),
                "severity": incident_data.get("severity"),
                "status": incident_data.get("status"),
                "created_time": incident_data.get("created_at"),
                "entities": incident_data.get("entities", []),
                "alerts": incident_data.get("alerts", [])
            },
            "tenant_id": settings.azure_tenant_id,
            "subscription_id": settings.azure_subscription_id,
            "resource_group": settings.azure_resource_group,
            "workspace_name": settings.azure_workspace_name
        }
        
        return await self.logic_apps.trigger_logic_app(
            workflow_name=playbook_name,
            trigger_name="manual",
            inputs=playbook_inputs
        )
    
    async def create_playbook_from_template(self, playbook_name: str, 
                                          template_name: str,
                                          parameters: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new Sentinel playbook from a template.
        
        Args:
            playbook_name: Name for the new playbook
            template_name: Template to use
            parameters: Parameters for the template
        """
        # Define common playbook templates
        templates = {
            "isolate_machine": {
                "definition": {
                    "$schema": "https://schema.management.azure.com/schemas/2016-06-01/Microsoft.Logic.json",
                    "contentVersion": "1.0.0.0",
                    "triggers": {
                        "manual": {
                            "type": "Request",
                            "kind": "Http",
                            "inputs": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "incident": {"type": "object"},
                                        "machine_id": {"type": "string"}
                                    }
                                }
                            }
                        }
                    },
                    "actions": {
                        "Isolate_Machine": {
                            "type": "Http",
                            "inputs": {
                                "method": "POST",
                                "uri": "@{parameters('DefenderEndpoint')}/machines/@{triggerBody()['machine_id']}/isolate",
                                "headers": {
                                    "Authorization": "Bearer @{parameters('AccessToken')}"
                                },
                                "body": {
                                    "Comment": "Automated isolation from Sentinel",
                                    "IsolationType": "Full"
                                }
                            }
                        }
                    }
                }
            },
            "block_ip": {
                "definition": {
                    "$schema": "https://schema.management.azure.com/schemas/2016-06-01/Microsoft.Logic.json",
                    "contentVersion": "1.0.0.0",
                    "triggers": {
                        "manual": {
                            "type": "Request",
                            "kind": "Http"
                        }
                    },
                    "actions": {
                        "Block_IP_Address": {
                            "type": "Http",
                            "inputs": {
                                "method": "POST",
                                "uri": "@{parameters('FirewallEndpoint')}/rules",
                                "body": {
                                    "action": "block",
                                    "source": "@{triggerBody()['ip_address']}"
                                }
                            }
                        }
                    }
                }
            },
            "send_teams_notification": {
                "definition": {
                    "$schema": "https://schema.management.azure.com/schemas/2016-06-01/Microsoft.Logic.json",
                    "contentVersion": "1.0.0.0",
                    "triggers": {
                        "manual": {
                            "type": "Request",
                            "kind": "Http"
                        }
                    },
                    "actions": {
                        "Post_to_Teams": {
                            "type": "ApiConnection",
                            "inputs": {
                                "host": {
                                    "connection": {
                                        "name": "@parameters('teams_connection')"
                                    }
                                },
                                "method": "post",
                                "path": "/v3/teams/@{parameters('TeamId')}/channels/@{parameters('ChannelId')}/messages",
                                "body": {
                                    "messageBody": "@{triggerBody()['message']}"
                                }
                            }
                        }
                    }
                }
            }
        }
        
        if template_name not in templates:
            raise ValueError(f"Template {template_name} not found")
        
        template = templates[template_name]
        
        # Create the Logic App
        try:
            workflow = self.logic_client.workflows.create_or_update(
                resource_group_name=settings.azure_resource_group,
                workflow_name=f"{self.playbook_prefix}{playbook_name}",
                workflow={
                    "location": "eastus",  # Use appropriate location
                    "definition": template["definition"],
                    "parameters": parameters,
                    "tags": {
                        "hidden-SentinelPlaybook": "true",
                        "created-by": "Security-Automation-Co-Pilot"
                    }
                }
            )
            
            return {
                "success": True,
                "playbook_id": workflow.id,
                "playbook_name": workflow.name
            }
            
        except Exception as e:
            logger.error(f"Failed to create playbook: {str(e)}")
            raise
    
    async def get_playbook_metrics(self, playbook_name: str, 
                                  days: int = 7) -> Dict[str, Any]:
        """Get execution metrics for a playbook."""
        runs = await self.logic_apps.list_workflow_runs(playbook_name, top=100)
        
        # Calculate metrics
        total_runs = len(runs)
        successful_runs = sum(1 for run in runs if run["status"] == "Succeeded")
        failed_runs = sum(1 for run in runs if run["status"] == "Failed")
        
        # Calculate average execution time
        execution_times = []
        for run in runs:
            if run["start_time"] and run["end_time"]:
                start = datetime.fromisoformat(run["start_time"].replace("Z", "+00:00"))
                end = datetime.fromisoformat(run["end_time"].replace("Z", "+00:00"))
                execution_times.append((end - start).total_seconds())
        
        avg_execution_time = sum(execution_times) / len(execution_times) if execution_times else 0
        
        return {
            "playbook_name": playbook_name,
            "total_runs": total_runs,
            "successful_runs": successful_runs,
            "failed_runs": failed_runs,
            "success_rate": (successful_runs / total_runs * 100) if total_runs > 0 else 0,
            "average_execution_time_seconds": avg_execution_time,
            "period_days": days
        }

# Global instances
logic_apps_integration = LogicAppsIntegration()
sentinel_playbooks = SentinelPlaybooks() 