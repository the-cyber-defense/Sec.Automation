import React, { useEffect, useState } from 'react';
import { Stack, Text, Spinner, SpinnerSize, PrimaryButton } from '@fluentui/react';
import { SecurityPosture } from '../types';

interface TenantAnalysisProps {
  tenantId: string;
}

export const TenantAnalysis: React.FC<TenantAnalysisProps> = ({ tenantId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [securityPosture, setSecurityPosture] = useState<SecurityPosture | null>(null);

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/tenant/analyze/${tenantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tenant data');
        }
        const data = await response.json();
        setSecurityPosture(data.security_posture);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
  }, [tenantId]);

  if (loading) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '100vh' }}>
        <Spinner size={SpinnerSize.large} label="Analyzing tenant security posture..." />
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

  if (!securityPosture) {
    return <Text>No security posture data available</Text>;
  }

  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Text variant="xLarge">Security Posture Analysis</Text>
      
      <Stack tokens={{ childrenGap: 10 }}>
        <Text variant="large">Risk Score: {securityPosture.risk_score}</Text>
        
        <Text variant="mediumPlus">Enabled Services:</Text>
        <Stack tokens={{ childrenGap: 5 }}>
          {securityPosture.enabled_services.map((service, index) => (
            <Text key={index}>{service}</Text>
          ))}
        </Stack>

        <Text variant="mediumPlus">Security Controls:</Text>
        <Stack tokens={{ childrenGap: 5 }}>
          {Object.entries(securityPosture.security_controls).map(([control, enabled]) => (
            <Text key={control}>
              {control}: {enabled ? '✅' : '❌'}
            </Text>
          ))}
        </Stack>

        <Text variant="mediumPlus">
          Last Assessment: {new Date(securityPosture.last_assessment).toLocaleString()}
        </Text>
      </Stack>
    </Stack>
  );
}; 