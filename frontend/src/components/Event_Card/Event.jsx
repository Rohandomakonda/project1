import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Trash2, 
  Edit3, 
  Heart, 
  Bookmark, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  ExternalLink,
  MoreHorizontal
} from "lucide-react";

import Button from "../../components/Button";
import { GradientLight } from "../design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";
import { LoginSignout } from "../../pages/LoginPage/GoogleCalendarEvent";



function Event(props) {
  const navigate = useNavigate();
  const club = localStorage.getItem("club");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const userId = localStorage.getItem("userId");
  const storedRoles = localStorage.getItem("roles");
  const roles = storedRoles ? JSON.parse(storedRoles) : [];
  const token = localStorage.getItem("authToken");
  const API_BASE_URL = import.meta.env.VITE_API;

  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT;
  const API_KEY = import.meta.env.VITE_GOOGLE_APIKEY;
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar openid email profile";

  const accessToken = localStorage.getItem("access_token");
  const expiresIn = localStorage.getItem("expires_in");

  let gapiInited = false,
    gisInited = false,
    tokenClient;

  useEffect(() => {
    initializeGapiClient();
    gapiLoaded();
    gisLoaded();
  }, []);

  function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;

    if (accessToken && expiresIn) {
      gapi.client.setToken({
        access_token: accessToken,
        expires_in: parseInt(expiresIn, 10),
      });
    }
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
        if (response.error) {
          console.error("Error during authentication:", response);
          return;
        }

        const { access_token, expires_in } = gapi.client.getToken();
        console.log("Access Token:", access_token);

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("expires_in", expires_in);
      },
    });
    gisInited = true;
  }

  useEffect(() => {
    // Fetch like status
    axios
      .get(`${API_BASE_URL}/profile/isliked/${props.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setIsLiked(response.data);
      })
      .catch((error) => {
        console.error("Error fetching like status:", error);
      });

    // Fetch saved status
    axios
      .get(`${API_BASE_URL}/profile/saved-events/issaved`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { eventTitle: `${props.title}` },
      })
      .then((response) => {
        setIsSaved(response.data);
      })
      .catch((error) => {
        console.error("Error fetching saved status:", error);
      });
  }, [props.id, userId, token, props.title]);

  function handleLike(e) {
    e.stopPropagation();
    if (isLiked) {
      axios
        .delete(`${API_BASE_URL}/profile/favourites/${props.id}`, {
          headers: { Authorization: `Bearer ${token}` },
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
        .post(`${API_BASE_URL}/profile/favourites/${props.id}`, null, {
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

  function handleBookmark(e) {
    e.stopPropagation();
    if (isSaved) {
      axios
        .delete(`${API_BASE_URL}/profile/saved-events/unsave`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { eventTitle: props.title },
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
        .post(`${API_BASE_URL}/profile/saved-events/${props.id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setIsSaved(true);
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

  function handleFlip(e) {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  }

  function handleLogin(e) {
    e.stopPropagation();
    navigate("/login");
  }

  function subtractTimeBy530(time24) {
    const [hours, minutes] = time24.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    const adjustedMinutes = (totalMinutes - 330 + 1440) % 1440;
    const newHours = Math.floor(adjustedMinutes / 60);
    const newMinutes = adjustedMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;
  }

  const date = props.date?.toString() || "";
  const time = subtractTimeBy530(props.time);

  function addManualEvent() {
    const event = {
      kind: "calendar#event",
      summary: `${props.title}`,
      location: `${props.venue}`,
      description: `${props.description}`,
      start: {
        dateTime: `${date}T${time}:00.000Z`,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: `${date}T${time}:00.000Z`,
        timeZone: "Asia/Kolkata",
      },
      attendees: [{ email: "sampleemail@gmail.com" }],
      reminders: { useDefault: true },
    };

    gapi.client.calendar.events
      .insert({
        calendarId: "primary",
        resource: event,
      })
      .then((response) => {
        console.log("Event created:", response);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });
  }

  const handleGglCalendar = async (e) => {
    e.stopPropagation();
    if (!accessToken || !expiresIn) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
    addManualEvent();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="group relative w-80 h-96 mx-auto">
      {/* Card Container */}
      <div
        className="relative w-full h-full cursor-pointer"
        style={{
          perspective: "1000px",
        }}
        onClick={() => navigate(`/event/${props.id}`)}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-[#130b3b]/95 to-[#1a0f4a]/95 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-[1.02]">
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>

              {/* Header with Actions */}
              <div className="relative p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2"></div>
                      <span className="text-purple-300 text-sm font-medium">{props.club}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight mb-3 line-clamp-2 group-hover:text-purple-200 transition-colors">
                      {props.title}
                    </h3>
                  </div>
                  
                  {/* Action Menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowActions(!showActions);
                      }}
                      className="p-2 rounded-full bg-purple-600/20 hover:bg-purple-500/30 transition-all duration-300"
                    >
                      <MoreHorizontal className="w-4 h-4 text-purple-300" />
                    </button>
                    
                    {showActions && (
                      <div className="absolute right-0 top-12 bg-[#130b3b]/95 backdrop-blur-xl rounded-xl border border-purple-500/30 shadow-2xl z-20 min-w-[160px]">
                        <button
                          onClick={handleFlip}
                          className="w-full px-4 py-3 text-left text-purple-200 hover:bg-purple-600/20 transition-colors text-sm"
                        >
                          View Image
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/event/${props.id}`);
                          }}
                          className="w-full px-4 py-3 text-left text-purple-200 hover:bg-purple-600/20 transition-colors text-sm"
                        >
                          Read More
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-purple-300 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(props.date)} • {props.time}</span>
                  </div>
                  
                  <div className="flex items-center text-purple-300 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="truncate">{props.venue_description}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-purple-200 text-sm leading-relaxed line-clamp-3 mb-6">
                  {props.description || "Join us for an amazing event experience!"}
                </p>
              </div>

              {/* Footer Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pt-4 bg-gradient-to-t from-[#130b3b] to-transparent">
                {/* Admin/Club Secretary Actions */}
                {((roles.includes("CLUB_SEC") && club === props.club) || roles.includes("ADMIN")) && (
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <button
                      onClick={handleDelete}
                      className="flex items-center justify-center w-10 h-10 bg-red-600/20 hover:bg-red-500/30 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="flex items-center justify-center w-10 h-10 bg-purple-600/20 hover:bg-purple-500/30 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Edit3 className="w-4 h-4 text-purple-400" />
                    </button>
                  </div>
                )}

                {/* User Actions */}
                {roles.includes("USER") && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Like Button */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={handleLike}
                          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 ${
                            isLiked 
                              ? 'bg-red-500/30 text-red-400' 
                              : 'bg-purple-600/20 hover:bg-purple-500/30 text-purple-400'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                        <span className="text-purple-300 text-sm font-medium">{props.likes}</span>
                      </div>

                      {/* Bookmark Button */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={handleBookmark}
                          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 ${
                            isSaved 
                              ? 'bg-purple-500/30 text-purple-400' 
                              : 'bg-purple-600/20 hover:bg-purple-500/30 text-purple-400'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                        <span className="text-purple-300 text-sm font-medium">{props.saves}</span>
                      </div>
                    </div>

                    {/* Calendar Integration */}
                    <div className="flex items-center">
                      <LoginSignout
                        title={props.title}
                        venue={props.venue}
                        date={date}
                        time={time}
                      />
                    </div>
                  </div>
                )}

                {/* Login Prompt */}
                {token == null && (
                  <div className="text-center">
                    <Button 
                      onClick={handleLogin}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Login to interact
                    </Button>
                  </div>
                )}

                {/* Venue Link */}
                <div className="mt-4 pt-4 border-t border-purple-500/20">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${props.venue}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center text-purple-300 hover:text-purple-200 text-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span className="truncate">{props.venue}</span>
                  </a>
                </div>
              </div>

              {/* Gradient Light Effect */}
              <GradientLight className="opacity-30" />
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-[#130b3b]/95 to-[#1a0f4a]/95 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/30">
              
              {/* Back Button */}
              <button
                onClick={handleFlip}
                className="absolute top-4 left-4 z-10 p-2 bg-purple-600/30 hover:bg-purple-500/50 rounded-full transition-all duration-300"
              >
                <svg className="w-5 h-5 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>

              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center p-6">
                <div className="relative max-w-full max-h-full">
                  <img
                    src={props.image}
                    alt={props.title}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#130b3b]/20 to-transparent rounded-2xl" />
                </div>
              </div>

              {/* Image Caption */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-[#130b3b]/80 backdrop-blur-md rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-1">{props.title}</h4>
                  <p className="text-purple-300 text-sm">Event Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close actions */}
      {showActions && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowActions(false)}
        />
      )}

      <ClipPath />
    </div>
  );
}

export default Event;