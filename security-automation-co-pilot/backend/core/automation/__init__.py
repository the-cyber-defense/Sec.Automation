"""
Security Automation Co-Pilot automation module.
"""

from .workflow_engine import (
    WorkflowEngine,
    WorkflowStatus,
    ActionType,
    WorkflowAction,
    WorkflowExecution,
    workflow_engine
)

from .logic_apps_integration import (
    LogicAppsIntegration,
    SentinelPlaybooks,
    logic_apps_integration,
    sentinel_playbooks
)

from .notification_service import (
    NotificationService,
    NotificationChannel,
    NotificationPriority,
    NotificationTemplate,
    notification_service
)

__all__ = [
    # Workflow Engine
    'WorkflowEngine',
    'WorkflowStatus',
    'ActionType',
    'WorkflowAction',
    'WorkflowExecution',
    'workflow_engine',
    
    # Logic Apps
    'LogicAppsIntegration',
    'SentinelPlaybooks',
    'logic_apps_integration',
    'sentinel_playbooks',
    
    # Notifications
    'NotificationService',
    'NotificationChannel',
    'NotificationPriority',
    'NotificationTemplate',
    'notification_service'
] 