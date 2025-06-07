import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Tenant Analysis API
export const tenantApi = {
    getTenantAnalysis: (tenantId: string) => 
        apiClient.get(`/tenant-analysis/${tenantId}`),
    
    getSecurityScore: (tenantId: string) =>
        apiClient.get(`/tenant-analysis/${tenantId}/security-score`),
};

// Security Alerts API
export const alertsApi = {
    getAlerts: (tenantId: string) =>
        apiClient.get(`/alerts/${tenantId}`),
    
    getAlertDetails: (tenantId: string, alertId: string) =>
        apiClient.get(`/alerts/${tenantId}/${alertId}`),
};

// Security Recommendations API
export const recommendationsApi = {
    getRecommendations: (tenantId: string) =>
        apiClient.get(`/recommendations/${tenantId}`),
    
    getRecommendationDetails: (tenantId: string, recommendationId: string) =>
        apiClient.get(`/recommendations/${tenantId}/${recommendationId}`),
};

// Security Optimization API
export const optimizationApi = {
    getToolStatus: (tenantId: string) =>
        apiClient.get(`/security-optimization/${tenantId}/tools`),
    
    getRecommendations: (tenantId: string) =>
        apiClient.get(`/security-optimization/${tenantId}/recommendations`),
    
    applyRecommendation: (tenantId: string, recommendationId: string) =>
        apiClient.post(`/security-optimization/${tenantId}/apply/${recommendationId}`),
};

// Endpoint Hardening API
export const hardeningApi = {
    getEndpoints: (tenantId: string) =>
        apiClient.get(`/endpoint-hardening/${tenantId}/endpoints`),
    
    getHardeningStatus: (tenantId: string, endpointId: string) =>
        apiClient.get(`/endpoint-hardening/${tenantId}/endpoints/${endpointId}/status`),
    
    applyHardening: (tenantId: string, endpointId: string, controls: string[]) =>
        apiClient.post(`/endpoint-hardening/${tenantId}/endpoints/${endpointId}/apply`, { controls }),
};

// Security Awareness API
export const awarenessApi = {
    getTrainingModules: (tenantId: string) =>
        apiClient.get(`/security-awareness/${tenantId}/modules`),
    
    getUserProgress: (tenantId: string, userId: string) =>
        apiClient.get(`/security-awareness/${tenantId}/users/${userId}/progress`),
    
    updateProgress: (tenantId: string, userId: string, moduleId: string, status: string) =>
        apiClient.post(`/security-awareness/${tenantId}/users/${userId}/progress`, {
            moduleId,
            status,
        }),
};

// Compliance Assessment API
export const complianceApi = {
    getAssessments: (tenantId: string) =>
        apiClient.get(`/compliance/${tenantId}/assessments`),
    
    getControls: (tenantId: string, framework: string) =>
        apiClient.get(`/compliance/${tenantId}/controls/${framework}`),
    
    updateControlStatus: (tenantId: string, controlId: string, status: string) =>
        apiClient.post(`/compliance/${tenantId}/controls/${controlId}/status`, { status }),
};

// Incident Response API
export const incidentApi = {
    getIncidents: (tenantId: string) =>
        apiClient.get(`/incidents/${tenantId}`),
    
    getIncidentDetails: (tenantId: string, incidentId: string) =>
        apiClient.get(`/incidents/${tenantId}/${incidentId}`),
    
    updateIncidentStatus: (tenantId: string, incidentId: string, status: string) =>
        apiClient.post(`/incidents/${tenantId}/${incidentId}/status`, { status }),
};

// Workflow Automation API
export const workflowApi = {
    // Workflow management
    getWorkflows: () =>
        apiClient.get('/workflows/'),
    
    getWorkflow: (workflowId: string) =>
        apiClient.get(`/workflows/${workflowId}`),
    
    triggerWorkflow: (data: {
        workflow_id: string;
        incident_id: string;
        context: Record<string, any>;
    }) =>
        apiClient.post('/workflows/trigger', data),
    
    createCustomWorkflow: (data: {
        name: string;
        description: string;
        severity_threshold: string;
        actions: any[];
        tags?: Record<string, string>;
    }) =>
        apiClient.post('/workflows/custom', data),
    
    // Execution tracking
    getActiveExecutions: () =>
        apiClient.get('/workflows/executions/active'),
    
    getExecutionHistory: (params?: {
        limit?: number;
        workflow_id?: string;
    }) =>
        apiClient.get('/workflows/executions/history', { params }),
    
    // Logic Apps integration
    listLogicApps: () =>
        apiClient.get('/workflows/logic-apps/list'),
    
    triggerLogicApp: (data: {
        workflow_name: string;
        trigger_name?: string;
        inputs?: Record<string, any>;
    }) =>
        apiClient.post('/workflows/logic-apps/trigger', data),
    
    getLogicAppRuns: (workflowName: string, top?: number) =>
        apiClient.get(`/workflows/logic-apps/${workflowName}/runs`, {
            params: { top }
        }),
    
    // Sentinel Playbooks
    listPlaybooks: () =>
        apiClient.get('/workflows/playbooks/list'),
    
    triggerPlaybook: (data: {
        incident_id: string;
        playbook_name: string;
        incident_data: Record<string, any>;
    }) =>
        apiClient.post('/workflows/playbooks/trigger', data),
    
    getPlaybookMetrics: (playbookName: string, days?: number) =>
        apiClient.get(`/workflows/playbooks/${playbookName}/metrics`, {
            params: { days }
        }),
    
    // Notifications
    sendNotification: (data: {
        recipients: string[];
        template_name: string;
        data: Record<string, any>;
        channels: string[];
        priority?: string;
    }) =>
        apiClient.post('/workflows/notifications/send', data),
    
    getNotificationTemplates: () =>
        apiClient.get('/workflows/notifications/templates'),
    
    // Action types and analytics
    getActionTypes: () =>
        apiClient.get('/workflows/action-types'),
    
    getWorkflowAnalytics: (days?: number) =>
        apiClient.get('/workflows/analytics', { params: { days } }),
};

export default {
    tenantApi,
    alertsApi,
    recommendationsApi,
    optimizationApi,
    hardeningApi,
    awarenessApi,
    complianceApi,
    incidentApi,
    workflowApi,
}; 