from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Optional
from datetime import datetime, timedelta
from ..core.models.education import TrainingModule, TrainingAssignment, UserProgress, TabletopExercise

router = APIRouter()

@router.get("/modules", response_model=List[TrainingModule])
async def get_training_modules(
    category: Optional[str] = None,
    difficulty: Optional[str] = None
):
    """
    Get available training modules with optional filtering.
    """
    try:
        # Mock training modules - in production this would come from a database
        modules = [
            TrainingModule(
                id="module-001",
                title="Phishing Awareness",
                description="Learn to identify and respond to phishing attacks",
                category="Email Security",
                difficulty="Beginner",
                duration_minutes=30,
                content_type="interactive",
                learning_objectives=[
                    "Identify common phishing indicators",
                    "Understand social engineering tactics",
                    "Learn proper reporting procedures"
                ],
                prerequisites=[],
                tags=["phishing", "email", "social engineering"],
                created_date=datetime.now() - timedelta(days=30),
                updated_date=datetime.now() - timedelta(days=5),
                is_mandatory=True,
                completion_rate=85.5
            ),
            TrainingModule(
                id="module-002",
                title="Password Security Best Practices",
                description="Create and manage secure passwords",
                category="Access Control",
                difficulty="Beginner",
                duration_minutes=20,
                content_type="video",
                learning_objectives=[
                    "Create strong passwords",
                    "Use password managers effectively",
                    "Understand multi-factor authentication"
                ],
                prerequisites=[],
                tags=["passwords", "authentication", "MFA"],
                created_date=datetime.now() - timedelta(days=25),
                updated_date=datetime.now() - timedelta(days=10),
                is_mandatory=True,
                completion_rate=92.3
            ),
            TrainingModule(
                id="module-003",
                title="Incident Response Procedures",
                description="How to respond to security incidents",
                category="Incident Response",
                difficulty="Intermediate",
                duration_minutes=45,
                content_type="simulation",
                learning_objectives=[
                    "Recognize security incidents",
                    "Follow proper escalation procedures",
                    "Document incident details"
                ],
                prerequisites=["module-001"],
                tags=["incident response", "procedures", "escalation"],
                created_date=datetime.now() - timedelta(days=20),
                updated_date=datetime.now() - timedelta(days=3),
                is_mandatory=False,
                completion_rate=67.8
            )
        ]
        
        # Apply filters
        if category:
            modules = [m for m in modules if m.category.lower() == category.lower()]
        if difficulty:
            modules = [m for m in modules if m.difficulty.lower() == difficulty.lower()]
        
        return modules
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve training modules: {str(e)}"
        )

@router.get("/modules/{module_id}", response_model=TrainingModule)
async def get_training_module(module_id: str):
    """
    Get a specific training module by ID.
    """
    try:
        # Mock module data - in production this would be retrieved from database
        module = TrainingModule(
            id=module_id,
            title="Phishing Awareness",
            description="Comprehensive training on identifying and responding to phishing attacks",
            category="Email Security",
            difficulty="Beginner",
            duration_minutes=30,
            content_type="interactive",
            learning_objectives=[
                "Identify common phishing indicators",
                "Understand social engineering tactics",
                "Learn proper reporting procedures",
                "Practice with real-world examples"
            ],
            prerequisites=[],
            tags=["phishing", "email", "social engineering"],
            created_date=datetime.now() - timedelta(days=30),
            updated_date=datetime.now() - timedelta(days=5),
            is_mandatory=True,
            completion_rate=85.5,
            content_url="/training/phishing-awareness",
            assessment_questions=[
                {
                    "question": "What is the most common sign of a phishing email?",
                    "options": ["Poor grammar", "Urgent language", "Suspicious links", "All of the above"],
                    "correct_answer": 3
                }
            ]
        )
        
        return module
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve training module: {str(e)}"
        )

@router.get("/assignments", response_model=List[TrainingAssignment])
async def get_training_assignments(
    user_id: Optional[str] = None,
    status: Optional[str] = None,
    module_id: Optional[str] = None
):
    """
    Get training assignments with optional filtering.
    """
    try:
        # Mock assignment data
        assignments = [
            TrainingAssignment(
                id="assignment-001",
                user_id="user-001",
                module_id="module-001",
                assigned_date=datetime.now() - timedelta(days=10),
                due_date=datetime.now() + timedelta(days=20),
                status="in_progress",
                assigned_by="admin-001",
                completion_date=None,
                score=None,
                attempts=1,
                notes=""
            ),
            TrainingAssignment(
                id="assignment-002",
                user_id="user-001",
                module_id="module-002",
                assigned_date=datetime.now() - timedelta(days=15),
                due_date=datetime.now() + timedelta(days=15),
                status="completed",
                assigned_by="admin-001",
                completion_date=datetime.now() - timedelta(days=2),
                score=95.0,
                attempts=1,
                notes="Excellent performance"
            )
        ]
        
        # Apply filters
        if user_id:
            assignments = [a for a in assignments if a.user_id == user_id]
        if status:
            assignments = [a for a in assignments if a.status == status]
        if module_id:
            assignments = [a for a in assignments if a.module_id == module_id]
        
        return assignments
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve training assignments: {str(e)}"
        )

@router.post("/assignments", response_model=TrainingAssignment)
async def create_training_assignment(
    user_id: str,
    module_id: str,
    due_date: Optional[datetime] = None,
    assigned_by: Optional[str] = None
):
    """
    Create a new training assignment.
    """
    try:
        # Set default due date if not provided
        if not due_date:
            due_date = datetime.now() + timedelta(days=30)
        
        assignment = TrainingAssignment(
            id=f"assignment-{int(datetime.now().timestamp())}",
            user_id=user_id,
            module_id=module_id,
            assigned_date=datetime.now(),
            due_date=due_date,
            status="assigned",
            assigned_by=assigned_by or "system",
            completion_date=None,
            score=None,
            attempts=0,
            notes=""
        )
        
        return assignment
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create training assignment: {str(e)}"
        )

@router.get("/progress/{user_id}", response_model=UserProgress)
async def get_user_progress(user_id: str):
    """
    Get training progress for a specific user.
    """
    try:
        # Mock progress data
        progress = UserProgress(
            user_id=user_id,
            total_modules=10,
            completed_modules=7,
            in_progress_modules=2,
            overdue_modules=1,
            average_score=87.5,
            total_time_spent=timedelta(hours=8, minutes=30),
            last_activity=datetime.now() - timedelta(hours=2),
            completion_rate=70.0,
            module_progress=[
                {
                    "module_id": "module-001",
                    "status": "completed",
                    "score": 95.0,
                    "completion_date": datetime.now() - timedelta(days=5)
                },
                {
                    "module_id": "module-002",
                    "status": "completed",
                    "score": 88.0,
                    "completion_date": datetime.now() - timedelta(days=3)
                },
                {
                    "module_id": "module-003",
                    "status": "in_progress",
                    "score": None,
                    "completion_date": None
                }
            ],
            certificates_earned=[
                {
                    "certificate_id": "cert-001",
                    "name": "Email Security Fundamentals",
                    "issued_date": datetime.now() - timedelta(days=5)
                }
            ]
        )
        
        return progress
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve user progress: {str(e)}"
        )

@router.get("/exercises", response_model=List[TabletopExercise])
async def get_tabletop_exercises(
    scenario_type: Optional[str] = None,
    status: Optional[str] = None
):
    """
    Get tabletop exercises with optional filtering.
    """
    try:
        # Mock exercise data
        exercises = [
            TabletopExercise(
                id="exercise-001",
                title="Ransomware Response Simulation",
                description="Practice responding to a ransomware attack scenario",
                scenario_type="Ransomware",
                difficulty="Intermediate",
                duration_minutes=120,
                participants_required=["Security Team", "IT Team", "Management"],
                objectives=[
                    "Test incident response procedures",
                    "Evaluate communication protocols",
                    "Assess backup and recovery capabilities"
                ],
                scenario_details="A critical server has been encrypted by ransomware...",
                facilitator="security-admin",
                scheduled_date=datetime.now() + timedelta(days=7),
                status="scheduled",
                max_participants=10,
                current_participants=6,
                materials=["Incident response playbook", "Contact list", "Recovery procedures"],
                debrief_notes=None
            ),
            TabletopExercise(
                id="exercise-002",
                title="Data Breach Response",
                description="Handle a customer data breach scenario",
                scenario_type="Data Breach",
                difficulty="Advanced",
                duration_minutes=180,
                participants_required=["Security Team", "Legal Team", "PR Team", "Management"],
                objectives=[
                    "Practice breach notification procedures",
                    "Test customer communication plans",
                    "Evaluate legal and regulatory compliance"
                ],
                scenario_details="Customer payment data has been compromised...",
                facilitator="compliance-admin",
                scheduled_date=datetime.now() + timedelta(days=14),
                status="planned",
                max_participants=15,
                current_participants=0,
                materials=["Breach response plan", "Legal checklist", "Communication templates"],
                debrief_notes=None
            )
        ]
        
        # Apply filters
        if scenario_type:
            exercises = [e for e in exercises if e.scenario_type.lower() == scenario_type.lower()]
        if status:
            exercises = [e for e in exercises if e.status.lower() == status.lower()]
        
        return exercises
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve tabletop exercises: {str(e)}"
        )

@router.post("/exercises", response_model=TabletopExercise)
async def create_tabletop_exercise(exercise_data: TabletopExercise):
    """
    Create a new tabletop exercise.
    """
    try:
        exercise_data.id = f"exercise-{int(datetime.now().timestamp())}"
        exercise_data.status = "planned"
        exercise_data.current_participants = 0
        
        return exercise_data
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create tabletop exercise: {str(e)}"
        )

@router.get("/dashboard")
async def get_education_dashboard():
    """
    Get education and training dashboard data.
    """
    try:
        dashboard_data = {
            "total_users": 150,
            "active_learners": 142,
            "completion_rate": 78.5,
            "average_score": 85.2,
            "training_modules": {
                "total": 25,
                "mandatory": 8,
                "optional": 17,
                "recently_added": 3
            },
            "assignments": {
                "total": 450,
                "completed": 352,
                "in_progress": 68,
                "overdue": 30
            },
            "tabletop_exercises": {
                "scheduled": 3,
                "completed_this_month": 2,
                "participation_rate": 82.0
            },
            "trending_modules": [
                {"module_id": "module-001", "title": "Phishing Awareness", "completions": 45},
                {"module_id": "module-002", "title": "Password Security", "completions": 38},
                {"module_id": "module-003", "title": "Incident Response", "completions": 22}
            ],
            "performance_metrics": {
                "top_performers": [
                    {"user_id": "user-001", "name": "John Doe", "score": 95.5},
                    {"user_id": "user-002", "name": "Jane Smith", "score": 93.2}
                ],
                "improvement_needed": [
                    {"user_id": "user-050", "name": "Bob Johnson", "score": 65.0}
                ]
            },
            "security_awareness_score": 82.7,
            "training_effectiveness": 88.3
        }
        
        return dashboard_data
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve education dashboard: {str(e)}"
        ) 