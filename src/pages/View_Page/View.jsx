import React, { useState, useEffect } from "react";
import Event from "../../components/Event_Card/Event"; // Component for individual event cards
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import "./View.styles.css";

const View = () => {
  const [events, setEvents] = useState([]); // All events
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [onGoEvents, setOnGoEvents] = useState([]); // Ongoing events
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    setLoading(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }

    // Fetch events and ongoing events in parallel
    const fetchEvents = axios.get("http://localhost:8080/viewevents", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const fetchOngoingEvents = axios.get("http://localhost:8080/ongoingevents", {
      headers: { Authorization: `Bearer ${token}` },
    });

    Promise.all([fetchEvents, fetchOngoingEvents])
      .then(([allEventsResp, ongoingEventsResp]) => {
        setEvents(allEventsResp.data); // Update all events
        setOnGoEvents(ongoingEventsResp.data); // Update ongoing events
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Delete event handler
  const handleDelete = (id) => {
    const token = localStorage.getItem("authToken");

    axios
      .delete(`http://localhost:8080/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        setOnGoEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        alert("Event deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Error deleting event: " + error.message);
      });
  };

  // Filter events by search term
  const filteredEvents = events.filter((event) =>
    ["title", "description", "venue", "club"].some((key) =>
      event[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Render event cards
  const renderEvents = (eventList) =>
    eventList.length > 0 ? (
      eventList.map((event) => (
        <Event
          key={event.id}
          {...event}
          image={`data:image/jpeg;base64,${event.image}`} // Image rendering
          delete={handleDelete} // Delete handler
        />
      ))
    ) : (
      <p>No events found</p>
    );

  return (
    <div className="container">
      {/* Ongoing Events Section */}
      <div className="ongoing-events">
        <h2 className="center-text">Ongoing Events</h2>
        <div className="events-container">
          {loading ? <p>Loading...</p> : renderEvents(onGoEvents)}
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="Search events"
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* All Events Section */}
      <div className="events-container">
        {loading ? <p>Loading...</p> : renderEvents(filteredEvents)}
      </div>
    </div>
  );
};

export default View;
