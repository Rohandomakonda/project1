import React, { useState, useEffect } from "react";
import Event from "./Event";
import axios from "axios";
import "./Event.styles.css"; // Import the CSS file for styling
import SearchIcon from '@mui/icons-material/Search';
import "./View.styles.css";

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
      event.venue.toLowerCase().includes(lowerSearchTerm)||
      event.club.toLowerCase().includes(lowerSearchTerm)
    );
  });

  return (
    <div>
        <div><h2>Ongoing events..</h2> </div>

        <div style={{ position: "relative" }}>
                    <input
                        type="text"
                        placeholder="Search events"
                        name="search"
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                    />
       <SearchIcon className="search-icon" />
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
              club={event.club}
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
