import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Users, 
  Clock, 
  MapPin, 
  FileText, 
  Image as ImageIcon, 
  Building, 
  Calendar,
  Link as LinkIcon,
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

function Recruitment() {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    venueDescription: "",
    club: "",
    formLink: "",
  });

  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const club = localStorage.getItem("club");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("authToken");
  const API_BASE_URL = import.meta.env.VITE_API;

  useEffect(() => {
    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) {
      setRole(JSON.parse(storedRoles));
    }

    if (role === "CLUB_SEC") {
      setDetails((prevDetails) => ({
        ...prevDetails,
        club: club,
      }));
    }
  }, [role, club]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(details).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (image) {
      formData.append("image", image);
    }

    console.log(details);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError(true);
      setMessage("Session expired. Please login again.");
      setSnackbarOpen(true);
      setLoading(false);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    axios
      .post(`${API_BASE_URL}/recruitments/postRecruitment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        setError(false);
        setMessage("Added Recruitment successfully");
        setSnackbarOpen(true);
        setLoading(false);
        setTimeout(() => navigate("/viewRecruitments"), 2000);
      })
      .catch((error) => {
        console.error("Error sending recruitment details:", error);
        setError(true);
        setMessage("Recruitment not added");
        setSnackbarOpen(true);
        setLoading(false);
      });
  };

  const change = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    console.log(details);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              <Users className="w-8 h-8" />
              Add Recruitment
            </h1>
            <p className="text-purple-100 mt-2">Create a recruitment opportunity for your club</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FileText size={16} />
                  Recruitment Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={details.title}
                  onChange={change}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter recruitment title"
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
                  onChange={change}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe the recruitment opportunity in detail"
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
                    onChange={change}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                    onChange={change}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                  onChange={change}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                  onChange={change}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Provide specific venue details"
                />
              </div>

              {/* Club */}
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
                  onChange={change}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Club name"
                />
              </div>

              {/* Google Form Link */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <LinkIcon size={16} />
                  Application Form Link
                </label>
                <input
                  type="url"
                  name="formLink"
                  required
                  value={details.formLink}
                  onChange={change}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://forms.google.com/..."
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <ImageIcon size={16} />
                  Recruitment Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Adding Recruitment...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    <span>Add Recruitment</span>
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

export default Recruitment;