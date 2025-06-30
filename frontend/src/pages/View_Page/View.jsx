import React, { useState, useEffect } from "react";
import Event from "../../components/Event_Card/Event"; // Component for individual event cards
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
import Grid from "@mui/material/Grid"; // Import MUI Grid
import Box from "@mui/material/Box"; // Import MUI Box
import TextField from "@mui/material/TextField";
import { curve, heroBackground, robot } from "../../assets";
import { useNavigate } from "react-router-dom";
import Section from "../../components/Section.jsx";
import Button from "../../components/Button";
import {
  BackgroundCircles,
  BottomLine,
  Gradient,
} from "../../components/design/Hero";
import { heroIcons } from "../../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import { GradientLight } from "../../components/design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";
import cardImage from "../../assets/benefits/card-6.svg";

const View = () => {
  const [events, setEvents] = useState([]); // All events
  const [myClubEvents, setMyClubEvents] = useState([]); // Events specific to the club
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [onGoEvents, setOnGoEvents] = useState([]); // Ongoing events
  const [loading, setLoading] = useState(true); // Loading state
  const storedRoles = localStorage.getItem("roles");
  const roles = storedRoles ? JSON.parse(storedRoles) : [];
  const club = localStorage.getItem("club");
  const parallaxRef = useRef(null);
  // const [isBlurred, setIsBlurred] = useState(false);
  //   useEffect(() => {
  //     if (window.location.pathname === '/addEvent') {
  //       setIsBlurred(true);
  //     } else {
  //       setIsBlurred(false);
  //     }
  //   }, [window.location.pathname]);

  useEffect(() => {
    setLoading(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }

    // Fetch events and ongoing events in parallel
    const fetchEvents = axios.get(
      "http://localhost:8765/api/events/viewevents",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const fetchOngoingEvents = axios.get(
      "http://localhost:8765/api/events/ongoingevents",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    Promise.all([fetchEvents, fetchOngoingEvents])
      .then(([allEventsResp, ongoingEventsResp]) => {
        setEvents(allEventsResp.data); // Update all events
        setOnGoEvents(ongoingEventsResp.data); // Update ongoing events

        // Filter events by club after fetching all data
        const mcEvents = allEventsResp.data.filter(
          (event) => event.club === club
        );
        setMyClubEvents(mcEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("authToken");
    
    axios
      .delete(`http://localhost:8765/api/events/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
        setMyClubEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
        setOnGoEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const filteredEvents = events.filter((event) =>
    ["title", "description", "venue", "club"].some((key) =>
      event[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderSkeletons = (count) =>
    Array.from(new Array(count)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" width="100%" height={150} />
      </Grid>
    ));

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem] `view-events "
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative mt-20" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            {` `}
            <span className="inline-block relative">
              All Events{" "}
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

        <BackgroundCircles />
      </div>
      <div className="container relative z-2">
        <div className="flex flex-wrap gap-10 mb-10">
          {filteredEvents.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              time={event.time}
              venue={event.venue}
              image={`data:image/jpeg;base64,${event.image}`} // Fix here: Use template literal properly
              club={event.club}
              delete={handleDelete}
            />
          ))}
        </div>
      </div>

      {roles.includes("CLUB_SEC") ? (
        myClubEvents.length > 0 ? (
          <div className="container relative mt-20" ref={parallaxRef}>
            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
              <h1 className="h1 mb-6">
                <span className="inline-block relative">
                  My Club Events{" "}
                  <img
                    src={curve}
                    className="absolute top-full left-0 w-full xl:-mt-2"
                    width={624}
                    height={28}
                    alt="Curve"
                  />
                </span>
              </h1>
            </div>
            <div className="container relative z-2">
              <div className="flex flex-wrap gap-10 mb-10">
                {myClubEvents.map((event) => (
                  <Event
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    time={event.time}
                    venue={event.venue}
                    image={`data:image/jpeg;base64,${event.image}`}
                    club={event.club}
                    delete={handleDelete}
                    likes={event.likes}
                    saves={event.saves}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null
      ) : onGoEvents.length > 0 ? (
        <div className="container relative mt-20" ref={parallaxRef}>
          <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
            <h1 className="h1 mb-6">
              <span className="inline-block relative">
                Ongoing Events{" "}
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </h1>
          </div>
          <div className="container relative z-2">
            <div className="flex flex-wrap gap-10 mb-10">
              {onGoEvents.map((event) => (
                <Event
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  time={event.time}
                  venue={event.venue}
                  image={`data:image/jpeg;base64,${event.image}`}
                  club={event.club}
                  delete={handleDelete}
                  likes={event.likes}
                  saves={event.saves}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </Section>

    //     <Box sx={{ mt: calculateMarginTop(filteredEvents, myClubEvents), position: "relative" }}>
    //
    //       {roles.includes("CLUB_SEC") ? (
    //         <>
    //           <Box sx={{ mt: 2 }}>
    //             <h2 className="center-text" style={{ color: "white" }}>My Club Events</h2>
    //             <Grid container spacing={2}>
    //               {loading ? renderSkeletons(3) : renderEvents(myClubEvents)}
    //             </Grid>
    //           </Box>
    //
    //           <Box sx={{ mb: 4 }} className="search-container">
    //             <SearchIcon className="search-icon" />
    //             <input
    //               type="text"
    //               placeholder="Search events"
    //               className="search-bar"
    //               value={searchTerm}
    //               onChange={(e) => setSearchTerm(e.target.value)}
    //             />
    //           </Box>
    //
    //           <Box>
    //             <h2 className="center-text" style={{ color: "white" }}>All Events</h2>
    //             <Grid container spacing={2}>
    //               {loading ? renderSkeletons(6) : renderEvents(filteredEvents)}
    //             </Grid>
    //           </Box>
    //         </>
    //       ) : (
    //         <>
    //           <Box sx={{ mt: 2 }}>
    //             <h2 className="center-text" style={{ color: "white" }}>Ongoing Events</h2>
    //             <Grid container spacing={2}>
    //               {loading ? renderSkeletons(3) : renderEvents(onGoEvents)}
    //             </Grid>
    //           </Box>
    //
    //           <Box sx={{ mb: 4 }} className="search-container">
    //             <SearchIcon className="search-icon" />
    //             <input
    //               type="text"
    //               placeholder="Search events"
    //               className="search-bar"
    //               value={searchTerm}
    //               onChange={(e) => setSearchTerm(e.target.value)}
    //             />
    //           </Box>
    //
    //           <Box>
    //             <h2 className="center-text" style={{ color: "white" }}>All Events</h2>
    //             <Grid container spacing={2}>
    //               {loading ? renderSkeletons(6) : renderEvents(filteredEvents)}
    //             </Grid>
    //           </Box>
    //         </>
    //       )}
    //     </Box>
  );
};

export default View;
