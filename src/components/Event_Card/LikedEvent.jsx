import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import { useNavigate } from "react-router-dom";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from "axios";
import "./Event.styles.css";

function LikedEvent(props) {
  const navigate = useNavigate();
  const club = localStorage.getItem("club");
  const [isFlipped, setIsFlipped] = useState(false);


const userId = localStorage.getItem("userId");
  const storedRoles = localStorage.getItem("roles");
  const roles = storedRoles ? JSON.parse(storedRoles) : [];

  console.log("event card lopala roles "+ roles);

  const token = localStorage.getItem("authToken");  // Ensure the token is fetched from localStorage


  function handledislike(id) {
alert("world");

      props.dislike(id);


  }
//
//   // Toggle the saved/bookmarked state
//   function handleBookmark() {
//
//
//       if (isSaved) {
//           console.log("props title is "+props.title);
//           console.log("userId is " + userId);
//           console.log("token is " + token);
//         axios
//           .delete(`http://localhost:8080/unsave`, {
//             headers: {
//               Authorization: `Bearer ${token}`, // Authorization header
//             },
//             params: {
//               userId: userId,
//               eventTitle:props.title,
//             },
//           })
//           .then((response) => {
//             alert("Event unsaved successfully!");
//           })
//           .catch((error) => {
//             console.error("Error unsaving event:", error);
//             if (error.response) {
//               alert("Failed to unsave event: " + error.response.data.message);
//             } else {
//               alert("An error occurred while unsaving the event.");
//             }
//           });
//       } else {
//         axios
//           .post(`http://localhost:8080/saved-events/${props.id}`, null, {
//             headers: {
//               Authorization: `Bearer ${token}`, // Authorization header
//             },
//             params: {
//               userId: userId,
//             },
//           })
//           .then((response) => {
//             alert("Event saved successfully!");
//           })
//           .catch((error) => {
//             console.error("Error saving event:", error);
//             if (error.response) {
//               alert("Failed to saving event: " + error.response.data.message);
//             } else {
//               alert("An error occurred while saving the event.");
//             }
//           });
//       }
//       setIsSaved(!isSaved);
//     }

  function handleDelete(e) {
    e.stopPropagation();
    props.delete(props.id);
  }

  function handleUpdate(e) {
    e.stopPropagation();
    navigate(`/Update/${props.id}`);
  }

  function generateGoogleMapsLink(venue) {
    const baseURL = "https://www.google.com/maps/search/?api=1&query=NITWARANGAL+";
    return baseURL + encodeURIComponent(venue);
  }

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div onClick={handleFlip}>
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

          {/* Check if the user has 'CLUB_SEC' or 'ADMIN' roles */}
          {(roles.includes("CLUB_SEC") && club === props.club || roles.includes("ADMIN")) && (
            <div className="button-container">
              <Fab color="error" aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </Fab>
              <Fab color="secondary" aria-label="edit" onClick={handleUpdate}>
                <EditIcon />
              </Fab>
            </div>
          )}

          {/* Check if the user has 'USER' role and toggle like and bookmark buttons */}
          {roles.includes("USER") && (
            <div className="button-container">
                       <Fab
                         color="default"  // Red color for like button
                         aria-label="like"
                         onClick={() => handledislike(props.id)}  // Wrap the function call in a callback
                       >
                         <FavoriteIcon />
                       </Fab>


            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LikedEvent;
