
import React from 'react';

interface PlaybookViewerProps {
  playbookContent: string;
  title?: string;
}

const PlaybookViewer: React.FC<PlaybookViewerProps> = ({ playbookContent, title = "Automation Playbook Outline" }) => {
   if (!playbookContent) {
    return <p className="text-gray-500 italic">No playbook content generated yet.</p>;
  }
  return (
    <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg shadow">
      <h4 className="text-md font-semibold text-gray-700 mb-2">{title}</h4>
      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono bg-white p-3 rounded fluent-scrollbar max-h-96 overflow-auto">
        <code>{playbookContent}</code>
      </pre>
    </div>
  );
};

export default PlaybookViewer;