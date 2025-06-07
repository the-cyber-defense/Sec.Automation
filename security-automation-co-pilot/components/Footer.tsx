
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-4 text-center text-sm">
      © {new Date().getFullYear()} Security Automation Co-Pilot. All rights reserved.
      <p className="text-xs text-gray-500 mt-1">Simulated environment for demonstration purposes.</p>
    </footer>
  );
};

export default Footer;