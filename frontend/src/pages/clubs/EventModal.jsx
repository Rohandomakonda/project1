import React from 'react';
import { X, Calendar, Users, MapPin, Clock } from 'lucide-react';

const EventCard = ({ event }) => {
    console.log(event);
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
    <div className="bg-gradient-to-br from-[#130b3b]/80 to-[#1a0f4a]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 group hover:shadow-lg hover:shadow-purple-500/20">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#130b3b] via-[#130b3b]/40 to-transparent" />
        
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <Clock className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors">
          {event.title}
        </h4>
        
        <p className="text-purple-200 text-sm mb-6 line-clamp-3 leading-relaxed">
          {event.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          
          
          <div className="flex items-center text-purple-300 bg-purple-500/10 rounded-lg p-2">
            <MapPin className="w-4 h-4 mr-2 text-purple-400" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventModal = ({ club, events, onClose, loading }) => {
  if (!club) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-[#130b3b]/98 to-[#1a0f4a]/98 backdrop-blur-xl rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-500/20">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Header */}
        <div className="relative p-8 border-b border-purple-500/20 bg-gradient-to-r from-purple-600/10 to-pink-600/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
                <h2 className="text-3xl font-bold text-white">
                  {club.clubname} Events
                </h2>
              </div>
              <p className="text-purple-200 text-base max-w-2xl">
                {club.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{events?.length || 0}</div>
                <div className="text-sm text-purple-300">Events</div>
              </div>
              
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-purple-600/30 hover:bg-purple-500/50 transition-all duration-300 hover:scale-110"
              >
                <X className="w-6 h-6 text-purple-200" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-160px)]">
          {loading ? (
            <div className="flex items-center justify-center h-60">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                <div className="absolute inset-0 rounded-full h-12 w-12 border-4 border-purple-300/20 animate-pulse"></div>
              </div>
            </div>
          ) : events && events.length > 0 ? (
            <>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Event Gallery</h3>
                <p className="text-purple-200">Explore the amazing events organized by {club.clubname}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No Events Yet</h3>
              <p className="text-purple-200 text-lg max-w-md mx-auto">
                This club hasn't conducted any events yet. Stay tuned for exciting updates and upcoming activities!
              </p>
              <div className="mt-8">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full text-purple-300 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Check back soon for updates
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;