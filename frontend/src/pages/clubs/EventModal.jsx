import React from 'react';
import { X, Calendar, Users, MapPin, Clock } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    return status === 'completed' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300';
  };

  return (
    <div className="bg-gradient-to-br from-violet-800/50 to-purple-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 group">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 to-transparent" />
        
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-200 transition-colors">
          {event.title}
        </h4>
        
        <p className="text-violet-200 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center text-violet-300">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(event.date)}
          </div>
          
          <div className="flex items-center text-violet-300">
            <Users className="w-3 h-3 mr-1" />
            {event.attendees} attendees
          </div>
          
          <div className="flex items-center text-violet-300 col-span-2">
            <MapPin className="w-3 h-3 mr-1" />
            {event.location}
          </div>
        </div>
      </div>
    </div>
  );
};

const EventModal = ({ club, events, onClose, loading }) => {
  if (!club) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-violet-900/95 to-purple-900/95 backdrop-blur-md rounded-2xl border border-violet-500/30 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-violet-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {club.clubname} Events
              </h2>
              <p className="text-violet-200 text-sm">
                {club.description}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-violet-600/30 hover:bg-violet-500/50 transition-colors"
            >
              <X className="w-5 h-5 text-violet-200" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-500 border-t-transparent"></div>
            </div>
          ) : events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-violet-400 mx-auto mb-4 opacity-50" />
              <p className="text-violet-200 text-lg font-medium mb-2">No events yet</p>
              <p className="text-violet-300 text-sm">
                This club hasn't conducted any events yet. Stay tuned for updates!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;