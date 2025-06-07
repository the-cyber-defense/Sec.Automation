from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime
from enum import Enum

class ComplianceFramework(Enum):
    NIST = "nist"
    ISO27001 = "iso27001"
    CIS = "cis"
    HIPAA = "hipaa"
    GDPR = "gdpr"

class AssessmentStatus(Enum):
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

@dataclass
class ComplianceControl:
    id: str
    framework: ComplianceFramework
    name: str
    description: str
    category: str
    requirements: List[str]
    status: str
    last_assessed: datetime
    evidence: List[Dict[str, Any]]

@dataclass
class SecurityAssessment:
    id: str
    type: str  # pentest, vulnerability, compliance
    status: AssessmentStatus
    start_date: datetime
    end_date: Optional[datetime]
    scope: List[str]
    findings: List[Dict[str, Any]]
    assigned_to: str
    report_url: Optional[str]

class ComplianceAssessmentService:
    def __init__(self, graph_client, sentinel_client):
        self.graph_client = graph_client
        self.sentinel_client = sentinel_client
        self._controls: Dict[str, ComplianceControl] = {}
        self._assessments: Dict[str, SecurityAssessment] = {}

    async def schedule_assessment(self, assessment_type: str, scope: List[str], assigned_to: str) -> SecurityAssessment:
        """Schedule a new security assessment"""
        assessment = SecurityAssessment(
            id=f"assess-{datetime.utcnow().timestamp()}",
            type=assessment_type,
            status=AssessmentStatus.SCHEDULED,
            start_date=datetime.utcnow(),
            end_date=None,
            scope=scope,
            findings=[],
            assigned_to=assigned_to,
            report_url=None
        )
        
        self._assessments[assessment.id] = assessment
        return assessment

    async def update_assessment_status(self, assessment_id: str, new_status: AssessmentStatus) -> SecurityAssessment:
        """Update assessment status and trigger appropriate actions"""
        if assessment_id not in self._assessments:
            raise ValueError(f"Assessment {assessment_id} not found")

        assessment = self._assessments[assessment_id]
        assessment.status = new_status

        if new_status == AssessmentStatus.COMPLETED:
            assessment.end_date = datetime.utcnow()
            await self._generate_assessment_report(assessment)

        return assessment

    async def add_finding(self, assessment_id: str, finding: Dict[str, Any]) -> SecurityAssessment:
        """Add a finding to an assessment"""
        if assessment_id not in self._assessments:
            raise ValueError(f"Assessment {assessment_id} not found")

        assessment = self._assessments[assessment_id]
        assessment.findings.append({
            **finding,
            "timestamp": datetime.utcnow().isoformat()
        })

        return assessment

    async def evaluate_compliance(self, framework: ComplianceFramework) -> Dict[str, Any]:
        """Evaluate compliance against a specific framework"""
        controls = [c for c in self._controls.values() if c.framework == framework]
        
        compliance_status = {
            "framework": framework.value,
            "total_controls": len(controls),
            "compliant_controls": len([c for c in controls if c.status == "compliant"]),
            "non_compliant_controls": len([c for c in controls if c.status == "non_compliant"]),
            "controls_by_category": self._group_controls_by_category(controls)
        }

        return compliance_status

    def _group_controls_by_category(self, controls: List[ComplianceControl]) -> Dict[str, Any]:
        """Group controls by category for reporting"""
        categories = {}
        for control in controls:
            if control.category not in categories:
                categories[control.category] = {
                    "total": 0,
                    "compliant": 0,
                    "non_compliant": 0
                }
            
            categories[control.category]["total"] += 1
            if control.status == "compliant":
                categories[control.category]["compliant"] += 1
            else:
                categories[control.category]["non_compliant"] += 1

        return categories

    async def _generate_assessment_report(self, assessment: SecurityAssessment):
        """Generate assessment report and store it"""
        # Implementation would generate PDF/HTML report
        assessment.report_url = f"/reports/{assessment.id}.pdf"

    async def get_compliance_dashboard_data(self) -> Dict[str, Any]:
        """Get data for compliance dashboard"""
        frameworks = list(ComplianceFramework)
        framework_status = {}
        
        for framework in frameworks:
            framework_status[framework.value] = await self.evaluate_compliance(framework)

        return {
            "framework_status": framework_status,
            "active_assessments": len([a for a in self._assessments.values() 
                                    if a.status == AssessmentStatus.IN_PROGRESS]),
            "recent_findings": self._get_recent_findings(),
            "compliance_trend": self._calculate_compliance_trend()
        }

    def _get_recent_findings(self) -> List[Dict[str, Any]]:
        """Get recent findings across all assessments"""
        all_findings = []
        for assessment in self._assessments.values():
            all_findings.extend(assessment.findings)
        
        # Sort by timestamp and get most recent
        return sorted(all_findings, 
                     key=lambda x: x["timestamp"], 
                     reverse=True)[:10]

    def _calculate_compliance_trend(self) -> Dict[str, List[float]]:
        """Calculate compliance trend over time"""
        # Implementation would analyze historical compliance data
        return {
            "dates": [],
            "compliance_scores": []
        } 