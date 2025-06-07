import React from 'react';
import { Stack, Text } from '@fluentui/react';

const Settings: React.FC = () => {
  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: '20px' } }}>
      <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>
        Settings
      </Text>
      <Text variant="medium" styles={{ root: { color: '#666' } }}>
        Application settings and configuration coming soon...
      </Text>
    </Stack>
  );
};

export default Settings; 