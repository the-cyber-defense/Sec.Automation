# Azure Setup Guide for Security Automation Co-Pilot

## Prerequisites
- Azure subscription with appropriate permissions
- Azure Active Directory Global Administrator or Application Administrator role
- Microsoft 365 E5 or Microsoft Defender for Endpoint P2 license
- Microsoft Sentinel workspace

## Step 1: Create Azure AD App Registration

1. Navigate to Azure Portal (https://portal.azure.com)
2. Go to Azure Active Directory → App registrations → New registration
3. Configure the application:
   - Name: `Security-Automation-Co-Pilot`
   - Supported account types: `Accounts in this organizational directory only`
   - Redirect URI: `http://localhost:3000/auth/callback` (for development)

4. After creation, note down:
   - Application (client) ID
   - Directory (tenant) ID

5. Create a client secret:
   - Go to Certificates & secrets → New client secret
   - Description: `Security-Automation-Secret`
   - Expires: Choose appropriate expiration
   - Copy the secret value immediately (it won't be shown again)

## Step 2: Configure API Permissions

Add the following permissions to your app registration:

### Microsoft Graph API Permissions
```
Application Permissions (App-only):
- SecurityEvents.Read.All
- SecurityEvents.ReadWrite.All
- SecurityActions.Read.All
- SecurityActions.ReadWrite.All
- ThreatAssessment.Read.All
- ThreatIndicators.Read.All
- IdentityRiskEvent.Read.All
- IdentityRiskyUser.Read.All
- Directory.Read.All
- User.Read.All
- AuditLog.Read.All
- Reports.Read.All
- Policy.Read.All
- Policy.ReadWrite.ConditionalAccess
- Device.Read.All
- Mail.Read
- Mail.Send (for notifications)
```

### Microsoft Threat Protection API
```
Application Permissions:
- AdvancedQuery.Read.All
- Incident.Read.All
- Incident.ReadWrite.All
```

### WindowsDefenderATP (Microsoft Defender for Endpoint)
```
Application Permissions:
- Machine.Read.All
- Machine.ReadWrite.All
- Vulnerability.Read.All
- SecurityRecommendation.Read.All
- Alert.Read.All
- Alert.ReadWrite.All
- AdvancedQuery.Read.All
- Score.Read.All
- RemediationTask.Read.All
```

### Office 365 Security & Compliance API
```
Application Permissions:
- ThreatIntelligence.Read.All
- ThreatHunting.Read.All
```

### Grant Admin Consent
After adding all permissions, click "Grant admin consent for [Your Organization]"

## Step 3: Configure Microsoft Sentinel

1. Create or identify your Log Analytics workspace
2. Enable Microsoft Sentinel on the workspace
3. Note down:
   - Workspace ID
   - Primary Key (Settings → Agents management)
   - Resource Group name
   - Subscription ID

## Step 4: Environment Variables

Create a `.env` file in the backend directory with the following:

```bash
# Azure AD Authentication
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret

# Azure Resources
AZURE_SUBSCRIPTION_ID=your-subscription-id
AZURE_RESOURCE_GROUP=your-resource-group
AZURE_WORKSPACE_NAME=your-log-analytics-workspace-name
AZURE_WORKSPACE_ID=your-workspace-id
AZURE_WORKSPACE_KEY=your-workspace-primary-key

# Database Configuration
COSMOS_DB_ENDPOINT=https://your-cosmos-account.documents.azure.com:443/
COSMOS_DB_KEY=your-cosmos-db-key
COSMOS_DB_DATABASE=security-automation
COSMOS_DB_CONTAINER=incidents

# Optional: Azure Storage for reports
AZURE_STORAGE_CONNECTION_STRING=your-storage-connection-string
AZURE_STORAGE_CONTAINER=security-reports

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true
LOG_LEVEL=info

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## Step 5: PowerShell Setup Script

Run this PowerShell script to verify permissions:

```powershell
# Install required modules
Install-Module -Name Az -AllowClobber -Scope CurrentUser
Install-Module -Name Microsoft.Graph -AllowClobber -Scope CurrentUser

# Connect to Azure
Connect-AzAccount

# Variables
$appId = "your-client-id"
$tenantId = "your-tenant-id"

# Get the service principal
$sp = Get-AzADServicePrincipal -ApplicationId $appId

# Check assigned permissions
$graphApp = Get-AzADServicePrincipal -DisplayName "Microsoft Graph"
$assignedPermissions = Get-AzADAppPermission -ObjectId $sp.Id

Write-Host "Assigned Permissions:"
$assignedPermissions | Format-Table
```

## Step 6: Test API Access

Use this Python script to test your configuration:

```python
import asyncio
from backend.integrations.microsoft_graph import MicrosoftGraphClient

async def test_connection():
    client = MicrosoftGraphClient()
    try:
        # Test getting security alerts
        alerts = await client.get_security_alerts(top=5)
        print(f"Successfully retrieved {len(alerts)} security alerts")
        
        # Test getting secure score
        score = await client.get_secure_score()
        print(f"Secure Score: {score.get('currentScore', 'N/A')}")
        
    except Exception as e:
        print(f"Error: {str(e)}")

asyncio.run(test_connection())
```

## Troubleshooting

### Common Issues:
1. **Insufficient privileges**: Ensure the app has been granted admin consent
2. **Invalid client credentials**: Double-check client ID and secret
3. **API not enabled**: Some APIs require specific licenses or subscriptions
4. **Rate limiting**: Implement exponential backoff for API calls

### Useful Azure CLI Commands:
```bash
# List app registrations
az ad app list --display-name "Security-Automation-Co-Pilot"

# Show specific app details
az ad app show --id $appId

# List API permissions
az ad app permission list --id $appId
```

## Security Best Practices

1. **Rotate secrets regularly**: Set up reminders to rotate client secrets
2. **Use Key Vault**: Store secrets in Azure Key Vault for production
3. **Implement least privilege**: Only request permissions you actually need
4. **Monitor access**: Set up audit logs for API access
5. **Use Managed Identity**: When running in Azure, use Managed Identity instead of secrets 