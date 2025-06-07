import React from 'react';
import { Stack, Text } from '@fluentui/react';

const Education: React.FC = () => {
  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: '20px' } }}>
      <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>
        Security Education
      </Text>
      <Text variant="medium" styles={{ root: { color: '#666' } }}>
        Security training and education features coming soon...
      </Text>
    </Stack>
  );
};

export default Education; 