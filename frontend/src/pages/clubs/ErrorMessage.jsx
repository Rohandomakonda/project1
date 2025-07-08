import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#130b3b] via-[#1a0f4a] to-[#0f0829] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="text-center max-w-md">
        <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full p-6 w-24 h-24 mx-auto mb-8 flex items-center justify-center backdrop-blur-sm border border-red-500/20">
          <AlertCircle className="w-12 h-12 text-red-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Something went wrong
        </h2>
        
        <p className="text-purple-200 mb-8 text-lg leading-relaxed">
          {error || 'Failed to load clubs. Please try again.'}
        </p>
        
        <button
          onClick={onRetry}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
        >
          <RefreshCw className="w-5 h-5 mr-3" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;