import { useState, useEffect, useRef } from "react";
import Event from "../../components/Event_Card/Event.jsx";
import axios from "axios";
import { Search, Bookmark, Heart, Calendar, AlertCircle, CheckCircle, XCircle, Filter, Sparkles, Star, BookHeart as BookmarkHeartIcon, Smile } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Slide from "@mui/material/Slide";
import { curve } from "../../assets";
import Section from "../../components/Section.jsx";
import Button from "../../components/Button";
import { BackgroundCircles } from "../../components/design/Hero";

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
      <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#0f0829] to-[#130b3b]">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Loading Overlay - Same as Favourites */}
        {loading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500 border-t-transparent mx-auto"></div>
                <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-purple-300/20 mx-auto animate-pulse"></div>
                <div className="absolute inset-4 rounded-full h-12 w-12 bg-gradient-to-r from-purple-600/30 to-blue-600/30 mx-auto animate-pulse"></div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Loading Saved Events</h2>
              <p className="text-purple-200 text-lg">Fetching your saved collection...</p>
              
              <div className="flex items-center justify-center mt-6 space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <Section
          className="pt-[12rem] -mt-[5.25rem]"
          crosses
          crossesOffset="lg:translate-y-[5.25rem]"
          customPaddings
          id="hero"
        >
          {/* Hero Section */}
          <div className="container relative" ref={parallaxRef}>
            {/* Hero Background Image */}
            <div className="absolute inset-0 opacity-15 -z-10">
              <img 
                src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1920" 
                alt="Saved events background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0520]/90 via-[#0f0829]/70 to-[#130b3b]" />
            </div>

            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem] mt-20">
              {/* Floating badge */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8">
                <Bookmark className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-purple-200 font-medium">Your Collection</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
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

              {/* Enhanced Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-12">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-[#130b3b]/80 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-2">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl mr-4">
                        <Search className="w-5 h-5 text-purple-300" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search your saved events..."
                        className="flex-1 bg-transparent text-white placeholder-purple-300 text-lg outline-none py-3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl ml-4">
                        <Filter className="w-5 h-5 text-purple-300" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Search Stats */}
                <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-purple-300">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span>{filteredEvents.length} saved events</span>
                  </div>
                  {searchTerm && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span>Searching for "{searchTerm}"</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <BackgroundCircles />
          </div>

          {/* Saved Events Section */}
          <div className="container relative z-2">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-purple-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-6">
                <BookmarkHeartIcon className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-purple-200 text-sm font-medium">Saved Collection</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Your <span className="text-purple-400">Saved Events</span>
              </h2>
              
              <p className="text-purple-200 text-lg max-w-2xl mx-auto">
                Your curated collection of events you've saved for later
              </p>
            </div>

            {/* Events Grid */}
            {!loading && (
              <>
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
                    {filteredEvents.map((event) => (
                      <div key={event.id} className="transform transition-all duration-500 hover:scale-[1.02] relative">
                        {/* Saved indicator */}
                        <div className="absolute -top-2 -right-2 z-10">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg">
                            <Bookmark className="w-4 h-4 text-white fill-current" />
                          </div>
                        </div>
                        
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
                          unsave={handleunsave}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      {searchTerm ? <Search className="w-12 h-12 text-purple-400" /> : <Smile className="w-12 h-12 text-purple-400" />}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {searchTerm ? "No Events Found" : "No Saved Events Yet"}
                    </h3>
                    <p className="text-purple-200 text-lg max-w-md mx-auto mb-8">
                      {searchTerm 
                        ? `No saved events match your search for "${searchTerm}". Try different keywords.`
                        : "Start exploring events and save them to build your collection!"
                      }
                    </p>
                    {searchTerm ? (
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Clear Search
                      </button>
                    ) : (
                      <button 
                        onClick={() => window.location.href = "/viewevents"}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Explore Events
                      </button>
                    )}
                  </div>
                )}
              </>
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