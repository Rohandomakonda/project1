import React from 'react';

const LoadingSpinner = (props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#130b3b] via-[#1a0f4a] to-[#0f0829] flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="text-center">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500 border-t-transparent mx-auto"></div>
          <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-purple-300/20 mx-auto animate-pulse"></div>
          <div className="absolute inset-4 rounded-full h-12 w-12 bg-gradient-to-r from-purple-600/30 to-pink-600/30 mx-auto animate-pulse"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">${props.msg}</h2>
        
        <div className="flex items-center justify-center mt-6 space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;