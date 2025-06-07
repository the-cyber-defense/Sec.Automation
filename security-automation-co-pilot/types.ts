export interface Service {
  id: string;
  name: string;
  description: string;
}

export interface ThreatScenario {
  id: string;
  name: string;
  description: string;
}

export interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface OrganizationContext {
  industry: string;
  geoLocation: string;
  size: string; // e.g., Small, Medium, Large
}

export interface AppContextType {
  apiKey: string | null; // This will be process.env.API_KEY, not user-set
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
  organizationContext: OrganizationContext;
  setOrganizationContext: React.Dispatch<React.SetStateAction<OrganizationContext>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

// For Gemini Search Grounding
export interface GroundingChunkWeb {
  uri: string;
  title: string;
}
export interface GroundingChunk {
  web?: GroundingChunkWeb;
  // May have other types like "retrievedContext"
}
export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  // Other potential fields like searchQueries
}

export interface SecurityPosture {
  risk_score: number;
  enabled_services: string[];
  security_controls: Record<string, boolean>;
  last_assessment: string;
}

export interface TenantProfile {
  tenant_id: string;
  name: string;
  security_posture: SecurityPosture;
  telemetry_sources: string[];
  compliance_status: Record<string, string>;
}

export interface SecurityAlert {
  id: string;
  title: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'InProgress' | 'Resolved';
  createdDateTime: string;
  description: string;
  category: string;
}

export interface SecurityRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  category: string;
  status: 'NotStarted' | 'InProgress' | 'Completed';
}

export enum SecurityToolType {
    DEFENDER_IDENTITY = "defender_identity",
    DEFENDER_ENDPOINT = "defender_endpoint",
    DEFENDER_OFFICE365 = "defender_office365",
    SENTINEL = "sentinel",
    INTUNE = "intune",
    CONDITIONAL_ACCESS = "conditional_access"
}

export type SeverityLevel = "Low" | "Medium" | "High" | "Critical";

export enum OptimizationStatus {
    OPTIMIZED = 'OPTIMIZED',
    SUBOPTIMAL = 'SUBOPTIMAL',
    CRITICAL = 'CRITICAL'
}

export enum EndpointType {
    WINDOWS = "windows",
    MACOS = "macos",
    LINUX = "linux",
    MOBILE = "mobile"
}

export enum HardeningStatus {
    SECURE = 'SECURE',
    PARTIAL = 'PARTIAL',
    VULNERABLE = 'VULNERABLE'
}

export enum TrainingStatus {
    NOT_STARTED = "not_started",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    EXPIRED = "expired"
}

export enum TrainingCategory {
    PHISHING = "phishing",
    PASSWORD_SECURITY = "password_security",
    DATA_PROTECTION = "data_protection",
    SOCIAL_ENGINEERING = "social_engineering",
    COMPLIANCE = "compliance"
}

export enum RecommendationStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export type AlertSeverity = "Low" | "Medium" | "High" | "Critical";
export type AlertStatus = "New" | "InProgress" | "Resolved";

export interface TenantAnalysis {
    tenantId: string;
    securityScore: number;
    recommendations: SecurityRecommendation[];
    alerts: SecurityAlert[];
}

export interface SecurityRecommendationDetailed {
    id: string;
    title: string;
    description: string;
    severity: AlertSeverity;
    category: string;
    status: RecommendationStatus;
    created_at: string;
}

export interface SecurityAlertDetailed {
    id: string;
    title: string;
    description: string;
    severity: AlertSeverity;
    status: AlertStatus;
    category: string;
    created_at: string;
}

export interface SecurityToolStatus {
    id: string;
    name: string;
    status: OptimizationStatus;
    lastOptimized: string;
    settingsDifference: number;
}

export interface OptimizationRecommendation {
    id: string;
    title: string;
    description: string;
    impact: string;
    effort: string;
    status: RecommendationStatus;
}

export interface HardeningControl {
    id: string;
    name: string;
    description: string;
    category: string;
    severity: string;
}

export interface Endpoint {
    id: string;
    name: string;
    type: string;
    status: HardeningStatus;
    lastAssessed: string;
    controls: HardeningControl[];
}

export interface TrainingModule {
    id: string;
    title: string;
    description: string;
    category: TrainingCategory;
    duration: number;
    status: TrainingStatus;
    progress: number;
}

// Workflow and Automation Types
export interface WorkflowAction {
  id: string;
  type: ActionType;
  name: string;
  description: string;
  parameters: Record<string, any>;
  timeout_seconds?: number;
  retry_count?: number;
  retry_delay_seconds?: number;
  required_approvals?: string[];
  conditions?: Record<string, any>;
  on_success?: string;
  on_failure?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  severity_threshold: SeverityLevel;
  actions: WorkflowAction[];
  tags?: Record<string, string>;
  created_by?: string;
  created_at?: string;
  actions_count?: number;
}

export interface WorkflowExecution {
  id: string;
  workflow_id: string;
  incident_id: string;
  status: WorkflowStatus;
  started_at: string;
  completed_at?: string;
  current_action?: string;
  executed_actions: string[];
  action_results: Record<string, any>;
  error_message?: string;
  triggered_by: string;
  context: Record<string, any>;
  duration_seconds?: number;
}

export interface LogicApp {
  id: string;
  name: string;
  location: string;
  state: string;
  created_time?: string;
  changed_time?: string;
  tags: Record<string, string>;
}

export interface LogicAppRun {
  id: string;
  name: string;
  status: string;
  start_time?: string;
  end_time?: string;
  trigger?: string;
}

export interface SentinelPlaybook {
  id: string;
  name: string;
  location: string;
  state: string;
  tags: Record<string, string>;
}

export interface PlaybookMetrics {
  playbook_name: string;
  total_runs: number;
  successful_runs: number;
  failed_runs: number;
  success_rate: number;
  average_execution_time_seconds: number;
  period_days: number;
}

export interface NotificationTemplate {
  name: string;
  channels: NotificationChannel[];
  description?: string;
}

export interface WorkflowAnalytics {
  workflow_id: string;
  total_executions: number;
  successful: number;
  failed: number;
  success_rate: number;
  average_duration: number;
}

// Enums
export enum ActionType {
  ISOLATE_MACHINE = 'isolate_machine',
  BLOCK_IP = 'block_ip',
  DISABLE_USER = 'disable_user',
  RESET_PASSWORD = 'reset_password',
  SEND_NOTIFICATION = 'send_notification',
  CREATE_TICKET = 'create_ticket',
  RUN_SCRIPT = 'run_script',
  INVOKE_LOGIC_APP = 'invoke_logic_app',
  QUARANTINE_EMAIL = 'quarantine_email',
  UPDATE_FIREWALL = 'update_firewall',
  COLLECT_FORENSICS = 'collect_forensics',
  CUSTOM = 'custom'
}

export enum WorkflowStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  PAUSED = 'paused'
}

export enum NotificationChannel {
  EMAIL = 'email',
  TEAMS = 'teams',
  SMS = 'sms',
  WEBHOOK = 'webhook',
  PAGERDUTY = 'pagerduty',
  SLACK = 'slack'
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
  CRITICAL = 'critical'
}