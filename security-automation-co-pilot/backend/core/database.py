"""
Database integration module for Azure Cosmos DB.
Handles connection management and provides database utilities.
"""

import logging
from typing import Optional, List, Dict, Any
from azure.cosmos import CosmosClient, PartitionKey, exceptions
from azure.cosmos.database import DatabaseProxy
from azure.cosmos.container import ContainerProxy
from ..config.settings import settings
import asyncio
from datetime import datetime

logger = logging.getLogger(__name__)

class CosmosDBManager:
    """
    Manager class for Azure Cosmos DB operations.
    Handles database and container creation, and provides CRUD operations.
    """
    
    def __init__(self):
        self.client: Optional[CosmosClient] = None
        self.database: Optional[DatabaseProxy] = None
        self.containers: Dict[str, ContainerProxy] = {}
        
    def initialize(self):
        """Initialize Cosmos DB client and create database/containers if needed."""
        try:
            # Create Cosmos client
            self.client = CosmosClient(
                url=settings.cosmos_db_endpoint,
                credential=settings.cosmos_db_key
            )
            
            # Create database if it doesn't exist
            try:
                self.database = self.client.create_database(settings.cosmos_db_database)
                logger.info(f"Created database: {settings.cosmos_db_database}")
            except exceptions.CosmosResourceExistsError:
                self.database = self.client.get_database_client(settings.cosmos_db_database)
                logger.info(f"Using existing database: {settings.cosmos_db_database}")
            
            # Create containers
            self._create_containers()
            
            logger.info("Cosmos DB initialization completed successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize Cosmos DB: {str(e)}")
            raise
    
    def _create_containers(self):
        """Create required containers with appropriate partition keys."""
        containers_config = [
            {
                "id": "incidents",
                "partition_key": "/tenantId",
                "unique_keys": [{"paths": ["/incidentId"]}]
            },
            {
                "id": "vulnerabilities",
                "partition_key": "/machineId",
                "unique_keys": []
            },
            {
                "id": "compliance_assessments",
                "partition_key": "/frameworkId",
                "unique_keys": []
            },
            {
                "id": "training_progress",
                "partition_key": "/userId",
                "unique_keys": []
            },
            {
                "id": "audit_logs",
                "partition_key": "/date",
                "unique_keys": []
            },
            {
                "id": "security_metrics",
                "partition_key": "/metricType",
                "unique_keys": []
            }
        ]
        
        for config in containers_config:
            try:
                container = self.database.create_container(
                    id=config["id"],
                    partition_key=PartitionKey(path=config["partition_key"]),
                    unique_key_policy={"uniqueKeys": config["unique_keys"]} if config["unique_keys"] else None
                )
                self.containers[config["id"]] = container
                logger.info(f"Created container: {config['id']}")
            except exceptions.CosmosResourceExistsError:
                self.containers[config["id"]] = self.database.get_container_client(config["id"])
                logger.info(f"Using existing container: {config['id']}")
    
    def get_container(self, container_name: str) -> ContainerProxy:
        """Get a container by name."""
        if container_name not in self.containers:
            raise ValueError(f"Container {container_name} not found")
        return self.containers[container_name]
    
    # CRUD Operations
    async def create_item(self, container_name: str, item: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new item in the specified container."""
        try:
            container = self.get_container(container_name)
            
            # Add metadata
            item["createdAt"] = datetime.utcnow().isoformat()
            item["updatedAt"] = datetime.utcnow().isoformat()
            
            # Create item
            result = container.create_item(body=item)
            logger.info(f"Created item in {container_name}: {item.get('id')}")
            return result
            
        except exceptions.CosmosResourceExistsError:
            logger.error(f"Item already exists in {container_name}: {item.get('id')}")
            raise
        except Exception as e:
            logger.error(f"Failed to create item in {container_name}: {str(e)}")
            raise
    
    async def read_item(self, container_name: str, item_id: str, partition_key: str) -> Optional[Dict[str, Any]]:
        """Read an item from the specified container."""
        try:
            container = self.get_container(container_name)
            item = container.read_item(item=item_id, partition_key=partition_key)
            return item
        except exceptions.CosmosResourceNotFoundError:
            logger.warning(f"Item not found in {container_name}: {item_id}")
            return None
        except Exception as e:
            logger.error(f"Failed to read item from {container_name}: {str(e)}")
            raise
    
    async def update_item(self, container_name: str, item_id: str, partition_key: str, updates: Dict[str, Any]) -> Dict[str, Any]:
        """Update an existing item in the specified container."""
        try:
            container = self.get_container(container_name)
            
            # Read existing item
            existing_item = await self.read_item(container_name, item_id, partition_key)
            if not existing_item:
                raise ValueError(f"Item not found: {item_id}")
            
            # Apply updates
            existing_item.update(updates)
            existing_item["updatedAt"] = datetime.utcnow().isoformat()
            
            # Replace item
            result = container.replace_item(item=existing_item["id"], body=existing_item)
            logger.info(f"Updated item in {container_name}: {item_id}")
            return result
            
        except Exception as e:
            logger.error(f"Failed to update item in {container_name}: {str(e)}")
            raise
    
    async def delete_item(self, container_name: str, item_id: str, partition_key: str) -> bool:
        """Delete an item from the specified container."""
        try:
            container = self.get_container(container_name)
            container.delete_item(item=item_id, partition_key=partition_key)
            logger.info(f"Deleted item from {container_name}: {item_id}")
            return True
        except exceptions.CosmosResourceNotFoundError:
            logger.warning(f"Item not found for deletion in {container_name}: {item_id}")
            return False
        except Exception as e:
            logger.error(f"Failed to delete item from {container_name}: {str(e)}")
            raise
    
    async def query_items(self, container_name: str, query: str, parameters: Optional[List[Dict[str, Any]]] = None, 
                         partition_key: Optional[str] = None, max_items: Optional[int] = None) -> List[Dict[str, Any]]:
        """Query items from the specified container."""
        try:
            container = self.get_container(container_name)
            
            # Build query options
            query_options = {}
            if partition_key:
                query_options["partition_key"] = partition_key
            if max_items:
                query_options["max_item_count"] = max_items
            
            # Execute query
            items = list(container.query_items(
                query=query,
                parameters=parameters,
                enable_cross_partition_query=partition_key is None,
                **query_options
            ))
            
            logger.info(f"Query returned {len(items)} items from {container_name}")
            return items
            
        except Exception as e:
            logger.error(f"Failed to query items from {container_name}: {str(e)}")
            raise
    
    async def bulk_create_items(self, container_name: str, items: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Create multiple items in a single operation."""
        created_items = []
        errors = []
        
        for item in items:
            try:
                created_item = await self.create_item(container_name, item)
                created_items.append(created_item)
            except Exception as e:
                errors.append({"item_id": item.get("id"), "error": str(e)})
        
        if errors:
            logger.warning(f"Bulk create completed with {len(errors)} errors")
        
        return created_items
    
    def close(self):
        """Close the Cosmos DB connection."""
        if self.client:
            self.client.close()
            logger.info("Cosmos DB connection closed")

# Global database manager instance
db_manager = CosmosDBManager()

# Helper functions
async def get_db() -> CosmosDBManager:
    """Get the database manager instance."""
    if not db_manager.client:
        db_manager.initialize()
    return db_manager

async def create_incident(incident_data: Dict[str, Any]) -> Dict[str, Any]:
    """Create a new incident in the database."""
    db = await get_db()
    incident_data["tenantId"] = settings.azure_tenant_id  # Set partition key
    return await db.create_item("incidents", incident_data)

async def get_incident(incident_id: str) -> Optional[Dict[str, Any]]:
    """Get an incident by ID."""
    db = await get_db()
    return await db.read_item("incidents", incident_id, settings.azure_tenant_id)

async def update_incident(incident_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
    """Update an existing incident."""
    db = await get_db()
    return await db.update_item("incidents", incident_id, settings.azure_tenant_id, updates)

async def query_incidents(severity: Optional[str] = None, status: Optional[str] = None, 
                         limit: int = 100) -> List[Dict[str, Any]]:
    """Query incidents with optional filters."""
    db = await get_db()
    
    # Build query
    query = "SELECT * FROM c WHERE 1=1"
    parameters = []
    
    if severity:
        query += " AND c.severity = @severity"
        parameters.append({"name": "@severity", "value": severity})
    
    if status:
        query += " AND c.status = @status"
        parameters.append({"name": "@status", "value": status})
    
    query += " ORDER BY c.createdAt DESC"
    
    return await db.query_items("incidents", query, parameters, max_items=limit)

async def create_vulnerability(vulnerability_data: Dict[str, Any]) -> Dict[str, Any]:
    """Create a new vulnerability record."""
    db = await get_db()
    return await db.create_item("vulnerabilities", vulnerability_data)

async def get_vulnerabilities_by_machine(machine_id: str) -> List[Dict[str, Any]]:
    """Get all vulnerabilities for a specific machine."""
    db = await get_db()
    query = "SELECT * FROM c WHERE c.machineId = @machineId ORDER BY c.severity DESC"
    parameters = [{"name": "@machineId", "value": machine_id}]
    return await db.query_items("vulnerabilities", query, parameters, partition_key=machine_id)

async def create_audit_log(action: str, user_id: str, details: Dict[str, Any]) -> Dict[str, Any]:
    """Create an audit log entry."""
    db = await get_db()
    audit_entry = {
        "id": f"audit_{datetime.utcnow().timestamp()}",
        "action": action,
        "userId": user_id,
        "details": details,
        "timestamp": datetime.utcnow().isoformat(),
        "date": datetime.utcnow().strftime("%Y-%m-%d")  # Partition key
    }
    return await db.create_item("audit_logs", audit_entry) 