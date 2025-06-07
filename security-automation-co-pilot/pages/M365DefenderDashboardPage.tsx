
import React, { useState, useCallback } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import GroundingSourceList from '../components/GroundingSourceList';
import { useAppContext } from '../AppContext';
import { generateM365DashboardWidgetDescription } from '../services/geminiService';
import { AVAILABLE_SERVICES } from '../constants';
import { CircleStackIcon, LightBulbIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { GroundingMetadata } from '../types';

const MOCK_WIDGET_TYPES = [
  "Overall Incident Summary",
  "Top Risky Users",
  "Endpoint Threat Landscape",
  "Email Security Trends",
  "Cloud App Anomalies",
  "Investigation Progress Tracker",
  "Alert Volume by Severity",
];

interface WidgetIdea {
  id: string;
  title: string;
  description: string;
  grounding?: GroundingMetadata;
}

const M365DefenderDashboardPage: React.FC = () => {
  const { selectedServices, isLoading, setIsLoading, setError, error } = useAppContext();
  const [widgetIdeas, setWidgetIdeas] = useState<WidgetIdea[]>([]);

  const activeServiceNames = AVAILABLE_SERVICES
    .filter(s => selectedServices.includes(s.id))
    .map(s => s.name);

  const handleGenerateIdeas = useCallback(async () => {
    if (activeServiceNames.length === 0) {
      setError("Please select at least one active service in Tenant Setup for relevant dashboard ideas.");
      // return; // Allow generation, but it will be generic
    }

    setIsLoading(true);
    setError(null);
    setWidgetIdeas([]);

    try {
      const promises = MOCK_WIDGET_TYPES.map(async (widgetType, index) => {
        const result = await generateM365DashboardWidgetDescription(widgetType, activeServiceNames);
        return { id: `widget-${index}`, title: widgetType, description: result.text, grounding: result.groundingMetadata };
      });
      const results = await Promise.all(promises);
      setWidgetIdeas(results);
    } catch (e) {
      console.error("Error generating dashboard ideas:", e);
      setError((e as Error).message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeServiceNames, setIsLoading, setError]);

  return (
    <div>
      <PageTitle title="M365 Defender Dashboard Ideas" icon={CircleStackIcon} subtitle="Generate descriptions and key data points for custom M365 Defender dashboard widgets." />

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <Card className="mb-6">
        <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Click the button to generate ideas for various dashboard widgets based on your selected services.</p>
            <Button onClick={handleGenerateIdeas} isLoading={isLoading} disabled={isLoading} leftIcon={LightBulbIcon}>
                Generate Dashboard Widget Ideas
            </Button>
        </div>
      </Card>

      {isLoading && <LoadingSpinner text="Generating dashboard ideas..." />}

      {!isLoading && widgetIdeas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgetIdeas.map((idea) => (
            <Card key={idea.id} title={idea.title} icon={InformationCircleIcon} className="flex flex-col">
              <p className="text-sm text-gray-700 mb-2 whitespace-pre-line flex-grow">{idea.description}</p>
              <GroundingSourceList groundingMetadata={idea.grounding} />
            </Card>
          ))}
        </div>
      )}
      {!isLoading && widgetIdeas.length === 0 && (
         <div className="text-center py-10">
            <CircleStackIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Click "Generate" to brainstorm M365 Defender dashboard widgets.</p>
        </div>
      )}
    </div>
  );
};

export default M365DefenderDashboardPage;