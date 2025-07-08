import React, { useState, useRef, useEffect } from "react";
import Event from "../../components/Event_Card/Event.jsx";
import axios from "axios";
import { curve } from "../../assets/index.js";
import { useNavigate } from "react-router-dom";
import Section from "../../components/Section.jsx";
import Button from "../../components/Button.jsx";
import { BackgroundCircles } from "../../components/design/Hero.jsx";
import useGet from "../../customhooks/useGet.jsx";
import CircularProgress from "@mui/material/CircularProgress"; // Import loader

function Home() {
  const token = localStorage.getItem("authToken");
  const {
    data: publicEvents,
    loading,
    error,
  } = useGet("events/public/events", null);
  const parallaxRef = useRef(null);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API;

  function handleDelete(e) {
    e.preventDefault();
  }

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative mt-20" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            Explore the NITW Events {` `}
            <span className="inline-block relative">
              Public Events{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            In order to view all the events, you must register. If you don't
            have an account, please register.
          </p>
          <Button href={token ? "/viewevents" : "/login"} white>
            Get started
          </Button>
        </div>
        <BackgroundCircles />
      </div>
      <div className="container relative z-2">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress sx={{ color: "#00ffff" }} size={60} thickness={4} />
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="flex flex-wrap gap-10 mb-10">
            {publicEvents.map((event) => (
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
                delete={(e) => handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

export default Home;
