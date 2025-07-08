import React from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';

const ClubCard = ({ club, onClick }) => {
  return (
    <div 
      className="group relative bg-gradient-to-br from-violet-900/90 to-purple-900/90 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25 border border-violet-500/20"
      onClick={() => onClick(club)}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={club.image} 
          alt={club.clubname}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 to-transparent" />
        
        {/* Club name overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-violet-200 transition-colors">
            {club.clubname}
          </h3>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <p className="text-violet-200 text-sm leading-relaxed mb-4">
          {club.description}
        </p>
        
        {/* Action indicator */}
        <div className="flex items-center justify-between">
          <span className="text-violet-300 text-xs font-medium">
            Click to view events
          </span>
          <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center group-hover:bg-violet-500/50 transition-colors">
            <Calendar className="w-4 h-4 text-violet-200" />
          </div>
        </div>
      </div>
      
      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-violet-400/0 group-hover:border-violet-400/50 transition-all duration-500" />
    </div>
  );
};

export default ClubCard;