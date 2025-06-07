# Deploy Azure Functions for Security Automation Co-Pilot
# This script deploys the automated response functions to Azure

param(
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName,
    
    [Parameter(Mandatory=$true)]
    [string]$FunctionAppName,
    
    [Parameter(Mandatory=$true)]
    [string]$StorageAccountName,
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "eastus",
    
    [Parameter(Mandatory=$false)]
    [string]$Runtime = "python",
    
    [Parameter(Mandatory=$false)]
    [string]$RuntimeVersion = "3.11"
)

Write-Host "Deploying Security Automation Functions..." -ForegroundColor Green

# Check if logged in to Azure
$context = Get-AzContext
if (-not $context) {
    Write-Host "Please login to Azure..." -ForegroundColor Yellow
    Connect-AzAccount
}

# Create Resource Group if it doesn't exist
$rg = Get-AzResourceGroup -Name $ResourceGroupName -ErrorAction SilentlyContinue
if (-not $rg) {
    Write-Host "Creating Resource Group: $ResourceGroupName" -ForegroundColor Yellow
    New-AzResourceGroup -Name $ResourceGroupName -Location $Location
}

# Create Storage Account if it doesn't exist
$storage = Get-AzStorageAccount -ResourceGroupName $ResourceGroupName -Name $StorageAccountName -ErrorAction SilentlyContinue
if (-not $storage) {
    Write-Host "Creating Storage Account: $StorageAccountName" -ForegroundColor Yellow
    New-AzStorageAccount -ResourceGroupName $ResourceGroupName `
        -Name $StorageAccountName `
        -Location $Location `
        -SkuName Standard_LRS `
        -Kind StorageV2
}

# Create Application Insights
$appInsightsName = "$FunctionAppName-insights"
$appInsights = Get-AzApplicationInsights -ResourceGroupName $ResourceGroupName -Name $appInsightsName -ErrorAction SilentlyContinue
if (-not $appInsights) {
    Write-Host "Creating Application Insights: $appInsightsName" -ForegroundColor Yellow
    New-AzApplicationInsights -ResourceGroupName $ResourceGroupName `
        -Name $appInsightsName `
        -Location $Location `
        -Kind web
}

# Create Function App Service Plan
$planName = "$FunctionAppName-plan"
$plan = Get-AzFunctionAppPlan -ResourceGroupName $ResourceGroupName -Name $planName -ErrorAction SilentlyContinue
if (-not $plan) {
    Write-Host "Creating Function App Service Plan: $planName" -ForegroundColor Yellow
    New-AzFunctionAppPlan -ResourceGroupName $ResourceGroupName `
        -Name $planName `
        -Location $Location `
        -Sku Y1 `
        -WorkerType Linux
}

# Create Function App
$functionApp = Get-AzFunctionApp -ResourceGroupName $ResourceGroupName -Name $FunctionAppName -ErrorAction SilentlyContinue
if (-not $functionApp) {
    Write-Host "Creating Function App: $FunctionAppName" -ForegroundColor Yellow
    New-AzFunctionApp -ResourceGroupName $ResourceGroupName `
        -Name $FunctionAppName `
        -StorageAccountName $StorageAccountName `
        -PlanName $planName `
        -Runtime $Runtime `
        -RuntimeVersion $RuntimeVersion `
        -OSType Linux `
        -Location $Location
}

# Configure Function App Settings
Write-Host "Configuring Function App Settings..." -ForegroundColor Yellow

$appSettings = @{
    "FUNCTIONS_WORKER_RUNTIME" = "python"
    "AzureWebJobsStorage" = (Get-AzStorageAccount -ResourceGroupName $ResourceGroupName -Name $StorageAccountName).Context.ConnectionString
    "APPINSIGHTS_INSTRUMENTATIONKEY" = (Get-AzApplicationInsights -ResourceGroupName $ResourceGroupName -Name $appInsightsName).InstrumentationKey
    "AZURE_SUBSCRIPTION_ID" = (Get-AzContext).Subscription.Id
    "AZURE_RESOURCE_GROUP" = $ResourceGroupName
    "AZURE_TENANT_ID" = (Get-AzContext).Tenant.Id
    "ENABLE_ORYX_BUILD" = "true"
    "SCM_DO_BUILD_DURING_DEPLOYMENT" = "true"
}

# Add environment-specific settings
$envSettings = @{
    "GRAPH_CLIENT_ID" = Read-Host "Enter Graph API Client ID"
    "GRAPH_CLIENT_SECRET" = Read-Host "Enter Graph API Client Secret" -AsSecureString
}

# Convert SecureString to plain text (for app settings)
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($envSettings.GRAPH_CLIENT_SECRET)
$PlainTextSecret = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
$appSettings["GRAPH_CLIENT_SECRET"] = $PlainTextSecret

# Merge settings
foreach ($key in $envSettings.Keys) {
    if ($key -ne "GRAPH_CLIENT_SECRET") {
        $appSettings[$key] = $envSettings[$key]
    }
}

# Update Function App settings
Update-AzFunctionAppSetting -ResourceGroupName $ResourceGroupName `
    -Name $FunctionAppName `
    -AppSetting $appSettings

# Enable Managed Identity
Write-Host "Enabling Managed Identity..." -ForegroundColor Yellow
Update-AzFunctionApp -ResourceGroupName $ResourceGroupName `
    -Name $FunctionAppName `
    -IdentityType SystemAssigned

# Get the principal ID
$functionApp = Get-AzFunctionApp -ResourceGroupName $ResourceGroupName -Name $FunctionAppName
$principalId = $functionApp.IdentityPrincipalId

# Assign necessary roles
Write-Host "Assigning Azure roles to Managed Identity..." -ForegroundColor Yellow

# Virtual Machine Contributor (for isolation)
New-AzRoleAssignment -ObjectId $principalId `
    -RoleDefinitionName "Virtual Machine Contributor" `
    -Scope "/subscriptions/$((Get-AzContext).Subscription.Id)" `
    -ErrorAction SilentlyContinue

# Network Contributor (for NSG management)
New-AzRoleAssignment -ObjectId $principalId `
    -RoleDefinitionName "Network Contributor" `
    -Scope "/subscriptions/$((Get-AzContext).Subscription.Id)" `
    -ErrorAction SilentlyContinue

# Reader role on Resource Group
New-AzRoleAssignment -ObjectId $principalId `
    -RoleDefinitionName "Reader" `
    -ResourceGroupName $ResourceGroupName `
    -ErrorAction SilentlyContinue

Write-Host "Function App created successfully!" -ForegroundColor Green
Write-Host "Principal ID: $principalId" -ForegroundColor Cyan

# Create deployment package
Write-Host "Creating deployment package..." -ForegroundColor Yellow

# Create requirements.txt for functions
$functionsRequirements = @"
azure-functions==1.18.0
azure-identity==1.15.0
azure-mgmt-network==25.1.0
azure-mgmt-compute==30.4.0
azure-mgmt-resource==23.0.1
msgraph-sdk==1.0.0
aiohttp==3.9.3
"@

$functionsRequirements | Out-File -FilePath ".\requirements.txt" -Encoding UTF8

# Copy function files
$deploymentPath = ".\deployment"
New-Item -ItemType Directory -Path $deploymentPath -Force | Out-Null

Copy-Item ".\automated_responses.py" -Destination $deploymentPath
Copy-Item ".\function.json" -Destination $deploymentPath
Copy-Item ".\host.json" -Destination $deploymentPath
Copy-Item ".\requirements.txt" -Destination $deploymentPath

# Create individual function folders
$functions = @(
    "IsolateMachine",
    "BlockIPAddress", 
    "DisableUserAccount",
    "QuarantineEmail",
    "CollectForensics"
)

foreach ($func in $functions) {
    $funcPath = Join-Path $deploymentPath $func
    New-Item -ItemType Directory -Path $funcPath -Force | Out-Null
    
    # Create function.json for each function
    $functionJson = @{
        scriptFile = "../automated_responses.py"
        entryPoint = "$($func.ToLower())_function"
        bindings = @(
            @{
                authLevel = "function"
                type = "httpTrigger"
                direction = "in"
                name = "req"
                methods = @("post")
            },
            @{
                type = "http"
                direction = "out"
                name = "`$return"
            }
        )
    } | ConvertTo-Json -Depth 10
    
    $functionJson | Out-File -FilePath "$funcPath\function.json" -Encoding UTF8
}

# Create ZIP package
Write-Host "Creating ZIP deployment package..." -ForegroundColor Yellow
Compress-Archive -Path "$deploymentPath\*" -DestinationPath ".\functions.zip" -Force

# Deploy to Function App
Write-Host "Deploying to Azure Function App..." -ForegroundColor Yellow
Publish-AzFunctionApp -ResourceGroupName $ResourceGroupName `
    -Name $FunctionAppName `
    -ArchivePath ".\functions.zip" `
    -Force

# Clean up
Remove-Item -Path $deploymentPath -Recurse -Force
Remove-Item -Path ".\functions.zip" -Force
Remove-Item -Path ".\requirements.txt" -Force

Write-Host "Deployment completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Function App URL: https://$FunctionAppName.azurewebsites.net" -ForegroundColor Cyan
Write-Host ""
Write-Host "Available Functions:" -ForegroundColor Yellow
foreach ($func in $functions) {
    Write-Host "  - POST https://$FunctionAppName.azurewebsites.net/api/automation/$func" -ForegroundColor White
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Configure authentication for the functions"
Write-Host "2. Add the function URLs to your workflow engine configuration"
Write-Host "3. Test the functions with sample payloads"
Write-Host "4. Monitor function execution in Application Insights" 