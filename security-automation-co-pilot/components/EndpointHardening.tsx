import React, { useState, useEffect } from 'react';
import {
    Stack,
    Text,
    Spinner,
    SpinnerSize,
    MessageBar,
    MessageBarType,
    DetailsList,
    IColumn,
    SelectionMode,
    PrimaryButton,
    Dialog,
    DialogType,
    DialogFooter,
    DefaultButton,
    Checkbox,
} from '@fluentui/react';
import { hardeningApi } from '../services/api';
import { Endpoint, HardeningStatus, HardeningControl } from '../types';

interface EndpointHardeningProps {
    tenantId: string;
}

export const EndpointHardening: React.FC<EndpointHardeningProps> = ({ tenantId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
    const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
    const [selectedControls, setSelectedControls] = useState<string[]>([]);
    const [showApplyDialog, setShowApplyDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await hardeningApi.getEndpoints(tenantId);
                setEndpoints(response.data);
            } catch (err) {
                setError('Failed to fetch endpoint data');
                console.error('Error fetching endpoint data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tenantId]);

    const handleApplyHardening = async () => {
        if (!selectedEndpoint) return;

        try {
            await hardeningApi.applyHardening(tenantId, selectedEndpoint.id, selectedControls);
            // Refresh endpoints after applying hardening
            const response = await hardeningApi.getEndpoints(tenantId);
            setEndpoints(response.data);
            setShowApplyDialog(false);
        } catch (err) {
            setError('Failed to apply hardening controls');
            console.error('Error applying hardening controls:', err);
        }
    };

    const handleControlSelection = (controlId: string, checked: boolean) => {
        setSelectedControls(prev => 
            checked 
                ? [...prev, controlId]
                : prev.filter(id => id !== controlId)
        );
    };

    const columns: IColumn[] = [
        {
            key: 'name',
            name: 'Endpoint Name',
            fieldName: 'name',
            minWidth: 100,
            maxWidth: 200,
        },
        {
            key: 'type',
            name: 'Type',
            fieldName: 'type',
            minWidth: 100,
            maxWidth: 100,
        },
        {
            key: 'status',
            name: 'Hardening Status',
            fieldName: 'status',
            minWidth: 100,
            maxWidth: 100,
            onRender: (item: Endpoint) => (
                <Text style={{ 
                    color: item.status === HardeningStatus.SECURE ? 'green' : 
                           item.status === HardeningStatus.PARTIAL ? 'orange' : 'red' 
                }}>
                    {item.status}
                </Text>
            ),
        },
        {
            key: 'lastAssessed',
            name: 'Last Assessed',
            fieldName: 'lastAssessed',
            minWidth: 100,
            maxWidth: 200,
        },
        {
            key: 'action',
            name: 'Action',
            minWidth: 100,
            maxWidth: 100,
            onRender: (item: Endpoint) => (
                <PrimaryButton
                    text="Harden"
                    onClick={() => {
                        setSelectedEndpoint(item);
                        setSelectedControls([]);
                        setShowApplyDialog(true);
                    }}
                />
            ),
        },
    ];

    if (loading) {
        return (
            <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '100%' }}>
                <Spinner size={SpinnerSize.large} label="Loading endpoint data..." />
            </Stack>
        );
    }

    if (error) {
        return (
            <MessageBar messageBarType={MessageBarType.error}>
                {error}
            </MessageBar>
        );
    }

    return (
        <Stack tokens={{ childrenGap: 15 }}>
            <Text variant="xLarge">Endpoint Hardening</Text>

            <DetailsList
                items={endpoints}
                columns={columns}
                selectionMode={SelectionMode.none}
            />

            <Dialog
                hidden={!showApplyDialog}
                onDismiss={() => setShowApplyDialog(false)}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Apply Hardening Controls',
                    subText: `Select hardening controls to apply to ${selectedEndpoint?.name}`,
                }}
            >
                <Stack tokens={{ childrenGap: 10 }}>
                    {selectedEndpoint?.controls.map((control: HardeningControl) => (
                        <Stack key={control.id}>
                            <Checkbox
                                label={control.name}
                                checked={selectedControls.includes(control.id)}
                                onChange={(_, checked) => handleControlSelection(control.id, checked || false)}
                            />
                            <Text variant="small" styles={{ root: { color: '#666', marginLeft: '20px' } }}>
                                {control.description}
                            </Text>
                        </Stack>
                    ))}
                </Stack>
                <DialogFooter>
                    <DefaultButton onClick={() => setShowApplyDialog(false)} text="Cancel" />
                    <PrimaryButton 
                        onClick={handleApplyHardening} 
                        text="Apply" 
                        disabled={selectedControls.length === 0}
                    />
                </DialogFooter>
            </Dialog>
        </Stack>
    );
}; 