from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime

@dataclass
class SecurityPosture:
    risk_score: float
    enabled_services: List[str]
    security_controls: Dict[str, bool]
    last_assessment: datetime

@dataclass
class TenantProfile:
    tenant_id: str
    name: str
    security_posture: SecurityPosture
    telemetry_sources: List[str]
    compliance_status: Dict[str, str]

class TenantAnalyzer:
    def __init__(self):
        self._cache: Dict[str, TenantProfile] = {}

    async def analyze_tenant(self, tenant_id: str) -> TenantProfile:
        """
        Analyze tenant security posture and return a comprehensive profile.
        """
        # Check cache first
        if tenant_id in self._cache:
            return self._cache[tenant_id]

        # In a real implementation, this would call various Microsoft Graph APIs
        # and other services to gather information
        security_posture = SecurityPosture(
            risk_score=0.75,  # Example value
            enabled_services=["DefenderForEndpoint", "Sentinel"],
            security_controls={
                "mfa_enabled": True,
                "conditional_access": True,
                "security_defaults": True
            },
            last_assessment=datetime.utcnow()
        )

        profile = TenantProfile(
            tenant_id=tenant_id,
            name=f"Tenant {tenant_id}",
            security_posture=security_posture,
            telemetry_sources=["SecurityEvent", "DeviceEvents", "OfficeActivity"],
            compliance_status={
                "gdpr": "Compliant",
                "hipaa": "In Progress",
                "iso27001": "Compliant"
            }
        )

        # Cache the result
        self._cache[tenant_id] = profile
        return profile

    async def get_security_recommendations(self, tenant_id: str) -> List[Dict[str, Any]]:
        """
        Generate security recommendations based on tenant analysis.
        """
        profile = await self.analyze_tenant(tenant_id)
        
        recommendations = []
        
        # Example recommendations based on security posture
        if not profile.security_posture.security_controls.get("mfa_enabled"):
            recommendations.append({
                "id": "enable_mfa",
                "title": "Enable Multi-Factor Authentication",
                "description": "Enable MFA for all users to enhance security",
                "priority": "High",
                "category": "Identity"
            })

        if "DefenderForEndpoint" not in profile.security_posture.enabled_services:
            recommendations.append({
                "id": "enable_defender",
                "title": "Enable Microsoft Defender for Endpoint",
                "description": "Enable endpoint protection for better security",
                "priority": "High",
                "category": "Endpoint"
            })

        return recommendations 