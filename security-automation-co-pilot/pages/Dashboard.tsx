import React from 'react';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Card } from '@fluentui/react-cards';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useTheme } from '@fluentui/react';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  const stackTokens: IStackTokens = {
    childrenGap: 20,
    padding: 20,
  };

  const cardStyles = {
    root: {
      backgroundColor: theme.palette.white,
      padding: 20,
      borderRadius: theme.effects.roundedCorner4,
      boxShadow: theme.effects.elevation4,
    },
  };

  const metrics = [
    {
      title: 'Active Incidents',
      value: '12',
      trend: '+2 from yesterday',
      severity: 'high',
    },
    {
      title: 'Compliance Score',
      value: '85%',
      trend: '+5% this month',
      severity: 'medium',
    },
    {
      title: 'Open Vulnerabilities',
      value: '47',
      trend: '-3 this week',
      severity: 'medium',
    },
    {
      title: 'Security Training',
      value: '92%',
      trend: 'Completion rate',
      severity: 'low',
    },
  ];

  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xxLarge">Security Dashboard</Text>
        <DefaultButton
          iconProps={{ iconName: 'Refresh' }}
          text="Refresh Data"
          onClick={() => {
            // Implement refresh logic
          }}
        />
      </Stack>

      <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
        {metrics.map((metric) => (
          <Card key={metric.title} styles={cardStyles} tokens={{ width: '280px' }}>
            <Card.Item>
              <Text variant="large">{metric.title}</Text>
            </Card.Item>
            <Card.Item>
              <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                <Text variant="xxLarge" styles={{ root: { color: theme.palette.themePrimary } }}>
                  {metric.value}
                </Text>
                <Text
                  variant="small"
                  styles={{
                    root: {
                      color:
                        metric.severity === 'high'
                          ? theme.palette.red
                          : metric.severity === 'medium'
                          ? theme.palette.orange
                          : theme.palette.green,
                    },
                  }}
                >
                  {metric.trend}
                </Text>
              </Stack>
            </Card.Item>
          </Card>
        ))}
      </Stack>

      <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
        <Card styles={cardStyles} tokens={{ width: '580px' }}>
          <Card.Item>
            <Text variant="large">Recent Security Incidents</Text>
          </Card.Item>
          <Card.Item>
            {/* Add incident timeline or list component here */}
            <Text>Incident timeline will be displayed here</Text>
          </Card.Item>
        </Card>

        <Card styles={cardStyles} tokens={{ width: '580px' }}>
          <Card.Item>
            <Text variant="large">Compliance Status</Text>
          </Card.Item>
          <Card.Item>
            {/* Add compliance chart component here */}
            <Text>Compliance chart will be displayed here</Text>
          </Card.Item>
        </Card>
      </Stack>

      <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
        <Card styles={cardStyles} tokens={{ width: '380px' }}>
          <Card.Item>
            <Text variant="large">Top Vulnerabilities</Text>
          </Card.Item>
          <Card.Item>
            {/* Add vulnerability list component here */}
            <Text>Vulnerability list will be displayed here</Text>
          </Card.Item>
        </Card>

        <Card styles={cardStyles} tokens={{ width: '380px' }}>
          <Card.Item>
            <Text variant="large">Security Training Progress</Text>
          </Card.Item>
          <Card.Item>
            {/* Add training progress component here */}
            <Text>Training progress chart will be displayed here</Text>
          </Card.Item>
        </Card>

        <Card styles={cardStyles} tokens={{ width: '380px' }}>
          <Card.Item>
            <Text variant="large">Security Recommendations</Text>
          </Card.Item>
          <Card.Item>
            {/* Add recommendations component here */}
            <Text>Security recommendations will be displayed here</Text>
          </Card.Item>
        </Card>
      </Stack>
    </Stack>
  );
};

export default Dashboard; 