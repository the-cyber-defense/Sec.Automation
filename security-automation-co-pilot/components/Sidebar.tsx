
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CogIcon, ChartBarIcon, CpuChipIcon, CircleStackIcon, CommandLineIcon, HomeIcon } from '@heroicons/react/24/outline';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center p-3 my-1 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-150 ${
        isActive ? 'bg-blue-700 text-white font-semibold' : 'text-gray-700'
      }`
    }
  >
    <Icon className="h-6 w-6 mr-3" />
    {label}
  </NavLink>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r border-gray-300 shadow-sm flex-shrink-0 h-full fluent-scrollbar overflow-y-auto">
      <nav>
        <NavItem to="/dashboard" icon={HomeIcon} label="Dashboard" />
        <NavItem to="/tenant-setup" icon={CogIcon} label="Tenant Setup" />
        <NavItem to="/threat-analyzer" icon={CommandLineIcon} label="Threat Analyzer" />
        <NavItem to="/sentinel-workbooks" icon={ChartBarIcon} label="Sentinel Workbooks" />
        <NavItem to="/m365-dashboards" icon={CircleStackIcon} label="M365 Dashboards" />
        <NavItem to="/automation-templates" icon={CpuChipIcon} label="Automation Templates" />
        {/* Placeholder for future compliance reports */}
        {/* <NavItem to="/compliance-reports" icon={DocumentTextIcon} label="Compliance Reports" /> */}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-300">
         <p className="text-xs text-gray-500 text-center">Version 1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;