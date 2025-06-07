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
} from '@fluentui/react';
import { optimizationApi } from '../services/api';
import { SecurityToolStatus, OptimizationStatus, OptimizationRecommendation } from '../types';

interface SecurityOptimizationProps {
    tenantId: string;
}

export const SecurityOptimization: React.FC<SecurityOptimizationProps> = ({ tenantId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tools, setTools] = useState<SecurityToolStatus[]>([]);
    const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);
    const [selectedRecommendation, setSelectedRecommendation] = useState<OptimizationRecommendation | null>(null);
    const [showApplyDialog, setShowApplyDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch tool status
                const toolsResponse = await optimizationApi.getToolStatus(tenantId);
                setTools(toolsResponse.data);

                // Fetch recommendations
                const recommendationsResponse = await optimizationApi.getRecommendations(tenantId);
                setRecommendations(recommendationsResponse.data);
            } catch (err) {
                setError('Failed to fetch security optimization data');
                console.error('Error fetching security optimization data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tenantId]);

    const handleApplyRecommendation = async () => {
        if (!selectedRecommendation) return;

        try {
            await optimizationApi.applyRecommendation(tenantId, selectedRecommendation.id);
            // Refresh recommendations after applying
            const recommendationsResponse = await optimizationApi.getRecommendations(tenantId);
            setRecommendations(recommendationsResponse.data);
            setShowApplyDialog(false);
        } catch (err) {
            setError('Failed to apply recommendation');
            console.error('Error applying recommendation:', err);
        }
    };

    const toolColumns: IColumn[] = [
        {
            key: 'name',
            name: 'Tool Name',
            fieldName: 'name',
            minWidth: 100,
            maxWidth: 200,
        },
        {
            key: 'status',
            name: 'Status',
            fieldName: 'status',
            minWidth: 100,
            maxWidth: 100,
            onRender: (item: SecurityToolStatus) => (
                <Text style={{ color: item.status === OptimizationStatus.OPTIMIZED ? 'green' : 'orange' }}>
                    {item.status}
                </Text>
            ),
        },
        {
            key: 'lastOptimized',
            name: 'Last Optimized',
            fieldName: 'lastOptimized',
            minWidth: 100,
            maxWidth: 200,
        },
    ];

    const recommendationColumns: IColumn[] = [
        {
            key: 'title',
            name: 'Recommendation',
            fieldName: 'title',
            minWidth: 200,
            maxWidth: 400,
        },
        {
            key: 'impact',
            name: 'Impact',
            fieldName: 'impact',
            minWidth: 100,
            maxWidth: 100,
        },
        {
            key: 'effort',
            name: 'Effort',
            fieldName: 'effort',
            minWidth: 100,
            maxWidth: 100,
        },
        {
            key: 'action',
            name: 'Action',
            minWidth: 100,
            maxWidth: 100,
            onRender: (item: OptimizationRecommendation) => (
                <PrimaryButton
                    text="Apply"
                    onClick={() => {
                        setSelectedRecommendation(item);
                        setShowApplyDialog(true);
                    }}
                />
            ),
        },
    ];

    if (loading) {
        return (
            <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '100%' }}>
                <Spinner size={SpinnerSize.large} label="Loading security optimization data..." />
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
            <Text variant="xLarge">Security Tool Optimization</Text>

            <Stack tokens={{ childrenGap: 10 }}>
                <Text variant="large">Tool Status</Text>
                <DetailsList
                    items={tools}
                    columns={toolColumns}
                    selectionMode={SelectionMode.none}
                />
            </Stack>

            <Stack tokens={{ childrenGap: 10 }}>
                <Text variant="large">Optimization Recommendations</Text>
                <DetailsList
                    items={recommendations}
                    columns={recommendationColumns}
                    selectionMode={SelectionMode.none}
                />
            </Stack>

            <Dialog
                hidden={!showApplyDialog}
                onDismiss={() => setShowApplyDialog(false)}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Apply Recommendation',
                    subText: selectedRecommendation?.description,
                }}
            >
                <DialogFooter>
                    <DefaultButton onClick={() => setShowApplyDialog(false)} text="Cancel" />
                    <PrimaryButton onClick={handleApplyRecommendation} text="Apply" />
                </DialogFooter>
            </Dialog>
        </Stack>
    );
}; 