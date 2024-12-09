import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Recruitment.styles.css";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';

function Recruitment(props) {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = React.useState(false);
const storedRoles = localStorage.getItem("roles");
const roles = storedRoles ? JSON.parse(storedRoles) : [];
  function handleDelete(e) {
    e.stopPropagation(); // Prevent flipping when clicking on the delete button
    props.delete(props.id);
  }

  function handleUpdate(e) {
    e.stopPropagation(); // Prevent flipping when clicking on the update button
    navigate(`/updateRecruitment/${props.id}`);
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
            {(roles.includes("CLUB_SEC") || roles.includes("ADMIN")) &&<Fab color="secondary" aria-label="edit">
              <EditIcon
                onClick={handleUpdate}
              />
              </Fab>}
            {(roles.includes("CLUB_SEC") || roles.includes("ADMIN")) &&<Fab color = "error" aria-label="delete">
             <DeleteIcon
                 onClick={handleDelete}
             />
             </Fab>}
            {/* Register button */}
            {roles.includes("USER") &&<button className="event-register-button" onClick={handleRegister} >
             Register
              </button>}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruitment;
