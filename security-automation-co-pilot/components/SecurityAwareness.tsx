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
    ProgressIndicator,
} from '@fluentui/react';
import { awarenessApi } from '../services/api';
import { TrainingModule, TrainingStatus } from '../types';

interface SecurityAwarenessProps {
    tenantId: string;
}

export const SecurityAwareness: React.FC<SecurityAwarenessProps> = ({ tenantId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modules, setModules] = useState<TrainingModule[]>([]);
    const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
    const [showStartDialog, setShowStartDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await awarenessApi.getTrainingModules(tenantId);
                setModules(response.data);
            } catch (err) {
                setError('Failed to fetch training modules');
                console.error('Error fetching training modules:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tenantId]);

    const handleStartTraining = async () => {
        if (!selectedModule) return;

        try {
            await awarenessApi.updateProgress(
                tenantId,
                'current-user', // In a real app, this would come from authentication
                selectedModule.id,
                TrainingStatus.IN_PROGRESS
            );
            // Refresh modules after starting training
            const response = await awarenessApi.getTrainingModules(tenantId);
            setModules(response.data);
            setShowStartDialog(false);
        } catch (err) {
            setError('Failed to start training module');
            console.error('Error starting training module:', err);
        }
    };

    const columns: IColumn[] = [
        {
            key: 'title',
            name: 'Module Title',
            fieldName: 'title',
            minWidth: 200,
            maxWidth: 400,
        },
        {
            key: 'category',
            name: 'Category',
            fieldName: 'category',
            minWidth: 100,
            maxWidth: 150,
        },
        {
            key: 'duration',
            name: 'Duration',
            fieldName: 'duration',
            minWidth: 100,
            maxWidth: 100,
        },
        {
            key: 'status',
            name: 'Status',
            fieldName: 'status',
            minWidth: 100,
            maxWidth: 100,
            onRender: (item: TrainingModule) => (
                <Text style={{ 
                    color: item.status === TrainingStatus.COMPLETED ? 'green' : 
                           item.status === TrainingStatus.IN_PROGRESS ? 'orange' : 'gray' 
                }}>
                    {item.status}
                </Text>
            ),
        },
        {
            key: 'progress',
            name: 'Progress',
            minWidth: 150,
            maxWidth: 200,
            onRender: (item: TrainingModule) => (
                <ProgressIndicator
                    percentComplete={item.progress}
                    styles={{
                        root: { width: '100%' },
                        progressBar: {
                            backgroundColor: item.progress === 100 ? 'green' : 'blue'
                        }
                    }}
                />
            ),
        },
        {
            key: 'action',
            name: 'Action',
            minWidth: 100,
            maxWidth: 100,
            onRender: (item: TrainingModule) => (
                <PrimaryButton
                    text={item.status === TrainingStatus.NOT_STARTED ? 'Start' : 'Continue'}
                    onClick={() => {
                        setSelectedModule(item);
                        setShowStartDialog(true);
                    }}
                    disabled={item.status === TrainingStatus.COMPLETED}
                />
            ),
        },
    ];

    if (loading) {
        return (
            <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '100%' }}>
                <Spinner size={SpinnerSize.large} label="Loading training modules..." />
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
            <Text variant="xLarge">Security Awareness Training</Text>

            <DetailsList
                items={modules}
                columns={columns}
                selectionMode={SelectionMode.none}
            />

            <Dialog
                hidden={!showStartDialog}
                onDismiss={() => setShowStartDialog(false)}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Start Training Module',
                    subText: selectedModule?.description,
                }}
            >
                <DialogFooter>
                    <DefaultButton onClick={() => setShowStartDialog(false)} text="Cancel" />
                    <PrimaryButton onClick={handleStartTraining} text="Start" />
                </DialogFooter>
            </Dialog>
        </Stack>
    );
}; 