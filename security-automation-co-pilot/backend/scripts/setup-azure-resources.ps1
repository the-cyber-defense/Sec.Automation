# Security Automation Co-Pilot - Azure Resource Setup Script
# This script helps set up the required Azure resources

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroupName = "SecurityAutomationRG",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "eastus",
    
    [Parameter(Mandatory=$false)]
    [string]$AppName = "SecurityAutomationCoPilot",
    
    [Parameter(Mandatory=$false)]
    [string]$CosmosAccountName = "securityautomationdb",
    
    [Parameter(Mandatory=$false)]
    [string]$WorkspaceName = "SecurityAutomationWS"
)

# Colors for output
$ErrorActionPreference = "Stop"

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-Host @"
╔═══════════════════════════════════════════════════════════╗
║        Security Automation Co-Pilot                       ║
║        Azure Resource Setup Script                        ║
╚═══════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

# Check if user is logged in
Write-Host "`nChecking Azure login status..." -ForegroundColor Yellow
$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
    Write-Host "Not logged in to Azure. Please login..." -ForegroundColor Red
    az login
    $account = az account show | ConvertFrom-Json
}

Write-Host "Logged in as: $($account.user.name)" -ForegroundColor Green
Write-Host "Subscription: $($account.name) ($($account.id))" -ForegroundColor Green

# Create Resource Group
Write-Host "`nCreating Resource Group..." -ForegroundColor Yellow
$rg = az group create --name $ResourceGroupName --location $Location | ConvertFrom-Json
Write-Host "✓ Resource Group created: $($rg.name)" -ForegroundColor Green

# Create App Registration
Write-Host "`nCreating App Registration..." -ForegroundColor Yellow
$app = az ad app create --display-name $AppName --sign-in-audience AzureADMyOrg | ConvertFrom-Json
$appId = $app.appId
Write-Host "✓ App Registration created: $appId" -ForegroundColor Green

# Create Service Principal
Write-Host "Creating Service Principal..." -ForegroundColor Yellow
$sp = az ad sp create --id $appId | ConvertFrom-Json
Write-Host "✓ Service Principal created" -ForegroundColor Green

# Create Client Secret
Write-Host "Creating Client Secret..." -ForegroundColor Yellow
$secret = az ad app credential reset --id $appId --years 2 | ConvertFrom-Json
$clientSecret = $secret.password
Write-Host "✓ Client Secret created" -ForegroundColor Green

# Create Log Analytics Workspace
Write-Host "`nCreating Log Analytics Workspace..." -ForegroundColor Yellow
$workspace = az monitor log-analytics workspace create `
    --resource-group $ResourceGroupName `
    --workspace-name $WorkspaceName `
    --location $Location | ConvertFrom-Json
    
$workspaceId = $workspace.customerId
$workspaceKey = az monitor log-analytics workspace get-shared-keys `
    --resource-group $ResourceGroupName `
    --workspace-name $WorkspaceName | ConvertFrom-Json

Write-Host "✓ Log Analytics Workspace created" -ForegroundColor Green

# Enable Microsoft Sentinel
Write-Host "Enabling Microsoft Sentinel..." -ForegroundColor Yellow
# Note: This requires the Azure Sentinel PowerShell module or REST API
# For now, we'll provide instructions
Write-Host "⚠ Please enable Microsoft Sentinel manually on the workspace: $WorkspaceName" -ForegroundColor Yellow

# Create Cosmos DB Account
Write-Host "`nCreating Cosmos DB Account (this may take several minutes)..." -ForegroundColor Yellow
$cosmosDb = az cosmosdb create `
    --name $CosmosAccountName `
    --resource-group $ResourceGroupName `
    --locations regionName=$Location failoverPriority=0 isZoneRedundant=False `
    --default-consistency-level "Session" | ConvertFrom-Json

$cosmosEndpoint = $cosmosDb.documentEndpoint
$cosmosKey = az cosmosdb keys list `
    --name $CosmosAccountName `
    --resource-group $ResourceGroupName | ConvertFrom-Json

Write-Host "✓ Cosmos DB Account created" -ForegroundColor Green

# Grant API Permissions
Write-Host "`nConfiguring API Permissions..." -ForegroundColor Yellow

$graphPermissions = @(
    "SecurityEvents.Read.All",
    "SecurityEvents.ReadWrite.All",
    "SecurityActions.Read.All",
    "ThreatAssessment.Read.All",
    "IdentityRiskEvent.Read.All",
    "Directory.Read.All",
    "User.Read.All",
    "AuditLog.Read.All"
)

# Get Microsoft Graph API ID
$graphApi = az ad sp list --query "[?appDisplayName=='Microsoft Graph'].appId" -o tsv
if (-not $graphApi) {
    $graphApi = "00000003-0000-0000-c000-000000000000"  # Microsoft Graph API ID
}

foreach ($permission in $graphPermissions) {
    Write-Host "  Adding permission: $permission" -ForegroundColor Gray
    # Note: This requires manual admin consent in the portal
}

Write-Host "⚠ Please grant admin consent for the permissions in Azure Portal" -ForegroundColor Yellow

# Generate .env file
Write-Host "`nGenerating .env file..." -ForegroundColor Yellow

$envContent = @"
# Generated by setup-azure-resources.ps1 on $(Get-Date)

# Azure AD Authentication
AZURE_TENANT_ID=$($account.tenantId)
AZURE_CLIENT_ID=$appId
AZURE_CLIENT_SECRET=$clientSecret

# Azure Resources
AZURE_SUBSCRIPTION_ID=$($account.id)
AZURE_RESOURCE_GROUP=$ResourceGroupName
AZURE_WORKSPACE_NAME=$WorkspaceName
AZURE_WORKSPACE_ID=$workspaceId
AZURE_WORKSPACE_KEY=$($workspaceKey.primarySharedKey)

# Database Configuration
COSMOS_DB_ENDPOINT=$cosmosEndpoint
COSMOS_DB_KEY=$($cosmosKey.primaryMasterKey)
COSMOS_DB_DATABASE=security-automation
COSMOS_DB_CONTAINER=incidents

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true
LOG_LEVEL=info

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Security Settings
JWT_SECRET_KEY=$(New-Guid).ToString()
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Feature Flags
ENABLE_REAL_TIME_UPDATES=true
ENABLE_AUTOMATED_RESPONSE=false
ENABLE_THREAT_HUNTING=true

# Environment
ENVIRONMENT=development
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8
Write-Host "✓ .env file created" -ForegroundColor Green

# Summary
Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    Setup Complete!                        ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host "`nResources Created:" -ForegroundColor Green
Write-Host "  - Resource Group: $ResourceGroupName"
Write-Host "  - App Registration: $AppName ($appId)"
Write-Host "  - Log Analytics Workspace: $WorkspaceName"
Write-Host "  - Cosmos DB Account: $CosmosAccountName"

Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "  1. Go to Azure Portal > App Registrations > $AppName"
Write-Host "  2. Add the required API permissions (see azure_setup_guide.md)"
Write-Host "  3. Grant admin consent for the permissions"
Write-Host "  4. Enable Microsoft Sentinel on the Log Analytics workspace"
Write-Host "  5. Run 'python backend/scripts/init_database.py' to initialize the database"

Write-Host "`nIMPORTANT: Save the .env file securely!" -ForegroundColor Red
Write-Host "The client secret will not be shown again." -ForegroundColor Red 