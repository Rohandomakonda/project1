import React, { useState, useEffect } from "react";
import Event from "../../components/Event_Card/Event";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { curve } from "../../assets";
import Section from "../../components/Section.jsx";
import { BackgroundCircles } from "../../components/design/Hero";
import { useRef } from "react";

const View = () => {
  const [events, setEvents] = useState([]);
  const [myClubEvents, setMyClubEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [onGoEvents, setOnGoEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedRoles = localStorage.getItem("roles");
  const roles = storedRoles ? JSON.parse(storedRoles) : [];
  const club = localStorage.getItem("club");
  const parallaxRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API;

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }

    const fetchEvents = axios.get(`${API_BASE_URL}/events/viewevents`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const fetchOngoingEvents = axios.get(`${API_BASE_URL}/events/ongoingevents`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Promise.all([fetchEvents, fetchOngoingEvents])
      .then(([allEventsResp, ongoingEventsResp]) => {
        setEvents(allEventsResp.data);
        setOnGoEvents(ongoingEventsResp.data);
        const mcEvents = allEventsResp.data.filter((event) => event.club === club);
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
      .delete(`${API_BASE_URL}/events/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        setMyClubEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        setOnGoEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
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
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <CircularProgress size={60} thickness={5} style={{ color: "#00ffff" }} />
        </div>
      )}

      <div className="container relative mt-20" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            <span className="inline-block relative">
              All Events {" "}
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
                border: "2px solid white",
                borderRadius: "8px",
                padding: "0.5rem 1rem",
                color: "white",
                backgroundColor: "transparent",
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
              image={`data:image/jpeg;base64,${event.image}`}
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
                  My Club Events {" "}
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
                Ongoing Events {" "}
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
  );
};

export default View;