import React, { useState, useEffect } from "react";
import axios from "axios";
import Club from "../../components/Club_Card/Club.jsx";
//import "./viewClub.styles.css";
import useGet from "../../customhooks/useGet.jsx";

function ViewClub() {
  
  const { data: clubs, loading, error } = useGet('/clubs/public/viewclubs', null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  
  // Get events for selected club
  const { 
    data: events, 
    loading: eventsLoading, 
    error: eventsError 
  } = useGet(selectedClub ? `/api/events/getclubevents/${selectedClub.className}` : null, null);

  const handleClubClick = (club) => {
    setSelectedClub(club);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setSelectedClub(null);
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
            {clubs.map(club => (
              <ClubCard
                key={club.id}
                club={club}
                onClick={handleClubClick}
              />
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
        />
      )}
    </div>
  );
}



export default ViewClub;
