from typing import List, Optional, Dict, Any
from datetime import datetime
import os
from azure.identity import DefaultAzureCredential
from azure.mgmt.security import SecurityCenter
from azure.mgmt.sentinel import SecurityInsights
from ..core.models.incident import Incident, IncidentCreate, IncidentUpdate

class SentinelClient:
    def __init__(self):
        self.subscription_id = os.getenv("AZURE_SUBSCRIPTION_ID")
        self.resource_group = os.getenv("AZURE_RESOURCE_GROUP")
        self.workspace_name = os.getenv("AZURE_WORKSPACE_NAME")
        
        self.credential = DefaultAzureCredential()
        self.sentinel_client = SecurityInsights(
            credential=self.credential,
            subscription_id=self.subscription_id
        )
        
    async def get_incidents(
        self,
        severity: Optional[str] = None,
        status: Optional[str] = None,
        from_date: Optional[datetime] = None,
        to_date: Optional[datetime] = None
    ) -> List[Incident]:
        """
        Retrieve incidents from Microsoft Sentinel with optional filtering.
        """
        filter_params = []
        if severity:
            filter_params.append(f"properties/severity eq '{severity}'")
        if status:
            filter_params.append(f"properties/status eq '{status}'")
        if from_date:
            filter_params.append(f"properties/createdTimeUtc ge '{from_date.isoformat()}Z'")
        if to_date:
            filter_params.append(f"properties/createdTimeUtc le '{to_date.isoformat()}Z'")
            
        filter_string = " and ".join(filter_params) if filter_params else None
        
        incidents = self.sentinel_client.incidents.list(
            resource_group_name=self.resource_group,
            workspace_name=self.workspace_name,
            filter=filter_string
        )
        
        return [self._convert_to_incident(incident) for incident in incidents]
    
    async def get_incident(self, incident_id: str) -> Optional[Incident]:
        """
        Retrieve a specific incident by ID.
        """
        try:
            incident = self.sentinel_client.incidents.get(
                resource_group_name=self.resource_group,
                workspace_name=self.workspace_name,
                incident_id=incident_id
            )
            return self._convert_to_incident(incident)
        except Exception:
            return None
            
    async def create_incident(self, incident: IncidentCreate) -> Incident:
        """
        Create a new incident in Microsoft Sentinel.
        """
        incident_properties = {
            "title": incident.title,
            "description": incident.description,
            "severity": incident.severity.value,
            "status": "New",
            "classification": "Unknown",
            "classificationComment": "",
            "labels": [{"labelName": k, "labelValue": v} for k, v in incident.tags.items()]
        }
        
        created_incident = self.sentinel_client.incidents.create_or_update(
            resource_group_name=self.resource_group,
            workspace_name=self.workspace_name,
            incident_id=incident.id if hasattr(incident, 'id') else None,
            incident_info=incident_properties
        )
        
        return self._convert_to_incident(created_incident)
        
    async def update_incident(self, incident_id: str, incident_update: IncidentUpdate) -> Incident:
        """
        Update an existing incident in Microsoft Sentinel.
        """
        current_incident = await self.get_incident(incident_id)
        if not current_incident:
            raise ValueError(f"Incident {incident_id} not found")
            
        update_properties = {}
        if incident_update.title is not None:
            update_properties["title"] = incident_update.title
        if incident_update.description is not None:
            update_properties["description"] = incident_update.description
        if incident_update.severity is not None:
            update_properties["severity"] = incident_update.severity.value
        if incident_update.status is not None:
            update_properties["status"] = incident_update.status.value
        if incident_update.tags is not None:
            update_properties["labels"] = [
                {"labelName": k, "labelValue": v} 
                for k, v in incident_update.tags.items()
            ]
            
        updated_incident = self.sentinel_client.incidents.create_or_update(
            resource_group_name=self.resource_group,
            workspace_name=self.workspace_name,
            incident_id=incident_id,
            incident_info=update_properties
        )
        
        return self._convert_to_incident(updated_incident)
        
    def _convert_to_incident(self, sentinel_incident: Any) -> Incident:
        """
        Convert a Sentinel incident to our internal Incident model.
        """
        properties = sentinel_incident.properties
        
        return Incident(
            id=sentinel_incident.name,
            title=properties.title,
            description=properties.description or "",
            severity=properties.severity,
            status=properties.status,
            incident_type=self._map_incident_type(properties.title, properties.labels),
            created_at=properties.created_time_utc,
            updated_at=properties.last_modified_time_utc,
            assigned_to=properties.owner.email if properties.owner else None,
            affected_assets=self._extract_affected_assets(properties),
            tags=self._extract_tags(properties.labels),
            resolution_notes=properties.classification_comment,
            mitre_tactics=properties.tactics or [],
            mitre_techniques=properties.techniques or []
        )
        
    def _map_incident_type(self, title: str, labels: List[Dict[str, str]]) -> str:
        """
        Map Sentinel incident to our incident type based on title and labels.
        """
        title_lower = title.lower()
        if "malware" in title_lower:
            return "Malware"
        elif "phish" in title_lower:
            return "Phishing"
        elif "ransom" in title_lower:
            return "Ransomware"
        elif "privilege" in title_lower or "escalation" in title_lower:
            return "Privilege Escalation"
        elif "data" in title_lower and ("exfil" in title_lower or "leak" in title_lower):
            return "Data Exfiltration"
        return "Other"
        
    def _extract_affected_assets(self, properties: Any) -> List[Dict[str, str]]:
        """
        Extract affected assets from Sentinel incident properties.
        """
        assets = []
        if hasattr(properties, "entities"):
            for entity in properties.entities:
                if entity.type in ["host", "ip", "account", "mailbox"]:
                    asset = {
                        "id": entity.name,
                        "type": entity.type,
                        "name": entity.friendly_name or entity.name
                    }
                    if hasattr(entity, "host_name"):
                        asset["hostname"] = entity.host_name
                    if hasattr(entity, "ip_address"):
                        asset["ip_address"] = entity.ip_address
                    assets.append(asset)
        return assets
        
    def _extract_tags(self, labels: List[Dict[str, str]]) -> Dict[str, str]:
        """
        Convert Sentinel labels to tags dictionary.
        """
        return {label["labelName"]: label["labelValue"] for label in (labels or [])} 