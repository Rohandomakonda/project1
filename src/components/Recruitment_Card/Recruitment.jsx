import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Recruitment.styles.css";
import { useNavigate } from "react-router-dom";

function Recruitment(props) {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = React.useState(false);

  function handleDelete(e) {
    e.stopPropagation(); // Prevent flipping when clicking on the delete button
    props.delete(props.id);
  }

  function handleUpdate(e) {
    e.stopPropagation(); // Prevent flipping when clicking on the update button
    navigate(`/Update/${props.id}`);
  }

 function handleRegister(e) {
   e.stopPropagation(); // Prevent flipping when clicking on the register button
   window.open(props.formLink, '_blank'); // Open the form link in a new tab
 }


  function generateGoogleMapsLink(venue) {
    const baseURL = "https://www.google.com/maps/search/?api=1&query=NITWARANGAL+";
    return baseURL + encodeURIComponent(venue);
  }

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div  onClick={handleFlip}>
      <div className={`card ${isFlipped ? "is-flipped" : ""}`}>
        {/* Front of the card */}
        <div
          className="card-face card-front"
          style={{ backgroundImage: `url(${props.image})` }}
        ></div>


        {/* Back of the card */}
        <div className="card-face card-back">
          <h2 className="event-title">{props.title}</h2>
          <p className="event-description_caption">Description</p>
          <p className="event-description">{props.description}</p>
          <p className="event-date">Date: {props.date}</p>
          <p className="event-time">Time: {props.time}</p>
          <p className="event-description">Venue: {props.venue_description}</p>
          <a
            className="event-venue"
            href={generateGoogleMapsLink(props.venue)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.venue}
          </a>
          <p className="event-club">Club: {props.club}</p>

          <div className="button-container">
            <button className="event-delete-button" onClick={handleDelete}>
              <DeleteIcon />
            </button>
            <button className="event-update-button" onClick={handleUpdate}>
              Update
            </button>
            {/* Register button */}
            <button className="event-register-button" onClick={handleRegister} >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruitment;
