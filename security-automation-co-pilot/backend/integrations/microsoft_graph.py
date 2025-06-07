import os
import logging
from typing import List, Dict, Optional, Any
import aiohttp
from azure.identity import DefaultAzureCredential
from msal import ConfidentialClientApplication
import json

logger = logging.getLogger(__name__)

class MicrosoftGraphClient:
    """
    Microsoft Graph API client for security-related operations.
    Provides access to Microsoft 365 security alerts, users, devices, and more.
    """
    
    def __init__(self):
        self.tenant_id = os.getenv("AZURE_TENANT_ID")
        self.client_id = os.getenv("AZURE_CLIENT_ID")
        self.client_secret = os.getenv("AZURE_CLIENT_SECRET")
        self.base_url = "https://graph.microsoft.com/v1.0"
        self.beta_url = "https://graph.microsoft.com/beta"
        
        # Initialize MSAL app for authentication
        self.msal_app = ConfidentialClientApplication(
            client_id=self.client_id,
            client_credential=self.client_secret,
            authority=f"https://login.microsoftonline.com/{self.tenant_id}"
        )
        
        self._access_token = None
        
    async def _get_access_token(self) -> str:
        """Get access token for Microsoft Graph API."""
        if self._access_token:
            return self._access_token
            
        try:
            result = self.msal_app.acquire_token_for_client(
                scopes=["https://graph.microsoft.com/.default"]
            )
            
            if "access_token" in result:
                self._access_token = result["access_token"]
                return self._access_token
            else:
                raise Exception(f"Failed to acquire token: {result.get('error_description')}")
                
        except Exception as e:
            logger.error(f"Error acquiring access token: {str(e)}")
            raise
    
    async def _make_request(self, method: str, endpoint: str, data: Optional[Dict] = None, use_beta: bool = False) -> Dict:
        """Make authenticated request to Microsoft Graph API."""
        token = await self._get_access_token()
        base_url = self.beta_url if use_beta else self.base_url
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
                raise Exception(f"Graph API request failed: {e.status} - {e.message}")
            except Exception as e:
                logger.error(f"Request error: {str(e)}")
                raise
    
    async def get_security_alerts(self, top: int = 100, filter_query: Optional[str] = None) -> List[Dict]:
        """
        Get security alerts from Microsoft Graph Security API.
        
        Args:
            top: Maximum number of alerts to return
            filter_query: OData filter query for filtering alerts
            
        Returns:
            List of security alert objects
        """
        endpoint = f"security/alerts_v2?$top={top}"
        if filter_query:
            endpoint += f"&$filter={filter_query}"
            
        try:
            response = await self._make_request("GET", endpoint)
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching security alerts: {str(e)}")
            raise
    
    async def get_security_incidents(self, top: int = 100) -> List[Dict]:
        """Get security incidents from Microsoft Graph Security API."""
        endpoint = f"security/incidents?$top={top}"
        
        try:
            response = await self._make_request("GET", endpoint)
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching security incidents: {str(e)}")
            raise
    
    async def get_secure_score(self) -> Dict:
        """Get organization's secure score."""
        endpoint = "security/secureScores?$top=1"
        
        try:
            response = await self._make_request("GET", endpoint)
            scores = response.get("value", [])
            return scores[0] if scores else {}
        except Exception as e:
            logger.error(f"Error fetching secure score: {str(e)}")
            raise
    
    async def get_secure_score_control_profiles(self) -> List[Dict]:
        """Get secure score control profiles."""
        endpoint = "security/secureScoreControlProfiles"
        
        try:
            response = await self._make_request("GET", endpoint)
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching secure score control profiles: {str(e)}")
            raise
    
    async def get_users(self, top: int = 100, select: Optional[str] = None) -> List[Dict]:
        """
        Get users from Azure AD.
        
        Args:
            top: Maximum number of users to return
            select: Select specific properties
        """
        endpoint = f"users?$top={top}"
        if select:
            endpoint += f"&$select={select}"
            
        try:
            response = await self._make_request("GET", endpoint)
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching users: {str(e)}")
            raise
    
    async def get_risky_users(self, top: int = 50) -> List[Dict]:
        """Get risky users from Azure AD Identity Protection."""
        endpoint = f"identityProtection/riskyUsers?$top={top}"
        
        try:
            response = await self._make_request("GET", endpoint)
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching risky users: {str(e)}")
            raise
    
    async def get_devices(self, top: int = 100, select: Optional[str] = None) -> List[Dict]:
        """
        Get devices from Azure AD.
        
        Args:
            top: Maximum number of devices to return
            select: Select specific properties
        """
        endpoint = f"devices?$top={top}"
        if select:
            endpoint += f"&$select={select}"
            
        try:
            response = await self._make_request("GET", endpoint)
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching devices: {str(e)}")
            raise
    
    async def get_conditional_access_policies(self) -> List[Dict]:
        """Get conditional access policies."""
        endpoint = "identity/conditionalAccess/policies"
        
        try:
            response = await self._make_request("GET", endpoint)
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching conditional access policies: {str(e)}")
            raise
    
    async def get_sign_in_logs(self, top: int = 100, filter_query: Optional[str] = None) -> List[Dict]:
        """
        Get sign-in logs from Azure AD.
        
        Args:
            top: Maximum number of logs to return
            filter_query: OData filter query for filtering logs
        """
        endpoint = f"auditLogs/signIns?$top={top}"
        if filter_query:
            endpoint += f"&$filter={filter_query}"
            
        try:
            response = await self._make_request("GET", endpoint)
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching sign-in logs: {str(e)}")
            raise
    
    async def get_audit_logs(self, top: int = 100, filter_query: Optional[str] = None) -> List[Dict]:
        """
        Get audit logs from Azure AD.
        
        Args:
            top: Maximum number of logs to return
            filter_query: OData filter query for filtering logs
        """
        endpoint = f"auditLogs/directoryAudits?$top={top}"
        if filter_query:
            endpoint += f"&$filter={filter_query}"
            
        try:
            response = await self._make_request("GET", endpoint)
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching audit logs: {str(e)}")
            raise
    
    async def update_alert(self, alert_id: str, update_data: Dict) -> Dict:
        """
        Update a security alert.
        
        Args:
            alert_id: ID of the alert to update
            update_data: Data to update the alert with
        """
        endpoint = f"security/alerts_v2/{alert_id}"
        
        try:
            return await self._make_request("PATCH", endpoint, update_data)
        except Exception as e:
            logger.error(f"Error updating alert {alert_id}: {str(e)}")
            raise
    
    async def get_compliance_score(self) -> Dict:
        """Get Microsoft 365 compliance score."""
        endpoint = "security/microsoft365Defender/complianceManagement/complianceScore"
        
        try:
            response = await self._make_request("GET", endpoint, use_beta=True)
            return response
        except Exception as e:
            logger.error(f"Error fetching compliance score: {str(e)}")
            raise
    
    async def get_threat_assessment_requests(self) -> List[Dict]:
        """Get threat assessment requests."""
        endpoint = "security/threatAssessmentRequests"
        
        try:
            response = await self._make_request("GET", endpoint)
            return response.get("value", [])
        except Exception as e:
            logger.error(f"Error fetching threat assessment requests: {str(e)}")
            raise
    
    async def create_threat_assessment_request(self, assessment_data: Dict) -> Dict:
        """Create a new threat assessment request."""
        endpoint = "security/threatAssessmentRequests"
        
        try:
            return await self._make_request("POST", endpoint, assessment_data)
        except Exception as e:
            logger.error(f"Error creating threat assessment request: {str(e)}")
            raise 