import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//import "./Update.styles.css";
import CircularProgress from "@mui/material/CircularProgress";
import CustomizedSnackbars from "../../components/SnackBarCustom.jsx";
import TextField from '@mui/material/TextField';
function Update() {
  const { id } = useParams(); // Extract id from URL
  const navigate = useNavigate(); // For navigation after update
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Manage Snackbar visibility

  const [details, setDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    venueDescription: "",
    club: "",
    isPublic: false, // Default value to avoid errors
  });

  // Fetch event details on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`http://localhost:8080/getEvent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const event = response.data;
        setDetails({
          title: event.title || "",
          description: event.description || "",
          date: event.date || "",
          time: event.time || "",
          venue: event.venue || "",
          venueDescription: event.venueDescription || "",
          club: event.club || "",
          isPublic: event.isPublic !== undefined ? event.isPublic : false, // Ensure default boolean
        });
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submit behavior
    setLoading(true);

    const token = localStorage.getItem("authToken");

    axios
      .put(`http://localhost:8080/updateEvent/${id}`, details, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        console.log(resp.data);
        setLoading(false);
        setSnackbarOpen(true); // Show success Snackbar
        setTimeout(() => navigate("/viewevents"), 3000); // Navigate after showing Snackbar
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating event:", error);
        alert("Error updating event: " + error.message);
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

  return (
    <div className="form-container">
      <h1 className="form-title">Update Event</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Title"
          name="title"
          value={details.title}
          required
          className="form-input"
        />
        <textarea
          type="text"
          onChange={handleChange}
          placeholder="Description"
          name="description"
          value={details.description}
          required
          className="form-textarea"
        />
        <input
          type="date"
          onChange={handleChange}
          name="date"
          value={details.date}
          required
          className="form-input"
        />
        <input
          type="time"
          onChange={handleChange}
          name="time"
          value={details.time}
          required
          className="form-input"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Venue Description"
          name="venueDescription"
          value={details.venueDescription}
          required
          className="form-input"
        />
        <select
          className="form-select"
          onChange={handleChange}
          name="venue"
          value={details.venue}
        >
          <option value="">Select Venue</option>
          <option value="Department of Computer Science and Engineering">
            CSE dept
          </option>
          <option value="New Academic Building (NAB)">NAB</option>
          <option value="Electronic & ICT Academy">E&ICT Building</option>
          <option value="Department Of Electrical & Electronic Engineering">
            Electrical Dept
          </option>
          <option value="Dr. B.R. Ambedkar Learning centre">ALC</option>
        </select>

        <select
          className="form-select"
          onChange={handleChange}
          name="isPublic"
          value={details.isPublic !== undefined ? details.isPublic.toString() : ""}
        >
          <option value="">Select Event Type</option>
          <option value="false">Private</option>
          <option value="true">Public</option>
        </select>

        <input
          type="text"
          onChange={handleChange}
          placeholder="Club"
          name="club"
          value={details.club}
          required
          className="form-input"
        />

        {loading ? (
          <CircularProgress disableShrink />
        ) : (
          <button type="submit" className="submit-button">
            Update Event
          </button>
        )}
      </form>
      {/* Snackbar Component */}
      <CustomizedSnackbars
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        alertM={"Event updated successfully"}
        type={"success"}
      />
    </div>
  );
}

export default Update;
