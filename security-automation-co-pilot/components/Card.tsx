
import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  icon?: React.ElementType;
  onClick?: () => void; // Added optional onClick prop
}

const Card: React.FC<CardProps> = ({ title, children, className = '', titleClassName = '', icon: Icon, onClick }) => {
  return (
    <div 
      className={`bg-white shadow-lg rounded-xl overflow-hidden ${className}`}
      onClick={onClick} // Applied onClick handler to the root div
    >
      {title && (
        <div className={`p-4 border-b border-gray-200 flex items-center ${titleClassName}`}>
          {Icon && <Icon className="h-6 w-6 mr-2 text-blue-600" />}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default Card;