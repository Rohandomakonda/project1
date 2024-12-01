import React, { useState, useEffect } from "react";
import Event from "../../components/Event_Card/Event";

import axios from "axios"// Assume 'api.js' handles axios configuration
import SearchIcon from "@mui/icons-material/Search";
import "./View.styles.css";

const View = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search input
  const [onGoEvents, changeOngoingEvent] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts

    // Retrieve token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Session expired. Please login again.");
      window.location.href = "/login"; // Redirect to login if token is missing
      return;
    }

    // API requests with Authorization header
    const fetchEvents = axios.get("http://localhost:8080/viewevents", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const fetchOngoingEvents = axios.get("http://localhost:8080/ongoingevents", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Wait for both API requests to finish
    Promise.all([fetchEvents, fetchOngoingEvents])
      .then(([allEventsResp, ongoingEventsResp]) => {
        setEvents(allEventsResp.data);
        changeOngoingEvent(ongoingEventsResp.data);
      })
      .catch((error) => {
        alert("Error fetching events: " + error.message);
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please login again.");
          window.location.href = "/login"; // Redirect on unauthorized access
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching is complete
      });
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("authToken");

    axios
      .delete(`http://localhost:8080/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        changeOngoingEvent((prevEvents) => prevEvents.filter((event) => event.id !== id));
        alert("Event deleted successfully");
      })
      .catch((error) => {
        alert("Error deleting event: " + error.message);
      });
  };

  // Filter events based on search term with priority (title > description > venue > club)
  const filteredEvents = events.filter((event) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(lowerSearchTerm) ||
      event.description.toLowerCase().includes(lowerSearchTerm) ||
      event.venue.toLowerCase().includes(lowerSearchTerm) ||
      event.club.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const renderEventList = (eventList) => {
    return eventList.length > 0 ? (
      eventList.map((event) => (
        <Event
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          date={event.date}
          time={event.time}
          venue={event.venue}
          club={event.club}
          imgUrl={event.imgUrl}
          venue_description={event.venueDescription}
          delete={handleDelete}
        />
      ))
    ) : (
      <p>No events found</p>
    );
  };

  return (
    <div className="container">
      <div className="ongoing-events">
        <h2 className="center-text">Ongoing events..</h2>
        <div className="events-container">
          {loading ? <p>Loading events...</p> : renderEventList(onGoEvents)}
        </div>
      </div>

      <div className="search-container">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="Search events"
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
      </div>

      <div className="events-container">
        {loading ? <p>Loading events...</p> : renderEventList(filteredEvents)}
      </div>
    </div>
  );
};

export default View;
