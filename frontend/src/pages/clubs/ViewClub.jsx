import React, { useState, useEffect } from "react";
import axios from "axios";

import ClubCard from "./ClubCard"; // Assuming you have this
import EventModal from "./EventModal"; // Assuming you have this
import LoadingSpinner from "./LoadingSpinner"; // Spinner component
import ErrorMessage from "./ErrorMessage"; // Error retry component

function ViewClub() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  const [selectedClub, setSelectedClub] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API;

  // Fetch all clubs on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${API_BASE_URL}/clubs/public/viewclubs`)
      .then((res) => {
        setClubs(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch clubs");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleClubClick = (club) => {
    setSelectedClub(club);
    if(token){
      setShowEventModal(true);
    }
    
    fetchClubEvents(club.clubname);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setSelectedClub(null);
    setEvents([]);
    setEventsError(null);
  };

  const fetchClubEvents = (clubName) => {
    setEvents([]);
    setEventsError(null);
    setEventsLoading(true);

    axios
      .get(`${API_BASE_URL}/events/getclubevents/${clubName}`,{
        headers: { Authorization: `Bearer ${token}` },
      }
      )
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        setEventsError("Failed to fetch club events");
        console.error(err);
      })
      .finally(() => setEventsLoading(false));
  };

  if (loading) {
    return <LoadingSpinner 
            msg= "get the club details" />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#130b3b] via-[#1a0f4a] to-[#0f0829]">
    {/* Header */}
    <div className="relative overflow-hidden bg-gradient-to-r from-[#130b3b] to-[#1a0f4a]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Hero Image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Campus background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#130b3b]/80 via-[#130b3b]/60 to-[#130b3b]" />
      </div>
      
      <div className="relative container mx-auto px-4 py-24">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Campus <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Clubs</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover amazing clubs, connect with like-minded people, and explore exciting events that shape your campus experience
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-purple-300">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm">Active Clubs</div>
            </div>
            <div className="w-px h-12 bg-purple-500/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-sm">Members</div>
            </div>
            <div className="w-px h-12 bg-purple-500/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">200+</div>
              <div className="text-sm">Events</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Clubs Grid */}
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Explore Our <span className="text-purple-400">Communities</span>
        </h2>
        <p className="text-purple-200 text-lg max-w-2xl mx-auto">
          Join vibrant communities of passionate students and discover your interests
        </p>
      </div>
      
      {clubs && clubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {clubs.map(club => (
            <ClubCard
              key={club.id}
              club={club}
              onClick={handleClubClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-purple-200 text-lg">No clubs found</p>
        </div>
      )}
    </div>

    {/* Event Modal */}
    {showEventModal && token &&(
      <EventModal
        club={selectedClub}
        events={events}
        onClose={handleCloseModal}
        loading={eventsLoading}
      />
    )}
  </div>
);
}

export default ViewClub;
