import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import { useNavigate } from "react-router-dom";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from "axios";
import Box from '@mui/material/Box';  // Import Box from MUI
//import "./Event.styles.css";

function Event(props) {
  const navigate = useNavigate();
  const club = localStorage.getItem("club");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Added isSaved state
  const userId = localStorage.getItem("userId");
  const storedRoles = localStorage.getItem("roles");
  const roles = storedRoles ? JSON.parse(storedRoles) : [];

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch whether the event is liked by the user
    axios
      .get(`http://localhost:8080/isliked/${props.id}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setIsLiked(response.data);
      })
      .catch((error) => {
        console.error("Error fetching like status:", error);
      });

    // Fetch whether the event is saved/bookmarked by the user
    axios
      .get(`http://localhost:8080/issaved`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId: userId, eventTitle: props.title },
      })
      .then((response) => {
        setIsSaved(response.data);
      })
      .catch((error) => {
        console.error("Error fetching saved status:", error);
      });
  }, [props.id, userId, token, props.title]);

  // Toggle the liked state
  function handleLike() {
    if (isLiked) {
      axios
        .delete(`http://localhost:8080/dislike/${props.id}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setIsLiked(false);
          alert("Event disliked successfully!");
        })
        .catch((error) => {
          console.error("Error disliking event:", error);
          alert("Failed to dislike event: " + error.response?.data?.message);
        });
    } else {
      axios
        .post(`http://localhost:8080/like/${props.id}/${userId}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setIsLiked(true);
          alert("Event liked successfully!");
        })
        .catch((error) => {
          console.error("Error liking event:", error);
          alert("Failed to like event: " + error.response?.data?.message);
        });
    }
  }

  // Toggle the saved/bookmarked state
  function handleBookmark() {
    if (isSaved) {
      axios
        .delete(`http://localhost:8080/unsave`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            userId: userId,
            eventTitle: props.title,
          },
        })
        .then(() => {
          setIsSaved(false);
          alert("Event unsaved successfully!");
        })
        .catch((error) => {
          console.error("Error unsaving event:", error);
          alert("Failed to unsave event: " + error.response?.data?.message);
        });
    } else {
      axios
        .post(`http://localhost:8080/saved-events/${props.id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId: userId },
        })
        .then(() => {
          setIsSaved(true);
          alert("Event saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving event:", error);
          alert("Failed to save event: " + error.response?.data?.message);
        });
    }
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
    <Box onClick={handleFlip} sx={{ml:20}}>
      <Box
        className={`card ${isFlipped ? "is-flipped" : ""}`}
        sx={{ position: 'relative' }}
      >
        {/* Front of the card */}
        <Box
          className="card-face card-front"
          sx={{ backgroundImage: `url(${props.image})`, height: '100%', backgroundSize: 'cover' }}
        ></Box>

        {/* Back of the card */}
        <Box className="card-face card-back" sx={{ padding: 2 }}>
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
            <Box className="button-container" sx={{ display: 'flex', gap: 1 }}>
              <Fab color="error" aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </Fab>
              <Fab color="secondary" aria-label="edit" onClick={handleUpdate}>
                <EditIcon />
              </Fab>
            </Box>
          )}

          {/* Check if the user has 'USER' role and toggle like and bookmark buttons */}
          {roles.includes("USER") && (
            <Box className="button-container" sx={{ display: 'flex', gap: 1 }}>
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
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Event;
