"""
Workflow and Automation API endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from typing import List, Dict, Any, Optional
from datetime import datetime
from ...core.auth import get_current_user
from ...core.models import User
from ...core.automation.workflow_engine import (
    workflow_engine, WorkflowStatus, ActionType, WorkflowAction
)
from ...core.automation.logic_apps_integration import (
    logic_apps_integration, sentinel_playbooks
)
from ...core.automation.notification_service import (
    notification_service, NotificationChannel, NotificationPriority
)
from ...core.database import db_manager
from pydantic import BaseModel, Field
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/workflows", tags=["workflows"])

# Pydantic models for API
class WorkflowTriggerRequest(BaseModel):
    workflow_id: str
    incident_id: str
    context: Dict[str, Any] = Field(default_factory=dict)

class LogicAppTriggerRequest(BaseModel):
    workflow_name: str
    trigger_name: str = "manual"
    inputs: Optional[Dict[str, Any]] = None

class PlaybookTriggerRequest(BaseModel):
    incident_id: str
    playbook_name: str
    incident_data: Dict[str, Any]

class NotificationRequest(BaseModel):
    recipients: List[str]
    template_name: str
    data: Dict[str, Any]
    channels: List[NotificationChannel]
    priority: NotificationPriority = NotificationPriority.MEDIUM

class CustomWorkflowRequest(BaseModel):
    name: str
    description: str
    severity_threshold: str
    actions: List[Dict[str, Any]]
    tags: Dict[str, str] = Field(default_factory=dict)

class WorkflowExecutionResponse(BaseModel):
    id: str
    workflow_id: str
    incident_id: str
    status: WorkflowStatus
    started_at: datetime
    completed_at: Optional[datetime]
    executed_actions: List[str]
    error_message: Optional[str]

# Workflow endpoints
@router.get("/")
async def list_workflows(current_user: User = Depends(get_current_user)):
    """List all available workflows."""
    workflows = []
    for workflow_id, workflow_def in workflow_engine.workflows.items():
        workflows.append({
            "id": workflow_id,
            "name": workflow_def.get("name"),
            "description": workflow_def.get("description"),
            "severity_threshold": workflow_def.get("severity_threshold"),
            "actions_count": len(workflow_def.get("actions", []))
        })
    return workflows

@router.get("/{workflow_id}")
async def get_workflow(workflow_id: str, current_user: User = Depends(get_current_user)):
    """Get detailed information about a specific workflow."""
    if workflow_id not in workflow_engine.workflows:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    workflow = workflow_engine.workflows[workflow_id]
    return {
        "id": workflow_id,
        "name": workflow.get("name"),
        "description": workflow.get("description"),
        "severity_threshold": workflow.get("severity_threshold"),
        "actions": [
            {
                "id": action.id if hasattr(action, 'id') else action.get("id"),
                "type": action.type.value if hasattr(action, 'type') else action.get("type"),
                "name": action.name if hasattr(action, 'name') else action.get("name"),
                "description": action.description if hasattr(action, 'description') else action.get("description")
            }
            for action in workflow.get("actions", [])
        ]
    }

@router.post("/trigger")
async def trigger_workflow(
    request: WorkflowTriggerRequest,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user)
):
    """Trigger a workflow execution."""
    try:
        # Execute workflow in background
        background_tasks.add_task(
            workflow_engine.execute_workflow,
            request.workflow_id,
            request.incident_id,
            request.context,
            current_user.username
        )
        
        return {
            "success": True,
            "message": f"Workflow {request.workflow_id} triggered for incident {request.incident_id}",
            "workflow_id": request.workflow_id,
            "incident_id": request.incident_id
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/executions/active")
async def get_active_executions(current_user: User = Depends(get_current_user)):
    """Get currently running workflow executions."""
    active_executions = []
    for execution_id, execution in workflow_engine.running_executions.items():
        active_executions.append({
            "id": execution.id,
            "workflow_id": execution.workflow_id,
            "incident_id": execution.incident_id,
            "status": execution.status.value,
            "current_action": execution.current_action,
            "started_at": execution.started_at.isoformat(),
            "duration_seconds": (datetime.utcnow() - execution.started_at).total_seconds()
        })
    return active_executions

@router.get("/executions/history")
async def get_execution_history(
    limit: int = 50,
    workflow_id: Optional[str] = None,
    current_user: User = Depends(get_current_user)
):
    """Get workflow execution history."""
    db = await db_manager.get_db()
    
    query = "SELECT * FROM c WHERE c.type = 'workflow_execution'"
    if workflow_id:
        query += f" AND c.workflowId = '{workflow_id}'"
    query += " ORDER BY c.startedAt DESC"
    
    executions = await db.query_items("workflow_executions", query, max_items=limit)
    
    return [
        {
            "id": exec["id"],
            "workflow_id": exec["workflowId"],
            "incident_id": exec["incidentId"],
            "status": exec["status"],
            "started_at": exec["startedAt"],
            "completed_at": exec.get("completedAt"),
            "duration_seconds": (
                (datetime.fromisoformat(exec["completedAt"]) - 
                 datetime.fromisoformat(exec["startedAt"])).total_seconds()
                if exec.get("completedAt") else None
            ),
            "executed_actions": exec.get("executedActions", []),
            "error_message": exec.get("errorMessage")
        }
        for exec in executions
    ]

@router.post("/custom")
async def create_custom_workflow(
    request: CustomWorkflowRequest,
    current_user: User = Depends(get_current_user)
):
    """Create a custom workflow."""
    workflow_id = f"custom_{request.name.lower().replace(' ', '_')}"
    
    # Validate actions
    actions = []
    for action_def in request.actions:
        try:
            action = WorkflowAction(**action_def)
            actions.append(action)
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid action definition: {str(e)}"
            )
    
    # Add workflow to engine
    workflow_engine.workflows[workflow_id] = {
        "id": workflow_id,
        "name": request.name,
        "description": request.description,
        "severity_threshold": request.severity_threshold,
        "actions": actions,
        "tags": request.tags,
        "created_by": current_user.username,
        "created_at": datetime.utcnow().isoformat()
    }
    
    # Save to database
    db = await db_manager.get_db()
    await db.create_item("workflows", workflow_engine.workflows[workflow_id])
    
    return {"success": True, "workflow_id": workflow_id}

# Logic Apps endpoints
@router.get("/logic-apps/list")
async def list_logic_apps(current_user: User = Depends(get_current_user)):
    """List all Logic Apps in the resource group."""
    try:
        logic_apps = await logic_apps_integration.list_logic_apps()
        return logic_apps
    except Exception as e:
        logger.error(f"Failed to list Logic Apps: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/logic-apps/trigger")
async def trigger_logic_app(
    request: LogicAppTriggerRequest,
    current_user: User = Depends(get_current_user)
):
    """Trigger a Logic App workflow."""
    try:
        result = await logic_apps_integration.trigger_logic_app(
            workflow_name=request.workflow_name,
            trigger_name=request.trigger_name,
            inputs=request.inputs
        )
        return result
    except Exception as e:
        logger.error(f"Failed to trigger Logic App: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/logic-apps/{workflow_name}/runs")
async def get_logic_app_runs(
    workflow_name: str,
    top: int = 50,
    current_user: User = Depends(get_current_user)
):
    """Get recent runs of a Logic App."""
    try:
        runs = await logic_apps_integration.list_workflow_runs(workflow_name, top)
        return runs
    except Exception as e:
        logger.error(f"Failed to get Logic App runs: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Sentinel Playbooks endpoints
@router.get("/playbooks/list")
async def list_sentinel_playbooks(current_user: User = Depends(get_current_user)):
    """List all Sentinel playbooks."""
    try:
        playbooks = await sentinel_playbooks.list_sentinel_playbooks()
        return playbooks
    except Exception as e:
        logger.error(f"Failed to list Sentinel playbooks: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/playbooks/trigger")
async def trigger_sentinel_playbook(
    request: PlaybookTriggerRequest,
    current_user: User = Depends(get_current_user)
):
    """Trigger a Sentinel playbook for an incident."""
    try:
        result = await sentinel_playbooks.trigger_incident_playbook(
            incident_id=request.incident_id,
            playbook_name=request.playbook_name,
            incident_data=request.incident_data
        )
        return result
    except Exception as e:
        logger.error(f"Failed to trigger Sentinel playbook: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/playbooks/{playbook_name}/metrics")
async def get_playbook_metrics(
    playbook_name: str,
    days: int = 7,
    current_user: User = Depends(get_current_user)
):
    """Get execution metrics for a Sentinel playbook."""
    try:
        metrics = await sentinel_playbooks.get_playbook_metrics(playbook_name, days)
        return metrics
    except Exception as e:
        logger.error(f"Failed to get playbook metrics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Notification endpoints
@router.post("/notifications/send")
async def send_notification(
    request: NotificationRequest,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user)
):
    """Send notification through specified channels."""
    try:
        # Send notifications in background
        background_tasks.add_task(
            notification_service.send_notification,
            request.recipients,
            request.template_name,
            request.data,
            request.channels,
            request.priority
        )
        
        return {
            "success": True,
            "message": "Notifications queued for sending",
            "channels": [channel.value for channel in request.channels],
            "recipients_count": len(request.recipients)
        }
    except Exception as e:
        logger.error(f"Failed to queue notifications: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/notifications/templates")
async def list_notification_templates(current_user: User = Depends(get_current_user)):
    """List available notification templates."""
    from ...core.automation.notification_service import NotificationTemplate
    
    return {
        "email": list(NotificationTemplate.EMAIL_TEMPLATES.keys()),
        "teams": list(NotificationTemplate.TEAMS_TEMPLATES.keys())
    }

# Action types endpoint
@router.get("/action-types")
async def get_action_types(current_user: User = Depends(get_current_user)):
    """Get available workflow action types."""
    return [
        {
            "type": action_type.value,
            "name": action_type.name.replace("_", " ").title(),
            "description": {
                ActionType.ISOLATE_MACHINE: "Isolate a compromised machine from the network",
                ActionType.BLOCK_IP: "Block malicious IP addresses",
                ActionType.DISABLE_USER: "Disable compromised user accounts",
                ActionType.RESET_PASSWORD: "Force password reset for users",
                ActionType.SEND_NOTIFICATION: "Send notifications to security team",
                ActionType.CREATE_TICKET: "Create incident tickets in ticketing system",
                ActionType.RUN_SCRIPT: "Execute remediation scripts",
                ActionType.INVOKE_LOGIC_APP: "Trigger Azure Logic Apps",
                ActionType.QUARANTINE_EMAIL: "Quarantine malicious emails",
                ActionType.UPDATE_FIREWALL: "Update firewall rules",
                ActionType.COLLECT_FORENSICS: "Collect forensic data from endpoints",
                ActionType.CUSTOM: "Custom action handler"
            }.get(action_type, "")
        }
        for action_type in ActionType
    ]

# Workflow analytics endpoint
@router.get("/analytics")
async def get_workflow_analytics(
    days: int = 30,
    current_user: User = Depends(get_current_user)
):
    """Get workflow execution analytics."""
    db = await db_manager.get_db()
    
    # Query execution data
    query = """
    SELECT 
        c.workflowId,
        c.status,
        COUNT(1) as count,
        AVG(
            CASE 
                WHEN c.completedAt != null 
                THEN DateTimeDiff('second', c.startedAt, c.completedAt)
                ELSE 0
            END
        ) as avg_duration
    FROM c 
    WHERE c.type = 'workflow_execution'
    GROUP BY c.workflowId, c.status
    """
    
    results = await db.query_items("workflow_executions", query)
    
    # Process analytics
    analytics = {}
    for result in results:
        workflow_id = result["workflowId"]
        if workflow_id not in analytics:
            analytics[workflow_id] = {
                "workflow_id": workflow_id,
                "total_executions": 0,
                "successful": 0,
                "failed": 0,
                "average_duration": 0
            }
        
        analytics[workflow_id]["total_executions"] += result["count"]
        if result["status"] == "completed":
            analytics[workflow_id]["successful"] += result["count"]
            analytics[workflow_id]["average_duration"] = result["avg_duration"]
        elif result["status"] == "failed":
            analytics[workflow_id]["failed"] += result["count"]
    
    # Calculate success rates
    for workflow_data in analytics.values():
        if workflow_data["total_executions"] > 0:
            workflow_data["success_rate"] = (
                workflow_data["successful"] / workflow_data["total_executions"] * 100
            )
        else:
            workflow_data["success_rate"] = 0
    
    return list(analytics.values()) 