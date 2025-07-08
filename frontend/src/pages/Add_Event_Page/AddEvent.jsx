import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Image as ImageIcon, 
  Building, 
  Tag, 
  Globe, 
  Lock,
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

function EventForm() {
  const [details, setDetails] = useState(() => {
    const initialClub = localStorage.getItem("club") || "";
    return {
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      club: initialClub,
      isPublic: true,
      venueDescription: "",
      category: "",
    };
  });

  const club = localStorage.getItem("club");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "isPublic" ? value === "true" : value,
    }));
  };

  const API_BASE_URL = import.meta.env.VITE_API;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const clubValue = localStorage.getItem("club");

    Object.entries(details).forEach(([key, value]) => {
      if (key === "club") {
        formData.append("club", clubValue);
      } else {
        formData.append(key, value);
      }
    });

    if (image) {
      formData.append("image", image);
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError(true);
      setMessage("You need to log in to add an event.");
      setSnackbarOpen(true);
      setLoading(false);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    axios
      .post(`${API_BASE_URL}/events/addevents`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setError(false);
        setMessage("Event added successfully!");
        setSnackbarOpen(true);
        setLoading(false);
        console.log(response.data);
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        setError(true);
        setLoading(false);
        if (error.response) {
          setMessage("Failed to add event: " + error.response.data.message);
        } else {
          setMessage("An error occurred while adding the event.");
        }
        setSnackbarOpen(true);
      });
  };

  const venueOptions = [
    { value: "CSE Dept", label: "CSE Department" },
    { value: "NAB", label: "New Academic Building" },
    { value: "EICT", label: "EICT Building" },
    { value: "ALC", label: "Learning Centre" }
  ];

  const categoryOptions = [
    { value: "workshop", label: "Workshop" },
    { value: "hackathon", label: "Hackathon" },
    { value: "insights", label: "Insights" },
    { value: "quiz", label: "Quiz" },
    { value: "entertainment", label: "Entertainment" }
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
              <Calendar className="w-8 h-8" />
              Add New Event
            </h1>
            <p className="text-blue-100 mt-2">Create an amazing event for your community</p>
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
                    value={details.club || club}
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

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Tag size={16} />
                  Category
                </label>
                <select
                  name="category"
                  value={details.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="" disabled>Select Category</option>
                  {categoryOptions.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <ImageIcon size={16} />
                  Event Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <Upload className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {image && (
                  <p className="text-sm text-green-400 flex items-center gap-2">
                    <CheckCircle size={16} />
                    Selected: {image.name}
                  </p>
                )}
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
                    <span>Creating Event...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    <span>Create Event</span>
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

export default EventForm;