# Security Automation Co-Pilot Backend

## Overview

The backend for Security Automation Co-Pilot is built with FastAPI and integrates with Microsoft's security services including:

- Microsoft Sentinel
- Microsoft 365 Defender
- Microsoft Graph API
- Azure Cosmos DB

## Quick Start

### Prerequisites

- Python 3.9 or higher
- Azure subscription with appropriate permissions
- Microsoft 365 E5 or Microsoft Defender licenses
- Azure CLI installed
- PowerShell (for automated setup)

### Automated Setup (Recommended)

1. **Run the Azure setup script:**
   ```powershell
   cd backend/scripts
   ./setup-azure-resources.ps1
   ```
   This script will:
   - Create required Azure resources
   - Set up App Registration
   - Configure Cosmos DB
   - Generate a `.env` file

2. **Configure API permissions:**
   - Go to Azure Portal > App Registrations
   - Find your app and add required permissions
   - Grant admin consent (see `config/azure_setup_guide.md` for details)

3. **Initialize the database:**
   ```bash
   cd backend
   python scripts/init_database.py
   ```

### Manual Setup

1. **Create a virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your Azure credentials
   ```

4. **Set up Azure resources:**
   Follow the guide in `config/azure_setup_guide.md`

5. **Initialize database:**
   ```bash
   python scripts/init_database.py
   ```

## Running the Application

### Development Mode

```bash
# Make sure virtual environment is activated
python -m uvicorn api.main:app --reload
```

The API will be available at: http://localhost:8000

### Production Mode

```bash
gunicorn api.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Deploying Azure Functions

Deploy automated response functions for serverless execution:

```powershell
cd backend/functions
./deploy-functions.ps1 `
  -ResourceGroupName "your-rg" `
  -FunctionAppName "security-functions" `
  -StorageAccountName "securitystorage"
```

This will deploy functions for:
- Machine isolation
- IP blocking
- User account management
- Email quarantine
- Forensic collection

## API Documentation

Once running, access the interactive API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
backend/
├── api/
│   ├── main.py              # FastAPI application entry point
│   └── routers/             # API route handlers
│       ├── incidents.py     # Incident management endpoints
│       ├── compliance.py    # Compliance assessment endpoints
│       ├── vulnerabilities.py # Vulnerability management endpoints
│       ├── education.py     # Security training endpoints
│       └── workflows.py     # Automation workflow endpoints
├── core/
│   ├── database.py          # Cosmos DB integration
│   ├── kql_queries.py       # KQL query templates
│   ├── models/              # Pydantic data models
│   │   ├── incident.py      # Incident models
│   │   ├── compliance.py    # Compliance models
│   │   ├── vulnerability.py # Vulnerability models
│   │   └── education.py     # Education models
│   └── automation/          # Automation components
│       ├── workflow_engine.py # Workflow orchestration engine
│       ├── logic_apps_integration.py # Logic Apps/Playbooks
│       └── notification_service.py # Multi-channel notifications
├── integrations/
│   ├── microsoft_graph.py   # Microsoft Graph API client
│   ├── defender.py          # Microsoft Defender API client
│   └── sentinel.py          # Microsoft Sentinel client
├── functions/               # Azure Functions
│   ├── automated_responses.py # Serverless response functions
│   ├── deploy-functions.ps1 # Deployment script
│   └── host.json           # Function configuration
├── config/
│   ├── settings.py          # Application settings
│   └── azure_setup_guide.md # Azure configuration guide
├── scripts/
│   ├── init_database.py     # Database initialization
│   └── setup-azure-resources.ps1 # Azure resource setup
├── docs/
│   └── automation-workflows.md # Workflow documentation
├── requirements.txt         # Python dependencies
└── env.example             # Environment variables template
```

## Key Features

### 🛡️ Security Operations
- Real-time incident aggregation from Sentinel and Defender
- Automated incident response workflows
- KQL query library for threat hunting
- MITRE ATT&CK framework mapping

### 🤖 Automation Workflows
- Pre-built response workflows (ransomware, phishing, brute force)
- Azure Logic Apps and Sentinel Playbook integration
- Multi-channel notifications (Email, Teams, SMS, Slack)
- Serverless Azure Functions for automated actions
- Conditional execution and retry logic
- Workflow analytics and metrics

### 📊 Compliance Management
- Multi-framework support (NIST, ISO, CIS, SOC 2)
- Automated compliance assessments
- Detailed reporting and gap analysis
- Remediation tracking

### 🔍 Vulnerability Management
- Integration with Defender vulnerability data
- Automated patch management tracking
- Risk-based prioritization
- Machine-level vulnerability views

### 🎓 Security Education
- Training module management
- Progress tracking
- Tabletop exercise coordination
- Phishing simulation support

## Environment Variables

Key environment variables required:

```bash
# Azure AD Authentication
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret

# Database
COSMOS_DB_ENDPOINT=https://your-cosmos.documents.azure.com:443/
COSMOS_DB_KEY=your-cosmos-key

# Feature Flags
ENABLE_REAL_TIME_UPDATES=true
ENABLE_AUTOMATED_RESPONSE=false
ENABLE_THREAT_HUNTING=true
```

See `env.example` for the complete list.

## Testing

### Run unit tests:
```bash
pytest tests/
```

### Run integration tests:
```bash
pytest tests/integration/ --integration
```

### Test API endpoints:
```bash
# Health check
curl http://localhost:8000/api/health

# Get incidents (requires auth)
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/incidents
```

## Security Considerations

1. **Authentication**: All API endpoints require Azure AD authentication
2. **Rate Limiting**: Configurable per-minute limits
3. **Data Encryption**: All data encrypted at rest in Cosmos DB
4. **Audit Logging**: All actions logged for compliance
5. **Input Validation**: Pydantic models ensure data integrity

## Troubleshooting

### Common Issues

1. **Database connection fails**
   - Verify Cosmos DB endpoint and key in `.env`
   - Check firewall rules allow your IP

2. **Authentication errors**
   - Ensure app registration has correct permissions
   - Verify admin consent was granted
   - Check token expiration

3. **API permissions errors**
   - Review required permissions in `azure_setup_guide.md`
   - Ensure service principal has appropriate roles

### Debug Mode

Enable debug logging:
```bash
LOG_LEVEL=debug python -m uvicorn api.main:app --reload
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Add/update tests
4. Update documentation
5. Submit a pull request

## Support

For issues or questions:
1. Check the troubleshooting guide
2. Review Azure setup documentation
3. Open an issue on GitHub

## License

See LICENSE file in the root directory. 