import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  DefaultButton,
  PrimaryButton,
  CommandBar,
  ICommandBarItemProps,
  SearchBox,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Panel,
  PanelType,
  IconButton,
  TooltipHost,
  ProgressIndicator,
  Dialog,
  DialogType,
  DialogFooter,
} from '@fluentui/react';
import { workflowApi } from '../services/api';
import {
  Workflow,
  WorkflowExecution,
  WorkflowStatus,
  ActionType,
  SeverityLevel
} from '../types';
import WorkflowTriggerForm from '../components/workflows/WorkflowTriggerForm';
import WorkflowCreationForm from '../components/workflows/WorkflowCreationForm';
import WorkflowExecutionPanel from '../components/workflows/WorkflowExecutionPanel';
import WorkflowAnalytics from '../components/workflows/WorkflowAnalytics';

const Workflows: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [activeExecutions, setActiveExecutions] = useState<WorkflowExecution[]>([]);
  const [executionHistory, setExecutionHistory] = useState<WorkflowExecution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [selectedExecution, setSelectedExecution] = useState<WorkflowExecution | null>(null);
  
  // Panel states
  const [showTriggerPanel, setShowTriggerPanel] = useState(false);
  const [showCreationPanel, setShowCreationPanel] = useState(false);
  const [showExecutionPanel, setShowExecutionPanel] = useState(false);
  const [showAnalyticsPanel, setShowAnalyticsPanel] = useState(false);
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'workflows' | 'executions' | 'active'>('workflows');

  useEffect(() => {
    loadInitialData();
    
    // Auto-refresh active executions every 30 seconds
    const interval = setInterval(() => {
      if (activeTab === 'active') {
        loadActiveExecutions();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [activeTab]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadWorkflows(),
        loadActiveExecutions(),
        loadExecutionHistory()
      ]);
    } catch (err) {
      setError('Failed to load workflow data');
      console.error('Failed to load workflows:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadWorkflows = async () => {
    try {
      const response = await workflowApi.getWorkflows();
      setWorkflows(response.data);
    } catch (err) {
      console.error('Failed to load workflows:', err);
    }
  };

  const loadActiveExecutions = async () => {
    try {
      const response = await workflowApi.getActiveExecutions();
      setActiveExecutions(response.data);
    } catch (err) {
      console.error('Failed to load active executions:', err);
    }
  };

  const loadExecutionHistory = async () => {
    try {
      const response = await workflowApi.getExecutionHistory({ limit: 50 });
      setExecutionHistory(response.data);
    } catch (err) {
      console.error('Failed to load execution history:', err);
    }
  };

  const handleTriggerWorkflow = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setShowTriggerPanel(true);
  };

  const handleCreateWorkflow = () => {
    setShowCreationPanel(true);
  };

  const handleViewExecution = (execution: WorkflowExecution) => {
    setSelectedExecution(execution);
    setShowExecutionPanel(true);
  };

  const handleWorkflowTriggered = () => {
    setShowTriggerPanel(false);
    loadActiveExecutions();
    setActiveTab('active');
  };

  const handleWorkflowCreated = () => {
    setShowCreationPanel(false);
    loadWorkflows();
  };

  const getStatusColor = (status: WorkflowStatus): string => {
    switch (status) {
      case WorkflowStatus.COMPLETED:
        return '#107C10';
      case WorkflowStatus.FAILED:
        return '#D13438';
      case WorkflowStatus.RUNNING:
        return '#0078D4';
      case WorkflowStatus.PENDING:
        return '#FF8C00';
      default:
        return '#666666';
    }
  };

  const getSeverityColor = (severity: SeverityLevel): string => {
    switch (severity) {
      case 'Critical':
        return '#D13438';
      case 'High':
        return '#FF4B4B';
      case 'Medium':
        return '#FF8C00';
      case 'Low':
        return '#107C10';
      default:
        return '#666666';
    }
  };

  // Command bar items
  const commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'create',
      text: 'Create Workflow',
      iconProps: { iconName: 'Add' },
      onClick: handleCreateWorkflow,
    },
    {
      key: 'refresh',
      text: 'Refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: loadInitialData,
    },
  ];

  const commandBarFarItems: ICommandBarItemProps[] = [
    {
      key: 'analytics',
      text: 'Analytics',
      iconProps: { iconName: 'BarChart4' },
      onClick: () => setShowAnalyticsPanel(true),
    },
  ];

  // Workflow columns
  const workflowColumns: IColumn[] = [
    {
      key: 'name',
      name: 'Name',
      fieldName: 'name',
      minWidth: 200,
      maxWidth: 300,
      isResizable: true,
      onRender: (item: Workflow) => (
        <Stack>
          <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
            {item.name}
          </Text>
          <Text variant="small" styles={{ root: { color: '#666' } }}>
            {item.description}
          </Text>
        </Stack>
      ),
    },
    {
      key: 'severity',
      name: 'Severity',
      fieldName: 'severity_threshold',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      onRender: (item: Workflow) => (
        <Text
          variant="medium"
          styles={{
            root: {
              color: getSeverityColor(item.severity_threshold),
              fontWeight: 600,
            },
          }}
        >
          {item.severity_threshold}
        </Text>
      ),
    },
    {
      key: 'actions',
      name: 'Actions',
      fieldName: 'actions_count',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item: Workflow) => (
        <Text variant="medium">{item.actions?.length || 0}</Text>
      ),
    },
    {
      key: 'created',
      name: 'Created',
      fieldName: 'created_at',
      minWidth: 120,
      maxWidth: 160,
      isResizable: true,
      onRender: (item: Workflow) => (
        <Text variant="small">
          {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
        </Text>
      ),
    },
    {
      key: 'trigger',
      name: 'Actions',
      minWidth: 100,
      maxWidth: 120,
      onRender: (item: Workflow) => (
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <TooltipHost content="Trigger workflow">
            <IconButton
              iconProps={{ iconName: 'Play' }}
              onClick={() => handleTriggerWorkflow(item)}
              styles={{
                root: { color: '#0078D4' },
                rootHovered: { backgroundColor: '#F3F2F1' },
              }}
            />
          </TooltipHost>
          <TooltipHost content="View details">
            <IconButton
              iconProps={{ iconName: 'View' }}
              onClick={() => {
                setSelectedWorkflow(item);
                // TODO: Show workflow details panel
              }}
              styles={{
                root: { color: '#666' },
                rootHovered: { backgroundColor: '#F3F2F1' },
              }}
            />
          </TooltipHost>
        </Stack>
      ),
    },
  ];

  // Execution columns
  const executionColumns: IColumn[] = [
    {
      key: 'workflow',
      name: 'Workflow',
      fieldName: 'workflow_id',
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: WorkflowExecution) => {
        const workflow = workflows.find(w => w.id === item.workflow_id);
        return (
          <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
            {workflow?.name || item.workflow_id}
          </Text>
        );
      },
    },
    {
      key: 'incident',
      name: 'Incident',
      fieldName: 'incident_id',
      minWidth: 120,
      maxWidth: 150,
      isResizable: true,
      onRender: (item: WorkflowExecution) => (
        <Text variant="small" styles={{ root: { fontFamily: 'Monaco, monospace' } }}>
          {item.incident_id}
        </Text>
      ),
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      onRender: (item: WorkflowExecution) => (
        <Text
          variant="medium"
          styles={{
            root: {
              color: getStatusColor(item.status),
              fontWeight: 600,
            },
          }}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      ),
    },
    {
      key: 'progress',
      name: 'Progress',
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      onRender: (item: WorkflowExecution) => {
        if (item.status === WorkflowStatus.RUNNING && item.current_action) {
          const workflow = workflows.find(w => w.id === item.workflow_id);
          const totalActions = workflow?.actions?.length || 1;
          const completed = item.executed_actions?.length || 0;
          const progress = completed / totalActions;
          
          return (
            <Stack tokens={{ childrenGap: 4 }}>
              <ProgressIndicator percentComplete={progress} />
              <Text variant="small">{completed}/{totalActions} actions</Text>
            </Stack>
          );
        }
        return <Text variant="small">-</Text>;
      },
    },
    {
      key: 'started',
      name: 'Started',
      fieldName: 'started_at',
      minWidth: 120,
      maxWidth: 160,
      isResizable: true,
      onRender: (item: WorkflowExecution) => (
        <Text variant="small">
          {new Date(item.started_at).toLocaleString()}
        </Text>
      ),
    },
    {
      key: 'duration',
      name: 'Duration',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item: WorkflowExecution) => {
        if (item.duration_seconds) {
          const minutes = Math.floor(item.duration_seconds / 60);
          const seconds = item.duration_seconds % 60;
          return <Text variant="small">{minutes}m {seconds}s</Text>;
        }
        return <Text variant="small">-</Text>;
      },
    },
    {
      key: 'view',
      name: 'Actions',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: WorkflowExecution) => (
        <TooltipHost content="View execution details">
          <IconButton
            iconProps={{ iconName: 'View' }}
            onClick={() => handleViewExecution(item)}
            styles={{
              root: { color: '#0078D4' },
              rootHovered: { backgroundColor: '#F3F2F1' },
            }}
          />
        </TooltipHost>
      ),
    },
  ];

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExecutions = executionHistory.filter(execution => {
    const workflow = workflows.find(w => w.id === execution.workflow_id);
    return (
      execution.incident_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (workflow?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        styles={{ root: { height: '400px' } }}
      >
        <Spinner size={SpinnerSize.large} label="Loading workflows..." />
      </Stack>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: '20px' } }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack>
          <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>
            Automation Workflows
          </Text>
          <Text variant="medium" styles={{ root: { color: '#666' } }}>
            Manage and monitor automated security response workflows
          </Text>
        </Stack>
      </Stack>

      {error && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(null)}>
          {error}
        </MessageBar>
      )}

      <CommandBar items={commandBarItems} farItems={commandBarFarItems} />

      <Stack horizontal tokens={{ childrenGap: 20 }}>
        <DefaultButton
          text={`Workflows (${workflows.length})`}
          iconProps={{ iconName: 'Flow' }}
          styles={{
            root: {
              backgroundColor: activeTab === 'workflows' ? '#EDF2FE' : 'transparent',
              borderColor: activeTab === 'workflows' ? '#0078D4' : '#D1D1D1',
            },
          }}
          onClick={() => setActiveTab('workflows')}
        />
        <DefaultButton
          text={`Active (${activeExecutions.length})`}
          iconProps={{ iconName: 'Running' }}
          styles={{
            root: {
              backgroundColor: activeTab === 'active' ? '#EDF2FE' : 'transparent',
              borderColor: activeTab === 'active' ? '#0078D4' : '#D1D1D1',
            },
          }}
          onClick={() => setActiveTab('active')}
        />
        <DefaultButton
          text={`History (${executionHistory.length})`}
          iconProps={{ iconName: 'History' }}
          styles={{
            root: {
              backgroundColor: activeTab === 'executions' ? '#EDF2FE' : 'transparent',
              borderColor: activeTab === 'executions' ? '#0078D4' : '#D1D1D1',
            },
          }}
          onClick={() => setActiveTab('executions')}
        />
      </Stack>

      <SearchBox
        placeholder={
          activeTab === 'workflows'
            ? 'Search workflows...'
            : 'Search executions...'
        }
        value={searchQuery}
        onChange={(_, newValue) => setSearchQuery(newValue || '')}
        styles={{ root: { maxWidth: '300px' } }}
      />

      {activeTab === 'workflows' && (
        <DetailsList
          items={filteredWorkflows}
          columns={workflowColumns}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
          isHeaderVisible={true}
          styles={{
            root: {
              backgroundColor: 'white',
              border: '1px solid #D1D1D1',
            },
          }}
        />
      )}

      {activeTab === 'active' && (
        <DetailsList
          items={activeExecutions}
          columns={executionColumns}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
          isHeaderVisible={true}
          styles={{
            root: {
              backgroundColor: 'white',
              border: '1px solid #D1D1D1',
            },
          }}
        />
      )}

      {activeTab === 'executions' && (
        <DetailsList
          items={filteredExecutions}
          columns={executionColumns}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
          isHeaderVisible={true}
          styles={{
            root: {
              backgroundColor: 'white',
              border: '1px solid #D1D1D1',
            },
          }}
        />
      )}

      {/* Workflow Trigger Panel */}
      <Panel
        isOpen={showTriggerPanel}
        type={PanelType.medium}
        headerText={`Trigger Workflow: ${selectedWorkflow?.name}`}
        onDismiss={() => setShowTriggerPanel(false)}
        isBlocking={false}
      >
        {selectedWorkflow && (
          <WorkflowTriggerForm
            workflow={selectedWorkflow}
            onSuccess={handleWorkflowTriggered}
            onCancel={() => setShowTriggerPanel(false)}
          />
        )}
      </Panel>

      {/* Workflow Creation Panel */}
      <Panel
        isOpen={showCreationPanel}
        type={PanelType.large}
        headerText="Create Custom Workflow"
        onDismiss={() => setShowCreationPanel(false)}
        isBlocking={false}
      >
        <WorkflowCreationForm
          onSuccess={handleWorkflowCreated}
          onCancel={() => setShowCreationPanel(false)}
        />
      </Panel>

      {/* Execution Details Panel */}
      <Panel
        isOpen={showExecutionPanel}
        type={PanelType.medium}
        headerText="Execution Details"
        onDismiss={() => setShowExecutionPanel(false)}
        isBlocking={false}
      >
        {selectedExecution && (
          <WorkflowExecutionPanel
            execution={selectedExecution}
            workflow={workflows.find(w => w.id === selectedExecution.workflow_id)}
          />
        )}
      </Panel>

      {/* Analytics Panel */}
      <Panel
        isOpen={showAnalyticsPanel}
        type={PanelType.large}
        headerText="Workflow Analytics"
        onDismiss={() => setShowAnalyticsPanel(false)}
        isBlocking={false}
      >
        <WorkflowAnalytics />
      </Panel>
    </Stack>
  );
};

export default Workflows; 