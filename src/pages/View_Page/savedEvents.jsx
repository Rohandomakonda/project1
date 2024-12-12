import React, { useState, useEffect } from "react";
import SavedEvent from "../../components/Event_Card/SavedEvent"; // Component for individual event cards
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
import Grid from "@mui/material/Grid"; // Import MUI Grid
import "./View.styles.css";

const SavedEvents = () => {
  const [events, setEvents] = useState([]); // All events
  const [loading, setLoading] = useState(false); // Loading state
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [roles, setRoles] = useState([]); // User roles

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }

    // Fetch saved events
    axios
      .get("http://localhost:8080/getallsavedevents", {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      })
      .then((response) => {
        setEvents(response.data); // Update events list
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }
      })
      .finally(() => setLoading(false));

    // Fetch roles
    const userRoles = localStorage.getItem("roles");
    setRoles(userRoles ? JSON.parse(userRoles) : []);
  }, [userId]);

 const handleunsave = (title) => {
   const token = localStorage.getItem("authToken");

   axios
     .delete(`http://localhost:8080/unsave`, {
       headers: { Authorization: `Bearer ${token}` },
       params: { userId: userId, eventTitle: title }, // Send eventId for deletion
     })
     .then(() => {
       setEvents((prevEvents) => prevEvents.filter((event) => event.title !== title));
       alert("Event unsaved successfully");
     })
     .catch((error) => {
       console.error("Error unsaving event:", error);
       alert("Error unsaving event: " + error.message);
     });
 };


  // Filter events based on the search term
  const filteredEvents = events.filter((event) =>
    ["title", "description", "venue", "club"].some((key) =>
      event[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Render skeletons while loading
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
          <SavedEvent
            {...event}
            image={`data:image/jpeg;base64,${event.image}`} // Image rendering
            unsave={handleunsave} // Delete handler
           //if this event is in saved event then saved true else saved false
                       //if this event is in fav event then liked true else liked false
          />
        </Grid>
      ))
    ) : (
      <p>No events found</p>
    );

  if (roles.includes("USER")) {
    return (
      <div className="container">
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
    return null; // Render nothing for unauthorized users
  }
};

export default SavedEvents;
