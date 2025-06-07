from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from enum import Enum

class TrainingStatus(str, Enum):
    ASSIGNED = "assigned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    OVERDUE = "overdue"
    FAILED = "failed"

class DifficultyLevel(str, Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"
    EXPERT = "Expert"

class ContentType(str, Enum):
    VIDEO = "video"
    INTERACTIVE = "interactive"
    SIMULATION = "simulation"
    DOCUMENT = "document"
    QUIZ = "quiz"
    WEBINAR = "webinar"

class ExerciseStatus(str, Enum):
    PLANNED = "planned"
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class TrainingModule(BaseModel):
    id: str
    title: str
    description: str
    category: str
    difficulty: DifficultyLevel
    duration_minutes: int
    content_type: ContentType
    learning_objectives: List[str]
    prerequisites: List[str] = Field(default_factory=list)
    tags: List[str] = Field(default_factory=list)
    created_date: datetime
    updated_date: datetime
    is_mandatory: bool = False
    completion_rate: Optional[float] = None
    average_score: Optional[float] = None
    content_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    assessment_questions: List[Dict[str, Any]] = Field(default_factory=list)
    resources: List[Dict[str, str]] = Field(default_factory=list)

    class Config:
        from_attributes = True

class TrainingAssignment(BaseModel):
    id: str
    user_id: str
    module_id: str
    assigned_date: datetime
    due_date: datetime
    status: TrainingStatus
    assigned_by: str
    completion_date: Optional[datetime] = None
    score: Optional[float] = None
    attempts: int = 0
    time_spent: Optional[timedelta] = None
    notes: str = ""
    reminder_sent: bool = False
    extension_granted: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserProgress(BaseModel):
    user_id: str
    total_modules: int
    completed_modules: int
    in_progress_modules: int
    overdue_modules: int
    average_score: float
    total_time_spent: timedelta
    last_activity: Optional[datetime] = None
    completion_rate: float
    module_progress: List[Dict[str, Any]] = Field(default_factory=list)
    certificates_earned: List[Dict[str, Any]] = Field(default_factory=list)
    skill_badges: List[str] = Field(default_factory=list)
    learning_path: Optional[str] = None

    class Config:
        from_attributes = True

class TabletopExercise(BaseModel):
    id: str
    title: str
    description: str
    scenario_type: str  # Ransomware, Data Breach, Phishing, etc.
    difficulty: DifficultyLevel
    duration_minutes: int
    participants_required: List[str]  # roles/teams required
    objectives: List[str]
    scenario_details: str
    facilitator: str
    scheduled_date: Optional[datetime] = None
    status: ExerciseStatus
    max_participants: int
    current_participants: int = 0
    materials: List[str] = Field(default_factory=list)
    debrief_notes: Optional[str] = None
    lessons_learned: List[str] = Field(default_factory=list)
    action_items: List[Dict[str, Any]] = Field(default_factory=list)
    participants: List[str] = Field(default_factory=list)

    class Config:
        from_attributes = True

class PhishingSimulation(BaseModel):
    id: str
    campaign_name: str
    description: str
    template_id: str
    target_users: List[str]
    launch_date: datetime
    completion_date: Optional[datetime] = None
    status: str  # scheduled, active, completed
    emails_sent: int = 0
    emails_opened: int = 0
    links_clicked: int = 0
    credentials_entered: int = 0
    users_reported: int = 0
    click_rate: Optional[float] = None
    report_rate: Optional[float] = None
    failure_rate: Optional[float] = None
    follow_up_training: List[str] = Field(default_factory=list)

    class Config:
        from_attributes = True

class SecurityAwarenessMetrics(BaseModel):
    organization_id: str
    reporting_period: str
    total_employees: int
    training_completion_rate: float
    average_assessment_score: float
    phishing_simulation_results: Dict[str, float]
    incident_reduction_rate: Optional[float] = None
    security_culture_score: Optional[float] = None
    top_risk_areas: List[str]
    improvement_recommendations: List[str]
    benchmark_comparison: Optional[Dict[str, float]] = None

class TrainingReport(BaseModel):
    id: str
    report_type: str  # individual, department, organization
    generated_date: datetime
    period_start: datetime
    period_end: datetime
    target_entity: str  # user_id, department_id, or organization_id
    completion_statistics: Dict[str, Any]
    performance_metrics: Dict[str, float]
    trending_data: List[Dict[str, Any]]
    recommendations: List[str]
    compliance_status: Dict[str, Any]
    detailed_results: List[Dict[str, Any]] = Field(default_factory=list)

    class Config:
        from_attributes = True

class LearningPath(BaseModel):
    id: str
    name: str
    description: str
    target_roles: List[str]
    modules: List[str]  # ordered list of module IDs
    estimated_duration: timedelta
    difficulty: DifficultyLevel
    prerequisites: List[str] = Field(default_factory=list)
    certificate_name: Optional[str] = None
    is_mandatory: bool = False
    created_date: datetime
    updated_date: datetime

    class Config:
        from_attributes = True

class Certificate(BaseModel):
    id: str
    name: str
    description: str
    requirements: List[str]  # module IDs or learning path IDs
    validity_period: Optional[timedelta] = None  # None for permanent
    issued_to: str  # user_id
    issued_date: datetime
    expires_date: Optional[datetime] = None
    issuer: str
    certificate_url: Optional[str] = None
    verification_code: str

    class Config:
        from_attributes = True 