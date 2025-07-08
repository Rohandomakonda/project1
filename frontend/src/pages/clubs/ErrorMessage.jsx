import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="bg-red-500/20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-red-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">
          Something went wrong
        </h2>
        
        <p className="text-violet-200 mb-6">
          {error || 'Failed to load clubs. Please try again.'}
        </p>
        
        <button
          onClick={onRetry}
          className="inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;