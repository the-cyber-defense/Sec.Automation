
import React, { useState, useCallback } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import GroundingSourceList from '../components/GroundingSourceList';
import { useAppContext } from '../AppContext';
import { generateAutomationTemplateLogic } from '../services/geminiService';
import { AUTOMATION_TEMPLATES, AVAILABLE_SERVICES } from '../constants';
import { AutomationTemplate, GroundingMetadata } from '../types'; // Added GroundingMetadata
import { CpuChipIcon, LightBulbIcon, Cog8ToothIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import InfoPill from '../components/InfoPill';


const AutomationTemplatesPage: React.FC = () => {
  const { selectedServices, isLoading, setIsLoading, setError, error } = useAppContext();
  const [selectedTemplate, setSelectedTemplate] = useState<AutomationTemplate | null>(null);
  const [generatedLogic, setGeneratedLogic] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [grounding, setGrounding] = useState<GroundingMetadata | undefined>();

  const activeServiceNames = AVAILABLE_SERVICES
    .filter(s => selectedServices.includes(s.id))
    .map(s => s.name);

  const handleSelectTemplate = (template: AutomationTemplate) => {
    setSelectedTemplate(template);
    setGeneratedLogic(''); // Clear previous logic
    setGrounding(undefined);
    setIsModalOpen(true);
  };

  const handleGenerateLogic = useCallback(async () => {
    if (!selectedTemplate) {
      setError("No template selected.");
      return;
    }
     if (activeServiceNames.length === 0) {
      setError("Please select at least one active service in Tenant Setup for better results.");
      // Allow generation but it might be less specific
    }

    setIsLoading(true);
    setError(null);
    setGeneratedLogic('');
    setGrounding(undefined);

    try {
      const result = await generateAutomationTemplateLogic(selectedTemplate.name, selectedTemplate.description, activeServiceNames);
      setGeneratedLogic(result.text);
      setGrounding(result.groundingMetadata);
    } catch (e) {
      console.error("Error generating automation logic:", e);
      setError((e as Error).message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate, activeServiceNames, setIsLoading, setError]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
    setGeneratedLogic('');
    setError(null);
  };
  
  const getCategoryColor = (category: string): "blue" | "green" | "yellow" | "red" | "gray" => {
    if (category.toLowerCase().includes("endpoint")) return "green";
    if (category.toLowerCase().includes("identity")) return "blue";
    if (category.toLowerCase().includes("email")) return "yellow";
    if (category.toLowerCase().includes("notification")) return "gray";
    return "red"; // for others or general
  }


  return (
    <div>
      <PageTitle title="Automation Templates" icon={CpuChipIcon} subtitle="Explore pre-defined automation templates and generate their logical flow using AI." />

       {error && !isModalOpen && ( // Show general errors outside modal
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AUTOMATION_TEMPLATES.map((template) => (
          <Card 
            key={template.id} 
            title={template.name} 
            icon={Cog8ToothIcon} 
            className="hover:shadow-xl transition-shadow duration-200 cursor-pointer flex flex-col justify-between" 
            onClick={() => handleSelectTemplate(template)}
          >
            <div>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
            </div>
            <div className="mt-auto">
              <InfoPill color={getCategoryColor(template.category)}>{template.category}</InfoPill>
            </div>
          </Card>
        ))}
      </div>

      {selectedTemplate && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={`Automation Logic for: ${selectedTemplate.name}`} size="xl">
            {error && isModalOpen && ( // Show errors specific to modal generation
                <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-md">
                <p className="font-semibold">Error:</p>
                <p className="text-sm">{error}</p>
                </div>
            )}
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="font-semibold text-blue-700 flex items-center"><InformationCircleIcon className="h-5 w-5 mr-2" />Template Details:</h4>
                <p className="text-sm text-gray-700 mt-1">{selectedTemplate.description}</p>
                <p className="text-xs text-gray-500 mt-2">Category: {selectedTemplate.category}</p>
            </div>

          <Button onClick={handleGenerateLogic} isLoading={isLoading} disabled={isLoading} leftIcon={LightBulbIcon} className="mb-4 w-full">
            Generate Logic Outline
          </Button>

          {isLoading && <LoadingSpinner text="Generating logic..." />}

          {!isLoading && generatedLogic && (
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-700 mb-2">Generated Logic Outline:</h4>
              <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-100 p-3 rounded-md border border-gray-200 fluent-scrollbar max-h-60 overflow-auto">{generatedLogic}</pre>
              <GroundingSourceList groundingMetadata={grounding} />
            </div>
          )}
          {!isLoading && !generatedLogic && (
             <div className="text-center py-6">
                <p className="text-gray-500">Click "Generate Logic Outline" to see AI-powered suggestions.</p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default AutomationTemplatesPage;