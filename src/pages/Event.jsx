import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import "./Event.styles.css"; // Import the CSS file

function Event(props) {

  function Handle() {
    const id = props.id;
    props.delete(id);
  }

  return (
    <div className="event-card">
      <h2 className="event-title">{props.title}</h2>

      <p className="event-description_caption">Description</p>
      <p className="event-description">{props.description}</p>
      <p className="event-date">Date : {props.date} </p>
      <p className="event-time">Time : {props.time}</p>
      <p className="event-venue">Venue : {props.venue}</p>
      <button className="event-delete-button" onClick={Handle}><DeleteIcon /></button>
    </div>
  );
}

export default Event;
