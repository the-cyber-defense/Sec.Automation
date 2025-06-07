# Security Automation Co-Pilot

A comprehensive security automation platform that provides intelligent incident response, workflow automation, and security orchestration capabilities.

## Features

### 🔄 Automation Workflows (NEW)
- **Pre-built Security Workflows**: Ready-to-use incident response workflows for common threats
- **Custom Workflow Builder**: Visual workflow designer with drag-and-drop actions
- **Real-time Execution Monitoring**: Live tracking of workflow executions with progress indicators
- **Conditional Logic**: MongoDB-style operators for intelligent workflow execution
- **Multi-channel Notifications**: Email, Teams, SMS, Slack, PagerDuty integration
- **Analytics Dashboard**: Comprehensive metrics and performance insights

### 🚨 Incident Response
- Real-time incident detection and alerting
- Automated response workflows
- Integration with Microsoft Sentinel and Defender
- Forensic data collection and analysis

### 📊 Security Analytics
- Tenant security posture assessment
- Risk scoring and recommendations
- Compliance monitoring and reporting
- Vulnerability management

### 🎓 Security Education
- Interactive training modules
- Phishing simulation campaigns
- Security awareness tracking

## Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **UI Library**: Fluent UI (Microsoft Design System)
- **State Management**: React Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Build Tool**: Vite

### Backend (Python + FastAPI)
- **Framework**: FastAPI with async/await
- **Database**: MongoDB with Motor (async driver)
- **Authentication**: JWT with Azure AD integration
- **API Documentation**: OpenAPI/Swagger
- **Background Tasks**: Celery with Redis
- **Monitoring**: Prometheus metrics

### Automation Engine
- **Workflow Engine**: Custom Python orchestrator
- **Azure Functions**: Serverless response actions
- **Logic Apps**: Microsoft cloud automation
- **Notification Service**: Multi-channel messaging
- **Analytics**: Real-time performance tracking

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- MongoDB 5.0+
- Redis 6.0+
- Azure subscription (for cloud features)

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the API server
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

### Environment Configuration
Create `.env` files in both frontend and backend directories:

**Frontend (.env)**
```
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_AZURE_CLIENT_ID=your_azure_client_id
REACT_APP_AZURE_TENANT_ID=your_azure_tenant_id
```

**Backend (.env)**
```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=security_copilot
REDIS_URL=redis://localhost:6379
AZURE_CLIENT_ID=your_azure_client_id
AZURE_CLIENT_SECRET=your_azure_client_secret
AZURE_TENANT_ID=your_azure_tenant_id
JWT_SECRET_KEY=your_jwt_secret
```

## Workflow Features

### 🎯 Pre-built Workflows
1. **Ransomware Response**
   - Isolate affected machines
   - Notify security team
   - Collect forensic evidence
   - Create incident tickets

2. **Phishing Response**
   - Quarantine malicious emails
   - Block sender domains
   - Reset compromised passwords
   - Update security policies

3. **Brute Force Response**
   - Block attacking IP addresses
   - Disable compromised accounts
   - Enforce MFA requirements
   - Generate security reports

### 🛠️ Custom Workflow Builder
- **Visual Designer**: Drag-and-drop interface for creating workflows
- **Action Library**: 12+ pre-built action types
- **Conditional Logic**: Advanced branching and decision trees
- **Parameter Templates**: Smart defaults for common configurations
- **Validation**: Real-time workflow validation and testing

### 📊 Analytics & Monitoring
- **Execution Metrics**: Success rates, duration, failure analysis
- **Performance Insights**: Bottleneck identification and optimization
- **Real-time Dashboards**: Live execution monitoring
- **Historical Analysis**: Trend analysis and reporting

## API Endpoints

### Workflow Management
```
GET    /api/workflows/                    # List all workflows
POST   /api/workflows/trigger             # Trigger workflow execution
POST   /api/workflows/custom              # Create custom workflow
GET    /api/workflows/executions/active   # Get active executions
GET    /api/workflows/executions/history  # Get execution history
```

### Logic Apps Integration
```
GET    /api/workflows/logic-apps/list     # List Azure Logic Apps
POST   /api/workflows/logic-apps/trigger  # Trigger Logic App
GET    /api/workflows/playbooks/list      # List Sentinel Playbooks
POST   /api/workflows/playbooks/trigger   # Trigger Sentinel Playbook
```

### Notifications
```
POST   /api/workflows/notifications/send      # Send notification
GET    /api/workflows/notifications/templates # Get templates
```

### Analytics
```
GET    /api/workflows/analytics           # Get workflow analytics
GET    /api/workflows/action-types        # Get available action types
```

## Deployment

### Azure Deployment
```bash
# Deploy Azure Functions
cd backend/functions
./deploy-functions.ps1

# Deploy to Azure App Service
az webapp up --name security-copilot-api --resource-group security-rg

# Deploy frontend to Azure Static Web Apps
npm run build
az staticwebapp create --name security-copilot-ui --source ./dist
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Scale services
docker-compose up -d --scale api=3 --scale worker=2
```

## Security Features

### 🔐 Authentication & Authorization
- Azure AD integration
- JWT token-based authentication
- Role-based access control (RBAC)
- API key management

### 🛡️ Security Controls
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- Audit logging

### 🔍 Monitoring & Logging
- Structured logging with correlation IDs
- Performance metrics with Prometheus
- Error tracking and alerting
- Security event monitoring

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript/Python best practices
- Write comprehensive tests
- Update documentation
- Follow security coding standards
- Use conventional commit messages

## Testing

### Frontend Testing
```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### Backend Testing
```bash
# Run unit tests
pytest tests/unit/

# Run integration tests
pytest tests/integration/

# Run with coverage
pytest --cov=app tests/
```

## Documentation

- [API Documentation](http://localhost:8000/docs) - Interactive Swagger UI
- [Architecture Guide](./docs/architecture.md)
- [Deployment Guide](./docs/deployment.md)
- [Security Guide](./docs/security.md)
- [Workflow Development](./docs/workflows.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Security Automation Co-Pilot** - Intelligent Security Orchestration Platform
