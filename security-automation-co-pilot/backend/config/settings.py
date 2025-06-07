from pydantic_settings import BaseSettings
from typing import Optional
import os
from functools import lru_cache

class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    Uses pydantic's BaseSettings for automatic validation and type conversion.
    """
    
    # Azure AD Authentication
    azure_tenant_id: str
    azure_client_id: str
    azure_client_secret: str
    
    # Azure Resources
    azure_subscription_id: str
    azure_resource_group: str
    azure_workspace_name: str
    azure_workspace_id: Optional[str] = None
    azure_workspace_key: Optional[str] = None
    
    # Database Configuration
    cosmos_db_endpoint: str
    cosmos_db_key: str
    cosmos_db_database: str = "security-automation"
    cosmos_db_container: str = "incidents"
    
    # Optional: Azure Storage
    azure_storage_connection_string: Optional[str] = None
    azure_storage_container: str = "security-reports"
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_reload: bool = True
    log_level: str = "info"
    
    # Frontend URL (for CORS)
    frontend_url: str = "http://localhost:3000"
    
    # Security Settings
    jwt_secret_key: Optional[str] = None
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Rate Limiting
    rate_limit_per_minute: int = 60
    
    # Feature Flags
    enable_real_time_updates: bool = True
    enable_automated_response: bool = False
    enable_threat_hunting: bool = True
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    Uses lru_cache to ensure settings are only loaded once.
    """
    return Settings()

# Create a settings instance for easy import
settings = get_settings()

# Utility functions for specific configurations
def get_database_url() -> str:
    """Get the Cosmos DB connection URL."""
    return f"{settings.cosmos_db_endpoint}dbs/{settings.cosmos_db_database}"

def get_msal_config() -> dict:
    """Get MSAL configuration for authentication."""
    return {
        "authority": f"https://login.microsoftonline.com/{settings.azure_tenant_id}",
        "client_id": settings.azure_client_id,
        "client_credential": settings.azure_client_secret,
        "scope": ["https://management.azure.com/.default"]
    }

def get_cors_origins() -> list:
    """Get allowed CORS origins."""
    origins = [settings.frontend_url]
    if settings.api_reload:
        # Add common development URLs
        origins.extend([
            "http://localhost:3000",
            "http://localhost:5173",  # Vite default
            "http://127.0.0.1:3000",
            "http://127.0.0.1:5173"
        ])
    return origins

def is_production() -> bool:
    """Check if running in production environment."""
    return os.getenv("ENVIRONMENT", "development").lower() == "production"

def validate_settings():
    """
    Validate that all required settings are properly configured.
    Raises ValueError if any critical settings are missing.
    """
    required_settings = [
        "azure_tenant_id",
        "azure_client_id", 
        "azure_client_secret",
        "azure_subscription_id",
        "azure_resource_group",
        "cosmos_db_endpoint",
        "cosmos_db_key"
    ]
    
    missing = []
    for setting in required_settings:
        if not getattr(settings, setting, None):
            missing.append(setting.upper())
    
    if missing:
        raise ValueError(f"Missing required environment variables: {', '.join(missing)}")
    
    # Generate JWT secret if not provided
    if not settings.jwt_secret_key:
        import secrets
        settings.jwt_secret_key = secrets.token_urlsafe(32)
        print("Warning: JWT_SECRET_KEY not set, using generated key (not suitable for production)") 