from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Optional
from datetime import datetime, timedelta
from ..core.models.vulnerability import Vulnerability, VulnerabilityAssessment, PatchStatus
from ..integrations.defender import DefenderClient
from ..integrations.microsoft_graph import MicrosoftGraphClient

router = APIRouter()
defender_client = DefenderClient()
graph_client = MicrosoftGraphClient()

@router.get("/", response_model=List[Vulnerability])
async def get_vulnerabilities(
    severity: Optional[str] = None,
    status: Optional[str] = None,
    machine_id: Optional[str] = None,
    top: int = 100
):
    """
    Get vulnerabilities with optional filtering.
    """
    try:
        # Get vulnerabilities from Defender for Endpoint
        defender_vulns = await defender_client.get_vulnerabilities(top=top)
        
        # Convert to our internal format
        vulnerabilities = []
        for vuln in defender_vulns:
            vulnerability = Vulnerability(
                id=vuln.get("id", ""),
                cve_id=vuln.get("name", ""),
                title=vuln.get("description", ""),
                description=vuln.get("description", ""),
                severity=vuln.get("severity", "Medium"),
                cvss_score=vuln.get("cvssV3", 0.0),
                affected_machines_count=vuln.get("machinesCount", 0),
                published_date=datetime.fromisoformat(vuln.get("publishedOn", "").replace("Z", "+00:00")) if vuln.get("publishedOn") else None,
                updated_date=datetime.fromisoformat(vuln.get("updatedOn", "").replace("Z", "+00:00")) if vuln.get("updatedOn") else None,
                patch_available=bool(vuln.get("publicExploit", False)),
                exploit_available=bool(vuln.get("publicExploit", False)),
                vendor=vuln.get("vendor", ""),
                product=vuln.get("product", ""),
                version=vuln.get("productVersion", ""),
                affected_machines=[],
                remediation_steps=[],
                references=[]
            )
            vulnerabilities.append(vulnerability)
        
        # Apply filters
        if severity:
            vulnerabilities = [v for v in vulnerabilities if v.severity.lower() == severity.lower()]
        if status:
            vulnerabilities = [v for v in vulnerabilities if v.status.lower() == status.lower()]
        
        return vulnerabilities
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve vulnerabilities: {str(e)}"
        )

@router.get("/{vulnerability_id}", response_model=Vulnerability)
async def get_vulnerability(vulnerability_id: str):
    """
    Get a specific vulnerability by ID.
    """
    try:
        # Get vulnerability details from Defender
        vulnerabilities = await defender_client.get_vulnerabilities()
        vuln_data = next((v for v in vulnerabilities if v.get("id") == vulnerability_id), None)
        
        if not vuln_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Vulnerability {vulnerability_id} not found"
            )
        
        vulnerability = Vulnerability(
            id=vuln_data.get("id", ""),
            cve_id=vuln_data.get("name", ""),
            title=vuln_data.get("description", ""),
            description=vuln_data.get("description", ""),
            severity=vuln_data.get("severity", "Medium"),
            cvss_score=vuln_data.get("cvssV3", 0.0),
            affected_machines_count=vuln_data.get("machinesCount", 0),
            published_date=datetime.fromisoformat(vuln_data.get("publishedOn", "").replace("Z", "+00:00")) if vuln_data.get("publishedOn") else None,
            updated_date=datetime.fromisoformat(vuln_data.get("updatedOn", "").replace("Z", "+00:00")) if vuln_data.get("updatedOn") else None,
            patch_available=bool(vuln_data.get("publicExploit", False)),
            exploit_available=bool(vuln_data.get("publicExploit", False)),
            vendor=vuln_data.get("vendor", ""),
            product=vuln_data.get("product", ""),
            version=vuln_data.get("productVersion", ""),
            affected_machines=[],
            remediation_steps=[],
            references=[]
        )
        
        return vulnerability
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve vulnerability: {str(e)}"
        )

@router.get("/assessments/", response_model=List[VulnerabilityAssessment])
async def get_vulnerability_assessments(
    machine_id: Optional[str] = None,
    from_date: Optional[datetime] = None,
    to_date: Optional[datetime] = None
):
    """
    Get vulnerability assessments with optional filtering.
    """
    try:
        # Mock assessment data - in production this would come from a database
        assessments = [
            VulnerabilityAssessment(
                id="assessment-001",
                machine_id="machine-001",
                scan_date=datetime.now() - timedelta(days=1),
                scan_type="full",
                vulnerabilities_found=25,
                critical_count=2,
                high_count=8,
                medium_count=10,
                low_count=5,
                status="completed",
                scan_duration=timedelta(minutes=45),
                next_scan_date=datetime.now() + timedelta(days=7)
            ),
            VulnerabilityAssessment(
                id="assessment-002",
                machine_id="machine-002",
                scan_date=datetime.now() - timedelta(hours=6),
                scan_type="quick",
                vulnerabilities_found=12,
                critical_count=1,
                high_count=3,
                medium_count=6,
                low_count=2,
                status="completed",
                scan_duration=timedelta(minutes=15),
                next_scan_date=datetime.now() + timedelta(days=1)
            )
        ]
        
        # Apply filters
        if machine_id:
            assessments = [a for a in assessments if a.machine_id == machine_id]
        if from_date:
            assessments = [a for a in assessments if a.scan_date >= from_date]
        if to_date:
            assessments = [a for a in assessments if a.scan_date <= to_date]
            
        return assessments
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve vulnerability assessments: {str(e)}"
        )

@router.post("/assessments/", response_model=VulnerabilityAssessment)
async def start_vulnerability_assessment(machine_id: str, scan_type: str = "full"):
    """
    Start a new vulnerability assessment for the specified machine.
    """
    try:
        # Create new assessment
        assessment = VulnerabilityAssessment(
            id=f"assessment-{int(datetime.now().timestamp())}",
            machine_id=machine_id,
            scan_date=datetime.now(),
            scan_type=scan_type,
            vulnerabilities_found=0,
            critical_count=0,
            high_count=0,
            medium_count=0,
            low_count=0,
            status="in_progress",
            scan_duration=None,
            next_scan_date=None
        )
        
        # In production, this would trigger actual vulnerability scanning
        return assessment
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to start vulnerability assessment: {str(e)}"
        )

@router.get("/machines/{machine_id}/vulnerabilities", response_model=List[Vulnerability])
async def get_machine_vulnerabilities(machine_id: str):
    """
    Get vulnerabilities for a specific machine.
    """
    try:
        # Get machine vulnerabilities from Defender
        vulns = await defender_client.get_machine_vulnerabilities(machine_id)
        
        vulnerabilities = []
        for vuln in vulns:
            vulnerability = Vulnerability(
                id=vuln.get("id", ""),
                cve_id=vuln.get("name", ""),
                title=vuln.get("description", ""),
                description=vuln.get("description", ""),
                severity=vuln.get("severity", "Medium"),
                cvss_score=vuln.get("cvssV3", 0.0),
                affected_machines_count=1,  # This is for a specific machine
                published_date=datetime.fromisoformat(vuln.get("publishedOn", "").replace("Z", "+00:00")) if vuln.get("publishedOn") else None,
                updated_date=datetime.fromisoformat(vuln.get("updatedOn", "").replace("Z", "+00:00")) if vuln.get("updatedOn") else None,
                patch_available=bool(vuln.get("publicExploit", False)),
                exploit_available=bool(vuln.get("publicExploit", False)),
                vendor=vuln.get("vendor", ""),
                product=vuln.get("product", ""),
                version=vuln.get("productVersion", ""),
                affected_machines=[machine_id],
                remediation_steps=[],
                references=[]
            )
            vulnerabilities.append(vulnerability)
        
        return vulnerabilities
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve machine vulnerabilities: {str(e)}"
        )

@router.get("/patch-status/", response_model=List[PatchStatus])
async def get_patch_status(machine_id: Optional[str] = None):
    """
    Get patch status for machines.
    """
    try:
        # Mock patch status data - in production this would come from patch management systems
        patch_statuses = [
            PatchStatus(
                machine_id="machine-001",
                machine_name="WS-001",
                total_patches=45,
                installed_patches=38,
                pending_patches=7,
                failed_patches=0,
                last_update=datetime.now() - timedelta(hours=2),
                next_update=datetime.now() + timedelta(days=1),
                auto_update_enabled=True,
                reboot_required=True
            ),
            PatchStatus(
                machine_id="machine-002",
                machine_name="SRV-001",
                total_patches=62,
                installed_patches=60,
                pending_patches=2,
                failed_patches=0,
                last_update=datetime.now() - timedelta(hours=6),
                next_update=datetime.now() + timedelta(days=1),
                auto_update_enabled=True,
                reboot_required=False
            )
        ]
        
        # Apply filter
        if machine_id:
            patch_statuses = [p for p in patch_statuses if p.machine_id == machine_id]
            
        return patch_statuses
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve patch status: {str(e)}"
        )

@router.post("/patch-status/{machine_id}/update")
async def trigger_patch_update(machine_id: str):
    """
    Trigger patch update for a specific machine.
    """
    try:
        # In production, this would trigger actual patch deployment
        # For now, return a success message
        return {
            "message": f"Patch update triggered for machine {machine_id}",
            "status": "initiated",
            "timestamp": datetime.now()
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to trigger patch update: {str(e)}"
        )

@router.get("/dashboard")
async def get_vulnerability_dashboard():
    """
    Get vulnerability dashboard data with key metrics and trends.
    """
    try:
        # Get vulnerability data from Defender
        vulnerabilities = await defender_client.get_vulnerabilities(top=1000)
        
        # Calculate metrics
        total_vulns = len(vulnerabilities)
        critical_vulns = len([v for v in vulnerabilities if v.get("severity") == "Critical"])
        high_vulns = len([v for v in vulnerabilities if v.get("severity") == "High"])
        medium_vulns = len([v for v in vulnerabilities if v.get("severity") == "Medium"])
        low_vulns = len([v for v in vulnerabilities if v.get("severity") == "Low"])
        
        dashboard_data = {
            "total_vulnerabilities": total_vulns,
            "critical_vulnerabilities": critical_vulns,
            "high_vulnerabilities": high_vulns,
            "medium_vulnerabilities": medium_vulns,
            "low_vulnerabilities": low_vulns,
            "patch_compliance": 85.5,  # Mock data
            "machines_at_risk": 15,
            "vulnerability_trend": [
                {"date": "2024-01-01", "count": 120},
                {"date": "2024-02-01", "count": 115},
                {"date": "2024-03-01", "count": 108}
            ],
            "top_cves": [
                {"cve_id": "CVE-2024-1234", "severity": "Critical", "affected_machines": 25},
                {"cve_id": "CVE-2024-5678", "severity": "High", "affected_machines": 18},
                {"cve_id": "CVE-2024-9012", "severity": "High", "affected_machines": 12}
            ],
            "patch_status_summary": {
                "up_to_date": 75,
                "pending_patches": 20,
                "failed_patches": 5
            }
        }
        
        return dashboard_data
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve vulnerability dashboard: {str(e)}"
        ) 