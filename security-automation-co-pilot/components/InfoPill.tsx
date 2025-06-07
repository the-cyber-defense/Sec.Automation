
import React, { ReactNode } from 'react';

interface InfoPillProps {
  children: ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  className?: string;
}

const InfoPill: React.FC<InfoPillProps> = ({ children, color = 'blue', className = '' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
};

export default InfoPill;