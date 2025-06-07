
import React from 'react';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface KQLViewerProps {
  kql: string;
}

const KQLViewer: React.FC<KQLViewerProps> = ({ kql }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(kql).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!kql) {
    return <p className="text-gray-500 italic">No KQL query generated yet.</p>;
  }

  return (
    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg shadow-md relative fluent-scrollbar max-h-96 overflow-auto">
      <Button
        onClick={copyToClipboard}
        variant="secondary"
        size="sm"
        className="absolute top-2 right-2 !bg-gray-700 hover:!bg-gray-600 !text-gray-200"
        leftIcon={copied ? CheckIcon : DocumentDuplicateIcon}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
      <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
        <code>{kql}</code>
      </pre>
    </div>
  );
};

export default KQLViewer;