from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime
from enum import Enum

class SecurityTool(Enum):
    DEFENDER_IDENTITY = "defender_identity"
    DEFENDER_ENDPOINT = "defender_endpoint"
    DEFENDER_OFFICE365 = "defender_office365"
    SENTINEL = "sentinel"
    INTUNE = "intune"
    CONDITIONAL_ACCESS = "conditional_access"

class OptimizationStatus(Enum):
    OPTIMAL = "optimal"
    SUBOPTIMAL = "suboptimal"
    CRITICAL = "critical"

@dataclass
class ToolConfiguration:
    tool: SecurityTool
    current_settings: Dict[str, Any]
    recommended_settings: Dict[str, Any]
    status: OptimizationStatus
    last_optimized: datetime
    optimization_history: List[Dict[str, Any]]

@dataclass
class SecurityRecommendation:
    id: str
    tool: SecurityTool
    title: str
    description: str
    impact: str
    priority: str
    implementation_steps: List[str]
    status: str
    created_at: datetime

class SecurityOptimizationService:
    def __init__(self, graph_client, sentinel_client):
        self.graph_client = graph_client
        self.sentinel_client = sentinel_client
        self._configurations: Dict[SecurityTool, ToolConfiguration] = {}
        self._recommendations: List[SecurityRecommendation] = []

    async def analyze_tool_configuration(self, tool: SecurityTool) -> ToolConfiguration:
        """Analyze current tool configuration and generate recommendations"""
        current_settings = await self._get_current_settings(tool)
        recommended_settings = await self._get_recommended_settings(tool)
        
        status = self._calculate_optimization_status(current_settings, recommended_settings)
        
        config = ToolConfiguration(
            tool=tool,
            current_settings=current_settings,
            recommended_settings=recommended_settings,
            status=status,
            last_optimized=datetime.utcnow(),
            optimization_history=[]
        )
        
        self._configurations[tool] = config
        return config

    async def _get_current_settings(self, tool: SecurityTool) -> Dict[str, Any]:
        """Get current settings for a security tool"""
        if tool == SecurityTool.DEFENDER_IDENTITY:
            return await self._get_defender_identity_settings()
        elif tool == SecurityTool.DEFENDER_ENDPOINT:
            return await self._get_defender_endpoint_settings()
        elif tool == SecurityTool.SENTINEL:
            return await self._get_sentinel_settings()
        # Add other tools as needed
        return {}

    async def _get_recommended_settings(self, tool: SecurityTool) -> Dict[str, Any]:
        """Get recommended settings for a security tool"""
        # Implementation would use best practices and industry standards
        return {}

    def _calculate_optimization_status(self, current: Dict[str, Any], recommended: Dict[str, Any]) -> OptimizationStatus:
        """Calculate optimization status based on current vs recommended settings"""
        # Implementation would compare settings and determine status
        return OptimizationStatus.SUBOPTIMAL

    async def generate_recommendations(self) -> List[SecurityRecommendation]:
        """Generate security recommendations based on tool analysis"""
        recommendations = []
        
        for tool in SecurityTool:
            config = await self.analyze_tool_configuration(tool)
            
            if config.status != OptimizationStatus.OPTIMAL:
                recommendation = SecurityRecommendation(
                    id=f"rec-{datetime.utcnow().timestamp()}",
                    tool=tool,
                    title=f"Optimize {tool.value.replace('_', ' ').title()} Configuration",
                    description=self._generate_recommendation_description(config),
                    impact=self._calculate_recommendation_impact(config),
                    priority=self._determine_priority(config),
                    implementation_steps=self._generate_implementation_steps(config),
                    status="pending",
                    created_at=datetime.utcnow()
                )
                recommendations.append(recommendation)
        
        self._recommendations.extend(recommendations)
        return recommendations

    def _generate_recommendation_description(self, config: ToolConfiguration) -> str:
        """Generate recommendation description based on configuration analysis"""
        differences = self._find_setting_differences(
            config.current_settings,
            config.recommended_settings
        )
        
        return f"Current configuration differs from recommended settings in {len(differences)} areas"

    def _calculate_recommendation_impact(self, config: ToolConfiguration) -> str:
        """Calculate the potential impact of implementing recommendations"""
        if config.status == OptimizationStatus.CRITICAL:
            return "High - Critical security gaps identified"
        elif config.status == OptimizationStatus.SUBOPTIMAL:
            return "Medium - Security posture can be improved"
        return "Low - Minor optimizations available"

    def _determine_priority(self, config: ToolConfiguration) -> str:
        """Determine recommendation priority"""
        if config.status == OptimizationStatus.CRITICAL:
            return "High"
        elif config.status == OptimizationStatus.SUBOPTIMAL:
            return "Medium"
        return "Low"

    def _generate_implementation_steps(self, config: ToolConfiguration) -> List[str]:
        """Generate step-by-step implementation instructions"""
        steps = []
        differences = self._find_setting_differences(
            config.current_settings,
            config.recommended_settings
        )
        
        for setting, (current, recommended) in differences.items():
            steps.append(f"Update {setting} from {current} to {recommended}")
        
        return steps

    def _find_setting_differences(self, current: Dict[str, Any], recommended: Dict[str, Any]) -> Dict[str, tuple]:
        """Find differences between current and recommended settings"""
        differences = {}
        for key, value in recommended.items():
            if key in current and current[key] != value:
                differences[key] = (current[key], value)
        return differences

    async def get_optimization_dashboard_data(self) -> Dict[str, Any]:
        """Get data for optimization dashboard"""
        tool_status = {}
        for tool in SecurityTool:
            config = await self.analyze_tool_configuration(tool)
            tool_status[tool.value] = {
                "status": config.status.value,
                "last_optimized": config.last_optimized.isoformat(),
                "settings_difference": len(self._find_setting_differences(
                    config.current_settings,
                    config.recommended_settings
                ))
            }

        return {
            "tool_status": tool_status,
            "pending_recommendations": len([r for r in self._recommendations if r.status == "pending"]),
            "recent_optimizations": self._get_recent_optimizations(),
            "optimization_trend": self._calculate_optimization_trend()
        }

    def _get_recent_optimizations(self) -> List[Dict[str, Any]]:
        """Get recent optimization history"""
        all_history = []
        for config in self._configurations.values():
            all_history.extend(config.optimization_history)
        
        return sorted(all_history, 
                     key=lambda x: x["timestamp"], 
                     reverse=True)[:10]

    def _calculate_optimization_trend(self) -> Dict[str, List[float]]:
        """Calculate optimization trend over time"""
        # Implementation would analyze historical optimization data
        return {
            "dates": [],
            "optimization_scores": []
        } 