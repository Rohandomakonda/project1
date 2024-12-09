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

function Event(props) {
  const navigate = useNavigate();
  const club = localStorage.getItem("club");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);  // Added isSaved state

  const storedRoles = localStorage.getItem("roles");
  const roles = storedRoles ? JSON.parse(storedRoles) : [];

  const token = localStorage.getItem("token");  // Ensure the token is fetched from localStorage

  // Toggle the liked state
  function handleLike() {
    if (isLiked) {
      axios
        .delete(`http://localhost:8080/dislike/${props.id}`, null, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Authorization header
          },
          params: {
            userId: localStorage.getItem("userId"),
          },
        })
        .then((response) => {
          alert("Event disliked successfully!");
        })
        .catch((error) => {
          console.error("Error disliking event:", error);
          if (error.response) {
            alert("Failed to dislike event: " + error.response.data.message);
          } else {
            alert("An error occurred while disliking the event.");
          }
        });
    } else {
      axios
        .post(`http://localhost:8080/favourites/${props.id}`, null, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Authorization header
          },
          params: {
            userId: localStorage.getItem("userId"),
          },
        })
        .then((response) => {
          alert("Event liked successfully!");
        })
        .catch((error) => {
          console.error("Error liking event:", error);
          if (error.response) {
            alert("Failed to like event: " + error.response.data.message);
          } else {
            alert("An error occurred while liking the event.");
          }
        });
    }
    setIsLiked(!isLiked);
  }

  // Toggle the saved/bookmarked state
  function handleBookmark() {
      if (isSaved) {
        axios
          .delete(`http://localhost:8080/unsave/${props.title}`, null, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Authorization header
            },
            params: {
              userId: localStorage.getItem("userId"),
            },
          })
          .then((response) => {
            alert("Event unsaved successfully!");
          })
          .catch((error) => {
            console.error("Error unsaving event:", error);
            if (error.response) {
              alert("Failed to unsave event: " + error.response.data.message);
            } else {
              alert("An error occurred while unsaving the event.");
            }
          });
      } else {
        axios
          .post(`http://localhost:8080/favourites/${props.id}`, null, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Authorization header
            },
            params: {
              userId: localStorage.getItem("userId"),
            },
          })
          .then((response) => {
            alert("Event saved successfully!");
          })
          .catch((error) => {
            console.error("Error saving event:", error);
            if (error.response) {
              alert("Failed to saving event: " + error.response.data.message);
            } else {
              alert("An error occurred while saving the event.");
            }
          });
      }
      setIsSaved(!isSaved);
    }

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
                color={isLiked ? "error" : "default"}  // Red color for like button
                aria-label="like"
                onClick={handleLike}
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </Fab>
              <Fab
                color={isSaved ? "primary" : "default"}  // Default color for bookmark
                aria-label="bookmark"
                onClick={handleBookmark}
              >
                {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </Fab>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Event;
