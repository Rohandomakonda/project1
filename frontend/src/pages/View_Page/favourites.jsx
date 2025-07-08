import { useState, useEffect, useRef } from "react";
import Event from "../../components/Event_Card/Event"; // Component for individual event cards
import axios from "axios";
import { curve } from "../../assets";
import Section from "../../components/Section.jsx";
import { BackgroundCircles } from "../../components/design/Hero";
import CustomizedSnackbars from "../../components/SnackBarCustom.jsx";
import { Search, Heart, Filter, Sparkles, Star, BookHeart as BookmarkHeart, Smile } from "lucide-react";

const Favourites = () => {
  const [events, setEvents] = useState([]); // All events
  const [loading, setLoading] = useState(false); // Loading state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [roles, setRoles] = useState([]); // User roles

  const userId = localStorage.getItem("userId");
  const parallaxRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API;

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
      .get(`${API_BASE_URL}/profile/getFavouritesByUser`, {
        headers: { Authorization: `Bearer ${token}` },
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
    const token = localStorage.getItem("authToken");

    axios
      .delete(`${API_BASE_URL}/profile/favourites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
        setLoading(false);
        setSnackbarOpen(true);
        setError(false);
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        setLoading(false);
        setSnackbarOpen(true);
        setError(true);
      });
  };

  // Filter events based on the search term
  const filteredEvents = events.filter((event) =>
    ["title", "description", "venue", "club"].some((key) =>
      event[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-rose-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-500 border-t-transparent mx-auto"></div>
                <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-pink-300/20 mx-auto animate-pulse"></div>
                <div className="absolute inset-4 rounded-full h-12 w-12 bg-gradient-to-r from-pink-600/30 to-red-600/30 mx-auto animate-pulse"></div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Loading Favourites</h2>
              <p className="text-pink-200 text-lg">Finding your loved events...</p>
              
              <div className="flex items-center justify-center mt-6 space-x-1">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920" 
                alt="Favourite events background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0520]/90 via-[#0f0829]/70 to-[#130b3b]" />
            </div>

            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem] mt-20">
              {/* Floating badge */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600/20 to-red-600/20 backdrop-blur-sm rounded-full border border-pink-500/30 mb-8">
                <Heart className="w-5 h-5 text-pink-400 mr-2" />
                <span className="text-pink-200 font-medium">Your Favourites</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                <span className="inline-block relative">
                  Favourite Events
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
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-red-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-[#130b3b]/80 backdrop-blur-xl rounded-2xl border border-pink-500/30 p-2">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-600/30 to-red-600/30 rounded-xl mr-4">
                        <Search className="w-5 h-5 text-pink-300" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search your favourite events..."
                        className="flex-1 bg-transparent text-white placeholder-pink-300 text-lg outline-none py-3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-600/30 to-red-600/30 rounded-xl ml-4">
                        <Filter className="w-5 h-5 text-pink-300" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Search Stats */}
                <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-pink-300">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                    <span>{filteredEvents.length} favourite events</span>
                  </div>
                  {searchTerm && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                      <span>Searching for "{searchTerm}"</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <BackgroundCircles />
          </div>

          {/* Favourite Events Section */}
          <div className="container relative z-2">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-pink-600/20 backdrop-blur-sm rounded-full border border-pink-500/30 mb-6">
                <BookmarkHeart className="w-4 h-4 text-pink-400 mr-2" />
                <span className="text-pink-200 text-sm font-medium">Loved Events</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Your <span className="text-pink-400">Favourite Events</span>
              </h2>
              
              <p className="text-pink-200 text-lg max-w-2xl mx-auto">
                All the events you've saved and loved in one place
              </p>
            </div>

            {/* Events Grid */}
            {!loading && (
              <>
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
                    {filteredEvents.map((event) => (
                      <div key={event.id} className="transform transition-all duration-500 hover:scale-[1.02] relative">
                        {/* Favourite indicator */}
                        <div className="absolute -top-2 -right-2 z-10">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-lg">
                            <Heart className="w-4 h-4 text-white fill-current" />
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
                          dislike={handleDislike}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-600/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      {searchTerm ? <Search className="w-12 h-12 text-pink-400" /> : <Smile className="w-12 h-12 text-pink-400" />}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {searchTerm ? "No Events Found" : "No Favourite Events Yet"}
                    </h3>
                    <p className="text-pink-200 text-lg max-w-md mx-auto mb-8">
                      {searchTerm 
                        ? `No favourite events match your search for "${searchTerm}". Try different keywords.`
                        : "Start exploring events and add them to your favourites to see them here!"
                      }
                    </p>
                    {searchTerm ? (
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="px-6 py-3 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Clear Search
                      </button>
                    ) : (
                      <button 
                        onClick={() => window.location.href = "/viewevents"}
                        className="px-6 py-3 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
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

        <CustomizedSnackbars
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          alertM={
            error ? "error unliking event,pls try again" : "Unliked event successfully"
          }
          type={error ? "error" : "success"}
        />
      </div>
    );
  } else {
    return null; // Render nothing for unauthorized users
  }
};

export default Favourites;