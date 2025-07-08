import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-violet-500 border-t-transparent mx-auto mb-4"></div>
          <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-violet-300/20 mx-auto animate-pulse"></div>
        </div>
        <p className="text-violet-200 text-lg font-medium">Loading clubs...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;