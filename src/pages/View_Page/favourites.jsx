import React, { useState, useEffect } from "react";
import LikedEvent from "../../components/Event_Card/LikedEvent"; // Component for individual event cards
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
import Grid from "@mui/material/Grid"; // Import MUI Grid
import Box from "@mui/material/Box"; // Use MUI Box for consistent layout
import "./View.styles.css";

const Favourites = () => {
  const [events, setEvents] = useState([]); // All events
  const [loading, setLoading] = useState(false); // Loading state
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [roles, setRoles] = useState([]); // User roles

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    console.log("auth token is " + token);
    console.log("userId" + userId);
    if (!token) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://localhost:8080/getalllikedevents", {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      })
      .then((response) => {
        console.log("response data is " + response.data);
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

  const handleDislike = (id) => {
    alert("hello");
    const token = localStorage.getItem("authToken");

    axios
      .delete(`http://localhost:8080/dislike/${id}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        alert("Event deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Error deleting event: " + error.message);
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
          <LikedEvent
            {...event}
            image={`data:image/jpeg;base64,${event.image}`} // Image rendering
            dislike={handleDislike} // Delete handler
          />
        </Grid>
      ))
    ) : (
      <p>No events found</p>
    );

   const calculateMarginTop = (eventList) => {
      const numberOfColumns = 3; // Assuming you want 3 columns
      const numberOfRows = Math.ceil(eventList.length / numberOfColumns);
      return   (numberOfRows - 1) * 48; // Increase mt by 38 for each additional row
    };


  if (roles.includes("USER")) {
    return (
      <Box sx={{ mt: calculateMarginTop(filteredEvents),ml:15 }}>
        {/* Search Bar */}
        <Box sx={{ mb: 4 }} className="search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search events"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        {/* All Events Section */}
        <Grid container spacing={2}>
          {loading ? renderSkeletons(6) : renderEvents(filteredEvents)}
        </Grid>
      </Box>
    );
  } else {
    return null; // Render nothing for unauthorized users
  }
};

export default Favourites;
