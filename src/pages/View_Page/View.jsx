import React, { useState, useEffect,useMemo } from "react";
import Event from "../../components/Event_Card/Event"; // Component for individual event cards
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
import Grid from "@mui/material/Grid"; // Import MUI Grid
import "./View.styles.css";

const View = () => {
  const [events, setEvents] = useState([]); // All events
  const [myClubEvents, setMyClubEvents] = useState([]); // Events specific to the club
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [onGoEvents, setOnGoEvents] = useState([]); // Ongoing events
  const [loading, setLoading] = useState(true); // Loading state
  const storedRoles = localStorage.getItem("roles");
  const roles = storedRoles ? JSON.parse(storedRoles) : [];
  const club = localStorage.getItem("club");

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

        // Filter events by club after fetching all data
        const mcEvents = allEventsResp.data.filter((event) => event.club === club);
        setMyClubEvents(mcEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }
      })
      .finally(() => setLoading(false));
  }, [club]);

  // Delete event handler
  const handleDelete = (id) => {
    const token = localStorage.getItem("authToken");

    axios
      .delete(`http://localhost:8080/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        setMyClubEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        setOnGoEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        alert("Event deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Error deleting event: " + error.message);
      });
  };

  // Filter events by search term
//   const filteredEvents = events.filter((event) =>
//     ["title", "description", "venue", "club"].some((key) =>
//       event[key]?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );
const filteredEvents = events.filter((event) =>
    ["title", "description", "venue", "club"].some((key) =>
      event[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
);


  // Skeleton placeholders for events
  const renderSkeletons = (count) =>
    Array.from(new Array(count)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" width="100%" height={150} />
      </Grid>
    ));

  // Render event cards
  const renderEvents = (eventList) =>
    eventList.length > 0 ? (
      eventList.map((event) => (
        <Grid item xs={12} sm={6} md={4} key={event.id}>
          <Event
            {...event}
            image={`data:image/jpeg;base64,${event.image}`} // Image rendering
            delete={handleDelete} // Delete handler
          />
        </Grid>
      ))
    ) : (
      <p>No events found</p>
    );

  if (roles.includes("CLUB_SEC")) {
    return (
      <div className="container">
        {/* My Club Events Section */}
        <div className="ongoing-events">
          <h2 className="center-text">My Club Events</h2>
          <Grid container spacing={2}>
            {loading ? renderSkeletons(3) : renderEvents(myClubEvents)}
          </Grid>
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
        <Grid container spacing={2}>
          {loading ? renderSkeletons(6) : renderEvents(filteredEvents)}
        </Grid>
      </div>
    );
  } else {
    return (
      <div className="container">
        {/* Ongoing Events Section */}
        <div className="ongoing-events">
          <h2 className="center-text">Ongoing Events</h2>
          <Grid container spacing={2}>
            {loading ? renderSkeletons(3) : renderEvents(onGoEvents)}
          </Grid>
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
        <Grid container spacing={2}>
          {loading ? renderSkeletons(6) : renderEvents(filteredEvents)}
        </Grid>
      </div>
    );
  }
};

export default View;
