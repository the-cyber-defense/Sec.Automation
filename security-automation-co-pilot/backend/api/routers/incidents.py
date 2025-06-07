from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Optional
from datetime import datetime
from ..core.models.incident import Incident, IncidentCreate, IncidentUpdate
from ..integrations.sentinel import SentinelClient
from ..integrations.defender import DefenderClient

router = APIRouter()
sentinel_client = SentinelClient()
defender_client = DefenderClient()

@router.get("/", response_model=List[Incident])
async def get_incidents(
    severity: Optional[str] = None,
    status: Optional[str] = None,
    from_date: Optional[datetime] = None,
    to_date: Optional[datetime] = None
):
    """
    Retrieve security incidents with optional filtering.
    """
    try:
        # Fetch incidents from both Sentinel and Defender
        sentinel_incidents = await sentinel_client.get_incidents(
            severity=severity,
            status=status,
            from_date=from_date,
            to_date=to_date
        )
        
        defender_incidents = await defender_client.get_alerts(
            severity=severity,
            status=status,
            from_date=from_date,
            to_date=to_date
        )
        
        # Combine and normalize incidents
        all_incidents = [*sentinel_incidents, *defender_incidents]
        return all_incidents
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve incidents: {str(e)}"
        )

@router.get("/{incident_id}", response_model=Incident)
async def get_incident(incident_id: str):
    """
    Retrieve a specific incident by ID.
    """
    try:
        # Try Sentinel first
        incident = await sentinel_client.get_incident(incident_id)
        if incident:
            return incident
            
        # If not found in Sentinel, try Defender
        incident = await defender_client.get_alert(incident_id)
        if incident:
            return incident
            
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Incident {incident_id} not found"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve incident: {str(e)}"
        )

@router.post("/", response_model=Incident)
async def create_incident(incident: IncidentCreate):
    """
    Create a new incident.
    """
    try:
        return await sentinel_client.create_incident(incident)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create incident: {str(e)}"
        )

@router.put("/{incident_id}", response_model=Incident)
async def update_incident(incident_id: str, incident_update: IncidentUpdate):
    """
    Update an existing incident.
    """
    try:
        return await sentinel_client.update_incident(incident_id, incident_update)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update incident: {str(e)}"
        )

@router.post("/{incident_id}/automate")
async def automate_incident_response(incident_id: str):
    """
    Trigger automated incident response playbook.
    """
    try:
        # Implement automated response logic here
        return {"message": f"Automated response triggered for incident {incident_id}"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to trigger automated response: {str(e)}"
        ) 