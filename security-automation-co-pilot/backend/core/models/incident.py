from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime
from enum import Enum

class IncidentSeverity(str, Enum):
    INFORMATIONAL = "Informational"
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"

class IncidentStatus(str, Enum):
    NEW = "New"
    ACTIVE = "Active"
    INVESTIGATING = "Investigating"
    RESOLVED = "Resolved"
    CLOSED = "Closed"

class IncidentType(str, Enum):
    MALWARE = "Malware"
    PHISHING = "Phishing"
    RANSOMWARE = "Ransomware"
    SUSPICIOUS_ACTIVITY = "Suspicious Activity"
    DATA_EXFILTRATION = "Data Exfiltration"
    PRIVILEGE_ESCALATION = "Privilege Escalation"
    OTHER = "Other"

class AffectedAsset(BaseModel):
    id: str
    type: str
    name: str
    ip_address: Optional[str] = None
    hostname: Optional[str] = None
    resource_id: Optional[str] = None

class IncidentBase(BaseModel):
    title: str
    description: str
    severity: IncidentSeverity
    incident_type: IncidentType
    affected_assets: List[AffectedAsset] = Field(default_factory=list)
    tags: Dict[str, str] = Field(default_factory=dict)

class IncidentCreate(IncidentBase):
    pass

class IncidentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[IncidentSeverity] = None
    status: Optional[IncidentStatus] = None
    incident_type: Optional[IncidentType] = None
    affected_assets: Optional[List[AffectedAsset]] = None
    tags: Optional[Dict[str, str]] = None
    resolution_notes: Optional[str] = None

class Incident(IncidentBase):
    id: str
    status: IncidentStatus
    created_at: datetime
    updated_at: datetime
    assigned_to: Optional[str] = None
    resolution_notes: Optional[str] = None
    related_incidents: List[str] = Field(default_factory=list)
    mitre_tactics: List[str] = Field(default_factory=list)
    mitre_techniques: List[str] = Field(default_factory=list)

    class Config:
        from_attributes = True 