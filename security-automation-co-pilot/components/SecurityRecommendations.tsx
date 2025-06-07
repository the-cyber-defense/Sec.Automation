import React, { useEffect, useState } from 'react';
import { Stack, Text, Spinner, SpinnerSize, PrimaryButton, DefaultButton } from '@fluentui/react';
import { SecurityRecommendation } from '../types';

interface SecurityRecommendationsProps {
  tenantId: string;
}

export const SecurityRecommendations: React.FC<SecurityRecommendationsProps> = ({ tenantId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<SecurityRecommendation[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/tenant/recommendations/${tenantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [tenantId]);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
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
        <Spinner size={SpinnerSize.large} label="Loading security recommendations..." />
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

  if (recommendations.length === 0) {
    return <Text>No security recommendations available</Text>;
  }

  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Text variant="xLarge">Security Recommendations</Text>
      
      <Stack tokens={{ childrenGap: 15 }}>
        {recommendations.map((recommendation) => (
          <Stack
            key={recommendation.id}
            tokens={{ childrenGap: 10 }}
            style={{
              padding: '15px',
              border: '1px solid #edebe9',
              borderRadius: '4px',
              backgroundColor: '#faf9f8'
            }}
          >
            <Stack horizontal horizontalAlign="space-between">
              <Text variant="large">{recommendation.title}</Text>
              <Text
                style={{
                  color: getPriorityColor(recommendation.priority),
                  fontWeight: 'bold'
                }}
              >
                {recommendation.priority}
              </Text>
            </Stack>
            
            <Text>{recommendation.description}</Text>
            
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <Text variant="medium">Category: {recommendation.category}</Text>
              <Text variant="medium">Status: {recommendation.status}</Text>
            </Stack>
            
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <PrimaryButton text="Implement" />
              <DefaultButton text="Dismiss" />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}; 