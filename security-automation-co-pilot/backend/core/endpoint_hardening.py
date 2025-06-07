from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime
from enum import Enum

class EndpointType(Enum):
    WINDOWS = "windows"
    MACOS = "macos"
    LINUX = "linux"
    MOBILE = "mobile"

class HardeningStatus(Enum):
    SECURE = "secure"
    PARTIALLY_SECURE = "partially_secure"
    VULNERABLE = "vulnerable"

@dataclass
class EndpointConfiguration:
    endpoint_id: str
    endpoint_type: EndpointType
    os_version: str
    security_settings: Dict[str, Any]
    compliance_status: Dict[str, bool]
    last_assessment: datetime
    hardening_history: List[Dict[str, Any]]

@dataclass
class HardeningRecommendation:
    id: str
    endpoint_id: str
    title: str
    description: str
    category: str
    current_value: Any
    recommended_value: Any
    priority: str
    implementation_steps: List[str]
    status: str
    created_at: datetime

class EndpointHardeningService:
    def __init__(self, graph_client, intune_client):
        self.graph_client = graph_client
        self.intune_client = intune_client
        self._endpoints: Dict[str, EndpointConfiguration] = {}
        self._recommendations: List[HardeningRecommendation] = []

    async def assess_endpoint(self, endpoint_id: str) -> EndpointConfiguration:
        """Assess endpoint security configuration"""
        endpoint_data = await self._get_endpoint_data(endpoint_id)
        security_settings = await self._get_security_settings(endpoint_id)
        compliance_status = await self._check_compliance(endpoint_id)
        
        config = EndpointConfiguration(
            endpoint_id=endpoint_id,
            endpoint_type=self._determine_endpoint_type(endpoint_data),
            os_version=endpoint_data.get("os_version", ""),
            security_settings=security_settings,
            compliance_status=compliance_status,
            last_assessment=datetime.utcnow(),
            hardening_history=[]
        )
        
        self._endpoints[endpoint_id] = config
        return config

    async def _get_endpoint_data(self, endpoint_id: str) -> Dict[str, Any]:
        """Get endpoint device data"""
        # Implementation would fetch device data from Intune/Graph API
        return {}

    async def _get_security_settings(self, endpoint_id: str) -> Dict[str, Any]:
        """Get current security settings for endpoint"""
        # Implementation would fetch security settings from various sources
        return {}

    async def _check_compliance(self, endpoint_id: str) -> Dict[str, bool]:
        """Check endpoint compliance with security policies"""
        # Implementation would check against security baselines
        return {}

    def _determine_endpoint_type(self, endpoint_data: Dict[str, Any]) -> EndpointType:
        """Determine endpoint type from device data"""
        os_type = endpoint_data.get("os_type", "").lower()
        if "windows" in os_type:
            return EndpointType.WINDOWS
        elif "mac" in os_type:
            return EndpointType.MACOS
        elif "linux" in os_type:
            return EndpointType.LINUX
        return EndpointType.MOBILE

    async def generate_hardening_recommendations(self, endpoint_id: str) -> List[HardeningRecommendation]:
        """Generate hardening recommendations for endpoint"""
        config = await self.assess_endpoint(endpoint_id)
        recommendations = []
        
        # Check various security aspects
        recommendations.extend(await self._check_antivirus_config(config))
        recommendations.extend(await self._check_firewall_config(config))
        recommendations.extend(await self._check_encryption_config(config))
        recommendations.extend(await self._check_update_config(config))
        
        self._recommendations.extend(recommendations)
        return recommendations

    async def _check_antivirus_config(self, config: EndpointConfiguration) -> List[HardeningRecommendation]:
        """Check antivirus configuration"""
        recommendations = []
        av_settings = config.security_settings.get("antivirus", {})
        
        if not av_settings.get("enabled", False):
            recommendations.append(HardeningRecommendation(
                id=f"av-{datetime.utcnow().timestamp()}",
                endpoint_id=config.endpoint_id,
                title="Enable Antivirus Protection",
                description="Antivirus protection is not enabled on this endpoint",
                category="antivirus",
                current_value=False,
                recommended_value=True,
                priority="High",
                implementation_steps=["Enable Windows Defender Antivirus"],
                status="pending",
                created_at=datetime.utcnow()
            ))
        
        return recommendations

    async def _check_firewall_config(self, config: EndpointConfiguration) -> List[HardeningRecommendation]:
        """Check firewall configuration"""
        recommendations = []
        firewall_settings = config.security_settings.get("firewall", {})
        
        if not firewall_settings.get("enabled", False):
            recommendations.append(HardeningRecommendation(
                id=f"fw-{datetime.utcnow().timestamp()}",
                endpoint_id=config.endpoint_id,
                title="Enable Windows Firewall",
                description="Windows Firewall is not enabled on this endpoint",
                category="firewall",
                current_value=False,
                recommended_value=True,
                priority="High",
                implementation_steps=["Enable Windows Firewall"],
                status="pending",
                created_at=datetime.utcnow()
            ))
        
        return recommendations

    async def _check_encryption_config(self, config: EndpointConfiguration) -> List[HardeningRecommendation]:
        """Check encryption configuration"""
        recommendations = []
        encryption_settings = config.security_settings.get("encryption", {})
        
        if not encryption_settings.get("bitlocker_enabled", False):
            recommendations.append(HardeningRecommendation(
                id=f"enc-{datetime.utcnow().timestamp()}",
                endpoint_id=config.endpoint_id,
                title="Enable BitLocker Encryption",
                description="BitLocker encryption is not enabled on this endpoint",
                category="encryption",
                current_value=False,
                recommended_value=True,
                priority="High",
                implementation_steps=["Enable BitLocker encryption"],
                status="pending",
                created_at=datetime.utcnow()
            ))
        
        return recommendations

    async def _check_update_config(self, config: EndpointConfiguration) -> List[HardeningRecommendation]:
        """Check update configuration"""
        recommendations = []
        update_settings = config.security_settings.get("updates", {})
        
        if not update_settings.get("automatic_updates_enabled", False):
            recommendations.append(HardeningRecommendation(
                id=f"upd-{datetime.utcnow().timestamp()}",
                endpoint_id=config.endpoint_id,
                title="Enable Automatic Updates",
                description="Automatic updates are not enabled on this endpoint",
                category="updates",
                current_value=False,
                recommended_value=True,
                priority="Medium",
                implementation_steps=["Enable automatic Windows updates"],
                status="pending",
                created_at=datetime.utcnow()
            ))
        
        return recommendations

    async def get_endpoint_dashboard_data(self) -> Dict[str, Any]:
        """Get data for endpoint security dashboard"""
        endpoint_status = {}
        for endpoint_id, config in self._endpoints.items():
            endpoint_status[endpoint_id] = {
                "type": config.endpoint_type.value,
                "os_version": config.os_version,
                "last_assessment": config.last_assessment.isoformat(),
                "compliance_score": self._calculate_compliance_score(config),
                "pending_recommendations": len([r for r in self._recommendations 
                                             if r.endpoint_id == endpoint_id 
                                             and r.status == "pending"])
            }

        return {
            "endpoint_status": endpoint_status,
            "total_endpoints": len(self._endpoints),
            "compliance_summary": self._get_compliance_summary(),
            "hardening_trend": self._calculate_hardening_trend()
        }

    def _calculate_compliance_score(self, config: EndpointConfiguration) -> float:
        """Calculate compliance score for endpoint"""
        if not config.compliance_status:
            return 0.0
        
        compliant_items = sum(1 for status in config.compliance_status.values() if status)
        return (compliant_items / len(config.compliance_status)) * 100

    def _get_compliance_summary(self) -> Dict[str, int]:
        """Get summary of compliance status across all endpoints"""
        summary = {
            "secure": 0,
            "partially_secure": 0,
            "vulnerable": 0
        }
        
        for config in self._endpoints.values():
            score = self._calculate_compliance_score(config)
            if score >= 90:
                summary["secure"] += 1
            elif score >= 60:
                summary["partially_secure"] += 1
            else:
                summary["vulnerable"] += 1
        
        return summary

    def _calculate_hardening_trend(self) -> Dict[str, List[float]]:
        """Calculate hardening trend over time"""
        # Implementation would analyze historical hardening data
        return {
            "dates": [],
            "compliance_scores": []
        } 