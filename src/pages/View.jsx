import React, { useState, useEffect } from "react";
import axios from "axios";


function Event(props) {

  function handleDelete() {
    const id = props.id;
    axios
      .delete(`http://localhost:8080/event/${id}`) // Corrected template literal usage
      .then((resp) => {
         console.log(resp.data);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <p>{props.date}</p>
      <p>{props.time}</p>
      <p>{props.venue}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

function View() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewevents")
      .then((resp) => {
        setEvents(resp.data); // Properly setting state
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div>
      {events.map((event) => (
        <Event
          key={event.id} // Use a unique identifier
          id={event.id}
          title={event.title}
          description={event.description}
          date={event.date}
          time={event.time}
          venue={event.venue}
        />
      ))}
    </div>
  );
}

export default View;
