import React, { useEffect, useState } from 'react';
import { Stack, Text, Spinner, SpinnerSize, PrimaryButton, DefaultButton, DetailsList, IColumn } from '@fluentui/react';
import { SecurityAlert } from '../types';

interface SecurityAlertsProps {
  tenantId: string;
}

export const SecurityAlerts: React.FC<SecurityAlertsProps> = ({ tenantId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/tenant/alerts/${tenantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch security alerts');
        }
        const data = await response.json();
        setAlerts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [tenantId]);

  const columns: IColumn[] = [
    {
      key: 'title',
      name: 'Title',
      fieldName: 'title',
      minWidth: 200,
      maxWidth: 300,
    },
    {
      key: 'severity',
      name: 'Severity',
      fieldName: 'severity',
      minWidth: 100,
      maxWidth: 100,
      onRender: (item: SecurityAlert) => (
        <Text style={{ color: getSeverityColor(item.severity) }}>
          {item.severity}
        </Text>
      ),
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 100,
      maxWidth: 100,
    },
    {
      key: 'category',
      name: 'Category',
      fieldName: 'category',
      minWidth: 150,
      maxWidth: 200,
    },
    {
      key: 'createdDateTime',
      name: 'Created',
      fieldName: 'createdDateTime',
      minWidth: 150,
      maxWidth: 200,
      onRender: (item: SecurityAlert) => (
        <Text>{new Date(item.createdDateTime).toLocaleString()}</Text>
      ),
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return '#d13438';
      case 'high':
        return '#ff8c00';
      case 'medium':
        return '#ffb900';
      case 'low':
        return '#107c10';
      default:
        return '#605e5c';
    }
  };

  if (loading) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '100vh' }}>
        <Spinner size={SpinnerSize.large} label="Loading security alerts..." />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack tokens={{ childrenGap: 10 }}>
        <Text variant="large" style={{ color: 'red' }}>Error: {error}</Text>
        <PrimaryButton text="Retry" onClick={() => window.location.reload()} />
      </Stack>
    );
  }

  if (alerts.length === 0) {
    return <Text>No security alerts available</Text>;
  }

  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xLarge">Security Alerts</Text>
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <PrimaryButton text="Export" />
          <DefaultButton text="Refresh" onClick={() => window.location.reload()} />
        </Stack>
      </Stack>

      <DetailsList
        items={alerts}
        columns={columns}
        selectionMode={0}
        isHeaderVisible={true}
        styles={{
          root: {
            selectors: {
              '.ms-DetailsHeader': {
                paddingTop: 0,
              },
            },
          },
        }}
      />
    </Stack>
  );
}; 