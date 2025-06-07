
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import { useAppContext } from '../AppContext';
import { AVAILABLE_SERVICES } from '../constants';
import { HomeIcon, CogIcon, CommandLineIcon, ChartBarIcon, CircleStackIcon, CpuChipIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const DashboardPage: React.FC = () => {
  const { selectedServices, organizationContext } = useAppContext();
  const activeServices = AVAILABLE_SERVICES.filter(s => selectedServices.includes(s.id));

  return (
    <div>
      <PageTitle title="Security Co-Pilot Dashboard" icon={HomeIcon} subtitle="Your central hub for AI-powered security automation and insights." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="Current Tenant Setup" icon={CogIcon} className="bg-gradient-to-br from-blue-50 to-indigo-50">
          <p className="text-sm text-gray-600 mb-2">Configure your detected services and organizational context.</p>
          <div className="mb-3">
            <h4 className="font-semibold text-gray-700">Active Services:</h4>
            {activeServices.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-600">
                {activeServices.map(s => <li key={s.id}>{s.name}</li>)}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">No services selected.</p>
            )}
          </div>
          <div className="mb-3">
            <h4 className="font-semibold text-gray-700">Organization Context:</h4>
            <p className="text-sm text-gray-600">Industry: {organizationContext.industry}</p>
            <p className="text-sm text-gray-600">Geo: {organizationContext.geoLocation}</p>
            <p className="text-sm text-gray-600">Size: {organizationContext.size}</p>
          </div>
          <Link to="/tenant-setup">
            <Button variant="outline" size="sm" rightIcon={ArrowRightIcon}>Update Setup</Button>
          </Link>
        </Card>

        <Card title="Quick Actions" icon={CommandLineIcon} className="bg-gradient-to-br from-green-50 to-emerald-50">
          <p className="text-sm text-gray-600 mb-3">Jump directly into generating security assets:</p>
          <div className="space-y-2">
            <Link to="/threat-analyzer"><Button variant="primary" className="w-full justify-start" leftIcon={CommandLineIcon}>Analyze Threat Scenario</Button></Link>
            <Link to="/sentinel-workbooks"><Button variant="primary" className="w-full justify-start" leftIcon={ChartBarIcon}>Generate Sentinel Workbook</Button></Link>
            <Link to="/m365-dashboards"><Button variant="primary" className="w-full justify-start" leftIcon={CircleStackIcon}>Create M365 Dashboard</Button></Link>
          </div>
        </Card>
        
        <Card title="Automation Hub" icon={CpuChipIcon} className="bg-gradient-to-br from-purple-50 to-violet-50">
           <p className="text-sm text-gray-600 mb-3">Explore and configure automation playbooks:</p>
            <Link to="/automation-templates">
                <Button variant="primary" className="w-full" leftIcon={CpuChipIcon} rightIcon={ArrowRightIcon}>
                View Automation Templates
                </Button>
            </Link>
             <p className="text-xs text-gray-500 mt-4">
                Leverage AI to generate logic for common security response actions based on your selected services.
            </p>
        </Card>
      </div>

      <Card title="About This Application" className="bg-white">
        <p className="text-gray-700 mb-2">
          The Security Automation Co-Pilot uses AI (powered by Google Gemini) to help you generate KQL queries, playbook outlines,
          Sentinel workbook structures, and M365 Defender dashboard ideas.
        </p>
        <p className="text-gray-700">
          Navigate through the sections using the sidebar to explore different functionalities. Remember to configure your
          mock tenant services and organizational context in the <Link to="/tenant-setup" className="text-blue-600 hover:underline">Tenant Setup</Link> page
          for more tailored AI suggestions.
        </p>
         <p className="mt-4 text-sm text-gray-600">
          <strong>Note:</strong> This is a demonstration application. All generated content should be reviewed and tested by qualified security professionals before use in a production environment. API key for Gemini must be configured as `process.env.API_KEY`.
        </p>
      </Card>
    </div>
  );
};

export default DashboardPage;