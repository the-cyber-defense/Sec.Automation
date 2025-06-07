"""
Database initialization script for Security Automation Co-Pilot.
Sets up Cosmos DB containers and seeds initial data.
"""

import asyncio
import sys
import os
from pathlib import Path

# Add backend directory to path
sys.path.append(str(Path(__file__).parent.parent))

from core.database import db_manager, create_incident, create_vulnerability, create_audit_log
from config.settings import settings, validate_settings
from datetime import datetime, timedelta
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def seed_sample_data():
    """Seed the database with sample data for testing."""
    logger.info("Starting to seed sample data...")
    
    # Sample incidents
    sample_incidents = [
        {
            "id": "INC-001",
            "title": "Suspicious PowerShell Activity Detected",
            "description": "PowerShell execution with encoded commands detected on multiple endpoints",
            "severity": "High",
            "status": "Active",
            "incident_type": "Malware",
            "created_at": (datetime.utcnow() - timedelta(hours=2)).isoformat(),
            "affected_machines": ["WS-001", "WS-002", "WS-003"],
            "tags": {"attack_type": "fileless", "technique": "T1059.001"}
        },
        {
            "id": "INC-002",
            "title": "Multiple Failed Login Attempts",
            "description": "User account experiencing brute force attack from multiple IPs",
            "severity": "Medium",
            "status": "Investigating",
            "incident_type": "Account Compromise",
            "created_at": (datetime.utcnow() - timedelta(hours=5)).isoformat(),
            "affected_users": ["john.doe@company.com"],
            "tags": {"attack_type": "brute_force", "technique": "T1110"}
        },
        {
            "id": "INC-003",
            "title": "Data Exfiltration Attempt Blocked",
            "description": "Large data transfer to unknown external IP blocked by DLP",
            "severity": "Critical",
            "status": "Resolved",
            "incident_type": "Data Exfiltration",
            "created_at": (datetime.utcnow() - timedelta(days=1)).isoformat(),
            "affected_machines": ["SRV-DB-01"],
            "tags": {"data_type": "PII", "blocked": "true"}
        }
    ]
    
    # Sample vulnerabilities
    sample_vulnerabilities = [
        {
            "id": "VULN-001",
            "machineId": "WS-001",
            "cve_id": "CVE-2024-1234",
            "title": "Critical Windows Kernel Vulnerability",
            "severity": "Critical",
            "cvss_score": 9.8,
            "patch_available": True,
            "discovered_date": (datetime.utcnow() - timedelta(days=3)).isoformat()
        },
        {
            "id": "VULN-002",
            "machineId": "WS-001",
            "cve_id": "CVE-2024-5678",
            "title": "Office Remote Code Execution",
            "severity": "High",
            "cvss_score": 8.5,
            "patch_available": True,
            "discovered_date": (datetime.utcnow() - timedelta(days=7)).isoformat()
        },
        {
            "id": "VULN-003",
            "machineId": "SRV-WEB-01",
            "cve_id": "CVE-2024-9012",
            "title": "IIS Buffer Overflow",
            "severity": "High",
            "cvss_score": 7.9,
            "patch_available": False,
            "discovered_date": (datetime.utcnow() - timedelta(days=1)).isoformat()
        }
    ]
    
    # Create incidents
    for incident in sample_incidents:
        try:
            await create_incident(incident)
            logger.info(f"Created incident: {incident['id']}")
        except Exception as e:
            logger.error(f"Failed to create incident {incident['id']}: {str(e)}")
    
    # Create vulnerabilities
    for vuln in sample_vulnerabilities:
        try:
            await create_vulnerability(vuln)
            logger.info(f"Created vulnerability: {vuln['id']}")
        except Exception as e:
            logger.error(f"Failed to create vulnerability {vuln['id']}: {str(e)}")
    
    # Create audit log entries
    await create_audit_log("database_initialized", "system", {"action": "seed_data"})
    
    logger.info("Sample data seeding completed")

async def initialize_database():
    """Initialize the database and containers."""
    try:
        logger.info("Validating settings...")
        validate_settings()
        
        logger.info("Initializing Cosmos DB...")
        db_manager.initialize()
        
        logger.info("Database initialization completed successfully")
        
        # Ask if user wants to seed sample data
        response = input("\nDo you want to seed sample data? (y/n): ")
        if response.lower() == 'y':
            await seed_sample_data()
        
    except Exception as e:
        logger.error(f"Database initialization failed: {str(e)}")
        raise
    finally:
        db_manager.close()

async def verify_connection():
    """Verify database connection and display container information."""
    try:
        db_manager.initialize()
        
        logger.info("\n=== Database Connection Verified ===")
        logger.info(f"Database: {settings.cosmos_db_database}")
        logger.info(f"Containers created:")
        
        for container_name in db_manager.containers:
            container = db_manager.get_container(container_name)
            # Get container properties
            properties = container.read()
            logger.info(f"  - {container_name} (Partition Key: {properties['partitionKey']['paths'][0]})")
        
        logger.info("\n=== Testing CRUD Operations ===")
        
        # Test creating an item
        test_incident = {
            "id": "TEST-001",
            "title": "Test Incident",
            "severity": "Low",
            "status": "Test"
        }
        
        created = await create_incident(test_incident)
        logger.info(f"✓ Create operation successful: {created['id']}")
        
        # Test reading
        read = await db_manager.read_item("incidents", "TEST-001", settings.azure_tenant_id)
        logger.info(f"✓ Read operation successful: {read['id']}")
        
        # Test update
        updated = await db_manager.update_item("incidents", "TEST-001", settings.azure_tenant_id, {"status": "Updated"})
        logger.info(f"✓ Update operation successful: {updated['status']}")
        
        # Test delete
        deleted = await db_manager.delete_item("incidents", "TEST-001", settings.azure_tenant_id)
        logger.info(f"✓ Delete operation successful: {deleted}")
        
        logger.info("\n✅ All database operations verified successfully!")
        
    except Exception as e:
        logger.error(f"Database verification failed: {str(e)}")
        raise
    finally:
        db_manager.close()

def main():
    """Main entry point."""
    print("""
    ╔═══════════════════════════════════════════════════════════╗
    ║        Security Automation Co-Pilot                       ║
    ║        Database Initialization Script                     ║
    ╚═══════════════════════════════════════════════════════════╝
    """)
    
    print("Select an option:")
    print("1. Initialize database and containers")
    print("2. Verify database connection")
    print("3. Seed sample data only")
    print("4. Exit")
    
    choice = input("\nEnter your choice (1-4): ")
    
    if choice == "1":
        asyncio.run(initialize_database())
    elif choice == "2":
        asyncio.run(verify_connection())
    elif choice == "3":
        db_manager.initialize()
        asyncio.run(seed_sample_data())
        db_manager.close()
    elif choice == "4":
        print("Exiting...")
    else:
        print("Invalid choice. Please run the script again.")

if __name__ == "__main__":
    main() 