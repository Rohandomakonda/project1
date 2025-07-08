import { useState, useEffect } from "react";
import Event from "../../components/Event_Card/Event.jsx";
import axios from "axios";
import { Search, Bookmark, Heart, Calendar, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Slide from "@mui/material/Slide";
import { curve } from "../../assets";
import Section from "../../components/Section.jsx";
import Button from "../../components/Button";
import {
  BackgroundCircles,
} from "../../components/design/Hero";
import { useRef } from "react";

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const SavedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // success, error, warning, info
    title: ""
  });
  const parallaxRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API;

  const userId = localStorage.getItem("userId");

  // Enhanced alert function
  const showAlert = (message, severity = "info", title = "") => {
    setSnackbar({
      open: true,
      message,
      severity,
      title
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      showAlert("Your session has expired. Please log in again to continue.", "error", "Authentication Required");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
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
        if (response.data.length === 0) {
          showAlert("You haven't saved any events yet. Start exploring to build your collection!", "info", "No Saved Events");
        } else {
          showAlert(`Successfully loaded ${response.data.length} saved events`, "success", "Events Loaded");
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        if (error.response?.status === 401) {
          showAlert("Your session has expired. Redirecting to login...", "error", "Session Expired");
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        } else {
          showAlert(
            error.response?.data?.message || "Failed to load your saved events. Please try again.",
            "error",
            "Loading Failed"
          );
        }
      })
      .finally(() => setLoading(false));

    // Fetch roles
    const userRoles = localStorage.getItem("roles");
    setRoles(userRoles ? JSON.parse(userRoles) : []);
  }, [userId]);

  const handleunsave = (title) => {
    const token = localStorage.getItem("authToken");

    // Show loading state
    showAlert(`Removing "${title}" from your saved events...`, "info", "Processing");

    axios
      .delete(`${API_BASE_URL}/profile/saved-events/unsave`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { eventTitle: title }, 
      })
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.title !== title)
        );
        showAlert(`"${title}" has been successfully removed from your saved events`, "success", "Event Removed");
      })
      .catch((error) => {
        console.error("Error unsaving event:", error);
        showAlert(
          error.response?.data?.message || `Failed to remove "${title}". Please try again.`,
          "error",
          "Removal Failed"
        );
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

  // Custom Alert Icon Component
  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

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

        {/* Enhanced MUI Snackbar with Custom Styling */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          TransitionComponent={SlideTransition}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              background: 'transparent',
              boxShadow: 'none',
              padding: 0,
            }
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            icon={getAlertIcon(snackbar.severity)}
            sx={{
              background: snackbar.severity === 'success' 
                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(21, 128, 61, 0.9) 100%)'
                : snackbar.severity === 'error'
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(185, 28, 28, 0.9) 100%)'
                : snackbar.severity === 'warning'
                ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(180, 83, 9, 0.9) 100%)'
                : 'linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(126, 34, 206, 0.9) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              color: 'white',
              minWidth: '350px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              '& .MuiAlert-icon': {
                color: 'white',
              },
              '& .MuiAlert-action': {
                color: 'white',
                '& .MuiIconButton-root': {
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }
              }
            }}
          >
            {snackbar.title && (
              <AlertTitle sx={{ 
                fontWeight: 'bold', 
                marginBottom: '4px',
                color: 'white'
              }}>
                {snackbar.title}
              </AlertTitle>
            )}
            <div style={{ 
              fontSize: '14px', 
              lineHeight: '1.4',
              color: 'rgba(255, 255, 255, 0.95)'
            }}>
              {snackbar.message}
            </div>
          </Alert>
        </Snackbar>
      </div>
    );
  } else {
    return null;
  }
};

export default SavedEvents;