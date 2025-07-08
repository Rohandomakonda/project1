import React, { useState, useEffect } from "react";
import axios from "axios";

import ClubCard from "../clubs/ClubCard"; // Assuming you have this
import EventModal from "../clubs/EventModal"; // Assuming you have this
import LoadingSpinner from "../clubs/LoadingSpinner"; // Spinner component
import ErrorMessage from "../clubs/ErrorMessage"; // Error retry component

function ViewClub() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setShowEventModal(true);
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
      .get(`${API_BASE_URL}/events/getclubevents/${clubName}`)
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
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Campus <span className="text-violet-400">Clubs</span>
            </h1>
            <p className="text-xl text-violet-200 max-w-2xl mx-auto">
              Discover amazing clubs, connect with like-minded people, and explore exciting events
            </p>
          </div>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="container mx-auto px-4 py-16">
        {clubs && clubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} onClick={handleClubClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-violet-200 text-lg">No clubs found</p>
          </div>
        )}
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          club={selectedClub}
          events={events}
          onClose={handleCloseModal}
          loading={eventsLoading}
          error={eventsError}
        />
      )}
    </div>
  );
}

export default ViewClub;
