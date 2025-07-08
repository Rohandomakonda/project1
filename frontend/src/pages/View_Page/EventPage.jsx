import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "../comments/comments";
import { curve } from "../../assets/index.js";
import Section from "../../components/Section.jsx";
import Button from "../../components/Button.jsx";
import useGet from "../../customhooks/useGet.jsx";
import { Calendar, Clock, MapPin, Users, Share2, Heart, Bookmark } from "lucide-react";

function EventPage() {
  const { id } = useParams();
  const eventId = parseInt(id, 10);
  console.log("eventid is "+eventId);
  const [details, setDetails] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const token = localStorage.getItem("authToken");
  const API_BASE_URL = import.meta.env.VITE_API;

  useEffect(() => {
    if (isNaN(eventId)) {
      console.error("Invalid event ID");
      return;
    }

    // ✅ Fetch Event Details
    axios
      .get(`${API_BASE_URL}/events/getById/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
        alert("Failed to fetch event: " + error.response?.data?.message);
      });
  }, [eventId]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: details.title,
        text: details.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

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
        <div className="container relative">
          {/* Hero Image Section */}
          <div className="relative mb-16 overflow-hidden rounded-3xl shadow-2xl shadow-purple-500/20">
            <div className="relative h-[60vh] md:h-[70vh]">
              <img 
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Event"
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#130b3b] via-[#130b3b]/60 to-transparent" />
              
              {/* Floating Action Buttons */}
              <div className="absolute top-6 right-6 flex space-x-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
                    isLiked 
                      ? 'bg-red-500/80 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
                    isBookmarked 
                      ? 'bg-purple-500/80 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Event Status Badge */}
              <div className="absolute top-6 left-6">
                <div className="px-4 py-2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-md rounded-full">
                  <span className="text-white font-medium text-sm">Live Event</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="relative z-1 mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                  <span className="inline-block relative">
                    {details.title}
                    <img
                      src={curve}
                      className="absolute top-full left-0 w-full xl:-mt-2 opacity-60"
                      width={624}
                      height={28}
                      alt="Curve"
                    />
                  </span>
                </h1>
                
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-xl text-purple-200 leading-relaxed mb-8">
                    {details.description}
                  </p>
                </div>

                {/* Event Highlights */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                    <h3 className="text-xl font-semibold text-white mb-4">What to Expect</h3>
                    <ul className="space-y-2 text-purple-200">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        Interactive sessions and networking
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        Expert speakers and industry insights
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        Hands-on workshops and activities
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                    <h3 className="text-xl font-semibold text-white mb-4">Event Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">250+</div>
                        <div className="text-sm text-purple-300">Expected Attendees</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">5</div>
                        <div className="text-sm text-purple-300">Hours Duration</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Event Details Card */}
                <div className="bg-gradient-to-br from-[#130b3b]/95 to-[#1a0f4a]/95 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Event Details</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-purple-300" />
                      </div>
                      <div>
                        <div className="text-sm text-purple-300 mb-1">Date</div>
                        <div className="text-white font-medium">
                          {formatDate(details.date) || details.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-purple-300" />
                      </div>
                      <div>
                        <div className="text-sm text-purple-300 mb-1">Time</div>
                        <div className="text-white font-medium">{details.time}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-purple-300" />
                      </div>
                      <div>
                        <div className="text-sm text-purple-300 mb-1">Venue</div>
                        <div className="text-white font-medium">{details.venue}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 space-y-3">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                      Register Now
                    </Button>
                    
                    <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 font-medium py-4 rounded-xl transition-all duration-300 border border-purple-500/30 hover:border-purple-400/50">
                      Add to Calendar
                    </button>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Quick Info</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-300">Category</span>
                      <span className="text-white">Technology</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300">Language</span>
                      <span className="text-white">English</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300">Price</span>
                      <span className="text-green-400 font-medium">Free</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-20">
            <div className="bg-gradient-to-br from-[#130b3b]/80 to-[#1a0f4a]/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mr-3 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                Discussion & Comments
              </h3>
              <Comments id={eventId} key={eventId} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default EventPage;