import React, { useState, useEffect } from "react";
import Event from "../../components/Event_Card/Event"; // Component for individual event cards
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
import Grid from "@mui/material/Grid"; // Import MUI Grid
import Box from "@mui/material/Box"; // Import MUI Box
import TextField from '@mui/material/TextField'; // Import MUI TextField
import Particles from "react-tsparticles"; // Import the particles component

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
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const filteredEvents = events.filter((event) =>
    ["title", "description", "venue", "club"].some((key) =>
      event[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderSkeletons = (count) =>
    Array.from(new Array(count)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" width="100%" height={150} />
      </Grid>
    ));

  const renderEvents = (eventList) =>
    eventList.length > 0 ? (
      <Grid container spacing={2} justifyContent={eventList.length < 3 ? "center" : "flex-start"}>
        {eventList.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id} sx={{ minWidth: "350px" }}>
            <Event
              {...event}
              venue_description={event.venueDescription}
              image={`data:image/jpeg;base64,${event.image}`} // Image rendering
              delete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    ) : (
      <p>No events found</p>
    );

  const calculateMarginTop = (eventList, eventList2) => {
    const numberOfColumns = 3;
    const numberOfRows = Math.ceil(eventList.length / numberOfColumns);
    const n1 = Math.ceil(eventList2.length / numberOfColumns);
    return 140 + (n1 - 1) * 40 + (numberOfRows - 1) * 40; // Increase mt by 30 for each additional row
  };

  return (
    <Box sx={{ mt: calculateMarginTop(filteredEvents, myClubEvents), position: "relative" }}>
      {/* Particles Background */}
      <Particles
        options={{
          background: {
            color: { value: "#000000" }, // Black background
          },
          particles: {
            color: { value: "#ffffff" }, // White particles
            line_linked: {
              color: "#ffffff", // White lines connecting particles
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50,
            },
            size: {
              value: 3,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "random",
              out_mode: "out",
            },
          },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh", // Full viewport height
          zIndex: -1, // Behind all other content
        }}
      />

      {/* Content */}
      {roles.includes("CLUB_SEC") ? (
        <>
          <Box sx={{ mt: 2 }}>
            <h2 className="center-text" style={{ color: "white" }}>My Club Events</h2>
            <Grid container spacing={2}>
              {loading ? renderSkeletons(3) : renderEvents(myClubEvents)}
            </Grid>
          </Box>

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

          <Box>
            <h2 className="center-text" style={{ color: "white" }}>All Events</h2>
            <Grid container spacing={2}>
              {loading ? renderSkeletons(6) : renderEvents(filteredEvents)}
            </Grid>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ mt: 2 }}>
            <h2 className="center-text" style={{ color: "white" }}>Ongoing Events</h2>
            <Grid container spacing={2}>
              {loading ? renderSkeletons(3) : renderEvents(onGoEvents)}
            </Grid>
          </Box>

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

          <Box>
            <h2 className="center-text" style={{ color: "white" }}>All Events</h2>
            <Grid container spacing={2}>
              {loading ? renderSkeletons(6) : renderEvents(filteredEvents)}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default View;
