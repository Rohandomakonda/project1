import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./club_design.styles.css";

function Club_Info() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState({});
  const [events, setEvents] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/getclub/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDetails(response.data);
        setLoadingDetails(false);
      })
      .catch((error) => {
        console.error("Error fetching club details:", error);
        setLoadingDetails(false);
      });
  }, [name, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/getclubevents/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvents(response.data);
        setLoadingEvents(false);
      })
      .catch((error) => {
        console.error("Error fetching club events:", error);
        setLoadingEvents(false);
      });
  }, [name, navigate]);

  const renderEventList = (eventList) => {
    return eventList.length > 0 ? (
      eventList.map((event) => (
        <div key={event.id} className="event-card">
          <img
            src={`data:image/jpeg;base64,${event.image}`}
            alt={event.title}
            className="event-image"
          />
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>
            <strong>Date:</strong> {event.date}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
        </div>
      ))
    ) : (
      <p>No events found</p>
    );
  };

  return (
    <div className="container">
      <div className="club-details">
        {loadingDetails ? (
          <p>Loading club details...</p>
        ) : (
          <>
            <h1>{details.name}</h1>
            <p>{details.description}</p>
          </>
        )}
      </div>
      <div className="ongoing-events">
        <h2>Ongoing Events</h2>
        <div className="events-container">
          {loadingEvents ? <p>Loading events...</p> : renderEventList(events)}
        </div>
      </div>
    </div>
  );
}

export default Club_Info;
