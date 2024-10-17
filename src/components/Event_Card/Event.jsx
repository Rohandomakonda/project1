import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import "./Event.styles.css"; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function Event(props){
  const navigate = useNavigate();

  function Handle() {
    const id = props.id;
    props.delete(id);
  }

  function generateGoogleMapsLink(venue){
    const baseURL = "https://www.google.com/maps/search/?api=1&query=NITWARANGAL+";
    return baseURL + encodeURIComponent(venue);
  }

  function handleUpdate() {
     navigate(`/Update/${props.id}`);
  }

  return (
    <div className="event-card">
      <h2 className="event-title">{props.title}</h2>

      <p className="event-description_caption">Description</p>
      <p className="event-description">{props.description}</p>
      <p className="event-date">Date : {props.date} </p>
      <p className="event-time">Time : {props.time}</p>
      <p className="event-description">Venue : {props.venue_description}</p>
      <a className="event-venue"
         href = {generateGoogleMapsLink(props.venue)}
         target = "_blank"
         rel="noopener noreferrer"
      >{props.venue}</a>
      <p className="event-club">Club : {props.club}</p>
      <button className="event-delete-button" onClick={Handle}><DeleteIcon /></button>
      <button className="event-update-button" onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default Event;
