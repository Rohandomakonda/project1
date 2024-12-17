import React, { useState, useEffect } from 'react';
import Event from "../../components/Event_Card/Event";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material"; // Import Box and Button from MUI

function Home() {
  const [publicEvents, setPublicEvents] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get("http://localhost:8080/public/events")
      .then((resp) => {
        setPublicEvents(resp.data);
      })
      .catch((err) => {
        alert("Error fetching events: " + err);
      });
  }, []);

  const handleDelete = () => {
    alert("Cannot delete a public event");
  };

  const handleClick = () => {
    navigate("/register");
  };

  // Function to calculate the margin-top based on the number of events
  const calculateMarginTop = (events) => {
    const numberOfColumns = 3;  // Maximum number of events per row
    const numberOfRows = Math.ceil(events.length / numberOfColumns);  // Calculate number of rows
    return 100 + (numberOfRows - 1) * 30;  // Starting from 100px, increase by 30px for each extra row
  };

  return (
    <Box
      className="public-events"
      sx={{
        padding: 2,
        mt: calculateMarginTop(publicEvents),
        textAlign: 'center'  // This centers the title
      }}
    >
      <h1>Public Events</h1>
      <Box
        className="event-list"
        sx={{
          display: 'flex',
          justifyContent: 'center',  // Centers the cards horizontally
          flexWrap: 'wrap',
          gap: 2,
          justifyItems: 'center'
        }}
      >
        {publicEvents.map((event) => (
          <Event
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            time={event.time}
            venue={event.venue}
            image={`data:image/jpeg;base64,${event.image}`}
            club={event.club}
            delete={handleDelete}
          />
        ))}
      </Box>
      {!token && (
        <Button onClick={handleClick} variant="contained" sx={{ marginTop: 2 }}>
          Get Started
        </Button>
      )}
    </Box>
  );
}

export default Home;
