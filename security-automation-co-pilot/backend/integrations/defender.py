import os
import logging
from typing import List, Dict, Optional, Any
import aiohttp
from datetime import datetime, timedelta
from msal import ConfidentialClientApplication
import json

logger = logging.getLogger(__name__)

class DefenderClient:
    """
    Microsoft Defender API client for security operations.
    Provides access to Defender for Endpoint, Cloud Apps, and Office 365 data.
    """
    
    def __init__(self):
        self.tenant_id = os.getenv("AZURE_TENANT_ID")
        self.client_id = os.getenv("AZURE_CLIENT_ID")
        self.client_secret = os.getenv("AZURE_CLIENT_SECRET")
        
        # Different API endpoints for different Defender services
        self.defender_endpoint_url = "https://api.securitycenter.microsoft.com/api"
        self.defender_cloud_apps_url = "https://graph.microsoft.com/v1.0"
        self.office365_url = "https://api.security.microsoft.com"
        
        # Initialize MSAL app for authentication
        self.msal_app = ConfidentialClientApplication(
            client_id=self.client_id,
            client_credential=self.client_secret,
            authority=f"https://login.microsoftonline.com/{self.tenant_id}"
        )
        
        self._access_tokens = {}
        
    async def _get_access_token(self, scope: str) -> str:
        """Get access token for specific Microsoft Defender API scope."""
        if scope in self._access_tokens:
            return self._access_tokens[scope]
            
        try:
            result = self.msal_app.acquire_token_for_client(scopes=[scope])
            
            if "access_token" in result:
                self._access_tokens[scope] = result["access_token"]
                return result["access_token"]
            else:
                raise Exception(f"Failed to acquire token for {scope}: {result.get('error_description')}")
                
        except Exception as e:
            logger.error(f"Error acquiring access token for {scope}: {str(e)}")
            raise
    
    async def _make_request(self, base_url: str, endpoint: str, scope: str, method: str = "GET", data: Optional[Dict] = None) -> Dict:
        """Make authenticated request to Microsoft Defender APIs."""
        token = await self._get_access_token(scope)
        url = f"{base_url}/{endpoint}"
        
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        
        async with aiohttp.ClientSession() as session:
            try:
                if method.upper() == "GET":
                    async with session.get(url, headers=headers) as response:
                        response.raise_for_status()
                        return await response.json()
                elif method.upper() == "POST":
                    async with session.post(url, headers=headers, json=data) as response:
                        response.raise_for_status()
                        return await response.json()
                elif method.upper() == "PATCH":
                    async with session.patch(url, headers=headers, json=data) as response:
                        response.raise_for_status()
                        return await response.json()
                        
            except aiohttp.ClientResponseError as e:
                logger.error(f"HTTP error {e.status}: {e.message}")
                raise Exception(f"Defender API request failed: {e.status} - {e.message}")
            except Exception as e:
                logger.error(f"Request error: {str(e)}")
                raise
    
    # Defender for Endpoint APIs
    async def get_alerts(self, top: int = 100, severity: Optional[str] = None, status: Optional[str] = None, from_date: Optional[datetime] = None, to_date: Optional[datetime] = None) -> List[Dict]:
        """
        Get alerts from Microsoft Defender for Endpoint.
        
        Args:
            top: Maximum number of alerts to return
            severity: Filter by severity (Informational, Low, Medium, High)
            status: Filter by status (New, InProgress, Resolved)
            from_date: Filter alerts from this date
            to_date: Filter alerts until this date
        """
        endpoint = f"alerts?$top={top}"
        
        filters = []
        if severity:
            filters.append(f"severity eq '{severity}'")
        if status:
            filters.append(f"status eq '{status}'")
        if from_date:
            filters.append(f"alertCreationTime ge {from_date.isoformat()}Z")
        if to_date:
            filters.append(f"alertCreationTime le {to_date.isoformat()}Z")
            
        if filters:
            endpoint += f"&$filter={' and '.join(filters)}"
        
        try:
            response = await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching Defender alerts: {str(e)}")
            raise
    
    async def get_alert(self, alert_id: str) -> Dict:
        """Get a specific alert from Defender for Endpoint."""
        endpoint = f"alerts/{alert_id}"
        
        try:
            return await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default"
            )
        except Exception as e:
            logger.error(f"Error fetching Defender alert {alert_id}: {str(e)}")
            raise
    
    async def update_alert(self, alert_id: str, update_data: Dict) -> Dict:
        """Update an alert in Defender for Endpoint."""
        endpoint = f"alerts/{alert_id}"
        
        try:
            return await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default",
                method="PATCH",
                data=update_data
            )
        except Exception as e:
            logger.error(f"Error updating Defender alert {alert_id}: {str(e)}")
            raise
    
    async def get_machines(self, top: int = 100, filter_query: Optional[str] = None) -> List[Dict]:
        """
        Get machines/devices from Defender for Endpoint.
        
        Args:
            top: Maximum number of machines to return
            filter_query: OData filter query
        """
        endpoint = f"machines?$top={top}"
        if filter_query:
            endpoint += f"&$filter={filter_query}"
        
        try:
            response = await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching Defender machines: {str(e)}")
            raise
    
    async def get_machine_vulnerabilities(self, machine_id: str) -> List[Dict]:
        """Get vulnerabilities for a specific machine."""
        endpoint = f"machines/{machine_id}/vulnerabilities"
        
        try:
            response = await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching vulnerabilities for machine {machine_id}: {str(e)}")
            raise
    
    async def get_vulnerabilities(self, top: int = 100) -> List[Dict]:
        """Get all vulnerabilities from Defender for Endpoint."""
        endpoint = f"vulnerabilities?$top={top}"
        
        try:
            response = await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching vulnerabilities: {str(e)}")
            raise
    
    async def get_recommendations(self, top: int = 100) -> List[Dict]:
        """Get security recommendations from Defender for Endpoint."""
        endpoint = f"recommendations?$top={top}"
        
        try:
            response = await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching recommendations: {str(e)}")
            raise
    
    async def get_secure_score(self) -> Dict:
        """Get organization's secure score from Defender for Endpoint."""
        endpoint = "exposureScore"
        
        try:
            return await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default"
            )
        except Exception as e:
            logger.error(f"Error fetching Defender secure score: {str(e)}")
            raise
    
    async def get_threat_analytics(self) -> List[Dict]:
        """Get threat analytics from Defender for Endpoint."""
        endpoint = "threatAnalytics"
        
        try:
            response = await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching threat analytics: {str(e)}")
            raise
    
    async def run_advanced_query(self, query: str) -> Dict:
        """
        Run advanced hunting query in Defender for Endpoint.
        
        Args:
            query: KQL (Kusto Query Language) query
        """
        endpoint = "advancedqueries/run"
        data = {"Query": query}
        
        try:
            return await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default",
                method="POST",
                data=data
            )
        except Exception as e:
            logger.error(f"Error running advanced query: {str(e)}")
            raise
    
    # Defender for Cloud Apps APIs
    async def get_cloud_app_alerts(self, top: int = 100) -> List[Dict]:
        """Get alerts from Defender for Cloud Apps via Graph API."""
        endpoint = f"security/cloudAppSecurityProfiles?$top={top}"
        
        try:
            response = await self._make_request(
                self.defender_cloud_apps_url,
                endpoint,
                "https://graph.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching Cloud Apps alerts: {str(e)}")
            raise
    
    async def get_cloud_app_activities(self, top: int = 100, filter_query: Optional[str] = None) -> List[Dict]:
        """Get activities from Defender for Cloud Apps."""
        endpoint = f"security/cloudAppEvents?$top={top}"
        if filter_query:
            endpoint += f"&$filter={filter_query}"
        
        try:
            response = await self._make_request(
                self.defender_cloud_apps_url,
                endpoint,
                "https://graph.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching Cloud Apps activities: {str(e)}")
            raise
    
    # Defender for Office 365 APIs
    async def get_office365_threats(self, top: int = 100) -> List[Dict]:
        """Get threat data from Defender for Office 365."""
        endpoint = f"threats?$top={top}"
        
        try:
            response = await self._make_request(
                self.office365_url,
                endpoint,
                "https://api.security.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching Office 365 threats: {str(e)}")
            raise
    
    async def get_email_threats(self, top: int = 100, days: int = 7) -> List[Dict]:
        """Get email threat data from Defender for Office 365."""
        from_date = (datetime.utcnow() - timedelta(days=days)).isoformat()
        endpoint = f"emailThreats?$top={top}&$filter=timestamp ge {from_date}Z"
        
        try:
            response = await self._make_request(
                self.office365_url,
                endpoint,
                "https://api.security.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching email threats: {str(e)}")
            raise
    
    async def get_safe_attachments_reports(self, days: int = 30) -> List[Dict]:
        """Get Safe Attachments reports from Defender for Office 365."""
        from_date = (datetime.utcnow() - timedelta(days=days)).isoformat()
        endpoint = f"reports/safeAttachments?$filter=timestamp ge {from_date}Z"
        
        try:
            response = await self._make_request(
                self.office365_url,
                endpoint,
                "https://api.security.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching Safe Attachments reports: {str(e)}")
            raise
    
    async def get_safe_links_reports(self, days: int = 30) -> List[Dict]:
        """Get Safe Links reports from Defender for Office 365."""
        from_date = (datetime.utcnow() - timedelta(days=days)).isoformat()
        endpoint = f"reports/safeLinks?$filter=timestamp ge {from_date}Z"
        
        try:
            response = await self._make_request(
                self.office365_url,
                endpoint,
                "https://api.security.microsoft.com/.default"
            )
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching Safe Links reports: {str(e)}")
            raise
    
    # Incident Response Actions
    async def isolate_machine(self, machine_id: str, comment: str = "Automated isolation") -> Dict:
        """Isolate a machine in Defender for Endpoint."""
        endpoint = f"machines/{machine_id}/isolate"
        data = {
            "Comment": comment,
            "IsolationType": "Full"
        }
        
        try:
            return await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default",
                method="POST",
                data=data
            )
        except Exception as e:
            logger.error(f"Error isolating machine {machine_id}: {str(e)}")
            raise
    
    async def unisolate_machine(self, machine_id: str, comment: str = "Automated unisolation") -> Dict:
        """Unisolate a machine in Defender for Endpoint."""
        endpoint = f"machines/{machine_id}/unisolate"
        data = {"Comment": comment}
        
        try:
            return await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default",
                method="POST",
                data=data
            )
        except Exception as e:
            logger.error(f"Error unisolating machine {machine_id}: {str(e)}")
            raise
    
    async def run_antivirus_scan(self, machine_id: str, scan_type: str = "Quick") -> Dict:
        """Run antivirus scan on a machine."""
        endpoint = f"machines/{machine_id}/runAntiVirusScan"
        data = {
            "Comment": "Automated scan",
            "ScanType": scan_type  # Quick, Full
        }
        
        try:
            return await self._make_request(
                self.defender_endpoint_url,
                endpoint,
                "https://api.securitycenter.microsoft.com/.default",
                method="POST",
                data=data
            )
        except Exception as e:
            logger.error(f"Error running antivirus scan on machine {machine_id}: {str(e)}")
            raise 