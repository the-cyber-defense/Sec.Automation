
import React, { useState, useCallback } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import KQLViewer from '../components/KQLViewer';
import PlaybookViewer from '../components/PlaybookViewer';
import LoadingSpinner from '../components/LoadingSpinner';
import GroundingSourceList from '../components/GroundingSourceList';
import { useAppContext } from '../AppContext';
import { generateKQLQuery, generatePlaybookOutline, generateWithGoogleSearch } from '../services/geminiService';
import { THREAT_SCENARIOS, AVAILABLE_SERVICES } from '../constants';
import { ThreatScenario, GroundingMetadata } from '../types';
import { CommandLineIcon, MagnifyingGlassIcon, LightBulbIcon, CpuChipIcon } from '@heroicons/react/24/outline'; // Added CpuChipIcon

const ThreatScenarioAnalyzerPage: React.FC = () => {
  const { selectedServices, isLoading, setIsLoading, setError, error } = useAppContext();
  const [selectedScenario, setSelectedScenario] = useState<ThreatScenario | null>(THREAT_SCENARIOS[0]);
  const [kqlQuery, setKqlQuery] = useState<string>('');
  const [playbookOutline, setPlaybookOutline] = useState<string>('');
  const [automationAction, setAutomationAction] = useState<string>('Isolate endpoint and notify SOC');
  
  const [kqlGrounding, setKqlGrounding] = useState<GroundingMetadata | undefined>();
  const [playbookGrounding, setPlaybookGrounding] = useState<GroundingMetadata | undefined>();
  const [searchGrounding, setSearchGrounding] = useState<GroundingMetadata | undefined>();
  const [additionalContext, setAdditionalContext] = useState<string>('');


  const activeServiceNames = AVAILABLE_SERVICES
    .filter(s => selectedServices.includes(s.id))
    .map(s => s.name);

  const handleGenerate = useCallback(async () => {
    if (!selectedScenario) {
      setError("Please select a threat scenario.");
      return;
    }
    if (activeServiceNames.length === 0) {
      setError("Please select at least one active service in Tenant Setup.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setKqlQuery('');
    setPlaybookOutline('');
    setKqlGrounding(undefined);
    setPlaybookGrounding(undefined);

    try {
      const kqlPromise = generateKQLQuery(selectedScenario.name, activeServiceNames);
      const playbookPromise = generatePlaybookOutline(selectedScenario.name, activeServiceNames, automationAction);
      
      const [kqlResult, playbookResult] = await Promise.all([kqlPromise, playbookPromise]);

      setKqlQuery(kqlResult.text);
      setKqlGrounding(kqlResult.groundingMetadata);
      setPlaybookOutline(playbookResult.text);
      setPlaybookGrounding(playbookResult.groundingMetadata);

    } catch (e) {
      console.error("Error generating content:", e);
      setError((e as Error).message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScenario, activeServiceNames, automationAction, setIsLoading, setError]);


  const handleSearchContext = useCallback(async () => {
    if (!selectedScenario) {
      setError("Please select a threat scenario to search for context.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAdditionalContext('');
    setSearchGrounding(undefined);

    try {
      const searchQuery = `Provide recent threat intelligence and mitigation strategies for ${selectedScenario.name}.`;
      const result = await generateWithGoogleSearch(searchQuery);
      setAdditionalContext(result.text);
      setSearchGrounding(result.groundingMetadata);
    } catch (e) {
      console.error("Error fetching additional context:", e);
      setError((e as Error).message || "An unknown error occurred during search.");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScenario, setIsLoading, setError]);


  return (
    <div>
      <PageTitle title="Threat Scenario Analyzer" icon={CommandLineIcon} subtitle="Generate KQL queries and playbook outlines for common security threats." />

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="threatScenario" className="block text-sm font-medium text-gray-700 mb-1">Select Threat Scenario</label>
            <select
              id="threatScenario"
              value={selectedScenario?.id || ''}
              onChange={(e) => {
                const scenario = THREAT_SCENARIOS.find(s => s.id === e.target.value) || null;
                setSelectedScenario(scenario);
              }}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>-- Select a Scenario --</option>
              {THREAT_SCENARIOS.map(scenario => (
                <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
              ))}
            </select>
            {selectedScenario && <p className="text-xs text-gray-500 mt-1">{selectedScenario.description}</p>}
          </div>
          <div>
            <label htmlFor="automationAction" className="block text-sm font-medium text-gray-700 mb-1">Primary Automation Action</label>
            <input
              type="text"
              id="automationAction"
              value={automationAction}
              onChange={(e) => setAutomationAction(e.target.value)}
              placeholder="e.g., Isolate endpoint, block user"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
             <p className="text-xs text-gray-500 mt-1">Describe the main goal of the automation.</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
          <Button onClick={handleGenerate} isLoading={isLoading} disabled={isLoading || !selectedScenario} leftIcon={LightBulbIcon} className="w-full sm:w-auto">
            Generate KQL & Playbook
          </Button>
          <Button onClick={handleSearchContext} isLoading={isLoading} disabled={isLoading || !selectedScenario} variant="secondary" leftIcon={MagnifyingGlassIcon} className="w-full sm:w-auto">
            Get Context with Google Search
          </Button>
        </div>
      </Card>

      {isLoading && <LoadingSpinner text="Generating content, please wait..." />}

      {!isLoading && (additionalContext || searchGrounding) && (
        <Card title="Additional Context from Google Search" icon={MagnifyingGlassIcon} className="mb-6 bg-yellow-50">
          <p className="text-sm text-gray-700 whitespace-pre-line">{additionalContext}</p>
          <GroundingSourceList groundingMetadata={searchGrounding} />
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {!isLoading && (kqlQuery || kqlGrounding) && (
          <Card title="Generated KQL Query" icon={CommandLineIcon}>
            <KQLViewer kql={kqlQuery} />
            <GroundingSourceList groundingMetadata={kqlGrounding} />
          </Card>
        )}
        
        {!isLoading && (playbookOutline || playbookGrounding) && (
          <Card title="Generated Playbook Outline" icon={CpuChipIcon}>
            <PlaybookViewer playbookContent={playbookOutline} />
            <GroundingSourceList groundingMetadata={playbookGrounding} />
          </Card>
        )}
      </div>
       {!isLoading && !kqlQuery && !playbookOutline && !additionalContext && (
        <div className="text-center py-10">
            <CommandLineIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Select a scenario and click "Generate" to see results.</p>
        </div>
      )}
    </div>
  );
};

export default ThreatScenarioAnalyzerPage;