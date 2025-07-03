import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../../ui/Title";
import Item from "./Item";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");
  const clubName = localStorage.getItem("club");
  const API_BASE_URL = import.meta.env.VITE_API

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/profile/upcoming-events/${clubName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching upcoming events:", error);
        setError("Failed to load upcoming events");
        setLoading(false);
      });
  }, [clubName]); // Fetch data when `clubName` changes

  return (
    <div className="bg-white p-5 rounded-2xl dark:bg-gray-800 dark:text-gray-400 flex-1 flex flex-col gap-5">
      <Title>Upcoming Events</Title>

      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && events.length === 0 && <p>No upcoming events found.</p>}

      {!loading && !error && events.map((event, index) => (
        <Item key={index} event={event} />
      ))}
    </div>
  );
};

export default Event;
