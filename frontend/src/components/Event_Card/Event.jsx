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
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
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

function Event(props) {
  const navigate = useNavigate();
  const club = localStorage.getItem("club");
  const [isFlipped, setIsFlipped] = useState(true);
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
  function handleLike(e) {
    e.stopPropagation();
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
  function handleBookmark(e) {
    e.stopPropagation();
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
    const baseURL =
      "https://www.google.com/maps/search/?api=1&query=NITWARANGAL+";
    return baseURL + encodeURIComponent(venue);
  }

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }
  function handlelogin(e) {
    e.stopPropagation();
    navigate("/login");
  }

  const handleComment = () => {
    navigate(`/comments/${props.id}`);
  };

  const handleGglCalendar = async(e) => {
    e.stopPropagation();
    
    const ggl_token = localStorage.getItem("googleAccessToken");
    if (!ggl_token) {
      alert("Please login with Google to add events to your calendar");
      return;
    }
  
    // Format the date and time properly
    const startDateTime = new Date(`${props.date}T${props.time}`);
    const endDateTime = new Date(startDateTime.getTime() + (60 * 60 * 1000));
  
    const event = {
      summary: props.title,
      location: props.venue,
      description: props.description,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 20 },
        ],
      },
    };
  
    try {
      const response = await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        event,
        {
          headers: {
            Authorization: `Bearer ${ggl_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.data) {
        alert("Event added to Google Calendar successfully!");
      }
    } catch (error) {
      console.error("Error adding event to Google Calendar:", error);
      if (error.response?.status === 401) {
        alert("Your Google session has expired. Please login again.");
        // Optionally redirect to login
        navigate('/login');
      } else {
        alert("Failed to add event to Google Calendar. Please try again.");
      }
    }
  };

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
            <p className="body-2 mb-3 text-n-3 z-3">Club: {props.club}</p>

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
                  className="button-container z-4"
                  sx={{ display: "flex", gap: 4, alignItems: "center" }}
                >
                  {/* Like Button with Like Count */}
                  <Box sx={{ position: "relative", textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      color="white"
                      sx={{
                        position: "absolute",
                        top: "-20px", // Adjust the position above the icon
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10, // Ensure the text is above the button
                      }}
                    >
                      {props.saves}
                    </Typography>
                    <Fab
                      color={isSaved ? "primary" : "default"} // Default color for bookmark
                      aria-label="bookmark"
                      onClick={handleBookmark}
                      sx={{
                        position: "relative", // Ensure layering consistency
                        zIndex: 1, // Lower than text
                      }}
                    >
                      {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </Fab>
                  </Box>

                  <Box sx={{ position: "relative", textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      color="white"
                      sx={{
                        position: "absolute",
                        top: "-20px", // Adjust the position above the icon
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10, // Ensure the text is above the button
                      }}
                    >
                      {props.likes}
                    </Typography>
                    <Fab
                      color={isLiked ? "error" : "default"} // Red color for like button
                      aria-label="like"
                      onClick={handleLike}
                      sx={{
                        position: "relative", // Ensure layering consistency
                        zIndex: 1, // Lower than text
                      }}
                    >
                      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </Fab>
                  </Box>

                  <Box sx={{ position: "relative", textAlign: "center" }}>
                    <Fab
                      onClick={handleComment}
                      sx={{
                        position: "relative", // Ensure layering consistency
                        zIndex: 1, // Lower than text
                      }}
                    >
                      <CommentIcon />
                    </Fab>
                  </Box>

                  <Box sx={{ position: "relative", textAlign: "center" }}>
                    <Fab
                      onClick={handleGglCalendar}
                      sx={{
                        position: "relative", // Ensure layering consistency
                        zIndex: 1, // Lower than text
                      }}
                    >
                      <CalendarTodayIcon />
                    </Fab>
                  </Box>

                  {/* Save Button with Save Count */}
                </Box>
                //here i want to diaplay the props.like and porps.saves with white text below the favourite and save icon repectively

                //here i want to diaplay the props.like and porps.saves with white text below the favourite and save icon repectively
              )}
              <GradientLight className="z-3" />

              {token == null && (
                <Box
                  className="button-container z-3"
                  sx={{ display: "center" }}
                >
                  <Button onClick={handlelogin}>Login to like</Button>
                </Box>
              )}
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

export default Event;
