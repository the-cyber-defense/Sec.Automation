from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class ComplianceStatus(str, Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

class ControlStatus(str, Enum):
    COMPLIANT = "compliant"
    NON_COMPLIANT = "non_compliant"
    PARTIALLY_COMPLIANT = "partially_compliant"
    NOT_APPLICABLE = "not_applicable"
    NOT_TESTED = "not_tested"

class FindingSeverity(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFORMATIONAL = "informational"

class ComplianceFramework(BaseModel):
    id: str
    name: str
    version: str
    description: str
    categories: List[str]
    controls_count: Optional[int] = None
    last_updated: Optional[datetime] = None

    class Config:
        from_attributes = True

class ComplianceControl(BaseModel):
    id: str
    framework_id: str
    name: str
    description: str
    category: str
    subcategory: Optional[str] = None
    status: ControlStatus
    score: Optional[float] = None
    evidence: List[str] = Field(default_factory=list)
    remediation_steps: List[str] = Field(default_factory=list)
    last_assessed: Optional[datetime] = None
    next_assessment: Optional[datetime] = None

class ComplianceFinding(BaseModel):
    id: str
    control_id: str
    title: str
    description: str
    severity: FindingSeverity
    status: str  # open, in_progress, resolved, false_positive
    evidence: List[str] = Field(default_factory=list)
    remediation: str
    assigned_to: Optional[str] = None
    due_date: Optional[datetime] = None
    created_date: datetime
    resolved_date: Optional[datetime] = None

class ComplianceAssessment(BaseModel):
    id: str
    framework_id: str
    status: ComplianceStatus
    score: float
    max_score: float
    start_date: datetime
    completion_date: Optional[datetime] = None
    findings_count: int
    control_results: Dict[str, Any] = Field(default_factory=dict)
    assessor: Optional[str] = None
    scope: Optional[str] = None
    methodology: Optional[str] = None

    class Config:
        from_attributes = True

class ComplianceReport(BaseModel):
    id: str
    framework_id: str
    assessment_id: str
    generated_date: datetime
    overall_score: float
    compliance_percentage: float
    findings_summary: Dict[str, int]  # severity -> count
    recommendations: List[str]
    executive_summary: Optional[str] = None
    detailed_findings: List[ComplianceFinding] = Field(default_factory=list)
    controls_assessed: List[ComplianceControl] = Field(default_factory=list)

    class Config:
        from_attributes = True

class ComplianceMetrics(BaseModel):
    framework_id: str
    current_score: float
    previous_score: Optional[float] = None
    trend: str  # improving, declining, stable
    controls_compliant: int
    controls_non_compliant: int
    controls_partially_compliant: int
    open_findings: int
    resolved_findings: int
    last_assessment_date: Optional[datetime] = None
    next_assessment_date: Optional[datetime] = None

class ComplianceDashboard(BaseModel):
    overall_score: float
    frameworks: List[ComplianceMetrics]
    recent_assessments: List[ComplianceAssessment]
    top_findings: List[ComplianceFinding]
    remediation_progress: Dict[str, int]  # status -> count
    compliance_trends: List[Dict[str, Any]]  # time series data

    class Config:
        from_attributes = True 