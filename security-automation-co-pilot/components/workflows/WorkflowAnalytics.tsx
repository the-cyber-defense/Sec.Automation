import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  Dropdown,
  IDropdownOption,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Separator,
  IStackTokens,
} from '@fluentui/react';
import { workflowApi } from '../../services/api';
import { WorkflowAnalytics as IWorkflowAnalytics } from '../../types';

const WorkflowAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<IWorkflowAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<number>(30);

  const timeRangeOptions: IDropdownOption[] = [
    { key: 7, text: 'Last 7 days' },
    { key: 30, text: 'Last 30 days' },
    { key: 90, text: 'Last 90 days' },
    { key: 365, text: 'Last year' },
  ];

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await workflowApi.getWorkflowAnalytics(timeRange);
      setAnalytics(response.data);
    } catch (err: any) {
      console.error('Failed to load analytics:', err);
      setError('Failed to load workflow analytics');
    } finally {
      setLoading(false);
    }
  };

  const getTotalExecutions = (): number => {
    return analytics.reduce((total, item) => total + item.total_executions, 0);
  };

  const getTotalSuccessful = (): number => {
    return analytics.reduce((total, item) => total + item.successful, 0);
  };

  const getTotalFailed = (): number => {
    return analytics.reduce((total, item) => total + item.failed, 0);
  };

  const getOverallSuccessRate = (): number => {
    const total = getTotalExecutions();
    const successful = getTotalSuccessful();
    return total > 0 ? (successful / total) * 100 : 0;
  };

  const getAverageExecutionTime = (): number => {
    if (analytics.length === 0) return 0;
    
    const totalDuration = analytics.reduce((total, item) => {
      return total + (item.average_duration * item.total_executions);
    }, 0);
    
    const totalExecutions = getTotalExecutions();
    return totalExecutions > 0 ? totalDuration / totalExecutions : 0;
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${secs.toFixed(1)}s`;
    } else {
      return `${secs.toFixed(1)}s`;
    }
  };

  const getSuccessRateColor = (rate: number): string => {
    if (rate >= 95) return '#107C10';
    if (rate >= 80) return '#FF8C00';
    return '#D13438';
  };

  const stackTokens: IStackTokens = {
    childrenGap: 20,
  };

  const cardStyles = {
    root: {
      padding: '20px',
      minWidth: '200px',
      backgroundColor: '#F8F9FA',
      border: '1px solid #E1E1E1',
      borderRadius: '4px',
    },
  };

  if (loading) {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        styles={{ root: { height: '300px' } }}
      >
        <Spinner size={SpinnerSize.large} label="Loading analytics..." />
      </Stack>
    );
  }

  return (
    <Stack tokens={stackTokens} styles={{ root: { padding: '20px 0' } }}>
      {error && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(null)}>
          {error}
        </MessageBar>
      )}

      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          Workflow Analytics
        </Text>
        <Dropdown
          selectedKey={timeRange}
          onChange={(_, option) => setTimeRange(option?.key as number)}
          options={timeRangeOptions}
          styles={{ root: { minWidth: '150px' } }}
        />
      </Stack>

      {/* Summary Cards */}
      <Stack horizontal tokens={{ childrenGap: 20 }}>
        <Stack styles={cardStyles}>
          <Stack tokens={{ childrenGap: 8 }}>
            <Text variant="large" styles={{ root: { fontWeight: 600, color: '#0078D4' } }}>
              {getTotalExecutions().toLocaleString()}
            </Text>
            <Text variant="medium">Total Executions</Text>
            <Stack horizontal tokens={{ childrenGap: 8 }}>
              <Text variant="small" styles={{ root: { color: '#107C10' } }}>
                ✓ {getTotalSuccessful()}
              </Text>
              <Text variant="small" styles={{ root: { color: '#D13438' } }}>
                ✗ {getTotalFailed()}
              </Text>
            </Stack>
          </Stack>
        </Stack>

        <Stack styles={cardStyles}>
          <Stack tokens={{ childrenGap: 8 }}>
            <Text
              variant="large"
              styles={{
                root: {
                  fontWeight: 600,
                  color: getSuccessRateColor(getOverallSuccessRate()),
                },
              }}
            >
              {getOverallSuccessRate().toFixed(1)}%
            </Text>
            <Text variant="medium">Success Rate</Text>
            <Text variant="small" styles={{ root: { color: '#666' } }}>
              Overall performance
            </Text>
          </Stack>
        </Stack>

        <Stack styles={cardStyles}>
          <Stack tokens={{ childrenGap: 8 }}>
            <Text variant="large" styles={{ root: { fontWeight: 600, color: '#FF8C00' } }}>
              {formatDuration(getAverageExecutionTime())}
            </Text>
            <Text variant="medium">Avg. Duration</Text>
            <Text variant="small" styles={{ root: { color: '#666' } }}>
              Per execution
            </Text>
          </Stack>
        </Stack>

        <Stack styles={cardStyles}>
          <Stack tokens={{ childrenGap: 8 }}>
            <Text variant="large" styles={{ root: { fontWeight: 600, color: '#666' } }}>
              {analytics.length}
            </Text>
            <Text variant="medium">Active Workflows</Text>
            <Text variant="small" styles={{ root: { color: '#666' } }}>
              With executions
            </Text>
          </Stack>
        </Stack>
      </Stack>

      <Separator />

      {/* Workflow Performance Table */}
      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          Workflow Performance
        </Text>

        {analytics.length === 0 ? (
          <Stack
            horizontalAlign="center"
            verticalAlign="center"
            styles={{
              root: {
                padding: '40px',
                backgroundColor: '#F8F9FA',
                border: '2px dashed #D1D1D1',
                borderRadius: '4px',
              },
            }}
          >
            <Text variant="medium" styles={{ root: { color: '#666' } }}>
              No workflow execution data available for the selected time range.
            </Text>
          </Stack>
        ) : (
          <Stack tokens={{ childrenGap: 12 }}>
            {analytics
              .sort((a, b) => b.total_executions - a.total_executions)
              .map((item) => (
                <Stack
                  key={item.workflow_id}
                  styles={{
                    root: {
                      padding: '16px',
                      backgroundColor: 'white',
                      border: '1px solid #E1E1E1',
                      borderRadius: '4px',
                    },
                  }}
                >
                  <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                    <Stack grow tokens={{ childrenGap: 4 }}>
                      <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
                        Workflow {item.workflow_id}
                      </Text>
                      <Stack horizontal tokens={{ childrenGap: 20 }}>
                        <Text variant="small" styles={{ root: { color: '#666' } }}>
                          <strong>Executions:</strong> {item.total_executions}
                        </Text>
                        <Text variant="small" styles={{ root: { color: '#666' } }}>
                          <strong>Duration:</strong> {formatDuration(item.average_duration)}
                        </Text>
                      </Stack>
                    </Stack>

                    <Stack horizontalAlign="end" tokens={{ childrenGap: 4 }}>
                      <Text
                        variant="medium"
                        styles={{
                          root: {
                            fontWeight: 600,
                            color: getSuccessRateColor(item.success_rate),
                          },
                        }}
                      >
                        {item.success_rate.toFixed(1)}%
                      </Text>
                      <Stack horizontal tokens={{ childrenGap: 8 }}>
                        <Text variant="small" styles={{ root: { color: '#107C10' } }}>
                          ✓ {item.successful}
                        </Text>
                        <Text variant="small" styles={{ root: { color: '#D13438' } }}>
                          ✗ {item.failed}
                        </Text>
                      </Stack>
                    </Stack>
                  </Stack>

                  {/* Success Rate Progress Bar */}
                  <Stack styles={{ root: { marginTop: '12px' } }}>
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: '#F3F2F1',
                        borderRadius: '3px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${item.success_rate}%`,
                          height: '100%',
                          backgroundColor: getSuccessRateColor(item.success_rate),
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                  </Stack>
                </Stack>
              ))}
          </Stack>
        )}
      </Stack>

      <Separator />

      {/* Performance Insights */}
      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          Performance Insights
        </Text>

        <Stack tokens={{ childrenGap: 12 }}>
          {getOverallSuccessRate() < 80 && (
            <MessageBar messageBarType={MessageBarType.warning}>
              <strong>Low Success Rate:</strong> Overall workflow success rate is{' '}
              {getOverallSuccessRate().toFixed(1)}%. Consider reviewing failed executions and
              improving workflow reliability.
            </MessageBar>
          )}

          {getAverageExecutionTime() > 300 && (
            <MessageBar messageBarType={MessageBarType.info}>
              <strong>Long Execution Times:</strong> Average workflow execution time is{' '}
              {formatDuration(getAverageExecutionTime())}. Consider optimizing workflow actions
              for better performance.
            </MessageBar>
          )}

          {analytics.some((item) => item.success_rate < 50) && (
            <MessageBar messageBarType={MessageBarType.error}>
              <strong>Critical Workflows:</strong> Some workflows have success rates below 50%.
              Immediate attention required to fix failing workflows.
            </MessageBar>
          )}

          {getTotalExecutions() === 0 && (
            <MessageBar messageBarType={MessageBarType.info}>
              <strong>No Activity:</strong> No workflow executions in the selected time range.
              Workflows may not be properly configured or triggered.
            </MessageBar>
          )}

          {analytics.length > 0 && (
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
              <Text variant="medium" styles={{ root: { fontWeight: 600, marginBottom: '8px' } }}>
                Summary for last {timeRange} days:
              </Text>
              <Stack tokens={{ childrenGap: 4 }}>
                <Text variant="small">
                  • Most active workflow: {
                    analytics.reduce((max, item) =>
                      item.total_executions > max.total_executions ? item : max
                    ).workflow_id
                  } ({
                    analytics.reduce((max, item) =>
                      item.total_executions > max.total_executions ? item : max
                    ).total_executions
                  } executions)
                </Text>
                <Text variant="small">
                  • Best performing workflow: {
                    analytics.reduce((max, item) =>
                      item.success_rate > max.success_rate ? item : max
                    ).workflow_id
                  } ({
                    analytics.reduce((max, item) =>
                      item.success_rate > max.success_rate ? item : max
                    ).success_rate.toFixed(1)
                  }% success rate)
                </Text>
                <Text variant="small">
                  • Fastest workflow: {
                    analytics.reduce((min, item) =>
                      item.average_duration < min.average_duration ? item : min
                    ).workflow_id
                  } ({
                    formatDuration(
                      analytics.reduce((min, item) =>
                        item.average_duration < min.average_duration ? item : min
                      ).average_duration
                    )
                  } avg)
                </Text>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WorkflowAnalytics; 