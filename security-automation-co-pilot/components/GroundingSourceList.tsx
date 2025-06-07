
import React from 'react';
import { GroundingMetadata, GroundingChunkWeb } from '../types';
import { LinkIcon } from '@heroicons/react/24/outline';

interface GroundingSourceListProps {
  groundingMetadata?: GroundingMetadata;
}

const GroundingSourceList: React.FC<GroundingSourceListProps> = ({ groundingMetadata }) => {
  if (!groundingMetadata || !groundingMetadata.groundingChunks || groundingMetadata.groundingChunks.length === 0) {
    return null;
  }

  const webSources: GroundingChunkWeb[] = groundingMetadata.groundingChunks
    .filter(chunk => chunk.web && chunk.web.uri)
    .map(chunk => chunk.web as GroundingChunkWeb);

  if (webSources.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
      <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
        <LinkIcon className="h-4 w-4 mr-1.5 text-gray-500" />
        Information Sources:
      </h5>
      <ul className="list-disc list-inside space-y-1">
        {webSources.map((source, index) => (
          <li key={index} className="text-xs text-blue-600 hover:text-blue-800">
            <a href={source.uri} target="_blank" rel="noopener noreferrer" title={source.title}>
              {source.title || source.uri}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroundingSourceList;