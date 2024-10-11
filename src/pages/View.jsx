import React, { useState, useEffect } from "react";
import Event from "./Event";
import axios from "axios";
import "./Event.styles.css"; // Import the CSS file for styling
import SearchIcon from '@mui/icons-material/Search';

function View() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search input

  // Fetch events on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/viewevents")
      .then((resp) => {
        setEvents(resp.data); // Set the fetched events into state
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  function handleDelete(id) {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    axios
      .delete(`http://localhost:8080/event/${id}`) // Send the delete request
      .then((resp) => {
        alert("Event deleted successfully");
      })
      .catch((error) => {
        alert("handleDelete " + error);
      });
  }

  // Filter events based on search term with priority (title > description > venue)
  const filteredEvents = events.filter((event) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      event.title.toLowerCase().includes(lowerSearchTerm) ||
      event.description.toLowerCase().includes(lowerSearchTerm) ||
      event.venue.toLowerCase().includes(lowerSearchTerm)
    );
  });

  return (
    <div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          placeholder="Search events"
          name="search"
          style={{
            display: "block",
            margin: "20px",
            padding: "10px 20px", // Space for icon
            border: "1px solid black",
            borderRadius: "5px",
            width: "300px", // Adjust width as needed
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
        <SearchIcon
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#888", // Adjust color as needed
            fontSize: "20px" // Ensure the icon size is appropriate
          }}
        />
      </div>
      <div className="events-container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              time={event.time}
              venue={event.venue}
              delete={handleDelete}
            />
          ))
        ) : (
          <p>No events found</p> // Display message if no events match search criteria
        )}
      </div>
    </div>
  );
}

export default View;
