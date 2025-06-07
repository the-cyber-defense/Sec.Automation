from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Optional
from datetime import datetime
from ..core.models.compliance import ComplianceFramework, ComplianceAssessment, ComplianceReport
from ..integrations.microsoft_graph import MicrosoftGraphClient
from ..integrations.sentinel import SentinelClient

router = APIRouter()
graph_client = MicrosoftGraphClient()
sentinel_client = SentinelClient()

@router.get("/frameworks", response_model=List[ComplianceFramework])
async def get_compliance_frameworks():
    """
    Get available compliance frameworks (NIST, ISO, CIS, etc.).
    """
    # Static list of supported frameworks - in production this could be configurable
    frameworks = [
        ComplianceFramework(
            id="nist-csf",
            name="NIST Cybersecurity Framework",
            version="1.1",
            description="NIST framework for improving critical infrastructure cybersecurity",
            categories=["Identify", "Protect", "Detect", "Respond", "Recover"]
        ),
        ComplianceFramework(
            id="iso-27001",
            name="ISO/IEC 27001",
            version="2013",
            description="International standard for information security management systems",
            categories=["Risk Assessment", "Security Controls", "Asset Management"]
        ),
        ComplianceFramework(
            id="cis-controls",
            name="CIS Controls",
            version="8.0",
            description="Center for Internet Security Critical Security Controls",
            categories=["Basic", "Foundational", "Organizational"]
        ),
        ComplianceFramework(
            id="soc2",
            name="SOC 2",
            version="Type II",
            description="Service Organization Control 2 framework",
            categories=["Security", "Availability", "Processing Integrity", "Confidentiality", "Privacy"]
        )
    ]
    
    return frameworks

@router.get("/assessments", response_model=List[ComplianceAssessment])
async def get_compliance_assessments(
    framework_id: Optional[str] = None,
    status: Optional[str] = None
):
    """
    Get compliance assessments with optional filtering.
    """
    try:
        # Get secure score data from Microsoft Graph
        secure_score = await graph_client.get_secure_score()
        control_profiles = await graph_client.get_secure_score_control_profiles()
        
        # Mock assessment data - in production this would be calculated from real compliance data
        assessments = [
            ComplianceAssessment(
                id="assessment-001",
                framework_id="nist-csf",
                status="in_progress",
                score=75.5,
                max_score=100.0,
                start_date=datetime.now(),
                completion_date=None,
                findings_count=12,
                control_results={}
            ),
            ComplianceAssessment(
                id="assessment-002",
                framework_id="iso-27001",
                status="completed",
                score=82.3,
                max_score=100.0,
                start_date=datetime.now(),
                completion_date=datetime.now(),
                findings_count=8,
                control_results={}
            )
        ]
        
        # Apply filters
        if framework_id:
            assessments = [a for a in assessments if a.framework_id == framework_id]
        if status:
            assessments = [a for a in assessments if a.status == status]
            
        return assessments
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve compliance assessments: {str(e)}"
        )

@router.post("/assessments", response_model=ComplianceAssessment)
async def start_compliance_assessment(framework_id: str):
    """
    Start a new compliance assessment for the specified framework.
    """
    try:
        # Create new assessment
        assessment = ComplianceAssessment(
            id=f"assessment-{int(datetime.now().timestamp())}",
            framework_id=framework_id,
            status="in_progress",
            score=0.0,
            max_score=100.0,
            start_date=datetime.now(),
            completion_date=None,
            findings_count=0,
            control_results={}
        )
        
        # In production, this would trigger actual compliance scanning
        return assessment
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to start compliance assessment: {str(e)}"
        )

@router.get("/assessments/{assessment_id}", response_model=ComplianceAssessment)
async def get_compliance_assessment(assessment_id: str):
    """
    Get a specific compliance assessment by ID.
    """
    try:
        # Mock assessment data - in production this would be retrieved from database
        assessment = ComplianceAssessment(
            id=assessment_id,
            framework_id="nist-csf",
            status="completed",
            score=75.5,
            max_score=100.0,
            start_date=datetime.now(),
            completion_date=datetime.now(),
            findings_count=12,
            control_results={
                "PR.AC-1": {"status": "compliant", "score": 90},
                "PR.AC-2": {"status": "non_compliant", "score": 45},
                "DE.CM-1": {"status": "partially_compliant", "score": 70}
            }
        )
        
        return assessment
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve compliance assessment: {str(e)}"
        )

@router.get("/reports", response_model=List[ComplianceReport])
async def get_compliance_reports(
    framework_id: Optional[str] = None,
    from_date: Optional[datetime] = None,
    to_date: Optional[datetime] = None
):
    """
    Get compliance reports with optional filtering.
    """
    try:
        # Mock report data - in production this would generate real reports
        reports = [
            ComplianceReport(
                id="report-001",
                framework_id="nist-csf",
                assessment_id="assessment-001",
                generated_date=datetime.now(),
                overall_score=75.5,
                compliance_percentage=75.5,
                findings_summary={
                    "critical": 2,
                    "high": 5,
                    "medium": 8,
                    "low": 12
                },
                recommendations=[
                    "Implement multi-factor authentication for all admin accounts",
                    "Enable advanced threat protection for email",
                    "Configure automatic patching for critical systems"
                ]
            )
        ]
        
        # Apply filters
        if framework_id:
            reports = [r for r in reports if r.framework_id == framework_id]
        if from_date:
            reports = [r for r in reports if r.generated_date >= from_date]
        if to_date:
            reports = [r for r in reports if r.generated_date <= to_date]
            
        return reports
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve compliance reports: {str(e)}"
        )

@router.post("/reports", response_model=ComplianceReport)
async def generate_compliance_report(assessment_id: str):
    """
    Generate a compliance report for the specified assessment.
    """
    try:
        # Get assessment data
        assessment = await get_compliance_assessment(assessment_id)
        
        # Generate report based on assessment
        report = ComplianceReport(
            id=f"report-{int(datetime.now().timestamp())}",
            framework_id=assessment.framework_id,
            assessment_id=assessment_id,
            generated_date=datetime.now(),
            overall_score=assessment.score,
            compliance_percentage=assessment.score,
            findings_summary={
                "critical": 2,
                "high": 5,
                "medium": 8,
                "low": 12
            },
            recommendations=[
                "Enable Azure AD Conditional Access policies",
                "Implement privileged identity management",
                "Configure security monitoring and alerting"
            ]
        )
        
        return report
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate compliance report: {str(e)}"
        )

@router.get("/dashboard")
async def get_compliance_dashboard():
    """
    Get compliance dashboard data with key metrics and trends.
    """
    try:
        # Get secure score from Microsoft Graph
        secure_score = await graph_client.get_secure_score()
        
        dashboard_data = {
            "overall_compliance_score": secure_score.get("currentScore", 0) if secure_score else 0,
            "max_score": secure_score.get("maxScore", 100) if secure_score else 100,
            "compliance_trend": [
                {"date": "2024-01-01", "score": 65},
                {"date": "2024-02-01", "score": 70},
                {"date": "2024-03-01", "score": 75}
            ],
            "framework_scores": {
                "nist-csf": 75.5,
                "iso-27001": 82.3,
                "cis-controls": 68.7,
                "soc2": 79.1
            },
            "recent_assessments": 3,
            "pending_remediation": 15,
            "critical_findings": 2
        }
        
        return dashboard_data
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve compliance dashboard: {str(e)}"
        ) 