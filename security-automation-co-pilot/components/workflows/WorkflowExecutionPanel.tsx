import React from 'react';
import {
  Stack,
  Text,
  ProgressIndicator,
  Icon,
  Separator,
  Label,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import { Workflow, WorkflowExecution, WorkflowStatus } from '../../types';

interface WorkflowExecutionPanelProps {
  execution: WorkflowExecution;
  workflow?: Workflow;
}

const WorkflowExecutionPanel: React.FC<WorkflowExecutionPanelProps> = ({
  execution,
  workflow,
}) => {
  const getStatusIcon = (status: WorkflowStatus): string => {
    switch (status) {
      case WorkflowStatus.COMPLETED:
        return 'CheckMark';
      case WorkflowStatus.FAILED:
        return 'ErrorBadge';
      case WorkflowStatus.RUNNING:
        return 'Running';
      case WorkflowStatus.PENDING:
        return 'Clock';
      case WorkflowStatus.CANCELLED:
        return 'Cancel';
      case WorkflowStatus.PAUSED:
        return 'Pause';
      default:
        return 'Unknown';
    }
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
      case WorkflowStatus.CANCELLED:
        return '#666666';
      case WorkflowStatus.PAUSED:
        return '#FF8C00';
      default:
        return '#666666';
    }
  };

  const getActionStatusIcon = (actionId: string): string => {
    if (execution.executed_actions.includes(actionId)) {
      const result = execution.action_results[actionId];
      if (result?.success) {
        return 'CheckMark';
      } else {
        return 'ErrorBadge';
      }
    } else if (execution.current_action === actionId) {
      return 'Running';
    } else {
      return 'Clock';
    }
  };

  const getActionStatusColor = (actionId: string): string => {
    if (execution.executed_actions.includes(actionId)) {
      const result = execution.action_results[actionId];
      if (result?.success) {
        return '#107C10';
      } else {
        return '#D13438';
      }
    } else if (execution.current_action === actionId) {
      return '#0078D4';
    } else {
      return '#666666';
    }
  };

  const formatDuration = (seconds?: number): string => {
    if (!seconds) return 'N/A';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getExecutionProgress = (): number => {
    if (!workflow?.actions?.length) return 0;
    
    const totalActions = workflow.actions.length;
    const completedActions = execution.executed_actions.length;
    
    return completedActions / totalActions;
  };

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: '20px 0' } }}>
      {/* Execution Status */}
      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          Execution Status
        </Text>
        
        <Stack
          styles={{
            root: {
              padding: '16px',
              backgroundColor: '#F8F9FA',
              borderRadius: '4px',
              border: '1px solid #E1E1E1',
            },
          }}
        >
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
            <Icon
              iconName={getStatusIcon(execution.status)}
              styles={{
                root: {
                  color: getStatusColor(execution.status),
                  fontSize: '24px',
                },
              }}
            />
            <Stack grow>
              <Text variant="large" styles={{ root: { fontWeight: 600 } }}>
                {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
              </Text>
              {workflow && (
                <Text variant="medium" styles={{ root: { color: '#666' } }}>
                  {workflow.name}
                </Text>
              )}
            </Stack>
          </Stack>
          
          {execution.status === WorkflowStatus.RUNNING && (
            <Stack tokens={{ childrenGap: 8 }} styles={{ root: { marginTop: '12px' } }}>
              <ProgressIndicator
                percentComplete={getExecutionProgress()}
                description={`${execution.executed_actions.length} of ${workflow?.actions?.length || 0} actions completed`}
              />
              {execution.current_action && (
                <Text variant="small" styles={{ root: { color: '#666' } }}>
                  Currently executing: {execution.current_action}
                </Text>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>

      <Separator />

      {/* Execution Details */}
      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          Execution Details
        </Text>
        
        <Stack tokens={{ childrenGap: 12 }}>
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <Stack grow>
              <Label>Execution ID</Label>
              <Text
                variant="small"
                styles={{
                  root: {
                    fontFamily: 'Monaco, monospace',
                    backgroundColor: '#F3F2F1',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  },
                }}
              >
                {execution.id}
              </Text>
            </Stack>
            <Stack grow>
              <Label>Incident ID</Label>
              <Text
                variant="small"
                styles={{
                  root: {
                    fontFamily: 'Monaco, monospace',
                    backgroundColor: '#F3F2F1',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  },
                }}
              >
                {execution.incident_id}
              </Text>
            </Stack>
          </Stack>

          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <Stack grow>
              <Label>Started At</Label>
              <Text variant="medium">
                {new Date(execution.started_at).toLocaleString()}
              </Text>
            </Stack>
            <Stack grow>
              <Label>Completed At</Label>
              <Text variant="medium">
                {execution.completed_at 
                  ? new Date(execution.completed_at).toLocaleString()
                  : 'N/A'
                }
              </Text>
            </Stack>
          </Stack>

          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <Stack grow>
              <Label>Duration</Label>
              <Text variant="medium">
                {formatDuration(execution.duration_seconds)}
              </Text>
            </Stack>
            <Stack grow>
              <Label>Triggered By</Label>
              <Text variant="medium">{execution.triggered_by}</Text>
            </Stack>
          </Stack>

          {execution.error_message && (
            <Stack>
              <Label>Error Message</Label>
              <MessageBar messageBarType={MessageBarType.error}>
                {execution.error_message}
              </MessageBar>
            </Stack>
          )}
        </Stack>
      </Stack>

      <Separator />

      {/* Action Timeline */}
      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          Action Timeline
        </Text>
        
        {workflow?.actions?.map((action, index) => {
          const isCurrent = execution.current_action === action.id;
          const result = execution.action_results[action.id];
          
          return (
            <Stack
              key={action.id}
              styles={{
                root: {
                  padding: '16px',
                  backgroundColor: isCurrent ? '#EDF2FE' : '#F8F9FA',
                  borderRadius: '4px',
                  border: `1px solid ${isCurrent ? '#0078D4' : '#E1E1E1'}`,
                },
              }}
            >
              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
                <Text
                  variant="small"
                  styles={{
                    root: {
                      backgroundColor: isCurrent ? '#0078D4' : '#666',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      minWidth: '24px',
                      textAlign: 'center',
                    },
                  }}
                >
                  {index + 1}
                </Text>
                
                <Icon
                  iconName={getActionStatusIcon(action.id)}
                  styles={{
                    root: {
                      color: getActionStatusColor(action.id),
                      fontSize: '16px',
                    },
                  }}
                />
                
                <Stack grow>
                  <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
                    {action.name}
                  </Text>
                  <Text variant="small" styles={{ root: { color: '#666' } }}>
                    {action.description}
                  </Text>
                  <Text
                    variant="small"
                    styles={{
                      root: {
                        fontFamily: 'Monaco, monospace',
                        color: '#666',
                        marginTop: '4px',
                      },
                    }}
                  >
                    {action.type}
                  </Text>
                </Stack>
                
                {isCurrent && (
                  <Icon
                    iconName="Running"
                    styles={{
                      root: {
                        color: '#0078D4',
                        fontSize: '16px',
                        animation: 'spin 2s linear infinite',
                      },
                    }}
                  />
                )}
              </Stack>
              
              {result && (
                <Stack tokens={{ childrenGap: 8 }} styles={{ root: { marginTop: '12px' } }}>
                  <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                    <Icon
                      iconName={result.success ? 'CheckMark' : 'ErrorBadge'}
                      styles={{
                        root: {
                          color: result.success ? '#107C10' : '#D13438',
                          fontSize: '14px',
                        },
                      }}
                    />
                    <Text
                      variant="small"
                      styles={{
                        root: {
                          color: result.success ? '#107C10' : '#D13438',
                          fontWeight: 600,
                        },
                      }}
                    >
                      {result.success ? 'Success' : 'Failed'}
                    </Text>
                    {result.duration && (
                      <Text variant="small" styles={{ root: { color: '#666' } }}>
                        ({formatDuration(result.duration)})
                      </Text>
                    )}
                  </Stack>
                  
                  {result.message && (
                    <Text
                      variant="small"
                      styles={{
                        root: {
                          backgroundColor: result.success ? '#DFF6DD' : '#FDE7E9',
                          padding: '8px',
                          borderRadius: '4px',
                        },
                      }}
                    >
                      {result.message}
                    </Text>
                  )}
                  
                  {result.output && (
                    <Stack>
                      <Label styles={{ root: { fontSize: '12px' } }}>Output:</Label>
                      <Text
                        variant="small"
                        styles={{
                          root: {
                            fontFamily: 'Monaco, monospace',
                            backgroundColor: '#F3F2F1',
                            padding: '8px',
                            borderRadius: '4px',
                            whiteSpace: 'pre-wrap',
                          },
                        }}
                      >
                        {typeof result.output === 'string' 
                          ? result.output 
                          : JSON.stringify(result.output, null, 2)
                        }
                      </Text>
                    </Stack>
                  )}
                </Stack>
              )}
            </Stack>
          );
        })}
      </Stack>

      <Separator />

      {/* Context Information */}
      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          Context Information
        </Text>
        
        <Stack>
          <Label>Execution Context</Label>
          <Text
            variant="small"
            styles={{
              root: {
                fontFamily: 'Monaco, monospace',
                backgroundColor: '#F3F2F1',
                padding: '12px',
                borderRadius: '4px',
                whiteSpace: 'pre-wrap',
                maxHeight: '200px',
                overflow: 'auto',
              },
            }}
          >
            {JSON.stringify(execution.context, null, 2)}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WorkflowExecutionPanel; 