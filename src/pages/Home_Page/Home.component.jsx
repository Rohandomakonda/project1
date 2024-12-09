import React, { useState, useEffect } from 'react';
import Event from "../../components/Event_Card/Event";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.styles.css";

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
        alert("getError " + err);
      });
  }, []);

  const handleDelete = () => {
    alert("Cannot delete a public event");
  };

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="public-events">
      <h1>Public Events</h1>
      <div className="event-list">

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
      </div>
     {!token && <button onClick={handleClick}>Get Started</button>}
    </div>
  );
}

export default Home;
