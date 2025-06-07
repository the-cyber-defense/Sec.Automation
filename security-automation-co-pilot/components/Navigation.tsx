import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Nav, INavLink, INavStyles } from '@fluentui/react/lib/Nav';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { useTheme } from '@fluentui/react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const navStyles: Partial<INavStyles> = {
    root: {
      width: 250,
      height: '100vh',
      boxSizing: 'border-box',
      border: '1px solid #eee',
      overflowY: 'auto',
      backgroundColor: theme.palette.white,
    },
  };

  const navLinks: INavLink[] = [
    {
      name: 'Dashboard',
      url: '/',
      key: 'dashboard',
      icon: 'ViewDashboard',
    },
    {
      name: 'Incidents',
      url: '/incidents',
      key: 'incidents',
      icon: 'Warning',
    },
    {
      name: 'Workflows',
      url: '/workflows',
      key: 'workflows',
      icon: 'Flow',
    },
    {
      name: 'Compliance',
      url: '/compliance',
      key: 'compliance',
      icon: 'CheckList',
    },
    {
      name: 'Vulnerabilities',
      url: '/vulnerabilities',
      key: 'vulnerabilities',
      icon: 'Shield',
    },
    {
      name: 'Education',
      url: '/education',
      key: 'education',
      icon: 'Education',
    },
    {
      name: 'Settings',
      url: '/settings',
      key: 'settings',
      icon: 'Settings',
    },
  ];

  return (
    <Stack className="nav-container">
      <Stack.Item>
        <Stack horizontal verticalAlign="center" style={{ padding: '20px' }}>
          <Text variant="xLarge" styles={{ root: { color: theme.palette.themePrimary } }}>
            Security Co-Pilot
          </Text>
        </Stack>
      </Stack.Item>
      <Nav
        selectedKey={location.pathname === '/' ? 'dashboard' : location.pathname.substring(1)}
        ariaLabel="Navigation"
        styles={navStyles}
        groups={[{ links: navLinks }]}
        onLinkClick={(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
          ev?.preventDefault();
          if (item?.url) {
            navigate(item.url);
          }
        }}
      />
    </Stack>
  );
};

export default Navigation; 