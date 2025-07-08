import React from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';

const ClubCard = ({ club, onClick }) => {
  return (
    <div 
      className="group relative bg-gradient-to-br from-[#130b3b]/95 to-[#1a0f4a]/95 backdrop-blur-sm rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 border border-purple-500/20 hover:border-purple-400/50"
      onClick={() => onClick(club)}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Image container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={club.image} 
          alt={club.clubname}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#130b3b] via-[#130b3b]/60 to-transparent" />
        
        {/* Floating elements */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-8 h-8 bg-purple-500/30 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Calendar className="w-4 h-4 text-purple-200" />
          </div>
        </div>
        
        {/* Club name overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
            {club.clubname}
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8">
        <p className="text-purple-200 text-base leading-relaxed mb-6 line-clamp-3">
          {club.description}
        </p>
        
        {/* Stats and action */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-purple-300">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>50+ members</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-purple-300 text-sm font-medium group-hover:text-purple-200 transition-colors">
            Click to explore events
          </span>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 flex items-center justify-center group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-300 transform group-hover:scale-110">
            <svg className="w-5 h-5 text-purple-200 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-purple-400/0 group-hover:border-purple-400/60 transition-all duration-700" />
    </div>
  );
};

export default ClubCard;