from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime
from enum import Enum

class TrainingStatus(Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    EXPIRED = "expired"

class TrainingCategory(Enum):
    PHISHING = "phishing"
    PASSWORD_SECURITY = "password_security"
    DATA_PROTECTION = "data_protection"
    SOCIAL_ENGINEERING = "social_engineering"
    COMPLIANCE = "compliance"

@dataclass
class TrainingModule:
    id: str
    title: str
    description: str
    category: TrainingCategory
    duration_minutes: int
    content_url: str
    required: bool
    created_at: datetime
    updated_at: datetime

@dataclass
class UserTraining:
    user_id: str
    module_id: str
    status: TrainingStatus
    progress_percentage: float
    start_date: Optional[datetime]
    completion_date: Optional[datetime]
    quiz_score: Optional[float]
    last_accessed: datetime

@dataclass
class TrainingCampaign:
    id: str
    title: str
    description: str
    start_date: datetime
    end_date: datetime
    modules: List[str]  # List of module IDs
    target_audience: List[str]  # List of user IDs or groups
    status: str
    created_at: datetime

class SecurityAwarenessService:
    def __init__(self, graph_client):
        self.graph_client = graph_client
        self._modules: Dict[str, TrainingModule] = {}
        self._user_trainings: Dict[str, List[UserTraining]] = {}
        self._campaigns: Dict[str, TrainingCampaign] = {}

    async def create_training_module(self, 
                                   title: str,
                                   description: str,
                                   category: TrainingCategory,
                                   duration_minutes: int,
                                   content_url: str,
                                   required: bool = False) -> TrainingModule:
        """Create a new training module"""
        module = TrainingModule(
            id=f"module-{datetime.utcnow().timestamp()}",
            title=title,
            description=description,
            category=category,
            duration_minutes=duration_minutes,
            content_url=content_url,
            required=required,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        self._modules[module.id] = module
        return module

    async def assign_training(self, 
                            user_id: str,
                            module_id: str) -> UserTraining:
        """Assign a training module to a user"""
        if module_id not in self._modules:
            raise ValueError(f"Module {module_id} not found")
        
        training = UserTraining(
            user_id=user_id,
            module_id=module_id,
            status=TrainingStatus.NOT_STARTED,
            progress_percentage=0.0,
            start_date=None,
            completion_date=None,
            quiz_score=None,
            last_accessed=datetime.utcnow()
        )
        
        if user_id not in self._user_trainings:
            self._user_trainings[user_id] = []
        
        self._user_trainings[user_id].append(training)
        return training

    async def update_training_progress(self,
                                     user_id: str,
                                     module_id: str,
                                     progress_percentage: float,
                                     quiz_score: Optional[float] = None) -> UserTraining:
        """Update user's training progress"""
        training = self._get_user_training(user_id, module_id)
        
        training.progress_percentage = progress_percentage
        training.last_accessed = datetime.utcnow()
        
        if progress_percentage >= 100:
            training.status = TrainingStatus.COMPLETED
            training.completion_date = datetime.utcnow()
        elif progress_percentage > 0:
            training.status = TrainingStatus.IN_PROGRESS
            if not training.start_date:
                training.start_date = datetime.utcnow()
        
        if quiz_score is not None:
            training.quiz_score = quiz_score
        
        return training

    def _get_user_training(self, user_id: str, module_id: str) -> UserTraining:
        """Get user's training record"""
        if user_id not in self._user_trainings:
            raise ValueError(f"No training records found for user {user_id}")
        
        for training in self._user_trainings[user_id]:
            if training.module_id == module_id:
                return training
        
        raise ValueError(f"Module {module_id} not assigned to user {user_id}")

    async def create_training_campaign(self,
                                     title: str,
                                     description: str,
                                     start_date: datetime,
                                     end_date: datetime,
                                     modules: List[str],
                                     target_audience: List[str]) -> TrainingCampaign:
        """Create a new training campaign"""
        campaign = TrainingCampaign(
            id=f"campaign-{datetime.utcnow().timestamp()}",
            title=title,
            description=description,
            start_date=start_date,
            end_date=end_date,
            modules=modules,
            target_audience=target_audience,
            status="active",
            created_at=datetime.utcnow()
        )
        
        self._campaigns[campaign.id] = campaign
        return campaign

    async def get_user_training_status(self, user_id: str) -> Dict[str, Any]:
        """Get user's training status and progress"""
        if user_id not in self._user_trainings:
            return {
                "assigned_modules": 0,
                "completed_modules": 0,
                "in_progress_modules": 0,
                "not_started_modules": 0,
                "average_quiz_score": 0.0,
                "modules": []
            }
        
        trainings = self._user_trainings[user_id]
        completed = sum(1 for t in trainings if t.status == TrainingStatus.COMPLETED)
        in_progress = sum(1 for t in trainings if t.status == TrainingStatus.IN_PROGRESS)
        not_started = sum(1 for t in trainings if t.status == TrainingStatus.NOT_STARTED)
        
        quiz_scores = [t.quiz_score for t in trainings if t.quiz_score is not None]
        avg_quiz_score = sum(quiz_scores) / len(quiz_scores) if quiz_scores else 0.0
        
        module_details = []
        for training in trainings:
            module = self._modules[training.module_id]
            module_details.append({
                "module_id": module.id,
                "title": module.title,
                "category": module.category.value,
                "status": training.status.value,
                "progress": training.progress_percentage,
                "quiz_score": training.quiz_score,
                "last_accessed": training.last_accessed.isoformat()
            })
        
        return {
            "assigned_modules": len(trainings),
            "completed_modules": completed,
            "in_progress_modules": in_progress,
            "not_started_modules": not_started,
            "average_quiz_score": avg_quiz_score,
            "modules": module_details
        }

    async def get_training_dashboard_data(self) -> Dict[str, Any]:
        """Get data for training dashboard"""
        total_users = len(self._user_trainings)
        total_modules = len(self._modules)
        total_campaigns = len(self._campaigns)
        
        completion_stats = {
            "completed": 0,
            "in_progress": 0,
            "not_started": 0
        }
        
        category_stats = {category.value: 0 for category in TrainingCategory}
        
        for user_trainings in self._user_trainings.values():
            for training in user_trainings:
                completion_stats[training.status.value] += 1
                module = self._modules[training.module_id]
                category_stats[module.category.value] += 1
        
        return {
            "total_users": total_users,
            "total_modules": total_modules,
            "total_campaigns": total_campaigns,
            "completion_stats": completion_stats,
            "category_stats": category_stats,
            "active_campaigns": self._get_active_campaigns(),
            "training_trend": self._calculate_training_trend()
        }

    def _get_active_campaigns(self) -> List[Dict[str, Any]]:
        """Get list of active training campaigns"""
        now = datetime.utcnow()
        active_campaigns = []
        
        for campaign in self._campaigns.values():
            if campaign.start_date <= now <= campaign.end_date:
                active_campaigns.append({
                    "id": campaign.id,
                    "title": campaign.title,
                    "start_date": campaign.start_date.isoformat(),
                    "end_date": campaign.end_date.isoformat(),
                    "module_count": len(campaign.modules),
                    "target_audience_size": len(campaign.target_audience)
                })
        
        return active_campaigns

    def _calculate_training_trend(self) -> Dict[str, List[float]]:
        """Calculate training completion trend over time"""
        # Implementation would analyze historical training data
        return {
            "dates": [],
            "completion_rates": []
        } 