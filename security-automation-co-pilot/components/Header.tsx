
import React from 'react';
import { APP_NAME } from '../constants';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-700 text-white p-4 shadow-md flex items-center justify-between h-16">
      <div className="flex items-center">
        <ShieldCheckIcon className="h-8 w-8 mr-3 text-blue-300" />
        <h1 className="text-xl font-semibold">{APP_NAME}</h1>
      </div>
      <div className="text-sm text-blue-200">
        AI-Powered Security Operations
      </div>
    </header>
  );
};

export default Header;