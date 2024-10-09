import React, { useState, useEffect } from "react";
import Event from "./Event";
import axios from "axios";
import "./Event.styles.css"; // Import the CSS file for styling

function View() {
  const [events, setEvents] = useState([]);

  // Fetch events on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/viewevents")
      .then((resp) => {
        setEvents(resp.data); // Properly setting state with fetched events
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
        alert("handleDelete "+error);
      });
  }

  return (
    <div className="events-container">
      {events.map((event) => (
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
      ))}
    </div>
  );
}

export default View;
