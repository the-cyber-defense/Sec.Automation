from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2AuthorizationCodeBearer
from contextlib import asynccontextmanager
from typing import Optional
import logging
from dotenv import load_dotenv
import msal

# Import our configuration and database
from ..config.settings import settings, get_cors_origins, validate_settings
from ..core.database import db_manager

from ..core.tenant_analyzer import TenantAnalyzer
from ..core.incident_response import IncidentResponseService
from ..core.compliance_assessment import ComplianceAssessmentService
from ..core.security_optimization import SecurityOptimizationService
from ..core.endpoint_hardening import EndpointHardeningService
from ..core.security_awareness import SecurityAwarenessService
from ..integrations.microsoft_graph import MicrosoftGraphClient
from ..integrations.sentinel import SentinelClient

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level.upper()),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manage application lifecycle - startup and shutdown events.
    """
    # Startup
    logger.info("Starting Security Automation Co-Pilot API...")
    
    try:
        # Validate settings
        validate_settings()
        logger.info("Settings validated successfully")
        
        # Initialize database
        db_manager.initialize()
        logger.info("Database initialized successfully")
        
    except Exception as e:
        logger.error(f"Startup failed: {str(e)}")
        raise
    
    yield
    
    # Shutdown
    logger.info("Shutting down Security Automation Co-Pilot API...")
    db_manager.close()

app = FastAPI(
    title="Security Automation Co-Pilot",
    description="Enterprise Security Automation Platform for Microsoft Sentinel and Microsoft 365 Defender",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Microsoft Authentication Configuration
if settings.azure_tenant_id and settings.azure_client_id and settings.azure_client_secret:
    AUTHORITY = f"https://login.microsoftonline.com/{settings.azure_tenant_id}"
    SCOPE = ["https://management.azure.com/.default"]
    
    msal_app = msal.ConfidentialClientApplication(
        client_id=settings.azure_client_id,
        client_credential=settings.azure_client_secret,
        authority=AUTHORITY
    )
    
    oauth2_scheme = OAuth2AuthorizationCodeBearer(
        authorizationUrl=f"{AUTHORITY}/oauth2/v2.0/authorize",
        tokenUrl=f"{AUTHORITY}/oauth2/v2.0/token"
    )
else:
    logger.warning("Azure AD authentication not configured - running without authentication")
    oauth2_scheme = None

async def get_current_token(token: str = Depends(oauth2_scheme) if oauth2_scheme else None) -> Optional[str]:
    return token

# Initialize clients
graph_client = MicrosoftGraphClient()
sentinel_client = SentinelClient()

# Initialize services
tenant_analyzer = TenantAnalyzer(graph_client)
incident_service = IncidentResponseService(graph_client, sentinel_client)
compliance_service = ComplianceAssessmentService(graph_client)
security_optimization = SecurityOptimizationService(graph_client, sentinel_client)
endpoint_hardening = EndpointHardeningService(graph_client, graph_client)  # Using graph_client as intune_client for now
security_awareness = SecurityAwarenessService(graph_client)

@app.get("/")
async def root():
    return {
        "message": "Security Automation Co-Pilot API",
        "version": "1.0.0",
        "environment": settings.environment if hasattr(settings, 'environment') else "development",
        "features": {
            "real_time_updates": settings.enable_real_time_updates,
            "automated_response": settings.enable_automated_response,
            "threat_hunting": settings.enable_threat_hunting
        }
    }

@app.get("/api/health")
async def health_check():
    """
    Health check endpoint - verifies all services are operational.
    """
    health_status = {
        "status": "healthy",
        "services": {
            "api": "operational",
            "database": "unknown",
            "authentication": "unknown"
        }
    }
    
    # Check database
    try:
        if db_manager.client:
            # Try a simple operation
            db_manager.database.read()
            health_status["services"]["database"] = "operational"
    except Exception as e:
        health_status["services"]["database"] = f"error: {str(e)}"
        health_status["status"] = "degraded"
    
    # Check authentication
    if msal_app:
        try:
            # Try to acquire token
            result = msal_app.acquire_token_for_client(scopes=SCOPE)
            if "access_token" in result:
                health_status["services"]["authentication"] = "operational"
            else:
                health_status["services"]["authentication"] = "error: failed to acquire token"
                health_status["status"] = "degraded"
        except Exception as e:
            health_status["services"]["authentication"] = f"error: {str(e)}"
            health_status["status"] = "degraded"
    else:
        health_status["services"]["authentication"] = "not configured"
    
    return health_status

@app.get("/api/config")
async def get_configuration(token: str = Depends(get_current_token)):
    """
    Get public configuration (non-sensitive).
    Requires authentication.
    """
    if not token and oauth2_scheme:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    return {
        "environment": settings.environment if hasattr(settings, 'environment') else "development",
        "features": {
            "real_time_updates": settings.enable_real_time_updates,
            "automated_response": settings.enable_automated_response,
            "threat_hunting": settings.enable_threat_hunting
        },
        "api_version": "1.0.0",
        "database_type": "Azure Cosmos DB",
        "authentication_type": "Azure AD / OAuth2"
    }

# Include routers for different features
from .routers import incidents, compliance, vulnerabilities, education, workflows

app.include_router(incidents.router, prefix="/api/incidents", tags=["Incidents"])
app.include_router(compliance.router, prefix="/api/compliance", tags=["Compliance"])
app.include_router(vulnerabilities.router, prefix="/api/vulnerabilities", tags=["Vulnerabilities"])
app.include_router(education.router, prefix="/api/education", tags=["Education"])
app.include_router(workflows.router, tags=["Workflows"])

# Tenant Analysis Endpoints
@app.get("/api/tenant/{tenant_id}/analysis")
async def get_tenant_analysis(tenant_id: str):
    try:
        analysis = await tenant_analyzer.analyze_tenant(tenant_id)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Incident Response Endpoints
@app.get("/api/incidents")
async def get_incidents():
    try:
        incidents = await incident_service.get_incidents()
        return incidents
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/incidents")
async def create_incident(incident_data: Dict[str, Any]):
    try:
        incident = await incident_service.create_incident(incident_data)
        return incident
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/incidents/{incident_id}/status")
async def update_incident_status(incident_id: str, status: str):
    try:
        incident = await incident_service.update_incident_status(incident_id, status)
        return incident
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Compliance Assessment Endpoints
@app.get("/api/compliance/assessments")
async def get_assessments():
    try:
        assessments = await compliance_service.get_assessments()
        return assessments
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/compliance/assessments")
async def create_assessment(assessment_data: Dict[str, Any]):
    try:
        assessment = await compliance_service.create_assessment(assessment_data)
        return assessment
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/compliance/dashboard")
async def get_compliance_dashboard():
    try:
        dashboard_data = await compliance_service.get_compliance_dashboard_data()
        return dashboard_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Security Optimization Endpoints
@app.get("/api/security/tools")
async def get_security_tools():
    try:
        tools = await security_optimization.get_optimization_dashboard_data()
        return tools
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/security/tools/{tool_id}/optimize")
async def optimize_security_tool(tool_id: str):
    try:
        recommendations = await security_optimization.generate_recommendations()
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint Hardening Endpoints
@app.get("/api/endpoints")
async def get_endpoints():
    try:
        endpoints = await endpoint_hardening.get_endpoint_dashboard_data()
        return endpoints
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/endpoints/{endpoint_id}/assess")
async def assess_endpoint(endpoint_id: str):
    try:
        assessment = await endpoint_hardening.assess_endpoint(endpoint_id)
        return assessment
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/endpoints/{endpoint_id}/recommendations")
async def get_endpoint_recommendations(endpoint_id: str):
    try:
        recommendations = await endpoint_hardening.generate_hardening_recommendations(endpoint_id)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Security Awareness Endpoints
@app.get("/api/training/modules")
async def get_training_modules():
    try:
        modules = list(security_awareness._modules.values())
        return modules
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/training/modules")
async def create_training_module(module_data: Dict[str, Any]):
    try:
        module = await security_awareness.create_training_module(**module_data)
        return module
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/training/assign")
async def assign_training(assignment_data: Dict[str, Any]):
    try:
        training = await security_awareness.assign_training(
            assignment_data["user_id"],
            assignment_data["module_id"]
        )
        return training
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/training/progress")
async def update_training_progress(progress_data: Dict[str, Any]):
    try:
        training = await security_awareness.update_training_progress(
            progress_data["user_id"],
            progress_data["module_id"],
            progress_data["progress_percentage"],
            progress_data.get("quiz_score")
        )
        return training
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/training/dashboard")
async def get_training_dashboard():
    try:
        dashboard_data = await security_awareness.get_training_dashboard_data()
        return dashboard_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/training/users/{user_id}/status")
async def get_user_training_status(user_id: str):
    try:
        status = await security_awareness.get_user_training_status(user_id)
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Error handlers
@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    return HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=str(exc)
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {str(exc)}")
    return HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="An internal error occurred"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "api.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.api_reload,
        log_level=settings.log_level
    ) 