import React, { useState } from 'react';
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
  Toggle,
} from '@fluentui/react';
import { workflowApi } from '../../services/api';
import { Workflow } from '../../types';

interface WorkflowTriggerFormProps {
  workflow: Workflow;
  onSuccess: () => void;
  onCancel: () => void;
}

const WorkflowTriggerForm: React.FC<WorkflowTriggerFormProps> = ({
  workflow,
  onSuccess,
  onCancel,
}) => {
  const [incidentId, setIncidentId] = useState('');
  const [incidentSource, setIncidentSource] = useState<string>('manual');
  const [severity, setSeverity] = useState<string>(workflow.severity_threshold);
  const [description, setDescription] = useState('');
  const [affectedAssets, setAffectedAssets] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [autoExecute, setAutoExecute] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sourceOptions: IDropdownOption[] = [
    { key: 'manual', text: 'Manual Trigger' },
    { key: 'sentinel', text: 'Microsoft Sentinel' },
    { key: 'defender', text: 'Microsoft Defender' },
    { key: 'siem', text: 'External SIEM' },
    { key: 'api', text: 'API Call' },
  ];

  const severityOptions: IDropdownOption[] = [
    { key: 'Low', text: 'Low' },
    { key: 'Medium', text: 'Medium' },
    { key: 'High', text: 'High' },
    { key: 'Critical', text: 'Critical' },
  ];

  const generateIncidentId = () => {
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `INC-${timestamp}-${random}`;
  };

  const handleTrigger = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate required fields
      if (!incidentId.trim()) {
        setError('Incident ID is required');
        return;
      }

      // Prepare context data
      const context = {
        incident: {
          id: incidentId,
          source: incidentSource,
          severity,
          description: description || 'Manually triggered workflow',
          affected_assets: affectedAssets ? affectedAssets.split(',').map(s => s.trim()) : [],
          created_at: new Date().toISOString(),
          auto_execute: autoExecute,
        },
        additional_context: additionalContext ? JSON.parse(additionalContext) : {},
        triggered_manually: true,
      };

      await workflowApi.triggerWorkflow({
        workflow_id: workflow.id,
        incident_id: incidentId,
        context,
      });

      onSuccess();
    } catch (err: any) {
      console.error('Failed to trigger workflow:', err);
      setError(err.response?.data?.detail || 'Failed to trigger workflow');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: '20px 0' } }}>
      {error && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(null)}>
          {error}
        </MessageBar>
      )}

      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          Workflow Details
        </Text>
        
        <Stack
          styles={{
            root: {
              padding: '16px',
              backgroundColor: '#F8F9FA',
              borderRadius: '4px',
              border: '1px solid #E1E1E1',
            },
          }}
        >
          <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
            {workflow.name}
          </Text>
          <Text variant="small" styles={{ root: { color: '#666', marginTop: '4px' } }}>
            {workflow.description}
          </Text>
          <Text variant="small" styles={{ root: { marginTop: '8px' } }}>
            <strong>Severity Threshold:</strong> {workflow.severity_threshold} | 
            <strong> Actions:</strong> {workflow.actions?.length || 0}
          </Text>
        </Stack>
      </Stack>

      <Separator />

      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          Incident Information
        </Text>

        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack grow>
            <TextField
              label="Incident ID"
              value={incidentId}
              onChange={(_, value) => setIncidentId(value || '')}
              placeholder="Enter incident ID or generate one"
              required
            />
          </Stack>
          <Stack verticalAlign="end">
            <DefaultButton
              text="Generate"
              iconProps={{ iconName: 'Refresh' }}
              onClick={() => setIncidentId(generateIncidentId())}
              styles={{ root: { marginTop: '27px' } }}
            />
          </Stack>
        </Stack>

        <Dropdown
          label="Incident Source"
          selectedKey={incidentSource}
          onChange={(_, option) => setIncidentSource(option?.key as string)}
          options={sourceOptions}
        />

        <Dropdown
          label="Severity Level"
          selectedKey={severity}
          onChange={(_, option) => setSeverity(option?.key as string)}
          options={severityOptions}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={description}
          onChange={(_, value) => setDescription(value || '')}
          placeholder="Describe the security incident..."
        />

        <TextField
          label="Affected Assets"
          value={affectedAssets}
          onChange={(_, value) => setAffectedAssets(value || '')}
          placeholder="Comma-separated list of affected systems, IPs, or users"
          description="Example: server01.domain.com, 192.168.1.100, user@company.com"
        />

        <TextField
          label="Additional Context (JSON)"
          multiline
          rows={4}
          value={additionalContext}
          onChange={(_, value) => setAdditionalContext(value || '')}
          placeholder='{"source_ip": "192.168.1.100", "attack_type": "brute_force"}'
          description="Optional JSON data to provide additional context to the workflow"
        />

        <Toggle
          label="Auto-execute actions"
          checked={autoExecute}
          onChange={(_, checked) => setAutoExecute(checked || false)}
          onText="Enabled"
          offText="Manual approval required"
        />
      </Stack>

      <Separator />

      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          Workflow Actions Preview
        </Text>
        
        <Stack tokens={{ childrenGap: 8 }}>
          {workflow.actions?.map((action, index) => (
            <Stack
              key={action.id}
              horizontal
              verticalAlign="center"
              tokens={{ childrenGap: 12 }}
              styles={{
                root: {
                  padding: '8px 12px',
                  backgroundColor: '#F8F9FA',
                  borderRadius: '4px',
                  border: '1px solid #E1E1E1',
                },
              }}
            >
              <Text
                variant="small"
                styles={{
                  root: {
                    backgroundColor: '#0078D4',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    minWidth: '24px',
                    textAlign: 'center',
                  },
                }}
              >
                {index + 1}
              </Text>
              <Stack grow>
                <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
                  {action.name}
                </Text>
                <Text variant="small" styles={{ root: { color: '#666' } }}>
                  {action.description}
                </Text>
              </Stack>
              <Text
                variant="small"
                styles={{
                  root: {
                    color: '#666',
                    fontFamily: 'Monaco, monospace',
                    backgroundColor: '#F3F2F1',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  },
                }}
              >
                {action.type}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 12 }}>
        <DefaultButton text="Cancel" onClick={onCancel} disabled={loading} />
        <PrimaryButton
          text={loading ? 'Triggering...' : 'Trigger Workflow'}
          onClick={handleTrigger}
          disabled={loading || !incidentId.trim()}
          iconProps={loading ? undefined : { iconName: 'Play' }}
        />
        {loading && <Spinner size={SpinnerSize.small} />}
      </Stack>
    </Stack>
  );
};

export default WorkflowTriggerForm; 