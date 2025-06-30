import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//import './Club_Info.css';
import Event from "../../components/Event_Card/Event.jsx";
import useGet from "../../customhooks/useGet.jsx";

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

   /* axios
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
  */
 const {data: details,loading,error} = useGet(`getclub/${name}`,token);
 console.log("details is " + details);
    
}, [name]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    // axios
    //   .get(`http://localhost:8080/getclubevents/${name}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     setEvents(response.data);
    //     setLoadingEvents(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching club events:", error);
    //     setLoadingEvents(false);
    //   });
    const{events,loading,error} = useGet(`getclubevents/${name}`,token);
    
  }, [name]);

  const handleDelete = () => {};
  const renderEventList = (eventList) => {
    return eventList.length > 0 ? (
      eventList.map((event) => (
        <Event
          key={event.id}
          {...event}
          image={`data:image/jpeg;base64,${event.image}`}
          delete={handleDelete}
        />
      ))
    ) : (
      <p>No events found</p>
    );
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}> Back </button>
      <div className="club-details">
        {loadingDetails ? (
          <p>Loading club details...</p>
        ) : (
          <>
            <h1>{name}</h1>
            <p>{details.description}</p>
          </>
        )}
      </div>
      <div className="ongoing-events">
        <h2> Events</h2>
        <div className="events-container">
          {loadingEvents ? <p>Loading events...</p> : renderEventList(events)}
        </div>
      </div>
    </div>
  );
}

export default Club_Info;
