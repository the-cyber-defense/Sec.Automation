# Security Automation Workflows Documentation

## Overview

The Security Automation Co-Pilot includes a powerful workflow automation engine that enables automated incident response, integration with Azure Logic Apps and Microsoft Sentinel Playbooks, and multi-channel notifications.

## Architecture

### Components

1. **Workflow Engine** (`workflow_engine.py`)
   - Core orchestration engine
   - Action handlers for various security responses
   - Workflow execution tracking
   - Conditional logic and retry mechanisms

2. **Logic Apps Integration** (`logic_apps_integration.py`)
   - Azure Logic Apps management
   - Sentinel Playbook integration
   - Workflow metrics and monitoring

3. **Notification Service** (`notification_service.py`)
   - Multi-channel notification delivery
   - Template-based messaging
   - Priority-based routing

4. **Azure Functions** (`automated_responses.py`)
   - Serverless execution of security actions
   - Scalable and isolated response handlers

## Workflow Engine

### Pre-built Workflows

#### 1. Ransomware Response
```python
workflow_id: "ransomware_response"
severity_threshold: "High"
actions:
  - Isolate affected machine
  - Send urgent notification to security team
  - Collect forensic data
  - Create P1 incident ticket
```

#### 2. Phishing Response
```python
workflow_id: "phishing_response"
severity_threshold: "Medium"
actions:
  - Quarantine phishing email
  - Block sender IP/domain
  - Reset passwords for affected users (conditional)
```

#### 3. Brute Force Response
```python
workflow_id: "brute_force_response"
severity_threshold: "High"
actions:
  - Block attacking IPs
  - Disable targeted account (conditional)
  - Enforce MFA
```

### Action Types

| Action Type | Description | Parameters |
|------------|-------------|------------|
| `ISOLATE_MACHINE` | Isolate compromised endpoint | `machine_id`, `isolation_type` |
| `BLOCK_IP` | Block malicious IP addresses | `ip_address`, `block_duration` |
| `DISABLE_USER` | Disable user account | `user_id`, `duration` |
| `RESET_PASSWORD` | Force password reset | `user_id`, `require_mfa` |
| `SEND_NOTIFICATION` | Send alert notifications | `recipients`, `template`, `priority` |
| `CREATE_TICKET` | Create incident ticket | `priority`, `assignment_group` |
| `RUN_SCRIPT` | Execute remediation script | `script`, `parameters` |
| `INVOKE_LOGIC_APP` | Trigger Azure Logic App | `logic_app_id`, `inputs` |
| `QUARANTINE_EMAIL` | Quarantine malicious email | `message_id`, `scope` |
| `UPDATE_FIREWALL` | Update firewall rules | `rules`, `action` |
| `COLLECT_FORENSICS` | Gather forensic data | `machine_id`, `collection_type` |

### Creating Custom Workflows

```python
POST /api/workflows/custom
{
  "name": "Custom Security Response",
  "description": "Automated response for custom threat",
  "severity_threshold": "High",
  "actions": [
    {
      "id": "action1",
      "type": "ISOLATE_MACHINE",
      "name": "Isolate Compromised Machine",
      "description": "Immediately isolate affected system",
      "parameters": {
        "isolation_type": "full"
      },
      "timeout_seconds": 120,
      "retry_count": 3
    },
    {
      "id": "action2",
      "type": "SEND_NOTIFICATION",
      "name": "Alert Security Team",
      "description": "Send high-priority alert",
      "parameters": {
        "recipients": ["security@company.com"],
        "template": "incident_alert",
        "priority": "urgent"
      },
      "conditions": {
        "severity": {"$in": ["High", "Critical"]}
      }
    }
  ]
}
```

### Workflow Conditions

Workflows support conditional execution using MongoDB-style operators:

- `$gt`: Greater than
- `$lt`: Less than
- `$eq`: Equal to
- `$in`: In array
- `$exists`: Field exists

Example:
```json
"conditions": {
  "failed_attempts": {"$gt": 50},
  "user_risk_level": {"$in": ["High", "Critical"]},
  "is_privileged_account": true
}
```

## Logic Apps Integration

### Connecting to Azure Logic Apps

1. **List Available Logic Apps**
   ```
   GET /api/workflows/logic-apps/list
   ```

2. **Trigger Logic App**
   ```
   POST /api/workflows/logic-apps/trigger
   {
     "workflow_name": "SecurityResponse-LogicApp",
     "trigger_name": "manual",
     "inputs": {
       "incident_id": "INC-001",
       "severity": "High"
     }
   }
   ```

### Sentinel Playbooks

Sentinel playbooks are specialized Logic Apps for security automation:

1. **List Sentinel Playbooks**
   ```
   GET /api/workflows/playbooks/list
   ```

2. **Trigger Playbook for Incident**
   ```
   POST /api/workflows/playbooks/trigger
   {
     "incident_id": "SENT-INC-001",
     "playbook_name": "Isolate-VM-Playbook",
     "incident_data": {
       "title": "Ransomware Detection",
       "severity": "Critical",
       "entities": [...]
     }
   }
   ```

### Creating Playbooks from Templates

```python
POST /api/workflows/playbooks/create
{
  "playbook_name": "AutoBlock-Phishing",
  "template_name": "block_ip",
  "parameters": {
    "DefenderEndpoint": "https://api.securitycenter.microsoft.com",
    "AccessToken": "@{parameters('token')}"
  }
}
```

Available templates:
- `isolate_machine`: Isolate compromised endpoints
- `block_ip`: Block malicious IP addresses
- `send_teams_notification`: Send Teams alerts

## Notification Service

### Supported Channels

1. **Email** (via Microsoft Graph)
2. **Microsoft Teams** (via webhooks)
3. **SMS** (via Azure Communication Services)
4. **Webhooks** (generic HTTP endpoints)
5. **PagerDuty** (for critical alerts)
6. **Slack** (via incoming webhooks)

### Notification Templates

#### Email Templates
- `incident_alert`: Security incident notifications
- `workflow_completed`: Workflow execution summary
- `compliance_report`: Compliance assessment results

#### Teams Templates
- `incident_alert`: Adaptive card for incidents

### Sending Notifications

```python
POST /api/workflows/notifications/send
{
  "recipients": ["security-team@company.com", "https://teams.webhook.url"],
  "template_name": "incident_alert",
  "data": {
    "incident": {
      "id": "INC-001",
      "title": "Ransomware Detection",
      "severity": "Critical",
      "description": "Ransomware activity detected on WORKSTATION-01"
    }
  },
  "channels": ["email", "teams"],
  "priority": "urgent"
}
```

### Priority Levels

- `LOW`: Informational alerts
- `MEDIUM`: Standard security events
- `HIGH`: Important security incidents
- `URGENT`: Critical incidents requiring immediate attention
- `CRITICAL`: Major security breaches

## Azure Functions Deployment

### Prerequisites

1. Azure subscription
2. Azure CLI or PowerShell
3. Python 3.11 runtime

### Deployment Steps

1. **Run Deployment Script**
   ```powershell
   .\deploy-functions.ps1 `
     -ResourceGroupName "security-automation-rg" `
     -FunctionAppName "sec-auto-functions" `
     -StorageAccountName "secautostorage"
   ```

2. **Configure Authentication**
   - The script enables Managed Identity
   - Assigns necessary RBAC roles
   - Configure Graph API credentials

3. **Available Functions**
   - `/api/automation/IsolateMachine`
   - `/api/automation/BlockIPAddress`
   - `/api/automation/DisableUserAccount`
   - `/api/automation/QuarantineEmail`
   - `/api/automation/CollectForensics`

### Function Payloads

#### Isolate Machine
```json
{
  "machine_id": "vm-web-01",
  "incident_id": "INC-001",
  "isolation_type": "full",
  "comment": "Automated isolation for ransomware incident"
}
```

#### Block IP Address
```json
{
  "ip_addresses": ["192.168.1.100", "10.0.0.50"],
  "block_duration": "24h",
  "reason": "Brute force attack source",
  "target": "nsg"
}
```

## Workflow Analytics

### Execution Metrics

```
GET /api/workflows/analytics?days=30
```

Returns:
- Total executions per workflow
- Success/failure rates
- Average execution time
- Most frequently triggered workflows

### Individual Workflow Metrics

```
GET /api/workflows/playbooks/{playbook_name}/metrics?days=7
```

## Best Practices

### 1. Workflow Design
- Keep workflows focused on specific threat types
- Use conditions to prevent unnecessary actions
- Set appropriate timeouts for each action
- Include notification steps for visibility

### 2. Testing
- Test workflows in a non-production environment
- Use dry-run mode when available
- Validate all conditions and parameters
- Monitor execution logs

### 3. Security
- Use least-privilege principles for automation accounts
- Audit all automated actions
- Implement approval workflows for critical actions
- Regular review of workflow configurations

### 4. Performance
- Use async execution for long-running actions
- Implement proper retry logic
- Monitor resource consumption
- Scale Azure Functions as needed

## Troubleshooting

### Common Issues

1. **Workflow Fails to Execute**
   - Check workflow conditions
   - Verify required permissions
   - Review action parameters

2. **Logic App Not Triggering**
   - Verify Logic App is enabled
   - Check trigger configuration
   - Review authentication

3. **Notifications Not Received**
   - Verify recipient addresses
   - Check channel configuration
   - Review notification service logs

### Monitoring

1. **Application Insights**
   - Function execution traces
   - Performance metrics
   - Error tracking

2. **Audit Logs**
   - All workflow executions logged
   - Action results tracked
   - User activities recorded

## API Reference

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/workflows/` | List all workflows |
| GET | `/api/workflows/{id}` | Get workflow details |
| POST | `/api/workflows/trigger` | Trigger workflow |
| POST | `/api/workflows/custom` | Create custom workflow |
| GET | `/api/workflows/executions/active` | Get active executions |
| GET | `/api/workflows/executions/history` | Get execution history |
| GET | `/api/workflows/logic-apps/list` | List Logic Apps |
| POST | `/api/workflows/logic-apps/trigger` | Trigger Logic App |
| GET | `/api/workflows/playbooks/list` | List Sentinel Playbooks |
| POST | `/api/workflows/playbooks/trigger` | Trigger Playbook |
| POST | `/api/workflows/notifications/send` | Send notifications |
| GET | `/api/workflows/analytics` | Get workflow analytics |

## Integration Examples

### Integrating with Existing SIEM

```python
# Webhook receiver for SIEM alerts
@app.post("/api/webhooks/siem")
async def receive_siem_alert(alert: Dict[str, Any]):
    # Map SIEM alert to workflow
    if alert["type"] == "ransomware":
        await workflow_engine.execute_workflow(
            "ransomware_response",
            alert["id"],
            {"siem_data": alert}
        )
```

### Custom Action Handler

```python
# Register custom action handler
@workflow_engine.register_action(ActionType.CUSTOM)
async def custom_security_action(params: Dict[str, Any]):
    # Implement custom logic
    result = await perform_custom_action(params)
    return {"success": True, "result": result}
```

## Next Steps

1. Review pre-built workflows and customize for your environment
2. Deploy Azure Functions for automated responses
3. Configure notification channels
4. Create custom workflows for specific threats
5. Integrate with existing security tools
6. Set up monitoring and alerting
7. Train security team on workflow management 