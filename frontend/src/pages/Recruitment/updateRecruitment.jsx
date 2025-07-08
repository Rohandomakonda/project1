import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Building, 
  Link as LinkIcon,
  Loader2,
  CheckCircle,
  AlertCircle,
  Edit
} from "lucide-react";

function UpdateRec() {
  const { id } = useParams(); // Extract id from URL
  const navigate = useNavigate(); // For navigation after update
  const API_BASE_URL = import.meta.env.VITE_API;
 
  // State to hold form details
  const [details, setDetails] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    venueDescription: '',
    club: '',
    formLink: '', // Default value to avoid errors
  });

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch event details on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios.get(`${API_BASE_URL}/recruitments/getRecruitment/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const recruitment = response.data;
        setDetails({
          title: recruitment.title || '',
          description: recruitment.description || '',
          date: recruitment.date || '',
          time: recruitment.time || '',
          venue: recruitment.venue || '',
          venueDescription: recruitment.venueDescription || '',
          club: recruitment.club || '',
         formLink: recruitment.formLink || '', // Ensure default boolean
        });
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
        setError(true);
        setMessage("Error fetching recruitment details");
        setSnackbarOpen(true);
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submit behavior
    setLoading(true);
    const token = localStorage.getItem("authToken");

    axios.put(`${API_BASE_URL}/recruitments/updateRecruitment/${id}`, details, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => {
        console.log(resp.data);
        setError(false);
        setMessage("Recruitment updated successfully!");
        setSnackbarOpen(true);
        setLoading(false);
        setTimeout(() => navigate("/viewRecruitments"), 2000); // Redirect to recruitments page after successful update
      })
      .catch((error) => {
        console.error("Error updating recruitment:", error);
        setError(true);
        setMessage("Error updating recruitment: " + error.message);
        setSnackbarOpen(true);
        setLoading(false);
      });
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "isPublic" ? value === "true" : value, // Convert isPublic to boolean
    }));
  };

  const venueOptions = [
    { value: "Department of Computer Science and Engineering", label: "CSE dept" },
    { value: "New Academic Building (NAB)", label: "NAB" },
    { value: "Electronic & ICT Academy", label: "E&ICT Building" },
    { value: "Department Of Electrical & Electronic Engineering", label: "Electrical Dept" },
    { value: "Dr. B.R. Ambedkar Learning centre", label: "ALC" }
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
              <Edit className="w-8 h-8" />
              Update Recruitment
            </h1>
            <p className="text-purple-100 mt-2">Modify your recruitment opportunity</p>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  value={details.club}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://forms.google.com/..."
                />
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
                    <span>Updating Recruitment...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    <span>Update Recruitment</span>
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

export default UpdateRec;