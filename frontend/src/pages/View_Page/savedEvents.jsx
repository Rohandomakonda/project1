import React, { useState, useEffect } from "react";
import Event from "../../components/Event_Card/Event.jsx";
import axios from "axios";
import { Search, Bookmark, Heart, Calendar } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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

const SavedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState([]);
  const parallaxRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API;

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }

    // Fetch saved events
    axios
      .get(`${API_BASE_URL}/profile/saved-events/getallsavedevents`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      })
      .then((response) => {
        setEvents(response.data);
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

  const handleunsave = (title) => {
    const token = localStorage.getItem("authToken");

    axios
      .delete(`${API_BASE_URL}/profile/saved-events/unsave`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { eventTitle: title }, 
      })
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.title !== title)
        );
        alert("Event unsaved successfully");
      })
      .catch((error) => {
        console.error("Error unsaving event:", error);
        alert("Error unsaving event: " + error.message);
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
        <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 animate-pulse">
          <div className="h-48 bg-purple-500/20 rounded-xl mb-4"></div>
          <div className="h-6 bg-purple-500/20 rounded mb-2"></div>
          <div className="h-4 bg-purple-500/20 rounded mb-2"></div>
          <div className="h-4 bg-purple-500/20 rounded w-3/4"></div>
        </div>
      </Grid>
    ));

  if (roles.includes("USER")) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#130b3b] via-[#1a0f4a] to-[#0f0829]">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Section
          className="pt-[12rem] -mt-[5.25rem]"
          crosses
          crossesOffset="lg:translate-y-[5.25rem]"
          customPaddings
          id="hero"
        >
          <div className="container relative" ref={parallaxRef}>
            {/* Header Section */}
            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl mb-6 backdrop-blur-sm border border-purple-500/20">
                  <Bookmark className="w-8 h-8 text-purple-300" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                <span className="inline-block relative">
                  Saved Events
                  <img
                    src={curve}
                    className="absolute top-full left-0 w-full xl:-mt-2 opacity-60"
                    width={624}
                    height={28}
                    alt="Curve"
                  />
                </span>
              </h1>
              
              <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
                Your curated collection of events you've saved for later
              </p>

              {/* Modern Search Bar */}
              <div className="relative max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search your saved events..."
                    className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center space-x-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{events.length}</div>
                  <div className="text-sm text-purple-300">Total Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{filteredEvents.length}</div>
                  <div className="text-sm text-purple-300">Showing</div>
                </div>
              </div>
            </div>

            <BackgroundCircles />
          </div>

          {/* Events Grid */}
          <div className="container relative z-2">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {renderSkeletons(6)}
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="transform hover:scale-105 transition-all duration-300">
                    <Event
                      id={event.id}
                      title={event.title}
                      description={event.description}
                      date={event.date}
                      time={event.time}
                      venue={event.venue}
                      image={`data:image/jpeg;base64,${event.image}`}
                      club={event.club}
                      unsave={handleunsave}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/20 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-10 h-10 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {searchTerm ? "No events found" : "No saved events yet"}
                  </h3>
                  <p className="text-purple-200 mb-6">
                    {searchTerm 
                      ? "Try adjusting your search terms" 
                      : "Start exploring events and save the ones you're interested in"
                    }
                  </p>
                  {!searchTerm && (
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300">
                      Browse Events
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Section>
      </div>
    );
  } else {
    return null;
  }
};

export default SavedEvents;