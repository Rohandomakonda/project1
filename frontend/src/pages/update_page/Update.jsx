import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Building, 
  Globe, 
  Lock,
  Loader2,
  CheckCircle,
  AlertCircle,
  Edit
} from "lucide-react";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API;

  const [details, setDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    venueDescription: "",
    club: "",
    isPublic: false,
  });

  // Fetch event details on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    axios
      .get(`${API_BASE_URL}/events/getEvent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const event = response.data;
        console.log(event.description);
        setDetails({
          title: event.title || "",
          description: event.description || "",
          date: event.date || "",
          time: event.time || "",
          venue: event.venue || "",
          venueDescription: event.venueDescription || "",
          club: event.club || "",
          isPublic: event.isPublic !== undefined ? event.isPublic : false,
        });
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
        setError(true);
        setMessage("Error loading event details");
        setSnackbarOpen(true);
      });
  }, [id]);

  // Log details.description when details state changes
  useEffect(() => {
    console.log("Updated Details Description:", details.description);
  }, [details]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("authToken");

    axios
      .put(`${API_BASE_URL}/events/updateEvent/${id}`, details, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        console.log(resp.data);
        setError(false);
        setMessage("Event updated successfully!");
        setSnackbarOpen(true);
        setLoading(false);
        setTimeout(() => navigate("/viewevents"), 2000);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        setError(true);
        setMessage("Error updating event: " + error.message);
        setSnackbarOpen(true);
        setLoading(false);
      });
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "isPublic" ? value === "true" : value,
    }));
  };

  const venueOptions = [
    { value: "CSE Dept", label: "CSE Department" },
    { value: "NAB", label: "New Academic Building" },
    { value: "EICT", label: "EICT Building" },
    { value: "ALC", label: "Learning Centre" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Notification */}
        {snackbarOpen && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            error ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}>
            {error ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
            <span className="text-sm font-medium">{message}</span>
            <button 
              onClick={() => setSnackbarOpen(false)}
              className="ml-2 text-white hover:text-gray-200 transition-colors"
            >
              ×
            </button>
          </div>
        )}

        {/* Main Form Container */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              <Edit className="w-8 h-8" />
              Update Event
            </h1>
            <p className="text-blue-100 mt-2">Modify your event details</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FileText size={16} />
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={details.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter event title"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FileText size={16} />
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  value={details.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe your event in detail"
                />
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Calendar size={16} />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={details.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Clock size={16} />
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={details.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Venue Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Building size={16} />
                  Venue
                </label>
                <select
                  name="venue"
                  value={details.venue}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="" disabled>Select Venue</option>
                  {venueOptions.map((venue) => (
                    <option key={venue.value} value={venue.value}>
                      {venue.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Venue Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <MapPin size={16} />
                  Venue Description
                </label>
                <input
                  type="text"
                  name="venueDescription"
                  required
                  value={details.venueDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Provide specific venue details"
                />
              </div>

              {/* Club and Visibility Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Users size={16} />
                    Club
                  </label>
                  <input
                    type="text"
                    name="club"
                    required
                    value={details.club}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Club name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                    {details.isPublic ? <Globe size={16} /> : <Lock size={16} />}
                    Visibility
                  </label>
                  <select
                    name="isPublic"
                    value={details.isPublic}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="true">Public</option>
                    <option value="false">Private</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Updating Event...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    <span>Update Event</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;