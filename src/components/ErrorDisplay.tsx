import React from 'react';
import { CloudOff } from 'lucide-react';

interface Props {
  error: string;
  onRetry: () => void;
}

export const ErrorDisplay: React.FC<Props> = ({ error, onRetry }) => {
  return (
    <div className="text-center space-y-4">
      <CloudOff size={48} className="mx-auto text-red-500" />
      <div className="space-y-2">
        <p className="text-xl font-semibold text-red-600">Unable to load weather data</p>
        <p className="text-gray-600">{error}</p>
      </div>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};