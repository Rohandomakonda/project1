import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import axios from "axios";
import Box from "@mui/material/Box"; // Import Box from MUI
import { benefits } from "../../constants";
import Button from "../../components/Button";
import { GradientLight } from "../design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";
import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../../assets";

//import "./Event.styles.css";

function SavedEvent(props) {
  const navigate = useNavigate();
  const club = localStorage.getItem("club");
  const [isFlipped, setIsFlipped] = useState(false);

  const userId = localStorage.getItem("userId");
  const storedRoles = localStorage.getItem("roles");
  const roles = storedRoles ? JSON.parse(storedRoles) : [];
  const API_BASE_URL = import.meta.env.VITE_API

  console.log("event card lopala roles " + roles);

  const token = localStorage.getItem("authToken");

  // Ensure the token is fetched from localStorage

  //   // Toggle the liked state
  //   function handleLike() {
  //
  //     if (isLiked) {
  //       axios
  //         .delete(`http://localhost:8080/dislike/${props.id}/${userId}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`, // Authorization header
  //           },
  //         })
  //         .then((response) => {
  //           alert("Event disliked successfully!");
  //         })
  //         .catch((error) => {
  //           console.error("Error disliking event:", error);
  //           if (error.response) {
  //             alert("Failed to dislike event: " + error.response.data.message);
  //           } else {
  //             alert("An error occurred while disliking the event.");
  //           }
  //         });
  //     } else {
  //         console.log("props id is "+props.id);
  //         console.log("userId is " + userId);
  //        console.log(`POST Request URL: http://localhost:8080/like/${props.id}/${userId}`);
  //         console.log("token is " + token);
  //       axios
  //         .post(`http://localhost:8080/like/${props.id}/${userId}`, null, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((response) => {
  //           console.log("Response:", response);
  //           alert("Event liked successfully!");
  //         })
  //         .catch((error) => {
  //           console.error("Error: ", error.response || error.message);
  //         });
  //     }
  //     setIsLiked(!isLiked);
  //   }

  // Toggle the saved/bookmarked state
  function handleBookmark() {
    console.log("props title is " + props.title);
    console.log("userId is " + userId);
    console.log("token is " + token);
    props.unsave(props.title);
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
    const baseURL =
      "https://www.google.com/maps/search/?api=1&query=NITWARANGAL+";
    return baseURL + encodeURIComponent(venue);
  }

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div
      style={{
        perspective: "1000px", // Enables 3D perspective
        width: "300px", // Set a fixed width for the card
        height: "400px", // Set a fixed height for the card
        margin: "auto", // Center the card horizontally
      }}
      onClick={handleFlip} // Flip the card on click
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease",
        }}
      >
        {/* Front Side */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            zIndex: isFlipped ? 0 : 1, // Ensure front side has a higher z-index when not flipped
          }}
        >
          <div
            className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${benefits[2].backgroundUrl})`,
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              boxSizing: "border-box",
            }}
          >
            <h5 className="h2 mb-5 z-3">{props.title}</h5>
            <p className="body-2 mb-3 text-n-3 z-3">Description</p>
            <p className="body-2 mb-3 text-n-3 z-3">{props.description}</p>
            <p className="body-2 mb-3 text-n-3 z-3">Date: {props.date}</p>
            <p className="body-2 mb-3 text-n-3 z-3">Time: {props.time}</p>
            <p className="body-2 text-n-3 z-3">
              Venue: {props.venue_description}
            </p>
            <a
              className="body-2 text-n-3 z-3"
              href={`https://www.google.com/maps/search/?api=1&query=${props.venue}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.venue}
            </a>
            <p className="body-2 text-n-3 z-3">Club: {props.club}</p>

            <div className="flex items-center mt-auto">
              {((roles.includes("CLUB_SEC") && club === props.club) ||
                roles.includes("ADMIN")) && (
                <Box
                  className="button-container z-3"
                  sx={{ display: "flex", gap: 1 }}
                >
                  <Fab color="error" aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </Fab>
                  <Fab
                    color="secondary"
                    aria-label="edit"
                    onClick={handleUpdate}
                  >
                    <EditIcon />
                  </Fab>
                </Box>
              )}

              {roles.includes("USER") && (
                <Box
                  className="button-container z-3"
                  sx={{ display: "flex", gap: 20 }}
                >
                  <Fab
                    color="primary" // Default color for bookmark
                    aria-label="bookmark"
                    onClick={handleBookmark}
                  >
                    <BookmarkIcon />
                  </Fab>
                </Box>
              )}
              <GradientLight className="z-3" />
            </div>
          </div>

          {/* Overlay for hover effect */}
          <div
            className="absolute inset-0.5 bg-n-8"
            style={{
              clipPath: "url(#benefits)", // Ensure this applies correctly
              zIndex: 2, // Keep it above the background but below text
            }}
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity hover:opacity-20"
              style={{
                zIndex: 2, // Ensure it's only visible during hover
              }}
            >
              <img
                src={benefitImage2}
                width={380}
                height={362}
                alt={props.title}
                className="w-full h-full object-cover"
                style={{
                  zIndex: 3,
                }}
              />
            </div>
          </div>

          <ClipPath />
        </div>

        {/* Back Side */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundImage: `url(${benefits[2].backgroundUrl})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: isFlipped ? 1 : 0, // Ensure back side has a higher z-index when flipped
          }}
        >
          <img
            src={props.image}
            alt="Event Backside"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SavedEvent;
