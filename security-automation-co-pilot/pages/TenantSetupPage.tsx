
import React from 'react';
import Card from '../components/Card';
import PageTitle from '../components/PageTitle';
import { useAppContext } from '../AppContext';
import { AVAILABLE_SERVICES, INDUSTRIES, GEO_LOCATIONS, COMPANY_SIZES } from '../constants';
import { Service } from '../types';
import { CogIcon, BuildingOffice2Icon, MapPinIcon, UsersIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';

const TenantSetupPage: React.FC = () => {
  const { 
    selectedServices, 
    setSelectedServices, 
    organizationContext, 
    setOrganizationContext 
  } = useAppContext();

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };

  const handleOrgContextChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrganizationContext(prev => ({ ...prev, [name]: value }));
  };
  
  const [saved, setSaved] = React.useState(false);
  const handleSave = () => {
    // In a real app, this might persist to local storage or a backend
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <PageTitle title="Tenant Configuration" icon={CogIcon} subtitle="Define your organization's security posture and context for tailored AI suggestions." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Active Microsoft Security Services" icon={CheckCircleIcon}>
          <p className="text-sm text-gray-600 mb-4">Select the services your organization currently utilizes. This helps AI generate more relevant content.</p>
          <div className="space-y-3">
            {AVAILABLE_SERVICES.map((service: Service) => (
              <label key={service.id} className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleServiceToggle(service.id)}
                />
                <div className="ml-3">
                  <span className="font-medium text-gray-800">{service.name}</span>
                  <p className="text-xs text-gray-500">{service.description}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>

        <Card title="Organization Context" icon={BuildingOffice2Icon}>
          <p className="text-sm text-gray-600 mb-4">Provide details about your organization to help tailor recommendations.</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <div className="relative">
                <BuildingOffice2Icon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 text-gray-400 -translate-y-1/2" />
                <select
                  id="industry"
                  name="industry"
                  value={organizationContext.industry}
                  onChange={handleOrgContextChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="geoLocation" className="block text-sm font-medium text-gray-700 mb-1">Primary Geo-Location</label>
              <div className="relative">
                <MapPinIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 text-gray-400 -translate-y-1/2" />
                <select
                  id="geoLocation"
                  name="geoLocation"
                  value={organizationContext.geoLocation}
                  onChange={handleOrgContextChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {GEO_LOCATIONS.map(geo => <option key={geo} value={geo}>{geo}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
              <div className="relative">
                <UsersIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 text-gray-400 -translate-y-1/2" />
                <select
                  id="size"
                  name="size"
                  value={organizationContext.size}
                  onChange={handleOrgContextChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>
       <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} size="lg" leftIcon={saved ? CheckCircleIcon : undefined}>
            {saved ? 'Settings Saved!' : 'Save Settings'}
          </Button>
        </div>
    </div>
  );
};

export default TenantSetupPage;