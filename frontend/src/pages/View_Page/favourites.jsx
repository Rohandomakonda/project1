import React, { useState, useEffect } from "react";
import LikedEvent from "../../components/Event_Card/LikedEvent"; // Component for individual event cards
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
import Grid from "@mui/material/Grid"; // Import MUI Grid
import Box from "@mui/material/Box"; // Use MUI Box for consistent layout
import TextField from '@mui/material/TextField';
import { curve, heroBackground, robot } from "../../assets";
import { useNavigate } from "react-router-dom";
import Section from "../../components/Section.jsx";
import Button from"../../components/Button";
import { BackgroundCircles, BottomLine, Gradient } from "../../components/design/Hero";
import { heroIcons } from "../../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import { GradientLight } from "../../components/design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";
import cardImage from "../../assets/benefits/card-6.svg";


const Favourites = () => {
  const [events, setEvents] = useState([]); // All events
  const [loading, setLoading] = useState(false); // Loading state
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [roles, setRoles] = useState([]); // User roles

  const userId = localStorage.getItem("userId");
  const club = localStorage.getItem("club");
   const parallaxRef=useRef(null);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    console.log("auth token is " + token);
    console.log("userId" + userId);
    if (!token) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://localhost:8080/getalllikedevents", {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      })
      .then((response) => {
        console.log("response data is " + response.data);
        setEvents(response.data); // Update events list
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }
      })
      .finally(() => setLoading(false));

    // Fetch roles
    const userRoles = localStorage.getItem("roles");
    setRoles(userRoles ? JSON.parse(userRoles) : []);
  }, [userId]);

  const handleDislike = (id) => {
    alert("hello");
    const token = localStorage.getItem("authToken");

    axios
      .delete(`http://localhost:8080/dislike/${id}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        alert("Event deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Error deleting event: " + error.message);
      });
  };

  // Filter events based on the search term
  const filteredEvents = events.filter((event) =>
    ["title", "description", "venue", "club"].some((key) =>
      event[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Render skeletons while loading
  const renderSkeletons = (count) =>
    Array.from(new Array(count)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" width="100%" height={150} />
      </Grid>
    ));

  // Render event cards
  const renderEvents = (eventList) =>
    eventList.length > 0 ? (
      eventList.map((event) => (
        <Grid item xs={12} sm={6} md={4} key={event.id}>
          <LikedEvent
            {...event}
            image={`data:image/jpeg;base64,${event.image}`} // Image rendering
            dislike={handleDislike} // Delete handler
          />
        </Grid>
      ))
    ) : (
      <p>No events found</p>
    );

   const calculateMarginTop = (eventList) => {
      const numberOfColumns = 3; // Assuming you want 3 columns
      const numberOfRows = Math.ceil(eventList.length / numberOfColumns);
      return   (numberOfRows - 1) * 48; // Increase mt by 38 for each additional row
    };


  if (roles.includes("USER")) {
    return (
        <Section
                          className="pt-[12rem] -mt-[5.25rem]"
                          crosses
                          crossesOffset="lg:translate-y-[5.25rem]"
                          customPaddings
                          id="hero"
                        >
                          <div className="container relative mt-20" ref={parallaxRef} >
                            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
                             <h1 className="h1 mb-6">
                                {` `}
                                 <span className="inline-block relative">
                                              Favourite Events{" "}
                                              <img
                                                src={curve}
                                                className="absolute top-full left-0 w-full xl:-mt-2"
                                                width={624}
                                                height={28}
                                                alt="Curve"
                                              />
                                            </span>

                              </h1>
                                 <Box sx={{ mb: 4 }} className="search-container">
                                                                    <SearchIcon className="search-icon" />
                                                                    <input
                                                                      type="text"
                                                                      placeholder="Search events"
                                                                      className="search-bar"
                                                                      value={searchTerm}
                                                                      onChange={(e) => setSearchTerm(e.target.value)}
                                                                      style={{
                                                                        border: "2px solid white", // White border
                                                                        borderRadius: "8px", // Optional: rounded corners
                                                                        padding: "0.5rem 1rem", // Optional: spacing inside the input
                                                                        color: "white", // White text
                                                                        backgroundColor: "transparent", // Transparent background
                                                                      }}
                                                                    />
                                                                  </Box>

                              </div>




                                              <BackgroundCircles  />





                                              </div>
         <div className="container relative z-2">


                                                            <div className="flex flex-wrap gap-10 mb-10">
                                                             {filteredEvents.map((event) => (
                                                               <LikedEvent
                                                                 key={event.id}
                                                                 id={event.id}
                                                                 title={event.title}
                                                                 description={event.description}
                                                                 date={event.date}
                                                                 time={event.time}
                                                                 venue={event.venue}
                                                                 image={`data:image/jpeg;base64,${event.image}`} // Fix here: Use template literal properly
                                                                 club={event.club}
                                                                 dislike={handleDislike}

                                                               />
                                                             ))}


                                                                                  </div>
                                                                                </div>


        </Section>



    );
  } else {
    return null; // Render nothing for unauthorized users
  }
};

export default Favourites;
