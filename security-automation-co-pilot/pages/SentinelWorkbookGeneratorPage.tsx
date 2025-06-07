
import React, { useState, useCallback } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import GroundingSourceList from '../components/GroundingSourceList';
import { useAppContext } from '../AppContext';
import { generateSentinelWorkbookDescription } from '../services/geminiService';
import { AVAILABLE_SERVICES } from '../constants';
import { ChartBarIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { GroundingMetadata } from '../types';

const SentinelWorkbookGeneratorPage: React.FC = () => {
  const { selectedServices, organizationContext, isLoading, setIsLoading, setError, error } = useAppContext();
  const [workbookFocus, setWorkbookFocus] = useState<string>('Overall Security Posture');
  const [workbookDescription, setWorkbookDescription] = useState<string>('');
  const [grounding, setGrounding] = useState<GroundingMetadata | undefined>();

  const activeServiceNames = AVAILABLE_SERVICES
    .filter(s => selectedServices.includes(s.id))
    .map(s => s.name);

  const handleGenerateDescription = useCallback(async () => {
    if (!workbookFocus) {
      setError("Please provide a focus area for the workbook.");
      return;
    }
     if (activeServiceNames.length === 0) {
      setError("Please select at least one active service in Tenant Setup for better results.");
      // Allow generation even with no services, but it might be less specific
    }

    setIsLoading(true);
    setError(null);
    setWorkbookDescription('');
    setGrounding(undefined);

    try {
      const result = await generateSentinelWorkbookDescription(organizationContext, activeServiceNames, workbookFocus);
      setWorkbookDescription(result.text);
      setGrounding(result.groundingMetadata);
    } catch (e) {
      console.error("Error generating workbook description:", e);
      setError((e as Error).message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workbookFocus, organizationContext, activeServiceNames, setIsLoading, setError]);

  return (
    <div>
      <PageTitle title="Sentinel Workbook Generator" icon={ChartBarIcon} subtitle="Generate structured descriptions and ideas for custom Sentinel workbooks." />

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <Card className="mb-6">
        <div>
          <label htmlFor="workbookFocus" className="block text-sm font-medium text-gray-700 mb-1">Workbook Focus Area</label>
          <input
            type="text"
            id="workbookFocus"
            value={workbookFocus}
            onChange={(e) => setWorkbookFocus(e.target.value)}
            placeholder="e.g., Identity Risks, Endpoint Threats, Phishing Analysis"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Describe the main theme or purpose of the workbook.</p>
        </div>
        <div className="mt-4">
          <Button onClick={handleGenerateDescription} isLoading={isLoading} disabled={isLoading || !workbookFocus} leftIcon={LightBulbIcon}>
            Generate Workbook Outline
          </Button>
        </div>
      </Card>

      {isLoading && <LoadingSpinner text="Generating workbook outline..." />}

      {!isLoading && workbookDescription && (
        <Card title="Generated Workbook Outline" icon={ChartBarIcon}>
          <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-4 rounded-md fluent-scrollbar max-h-[60vh] overflow-auto">{workbookDescription}</pre>
          <GroundingSourceList groundingMetadata={grounding} />
        </Card>
      )}
       {!isLoading && !workbookDescription && (
        <div className="text-center py-10">
            <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Enter a focus area and click "Generate" to see a workbook outline.</p>
        </div>
      )}
    </div>
  );
};

export default SentinelWorkbookGeneratorPage;