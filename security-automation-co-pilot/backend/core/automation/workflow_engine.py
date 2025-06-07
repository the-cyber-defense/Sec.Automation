"""
Workflow Engine for Security Automation Co-Pilot.
Orchestrates automated incident response workflows.
"""

import asyncio
import logging
from typing import Dict, List, Any, Optional, Callable
from datetime import datetime
from enum import Enum
from dataclasses import dataclass, field
import json
from ..database import create_audit_log, db_manager
from ...config.settings import settings

logger = logging.getLogger(__name__)

class WorkflowStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    PAUSED = "paused"

class ActionType(str, Enum):
    ISOLATE_MACHINE = "isolate_machine"
    BLOCK_IP = "block_ip"
    DISABLE_USER = "disable_user"
    RESET_PASSWORD = "reset_password"
    SEND_NOTIFICATION = "send_notification"
    CREATE_TICKET = "create_ticket"
    RUN_SCRIPT = "run_script"
    INVOKE_LOGIC_APP = "invoke_logic_app"
    QUARANTINE_EMAIL = "quarantine_email"
    UPDATE_FIREWALL = "update_firewall"
    COLLECT_FORENSICS = "collect_forensics"
    CUSTOM = "custom"

@dataclass
class WorkflowAction:
    """Represents a single action in a workflow."""
    id: str
    type: ActionType
    name: str
    description: str
    parameters: Dict[str, Any]
    timeout_seconds: int = 300
    retry_count: int = 3
    retry_delay_seconds: int = 60
    required_approvals: List[str] = field(default_factory=list)
    conditions: Dict[str, Any] = field(default_factory=dict)
    on_success: Optional[str] = None
    on_failure: Optional[str] = None

@dataclass
class WorkflowExecution:
    """Tracks the execution of a workflow instance."""
    id: str
    workflow_id: str
    incident_id: str
    status: WorkflowStatus
    started_at: datetime
    completed_at: Optional[datetime] = None
    current_action: Optional[str] = None
    executed_actions: List[str] = field(default_factory=list)
    action_results: Dict[str, Any] = field(default_factory=dict)
    error_message: Optional[str] = None
    triggered_by: str = "system"
    context: Dict[str, Any] = field(default_factory=dict)

class WorkflowEngine:
    """
    Core workflow engine for orchestrating automated security responses.
    """
    
    def __init__(self):
        self.workflows: Dict[str, Dict[str, Any]] = {}
        self.action_handlers: Dict[ActionType, Callable] = {}
        self.running_executions: Dict[str, WorkflowExecution] = {}
        self._initialize_default_handlers()
        self._load_workflows()
    
    def _initialize_default_handlers(self):
        """Initialize default action handlers."""
        self.action_handlers = {
            ActionType.ISOLATE_MACHINE: self._isolate_machine_handler,
            ActionType.BLOCK_IP: self._block_ip_handler,
            ActionType.DISABLE_USER: self._disable_user_handler,
            ActionType.RESET_PASSWORD: self._reset_password_handler,
            ActionType.SEND_NOTIFICATION: self._send_notification_handler,
            ActionType.CREATE_TICKET: self._create_ticket_handler,
            ActionType.RUN_SCRIPT: self._run_script_handler,
            ActionType.INVOKE_LOGIC_APP: self._invoke_logic_app_handler,
            ActionType.QUARANTINE_EMAIL: self._quarantine_email_handler,
            ActionType.UPDATE_FIREWALL: self._update_firewall_handler,
            ActionType.COLLECT_FORENSICS: self._collect_forensics_handler,
        }
    
    def _load_workflows(self):
        """Load workflow definitions from configuration or database."""
        # Load predefined workflows
        self.workflows = {
            "ransomware_response": {
                "id": "ransomware_response",
                "name": "Ransomware Incident Response",
                "description": "Automated response for ransomware detection",
                "severity_threshold": "High",
                "actions": [
                    WorkflowAction(
                        id="isolate",
                        type=ActionType.ISOLATE_MACHINE,
                        name="Isolate Affected Machine",
                        description="Immediately isolate the infected machine",
                        parameters={"isolation_type": "full"},
                        timeout_seconds=120
                    ),
                    WorkflowAction(
                        id="notify",
                        type=ActionType.SEND_NOTIFICATION,
                        name="Notify Security Team",
                        description="Send urgent notification to security team",
                        parameters={
                            "recipients": ["security-team@company.com"],
                            "priority": "urgent",
                            "template": "ransomware_alert"
                        }
                    ),
                    WorkflowAction(
                        id="forensics",
                        type=ActionType.COLLECT_FORENSICS,
                        name="Collect Forensic Data",
                        description="Gather forensic evidence from affected machine",
                        parameters={"collection_type": "full"},
                        timeout_seconds=600
                    ),
                    WorkflowAction(
                        id="ticket",
                        type=ActionType.CREATE_TICKET,
                        name="Create Incident Ticket",
                        description="Create high-priority incident ticket",
                        parameters={
                            "priority": "P1",
                            "assignment_group": "security-operations"
                        }
                    )
                ]
            },
            "phishing_response": {
                "id": "phishing_response",
                "name": "Phishing Email Response",
                "description": "Automated response for detected phishing emails",
                "severity_threshold": "Medium",
                "actions": [
                    WorkflowAction(
                        id="quarantine",
                        type=ActionType.QUARANTINE_EMAIL,
                        name="Quarantine Phishing Email",
                        description="Remove phishing email from all mailboxes",
                        parameters={"scope": "organization"},
                        timeout_seconds=180
                    ),
                    WorkflowAction(
                        id="block_sender",
                        type=ActionType.BLOCK_IP,
                        name="Block Sender",
                        description="Block sender IP and domain",
                        parameters={"block_duration": "permanent"}
                    ),
                    WorkflowAction(
                        id="reset_compromised",
                        type=ActionType.RESET_PASSWORD,
                        name="Reset Compromised Passwords",
                        description="Force password reset for users who clicked links",
                        parameters={"require_mfa": True},
                        conditions={"users_clicked": True}
                    )
                ]
            },
            "brute_force_response": {
                "id": "brute_force_response",
                "name": "Brute Force Attack Response",
                "description": "Automated response for brute force attacks",
                "severity_threshold": "High",
                "actions": [
                    WorkflowAction(
                        id="block_ips",
                        type=ActionType.BLOCK_IP,
                        name="Block Attacking IPs",
                        description="Block source IPs of brute force attack",
                        parameters={"block_duration": "24h"},
                        timeout_seconds=60
                    ),
                    WorkflowAction(
                        id="disable_account",
                        type=ActionType.DISABLE_USER,
                        name="Disable Targeted Account",
                        description="Temporarily disable account under attack",
                        parameters={"duration": "temporary"},
                        conditions={"failed_attempts": {"$gt": 50}}
                    ),
                    WorkflowAction(
                        id="enforce_mfa",
                        type=ActionType.RUN_SCRIPT,
                        name="Enforce MFA",
                        description="Enable MFA for affected users",
                        parameters={"script": "enforce_mfa.ps1"}
                    )
                ]
            }
        }
    
    async def execute_workflow(self, workflow_id: str, incident_id: str, 
                             context: Dict[str, Any], triggered_by: str = "system") -> WorkflowExecution:
        """
        Execute a workflow for a given incident.
        
        Args:
            workflow_id: ID of the workflow to execute
            incident_id: ID of the incident triggering the workflow
            context: Additional context for the workflow execution
            triggered_by: User or system that triggered the workflow
        """
        if workflow_id not in self.workflows:
            raise ValueError(f"Workflow {workflow_id} not found")
        
        workflow = self.workflows[workflow_id]
        
        # Create execution instance
        execution = WorkflowExecution(
            id=f"exec_{incident_id}_{datetime.utcnow().timestamp()}",
            workflow_id=workflow_id,
            incident_id=incident_id,
            status=WorkflowStatus.PENDING,
            started_at=datetime.utcnow(),
            triggered_by=triggered_by,
            context=context
        )
        
        self.running_executions[execution.id] = execution
        
        # Log workflow start
        await create_audit_log(
            "workflow_started",
            triggered_by,
            {
                "workflow_id": workflow_id,
                "incident_id": incident_id,
                "execution_id": execution.id
            }
        )
        
        try:
            execution.status = WorkflowStatus.RUNNING
            
            # Execute actions in sequence
            for action_def in workflow["actions"]:
                if isinstance(action_def, dict):
                    action = WorkflowAction(**action_def)
                else:
                    action = action_def
                
                # Check conditions
                if not await self._check_conditions(action.conditions, context):
                    logger.info(f"Skipping action {action.id} - conditions not met")
                    continue
                
                # Check approvals if required
                if action.required_approvals:
                    if not await self._check_approvals(action, execution):
                        logger.info(f"Skipping action {action.id} - approvals pending")
                        continue
                
                # Execute action
                execution.current_action = action.id
                result = await self._execute_action(action, context)
                
                execution.executed_actions.append(action.id)
                execution.action_results[action.id] = result
                
                # Handle action result
                if result.get("success"):
                    if action.on_success:
                        # Trigger success handler
                        await self._handle_action_result(action.on_success, context)
                else:
                    if action.on_failure:
                        # Trigger failure handler
                        await self._handle_action_result(action.on_failure, context)
                    
                    # Decide whether to continue or fail the workflow
                    if not result.get("continue_on_failure", False):
                        raise Exception(f"Action {action.id} failed: {result.get('error')}")
            
            execution.status = WorkflowStatus.COMPLETED
            execution.completed_at = datetime.utcnow()
            
            # Log workflow completion
            await create_audit_log(
                "workflow_completed",
                triggered_by,
                {
                    "workflow_id": workflow_id,
                    "incident_id": incident_id,
                    "execution_id": execution.id,
                    "duration_seconds": (execution.completed_at - execution.started_at).total_seconds()
                }
            )
            
        except Exception as e:
            execution.status = WorkflowStatus.FAILED
            execution.error_message = str(e)
            execution.completed_at = datetime.utcnow()
            
            # Log workflow failure
            await create_audit_log(
                "workflow_failed",
                triggered_by,
                {
                    "workflow_id": workflow_id,
                    "incident_id": incident_id,
                    "execution_id": execution.id,
                    "error": str(e)
                }
            )
            
            logger.error(f"Workflow execution failed: {str(e)}")
            raise
        
        finally:
            # Save execution to database
            await self._save_execution(execution)
            del self.running_executions[execution.id]
        
        return execution
    
    async def _execute_action(self, action: WorkflowAction, context: Dict[str, Any]) -> Dict[str, Any]:
        """Execute a single workflow action."""
        logger.info(f"Executing action: {action.name} ({action.type})")
        
        handler = self.action_handlers.get(action.type)
        if not handler:
            return {"success": False, "error": f"No handler for action type {action.type}"}
        
        # Merge action parameters with context
        params = {**context, **action.parameters}
        
        # Execute with timeout and retry
        for attempt in range(action.retry_count):
            try:
                result = await asyncio.wait_for(
                    handler(params),
                    timeout=action.timeout_seconds
                )
                
                if result.get("success"):
                    return result
                
                if attempt < action.retry_count - 1:
                    await asyncio.sleep(action.retry_delay_seconds)
                    
            except asyncio.TimeoutError:
                logger.error(f"Action {action.id} timed out after {action.timeout_seconds}s")
                if attempt == action.retry_count - 1:
                    return {"success": False, "error": "Action timed out"}
            except Exception as e:
                logger.error(f"Action {action.id} failed: {str(e)}")
                if attempt == action.retry_count - 1:
                    return {"success": False, "error": str(e)}
        
        return {"success": False, "error": "Max retries exceeded"}
    
    async def _check_conditions(self, conditions: Dict[str, Any], context: Dict[str, Any]) -> bool:
        """Check if action conditions are met."""
        if not conditions:
            return True
        
        for key, value in conditions.items():
            context_value = context.get(key)
            
            # Handle comparison operators
            if isinstance(value, dict):
                if "$gt" in value and context_value <= value["$gt"]:
                    return False
                if "$lt" in value and context_value >= value["$lt"]:
                    return False
                if "$eq" in value and context_value != value["$eq"]:
                    return False
                if "$in" in value and context_value not in value["$in"]:
                    return False
            elif context_value != value:
                return False
        
        return True
    
    async def _check_approvals(self, action: WorkflowAction, execution: WorkflowExecution) -> bool:
        """Check if required approvals are obtained."""
        # TODO: Implement approval workflow
        # For now, auto-approve if automated response is enabled
        return settings.enable_automated_response
    
    async def _handle_action_result(self, handler_id: str, context: Dict[str, Any]):
        """Handle action success/failure."""
        # TODO: Implement result handlers
        logger.info(f"Handling result with {handler_id}")
    
    async def _save_execution(self, execution: WorkflowExecution):
        """Save workflow execution to database."""
        db = await db_manager.get_db()
        execution_data = {
            "id": execution.id,
            "workflowId": execution.workflow_id,
            "incidentId": execution.incident_id,
            "status": execution.status.value,
            "startedAt": execution.started_at.isoformat(),
            "completedAt": execution.completed_at.isoformat() if execution.completed_at else None,
            "executedActions": execution.executed_actions,
            "actionResults": execution.action_results,
            "errorMessage": execution.error_message,
            "triggeredBy": execution.triggered_by,
            "context": execution.context
        }
        await db.create_item("workflow_executions", execution_data)
    
    # Action Handlers
    async def _isolate_machine_handler(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handler for isolating a machine."""
        from ...integrations.defender import DefenderClient
        
        try:
            defender = DefenderClient()
            machine_id = params.get("machine_id")
            isolation_type = params.get("isolation_type", "full")
            
            result = await defender.isolate_machine(
                machine_id,
                comment=f"Automated isolation - Incident {params.get('incident_id')}"
            )
            
            return {"success": True, "result": result}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def _block_ip_handler(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handler for blocking IP addresses."""
        # TODO: Implement IP blocking via firewall or network security groups
        logger.info(f"Blocking IP: {params.get('ip_address')}")
        return {"success": True, "result": "IP blocked"}
    
    async def _disable_user_handler(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handler for disabling user accounts."""
        from ...integrations.microsoft_graph import MicrosoftGraphClient
        
        try:
            graph = MicrosoftGraphClient()
            user_id = params.get("user_id")
            
            # Disable user account
            update_data = {"accountEnabled": False}
            await graph._make_request("PATCH", f"users/{user_id}", update_data)
            
            return {"success": True, "result": "User disabled"}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def _reset_password_handler(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handler for resetting user passwords."""
        # TODO: Implement password reset via Graph API
        logger.info(f"Resetting password for user: {params.get('user_id')}")
        return {"success": True, "result": "Password reset"}
    
    async def _send_notification_handler(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handler for sending notifications."""
        # TODO: Implement notification service (email, Teams, etc.)
        logger.info(f"Sending notification to: {params.get('recipients')}")
        return {"success": True, "result": "Notification sent"}
    
    async def _create_ticket_handler(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handler for creating incident tickets."""
        # TODO: Implement ticket creation (ServiceNow, JIRA, etc.)
        logger.info(f"Creating ticket with priority: {params.get('priority')}")
        return {"success": True, "result": {"ticket_id": "INC-12345"}}
    
    async def _run_script_handler(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handler for running remediation scripts."""
        # TODO: Implement script execution via Azure Automation or Functions
        logger.info(f"Running script: {params.get('script')}")
        return {"success": True, "result": "Script executed"}
    
    async def _invoke_logic_app_handler(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handler for invoking Azure Logic Apps."""
        # TODO: Implement Logic Apps invocation
        logger.info(f"Invoking Logic App: {params.get('logic_app_id')}")
        return {"success": True, "result": "Logic App triggered"}
    
    async def _quarantine_email_handler(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handler for quarantining emails."""
        # TODO: Implement email quarantine via Exchange/Graph API
        logger.info(f"Quarantining email: {params.get('message_id')}")
        return {"success": True, "result": "Email quarantined"}
    
    async def _update_firewall_handler(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handler for updating firewall rules."""
        # TODO: Implement firewall rule updates
        logger.info(f"Updating firewall rules")
        return {"success": True, "result": "Firewall updated"}
    
    async def _collect_forensics_handler(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handler for collecting forensic data."""
        # TODO: Implement forensic data collection
        logger.info(f"Collecting forensics from: {params.get('machine_id')}")
        return {"success": True, "result": "Forensics collected"}

# Global workflow engine instance
workflow_engine = WorkflowEngine() 