"""
Notification Service for Security Automation Co-Pilot.
Handles sending notifications through various channels (Email, Teams, SMS, etc.).
"""

import logging
import aiohttp
from typing import Dict, List, Any, Optional
from datetime import datetime
from enum import Enum
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
from jinja2 import Template
from ...config.settings import settings
from ...integrations.microsoft_graph import MicrosoftGraphClient
from ..database import create_audit_log

logger = logging.getLogger(__name__)

class NotificationChannel(str, Enum):
    EMAIL = "email"
    TEAMS = "teams"
    SMS = "sms"
    WEBHOOK = "webhook"
    PAGERDUTY = "pagerduty"
    SLACK = "slack"

class NotificationPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"
    CRITICAL = "critical"

class NotificationTemplate:
    """Manages notification templates."""
    
    # Email templates
    EMAIL_TEMPLATES = {
        "incident_alert": {
            "subject": "🚨 Security Incident Alert: {{ incident.title }}",
            "body": """
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .header { background-color: #dc3545; color: white; padding: 20px; }
                        .content { padding: 20px; }
                        .incident-details { background-color: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 5px; }
                        .severity-{{ incident.severity|lower }} { color: {% if incident.severity == 'Critical' %}#dc3545{% elif incident.severity == 'High' %}#fd7e14{% elif incident.severity == 'Medium' %}#ffc107{% else %}#28a745{% endif %}; }
                        .actions { margin-top: 20px; }
                        .button { background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>Security Incident Alert</h2>
                    </div>
                    <div class="content">
                        <h3>{{ incident.title }}</h3>
                        <div class="incident-details">
                            <p><strong>Incident ID:</strong> {{ incident.id }}</p>
                            <p><strong>Severity:</strong> <span class="severity-{{ incident.severity|lower }}">{{ incident.severity }}</span></p>
                            <p><strong>Type:</strong> {{ incident.type }}</p>
                            <p><strong>Status:</strong> {{ incident.status }}</p>
                            <p><strong>Created:</strong> {{ incident.created_at }}</p>
                            <p><strong>Description:</strong> {{ incident.description }}</p>
                            {% if incident.affected_assets %}
                            <p><strong>Affected Assets:</strong> {{ incident.affected_assets|join(', ') }}</p>
                            {% endif %}
                        </div>
                        <div class="actions">
                            <a href="{{ dashboard_url }}/incidents/{{ incident.id }}" class="button">View in Dashboard</a>
                        </div>
                    </div>
                </body>
                </html>
            """
        },
        "workflow_completed": {
            "subject": "✅ Automated Response Completed: {{ workflow.name }}",
            "body": """
                <html>
                <body>
                    <h3>Automated Workflow Completed</h3>
                    <p>The automated response workflow has been completed successfully.</p>
                    <ul>
                        <li><strong>Workflow:</strong> {{ workflow.name }}</li>
                        <li><strong>Incident:</strong> {{ incident.title }}</li>
                        <li><strong>Duration:</strong> {{ workflow.duration }} seconds</li>
                        <li><strong>Actions Executed:</strong> {{ workflow.actions_count }}</li>
                    </ul>
                </body>
                </html>
            """
        },
        "compliance_report": {
            "subject": "📊 Compliance Assessment Report: {{ framework.name }}",
            "body": """
                <html>
                <body>
                    <h3>Compliance Assessment Report</h3>
                    <p>Your {{ framework.name }} compliance assessment has been completed.</p>
                    <ul>
                        <li><strong>Overall Score:</strong> {{ assessment.score }}%</li>
                        <li><strong>Status:</strong> {{ assessment.status }}</li>
                        <li><strong>Findings:</strong> {{ assessment.findings_count }}</li>
                    </ul>
                    <p><a href="{{ report_url }}">Download Full Report</a></p>
                </body>
                </html>
            """
        }
    }
    
    # Teams message templates
    TEAMS_TEMPLATES = {
        "incident_alert": {
            "type": "MessageCard",
            "context": "https://schema.org/extensions",
            "summary": "Security Incident: {{ incident.title }}",
            "themeColor": "{% if incident.severity == 'Critical' %}FF0000{% elif incident.severity == 'High' %}FFA500{% else %}FFD700{% endif %}",
            "sections": [{
                "activityTitle": "🚨 {{ incident.title }}",
                "activitySubtitle": "Severity: {{ incident.severity }}",
                "facts": [
                    {"name": "ID", "value": "{{ incident.id }}"},
                    {"name": "Type", "value": "{{ incident.type }}"},
                    {"name": "Status", "value": "{{ incident.status }}"},
                    {"name": "Created", "value": "{{ incident.created_at }}"}
                ],
                "text": "{{ incident.description }}"
            }],
            "potentialAction": [{
                "@type": "OpenUri",
                "name": "View in Dashboard",
                "targets": [{
                    "os": "default",
                    "uri": "{{ dashboard_url }}/incidents/{{ incident.id }}"
                }]
            }]
        }
    }
    
    @staticmethod
    def render_template(template_name: str, channel: NotificationChannel, data: Dict[str, Any]) -> Dict[str, str]:
        """Render a notification template with data."""
        if channel == NotificationChannel.EMAIL:
            template_dict = NotificationTemplate.EMAIL_TEMPLATES.get(template_name)
        elif channel == NotificationChannel.TEAMS:
            template_dict = NotificationTemplate.TEAMS_TEMPLATES.get(template_name)
        else:
            raise ValueError(f"No templates available for channel {channel}")
        
        if not template_dict:
            raise ValueError(f"Template {template_name} not found for channel {channel}")
        
        # Add common data
        data["dashboard_url"] = settings.frontend_url
        data["timestamp"] = datetime.utcnow().isoformat()
        
        # Render template
        if channel == NotificationChannel.EMAIL:
            return {
                "subject": Template(template_dict["subject"]).render(**data),
                "body": Template(template_dict["body"]).render(**data)
            }
        elif channel == NotificationChannel.TEAMS:
            # For Teams, render the entire card as JSON
            rendered = {}
            for key, value in template_dict.items():
                if isinstance(value, str):
                    rendered[key] = Template(value).render(**data)
                elif isinstance(value, list):
                    rendered[key] = []
                    for item in value:
                        if isinstance(item, dict):
                            rendered_item = {}
                            for k, v in item.items():
                                if isinstance(v, str):
                                    rendered_item[k] = Template(v).render(**data)
                                else:
                                    rendered_item[k] = v
                            rendered[key].append(rendered_item)
                        else:
                            rendered[key].append(item)
                else:
                    rendered[key] = value
            return rendered
        
        return {}

class NotificationService:
    """
    Main notification service for sending alerts through various channels.
    """
    
    def __init__(self):
        self.graph_client = MicrosoftGraphClient()
        self.channels = {
            NotificationChannel.EMAIL: self._send_email,
            NotificationChannel.TEAMS: self._send_teams,
            NotificationChannel.SMS: self._send_sms,
            NotificationChannel.WEBHOOK: self._send_webhook,
            NotificationChannel.PAGERDUTY: self._send_pagerduty,
            NotificationChannel.SLACK: self._send_slack
        }
        
    async def send_notification(self, 
                              recipients: List[str],
                              template_name: str,
                              data: Dict[str, Any],
                              channels: List[NotificationChannel],
                              priority: NotificationPriority = NotificationPriority.MEDIUM) -> Dict[str, Any]:
        """
        Send notification through specified channels.
        
        Args:
            recipients: List of recipient addresses/IDs
            template_name: Name of the template to use
            data: Data to populate the template
            channels: List of channels to send through
            priority: Notification priority
        """
        results = {}
        
        for channel in channels:
            try:
                handler = self.channels.get(channel)
                if not handler:
                    logger.warning(f"No handler for channel {channel}")
                    continue
                
                # Render template
                rendered = NotificationTemplate.render_template(template_name, channel, data)
                
                # Send notification
                result = await handler(recipients, rendered, priority)
                results[channel.value] = result
                
                # Log notification
                await create_audit_log(
                    "notification_sent",
                    "system",
                    {
                        "channel": channel.value,
                        "template": template_name,
                        "recipients_count": len(recipients),
                        "priority": priority.value,
                        "success": result.get("success", False)
                    }
                )
                
            except Exception as e:
                logger.error(f"Failed to send {channel} notification: {str(e)}")
                results[channel.value] = {"success": False, "error": str(e)}
        
        return results
    
    async def _send_email(self, recipients: List[str], content: Dict[str, str], 
                         priority: NotificationPriority) -> Dict[str, Any]:
        """Send email notification using Microsoft Graph API."""
        try:
            # Prepare email message
            message = {
                "message": {
                    "subject": content["subject"],
                    "body": {
                        "contentType": "HTML",
                        "content": content["body"]
                    },
                    "toRecipients": [{"emailAddress": {"address": email}} for email in recipients],
                    "importance": "high" if priority in [NotificationPriority.HIGH, NotificationPriority.URGENT, NotificationPriority.CRITICAL] else "normal"
                },
                "saveToSentItems": "false"
            }
            
            # Send email via Graph API
            await self.graph_client._make_request(
                "POST",
                "me/sendMail",
                message
            )
            
            return {"success": True, "recipients": recipients}
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return {"success": False, "error": str(e)}
    
    async def _send_teams(self, recipients: List[str], content: Dict[str, Any], 
                         priority: NotificationPriority) -> Dict[str, Any]:
        """Send Microsoft Teams notification."""
        try:
            # For Teams, recipients should be webhook URLs or channel IDs
            results = []
            
            for webhook_url in recipients:
                async with aiohttp.ClientSession() as session:
                    async with session.post(webhook_url, json=content) as response:
                        if response.status == 200:
                            results.append({"url": webhook_url, "success": True})
                        else:
                            results.append({
                                "url": webhook_url, 
                                "success": False, 
                                "error": f"HTTP {response.status}"
                            })
            
            return {"success": all(r["success"] for r in results), "results": results}
            
        except Exception as e:
            logger.error(f"Failed to send Teams notification: {str(e)}")
            return {"success": False, "error": str(e)}
    
    async def _send_sms(self, recipients: List[str], content: Dict[str, str], 
                       priority: NotificationPriority) -> Dict[str, Any]:
        """Send SMS notification (requires SMS service configuration)."""
        # TODO: Implement SMS sending via Twilio or Azure Communication Services
        logger.info(f"SMS notification to {recipients}: {content.get('subject', 'Alert')}")
        return {"success": True, "message": "SMS feature not yet implemented"}
    
    async def _send_webhook(self, recipients: List[str], content: Dict[str, Any], 
                           priority: NotificationPriority) -> Dict[str, Any]:
        """Send webhook notification."""
        try:
            results = []
            
            for webhook_url in recipients:
                payload = {
                    "timestamp": datetime.utcnow().isoformat(),
                    "priority": priority.value,
                    "content": content
                }
                
                async with aiohttp.ClientSession() as session:
                    async with session.post(webhook_url, json=payload) as response:
                        results.append({
                            "url": webhook_url,
                            "success": response.status in [200, 201, 202],
                            "status": response.status
                        })
            
            return {"success": all(r["success"] for r in results), "results": results}
            
        except Exception as e:
            logger.error(f"Failed to send webhook notification: {str(e)}")
            return {"success": False, "error": str(e)}
    
    async def _send_pagerduty(self, recipients: List[str], content: Dict[str, Any], 
                             priority: NotificationPriority) -> Dict[str, Any]:
        """Send PagerDuty notification."""
        # TODO: Implement PagerDuty integration
        logger.info(f"PagerDuty notification: {content}")
        return {"success": True, "message": "PagerDuty feature not yet implemented"}
    
    async def _send_slack(self, recipients: List[str], content: Dict[str, Any], 
                         priority: NotificationPriority) -> Dict[str, Any]:
        """Send Slack notification."""
        try:
            # Convert content to Slack format
            slack_message = {
                "text": content.get("subject", "Security Alert"),
                "attachments": [{
                    "color": {
                        NotificationPriority.CRITICAL: "danger",
                        NotificationPriority.URGENT: "danger",
                        NotificationPriority.HIGH: "warning",
                        NotificationPriority.MEDIUM: "warning",
                        NotificationPriority.LOW: "good"
                    }.get(priority, "warning"),
                    "fields": content.get("fields", []),
                    "footer": "Security Automation Co-Pilot",
                    "ts": int(datetime.utcnow().timestamp())
                }]
            }
            
            results = []
            for webhook_url in recipients:
                async with aiohttp.ClientSession() as session:
                    async with session.post(webhook_url, json=slack_message) as response:
                        results.append({
                            "url": webhook_url,
                            "success": response.status == 200
                        })
            
            return {"success": all(r["success"] for r in results), "results": results}
            
        except Exception as e:
            logger.error(f"Failed to send Slack notification: {str(e)}")
            return {"success": False, "error": str(e)}

# Global notification service instance
notification_service = NotificationService() 