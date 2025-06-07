import React from 'react';
import { Stack, Text } from '@fluentui/react';

const Vulnerabilities: React.FC = () => {
  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: '20px' } }}>
      <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>
        Vulnerabilities
      </Text>
      <Text variant="medium" styles={{ root: { color: '#666' } }}>
        Vulnerability management features coming soon...
      </Text>
    </Stack>
  );
};

export default Vulnerabilities; 