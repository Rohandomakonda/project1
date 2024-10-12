import React, { useState, useEffect } from "react";
import Event from "./Event";
import axios from "axios";
import "./Event.styles.css"; // Import the CSS file for styling
import SearchIcon from '@mui/icons-material/Search';
import "./View.styles.css";

function View() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search input
  const [onGoEvents, changeOngoingEvent] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch events and ongoing events on component mount
  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts

    const fetchEvents = axios.get("http://localhost:8080/viewevents");
    const fetchOngoingEvents = axios.get("http://localhost:8080/ongoingevents");

    // Wait for both API requests to finish
    Promise.all([fetchEvents, fetchOngoingEvents])
      .then(([allEventsResp, ongoingEventsResp]) => {
        setEvents(allEventsResp.data);
        changeOngoingEvent(ongoingEventsResp.data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching is complete
      });
  }, []);

  function handleDelete(id) {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    changeOngoingEvent((prevEvents) => prevEvents.filter((event) => event.id !== id));

    axios
      .delete(`http://localhost:8080/event/${id}`) // Send the delete request
      .then(() => {
        alert("Event deleted successfully");
      })
      .catch((error) => {
        alert("handleDelete " + error);
      });
  }

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
          delete={handleDelete}
        />
      ))
    ) : (
      <p>No events found</p>
    );
  };

  return (
    <div>
      <div className="viewdiv">
        <div>
          <h2 className="center-text">Ongoing events..</h2>
          <div className="events-container">
            {loading ? (
              <p>Loading events...</p>
            ) : (
              renderEventList(onGoEvents)
            )}
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="search-container">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="Search events"
          name="search"
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
      </div>

      {/* Filtered events section */}
      <div className="events-container">
        {loading ? (
          <p>Loading events...</p>
        ) : (
          renderEventList(filteredEvents)
        )}
      </div>
    </div>
  );
}

export default View;
