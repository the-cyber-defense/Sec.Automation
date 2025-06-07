
import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, icon: Icon }) => {
  return (
    <div className="mb-6 pb-4 border-b border-gray-300">
      <div className="flex items-center">
        {Icon && <Icon className="h-8 w-8 mr-3 text-blue-600" />}
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>
      {subtitle && <p className="mt-1 text-md text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;