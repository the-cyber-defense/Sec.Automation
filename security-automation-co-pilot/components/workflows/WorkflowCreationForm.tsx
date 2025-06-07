import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  TextField,
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  DefaultButton,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  Separator,
  IconButton,
  TooltipHost,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn,
  Dialog,
  DialogType,
  DialogFooter,
} from '@fluentui/react';
import { workflowApi } from '../../services/api';
import { ActionType, SeverityLevel } from '../../types';

interface WorkflowCreationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface ActionFormData {
  id: string;
  type: ActionType;
  name: string;
  description: string;
  parameters: Record<string, any>;
  timeout_seconds: number;
  retry_count: number;
  conditions: Record<string, any>;
}

const WorkflowCreationForm: React.FC<WorkflowCreationFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [severityThreshold, setSeverityThreshold] = useState<SeverityLevel>('Medium');
  const [actions, setActions] = useState<ActionFormData[]>([]);
  const [availableActionTypes, setAvailableActionTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Action dialog state
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [editingActionIndex, setEditingActionIndex] = useState<number | null>(null);
  const [actionFormData, setActionFormData] = useState<Partial<ActionFormData>>({});

  useEffect(() => {
    loadActionTypes();
  }, []);

  const loadActionTypes = async () => {
    try {
      const response = await workflowApi.getActionTypes();
      setAvailableActionTypes(response.data);
    } catch (err) {
      console.error('Failed to load action types:', err);
    }
  };

  const severityOptions: IDropdownOption[] = [
    { key: 'Low', text: 'Low' },
    { key: 'Medium', text: 'Medium' },
    { key: 'High', text: 'High' },
    { key: 'Critical', text: 'Critical' },
  ];

  const getActionTypeOptions = (): IDropdownOption[] => {
    return availableActionTypes.map(actionType => ({
      key: actionType.type,
      text: actionType.name,
      data: actionType,
    }));
  };

  const handleAddAction = () => {
    setActionFormData({
      id: '',
      type: ActionType.SEND_NOTIFICATION,
      name: '',
      description: '',
      parameters: {},
      timeout_seconds: 300,
      retry_count: 3,
      conditions: {},
    });
    setEditingActionIndex(null);
    setShowActionDialog(true);
  };

  const handleEditAction = (index: number) => {
    setActionFormData({ ...actions[index] });
    setEditingActionIndex(index);
    setShowActionDialog(true);
  };

  const handleSaveAction = () => {
    if (!actionFormData.name || !actionFormData.type) {
      setError('Action name and type are required');
      return;
    }

    const newAction: ActionFormData = {
      id: actionFormData.id || `action_${Date.now()}`,
      type: actionFormData.type!,
      name: actionFormData.name!,
      description: actionFormData.description || '',
      parameters: actionFormData.parameters || {},
      timeout_seconds: actionFormData.timeout_seconds || 300,
      retry_count: actionFormData.retry_count || 3,
      conditions: actionFormData.conditions || {},
    };

    if (editingActionIndex !== null) {
      const updatedActions = [...actions];
      updatedActions[editingActionIndex] = newAction;
      setActions(updatedActions);
    } else {
      setActions([...actions, newAction]);
    }

    setShowActionDialog(false);
    setActionFormData({});
  };

  const handleDeleteAction = (index: number) => {
    const updatedActions = actions.filter((_, i) => i !== index);
    setActions(updatedActions);
  };

  const handleMoveAction = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === actions.length - 1)
    ) {
      return;
    }

    const newActions = [...actions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newActions[index], newActions[targetIndex]] = [newActions[targetIndex], newActions[index]];
    setActions(newActions);
  };

  const handleCreateWorkflow = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate required fields
      if (!workflowName.trim()) {
        setError('Workflow name is required');
        return;
      }

      if (actions.length === 0) {
        setError('At least one action is required');
        return;
      }

      // Convert actions to the expected format
      const workflowActions = actions.map(action => ({
        id: action.id,
        type: action.type,
        name: action.name,
        description: action.description,
        parameters: action.parameters,
        timeout_seconds: action.timeout_seconds,
        retry_count: action.retry_count,
        conditions: Object.keys(action.conditions).length > 0 ? action.conditions : undefined,
      }));

      await workflowApi.createCustomWorkflow({
        name: workflowName,
        description: workflowDescription,
        severity_threshold: severityThreshold,
        actions: workflowActions,
        tags: {
          created_by: 'ui',
          created_at: new Date().toISOString(),
        },
      });

      onSuccess();
    } catch (err: any) {
      console.error('Failed to create workflow:', err);
      setError(err.response?.data?.detail || 'Failed to create workflow');
    } finally {
      setLoading(false);
    }
  };

  const getActionParametersForType = (actionType: ActionType): Record<string, any> => {
    const parameterTemplates: Record<ActionType, Record<string, any>> = {
      [ActionType.ISOLATE_MACHINE]: {
        isolation_type: 'full',
      },
      [ActionType.BLOCK_IP]: {
        block_duration: '24h',
      },
      [ActionType.DISABLE_USER]: {
        duration: 'temporary',
      },
      [ActionType.RESET_PASSWORD]: {
        require_mfa: true,
      },
      [ActionType.SEND_NOTIFICATION]: {
        recipients: ['security-team@company.com'],
        priority: 'medium',
        template: 'incident_alert',
      },
      [ActionType.CREATE_TICKET]: {
        priority: 'P2',
        assignment_group: 'security-operations',
      },
      [ActionType.RUN_SCRIPT]: {
        script: 'remediation_script.ps1',
      },
      [ActionType.INVOKE_LOGIC_APP]: {
        logic_app_id: '',
      },
      [ActionType.QUARANTINE_EMAIL]: {
        scope: 'organization',
      },
      [ActionType.UPDATE_FIREWALL]: {
        action: 'block',
      },
      [ActionType.COLLECT_FORENSICS]: {
        collection_type: 'quick',
      },
      [ActionType.CUSTOM]: {},
    };

    return parameterTemplates[actionType] || {};
  };

  // Action list columns
  const actionColumns: IColumn[] = [
    {
      key: 'order',
      name: 'Order',
      minWidth: 60,
      maxWidth: 80,
      onRender: (_: ActionFormData, index?: number) => (
        <Stack horizontal tokens={{ childrenGap: 4 }}>
          <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
            {(index || 0) + 1}
          </Text>
          <Stack>
            <TooltipHost content="Move up">
              <IconButton
                iconProps={{ iconName: 'ChevronUp' }}
                onClick={() => handleMoveAction(index || 0, 'up')}
                disabled={index === 0}
                styles={{ root: { height: '16px', width: '16px' } }}
              />
            </TooltipHost>
            <TooltipHost content="Move down">
              <IconButton
                iconProps={{ iconName: 'ChevronDown' }}
                onClick={() => handleMoveAction(index || 0, 'down')}
                disabled={index === actions.length - 1}
                styles={{ root: { height: '16px', width: '16px' } }}
              />
            </TooltipHost>
          </Stack>
        </Stack>
      ),
    },
    {
      key: 'name',
      name: 'Action',
      minWidth: 200,
      maxWidth: 300,
      isResizable: true,
      onRender: (item: ActionFormData) => (
        <Stack>
          <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
            {item.name}
          </Text>
          <Text variant="small" styles={{ root: { color: '#666' } }}>
            {item.description}
          </Text>
        </Stack>
      ),
    },
    {
      key: 'type',
      name: 'Type',
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: ActionFormData) => (
        <Text
          variant="small"
          styles={{
            root: {
              fontFamily: 'Monaco, monospace',
              backgroundColor: '#F3F2F1',
              padding: '2px 6px',
              borderRadius: '4px',
            },
          }}
        >
          {item.type}
        </Text>
      ),
    },
    {
      key: 'timeout',
      name: 'Timeout',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: ActionFormData) => (
        <Text variant="small">{item.timeout_seconds}s</Text>
      ),
    },
    {
      key: 'actions',
      name: 'Actions',
      minWidth: 100,
      maxWidth: 120,
      onRender: (_: ActionFormData, index?: number) => (
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <TooltipHost content="Edit action">
            <IconButton
              iconProps={{ iconName: 'Edit' }}
              onClick={() => handleEditAction(index || 0)}
              styles={{
                root: { color: '#0078D4' },
                rootHovered: { backgroundColor: '#F3F2F1' },
              }}
            />
          </TooltipHost>
          <TooltipHost content="Delete action">
            <IconButton
              iconProps={{ iconName: 'Delete' }}
              onClick={() => handleDeleteAction(index || 0)}
              styles={{
                root: { color: '#D13438' },
                rootHovered: { backgroundColor: '#F3F2F1' },
              }}
            />
          </TooltipHost>
        </Stack>
      ),
    },
  ];

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: '20px 0' } }}>
      {error && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(null)}>
          {error}
        </MessageBar>
      )}

      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          Workflow Information
        </Text>

        <TextField
          label="Workflow Name"
          value={workflowName}
          onChange={(_, value) => setWorkflowName(value || '')}
          placeholder="Enter a descriptive name for your workflow"
          required
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={workflowDescription}
          onChange={(_, value) => setWorkflowDescription(value || '')}
          placeholder="Describe what this workflow does and when it should be used"
        />

        <Dropdown
          label="Severity Threshold"
          selectedKey={severityThreshold}
          onChange={(_, option) => setSeverityThreshold(option?.key as SeverityLevel)}
          options={severityOptions}
          placeholder="Select the minimum severity level to trigger this workflow"
        />
      </Stack>

      <Separator />

      <Stack tokens={{ childrenGap: 16 }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
            Workflow Actions ({actions.length})
          </Text>
          <PrimaryButton
            text="Add Action"
            iconProps={{ iconName: 'Add' }}
            onClick={handleAddAction}
          />
        </Stack>

        {actions.length > 0 ? (
          <DetailsList
            items={actions}
            columns={actionColumns}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.none}
            isHeaderVisible={true}
            styles={{
              root: {
                backgroundColor: 'white',
                border: '1px solid #D1D1D1',
              },
            }}
          />
        ) : (
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
              No actions defined. Click "Add Action" to get started.
            </Text>
          </Stack>
        )}
      </Stack>

      <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 12 }}>
        <DefaultButton text="Cancel" onClick={onCancel} disabled={loading} />
        <PrimaryButton
          text={loading ? 'Creating...' : 'Create Workflow'}
          onClick={handleCreateWorkflow}
          disabled={loading || !workflowName.trim() || actions.length === 0}
          iconProps={loading ? undefined : { iconName: 'Save' }}
        />
        {loading && <Spinner size={SpinnerSize.small} />}
      </Stack>

      {/* Action Creation/Edit Dialog */}
      <Dialog
        hidden={!showActionDialog}
        onDismiss={() => setShowActionDialog(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: editingActionIndex !== null ? 'Edit Action' : 'Add Action',
          subText: 'Configure the action that will be executed as part of this workflow',
        }}
        modalProps={{
          styles: { main: { maxWidth: '600px' } },
        }}
      >
        <Stack tokens={{ childrenGap: 16 }}>
          <TextField
            label="Action Name"
            value={actionFormData.name || ''}
            onChange={(_, value) => setActionFormData({ ...actionFormData, name: value || '' })}
            placeholder="Enter a descriptive name for this action"
            required
          />

          <Dropdown
            label="Action Type"
            selectedKey={actionFormData.type}
            onChange={(_, option) => {
              const newType = option?.key as ActionType;
              setActionFormData({
                ...actionFormData,
                type: newType,
                parameters: getActionParametersForType(newType),
              });
            }}
            options={getActionTypeOptions()}
            placeholder="Select the type of action to perform"
          />

          <TextField
            label="Description"
            multiline
            rows={2}
            value={actionFormData.description || ''}
            onChange={(_, value) => setActionFormData({ ...actionFormData, description: value || '' })}
            placeholder="Describe what this action does"
          />

          <Stack horizontal tokens={{ childrenGap: 16 }}>
            <TextField
              label="Timeout (seconds)"
              type="number"
              value={actionFormData.timeout_seconds?.toString() || '300'}
              onChange={(_, value) => setActionFormData({
                ...actionFormData,
                timeout_seconds: parseInt(value || '300')
              })}
              styles={{ root: { width: '150px' } }}
            />
            <TextField
              label="Retry Count"
              type="number"
              value={actionFormData.retry_count?.toString() || '3'}
              onChange={(_, value) => setActionFormData({
                ...actionFormData,
                retry_count: parseInt(value || '3')
              })}
              styles={{ root: { width: '150px' } }}
            />
          </Stack>

          <TextField
            label="Parameters (JSON)"
            multiline
            rows={4}
            value={JSON.stringify(actionFormData.parameters || {}, null, 2)}
            onChange={(_, value) => {
              try {
                const parameters = value ? JSON.parse(value) : {};
                setActionFormData({ ...actionFormData, parameters });
              } catch {
                // Invalid JSON, don't update
              }
            }}
            placeholder='{"key": "value"}'
            description="Configuration parameters for this action"
          />

          <TextField
            label="Conditions (JSON)"
            multiline
            rows={3}
            value={JSON.stringify(actionFormData.conditions || {}, null, 2)}
            onChange={(_, value) => {
              try {
                const conditions = value ? JSON.parse(value) : {};
                setActionFormData({ ...actionFormData, conditions });
              } catch {
                // Invalid JSON, don't update
              }
            }}
            placeholder='{"severity": {"$in": ["High", "Critical"]}}'
            description="Optional conditions that must be met for this action to execute"
          />
        </Stack>

        <DialogFooter>
          <DefaultButton onClick={() => setShowActionDialog(false)} text="Cancel" />
          <PrimaryButton onClick={handleSaveAction} text="Save Action" />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
};

export default WorkflowCreationForm; 