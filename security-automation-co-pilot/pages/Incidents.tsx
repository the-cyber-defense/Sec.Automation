import React, { useState } from 'react';
import {
  Stack,
  IStackTokens,
  CommandBar,
  ICommandBarItemProps,
  DetailsList,
  IColumn,
  SelectionMode,
  DetailsListLayoutMode,
  Dropdown,
  IDropdownOption,
  SearchBox,
  Text,
} from '@fluentui/react';
import { Card } from '@fluentui/react-cards';
import { useTheme } from '@fluentui/react';

interface IIncident {
  id: string;
  title: string;
  severity: string;
  status: string;
  type: string;
  createdAt: string;
  assignedTo: string;
}

const Incidents: React.FC = () => {
  const theme = useTheme();
  const [incidents, setIncidents] = useState<IIncident[]>([
    {
      id: '1',
      title: 'Suspicious Login Activity',
      severity: 'High',
      status: 'Active',
      type: 'Security Alert',
      createdAt: '2024-03-15T10:30:00Z',
      assignedTo: 'John Doe',
    },
    // Add more mock incidents here
  ]);

  const stackTokens: IStackTokens = {
    childrenGap: 20,
    padding: 20,
  };

  const commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'newIncident',
      text: 'New Incident',
      iconProps: { iconName: 'Add' },
      onClick: () => {
        // Implement new incident creation
      },
    },
    {
      key: 'refresh',
      text: 'Refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: () => {
        // Implement refresh logic
      },
    },
    {
      key: 'export',
      text: 'Export',
      iconProps: { iconName: 'Export' },
      onClick: () => {
        // Implement export logic
      },
    },
  ];

  const columns: IColumn[] = [
    {
      key: 'id',
      name: 'ID',
      fieldName: 'id',
      minWidth: 50,
      maxWidth: 50,
    },
    {
      key: 'severity',
      name: 'Severity',
      fieldName: 'severity',
      minWidth: 70,
      maxWidth: 90,
      onRender: (item: IIncident) => (
        <Text
          styles={{
            root: {
              color:
                item.severity === 'High'
                  ? theme.palette.red
                  : item.severity === 'Medium'
                  ? theme.palette.orange
                  : theme.palette.green,
            },
          }}
        >
          {item.severity}
        </Text>
      ),
    },
    {
      key: 'title',
      name: 'Title',
      fieldName: 'title',
      minWidth: 200,
      isRowHeader: true,
      isResizable: true,
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 100,
      maxWidth: 100,
    },
    {
      key: 'type',
      name: 'Type',
      fieldName: 'type',
      minWidth: 100,
      maxWidth: 120,
    },
    {
      key: 'createdAt',
      name: 'Created',
      fieldName: 'createdAt',
      minWidth: 120,
      maxWidth: 150,
      onRender: (item: IIncident) => new Date(item.createdAt).toLocaleString(),
    },
    {
      key: 'assignedTo',
      name: 'Assigned To',
      fieldName: 'assignedTo',
      minWidth: 100,
      maxWidth: 150,
    },
  ];

  const filterOptions: IDropdownOption[] = [
    { key: 'all', text: 'All Severities' },
    { key: 'high', text: 'High' },
    { key: 'medium', text: 'Medium' },
    { key: 'low', text: 'Low' },
  ];

  const statusOptions: IDropdownOption[] = [
    { key: 'all', text: 'All Statuses' },
    { key: 'active', text: 'Active' },
    { key: 'investigating', text: 'Investigating' },
    { key: 'resolved', text: 'Resolved' },
    { key: 'closed', text: 'Closed' },
  ];

  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xxLarge">Security Incidents</Text>
      </Stack>

      <CommandBar items={commandBarItems} />

      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <SearchBox
          placeholder="Search incidents..."
          styles={{ root: { width: 300 } }}
          onChange={(_, newValue) => {
            // Implement search logic
          }}
        />
        <Dropdown
          placeholder="Filter by severity"
          options={filterOptions}
          styles={{ root: { width: 200 } }}
          onChange={(_, option) => {
            // Implement severity filter
          }}
        />
        <Dropdown
          placeholder="Filter by status"
          options={statusOptions}
          styles={{ root: { width: 200 } }}
          onChange={(_, option) => {
            // Implement status filter
          }}
        />
      </Stack>

      <Card>
        <DetailsList
          items={incidents}
          columns={columns}
          selectionMode={SelectionMode.single}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          onItemInvoked={(item) => {
            // Implement item click handler
          }}
        />
      </Card>
    </Stack>
  );
};

export default Incidents; 