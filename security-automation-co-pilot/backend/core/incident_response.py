from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime
from enum import Enum

class IncidentStatus(Enum):
    DETECTED = "detected"
    TRIAGED = "triaged"
    CONTAINED = "contained"
    ERADICATED = "eradicated"
    RECOVERED = "recovered"
    CLOSED = "closed"

class IncidentSeverity(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class Incident:
    id: str
    title: str
    description: str
    severity: IncidentSeverity
    status: IncidentStatus
    created_at: datetime
    updated_at: datetime
    affected_resources: List[str]
    assigned_to: Optional[str]
    playbook_id: Optional[str]
    investigation_notes: List[Dict[str, Any]]

class IncidentResponseService:
    def __init__(self, sentinel_client, graph_client):
        self.sentinel_client = sentinel_client
        self.graph_client = graph_client
        self._incidents: Dict[str, Incident] = {}

    async def create_incident(self, alert_data: Dict[str, Any]) -> Incident:
        """Create a new incident from an alert"""
        incident = Incident(
            id=f"inc-{datetime.utcnow().timestamp()}",
            title=alert_data.get("title", "New Security Incident"),
            description=alert_data.get("description", ""),
            severity=IncidentSeverity(alert_data.get("severity", "medium")),
            status=IncidentStatus.DETECTED,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            affected_resources=alert_data.get("affected_resources", []),
            assigned_to=None,
            playbook_id=None,
            investigation_notes=[]
        )
        
        self._incidents[incident.id] = incident
        return incident

    async def update_incident_status(self, incident_id: str, new_status: IncidentStatus) -> Incident:
        """Update incident status and trigger appropriate actions"""
        if incident_id not in self._incidents:
            raise ValueError(f"Incident {incident_id} not found")

        incident = self._incidents[incident_id]
        incident.status = new_status
        incident.updated_at = datetime.utcnow()

        # Trigger appropriate actions based on status change
        if new_status == IncidentStatus.TRIAGED:
            await self._trigger_triage_actions(incident)
        elif new_status == IncidentStatus.CONTAINED:
            await self._trigger_containment_actions(incident)
        elif new_status == IncidentStatus.ERADICATED:
            await self._trigger_eradication_actions(incident)
        elif new_status == IncidentStatus.RECOVERED:
            await self._trigger_recovery_actions(incident)

        return incident

    async def _trigger_triage_actions(self, incident: Incident):
        """Execute triage phase actions"""
        # Notify security team
        await self._notify_security_team(incident)
        
        # Assign incident if not already assigned
        if not incident.assigned_to:
            incident.assigned_to = await self._get_available_analyst()

        # Create investigation notes
        incident.investigation_notes.append({
            "timestamp": datetime.utcnow(),
            "action": "triage_started",
            "details": "Initial triage phase initiated"
        })

    async def _trigger_containment_actions(self, incident: Incident):
        """Execute containment phase actions"""
        # Isolate affected resources
        for resource in incident.affected_resources:
            await self._isolate_resource(resource)

        # Update investigation notes
        incident.investigation_notes.append({
            "timestamp": datetime.utcnow(),
            "action": "containment_started",
            "details": "Resource isolation initiated"
        })

    async def _trigger_eradication_actions(self, incident: Incident):
        """Execute eradication phase actions"""
        # Remove threats from affected resources
        for resource in incident.affected_resources:
            await self._remove_threats(resource)

        # Update investigation notes
        incident.investigation_notes.append({
            "timestamp": datetime.utcnow(),
            "action": "eradication_started",
            "details": "Threat removal initiated"
        })

    async def _trigger_recovery_actions(self, incident: Incident):
        """Execute recovery phase actions"""
        # Restore affected resources
        for resource in incident.affected_resources:
            await self._restore_resource(resource)

        # Update investigation notes
        incident.investigation_notes.append({
            "timestamp": datetime.utcnow(),
            "action": "recovery_started",
            "details": "Resource restoration initiated"
        })

    async def _notify_security_team(self, incident: Incident):
        """Send notifications to security team"""
        # Implementation would use Teams/Email integration
        pass

    async def _get_available_analyst(self) -> str:
        """Get next available security analyst"""
        # Implementation would check analyst availability
        return "analyst1"

    async def _isolate_resource(self, resource_id: str):
        """Isolate a compromised resource"""
        # Implementation would use Defender APIs
        pass

    async def _remove_threats(self, resource_id: str):
        """Remove threats from a resource"""
        # Implementation would use Defender APIs
        pass

    async def _restore_resource(self, resource_id: str):
        """Restore a resource to normal operation"""
        # Implementation would use Defender APIs
        pass

    async def get_incident_metrics(self) -> Dict[str, Any]:
        """Get incident response metrics"""
        total_incidents = len(self._incidents)
        incidents_by_status = {}
        incidents_by_severity = {}
        
        for incident in self._incidents.values():
            # Count by status
            status_count = incidents_by_status.get(incident.status.value, 0)
            incidents_by_status[incident.status.value] = status_count + 1
            
            # Count by severity
            severity_count = incidents_by_severity.get(incident.severity.value, 0)
            incidents_by_severity[incident.severity.value] = severity_count + 1

        return {
            "total_incidents": total_incidents,
            "by_status": incidents_by_status,
            "by_severity": incidents_by_severity,
            "average_resolution_time": self._calculate_average_resolution_time()
        }

    def _calculate_average_resolution_time(self) -> float:
        """Calculate average incident resolution time in hours"""
        resolved_incidents = [
            incident for incident in self._incidents.values()
            if incident.status in [IncidentStatus.CLOSED, IncidentStatus.RECOVERED]
        ]
        
        if not resolved_incidents:
            return 0.0
            
        total_time = sum(
            (incident.updated_at - incident.created_at).total_seconds()
            for incident in resolved_incidents
        )
        
        return total_time / (len(resolved_incidents) * 3600)  # Convert to hours 