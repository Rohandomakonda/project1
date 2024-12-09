import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Page1.styles.css";
function Form() {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    club: "",
    isPublic: true,
    venueDescription: "",
  });

  const [image, setImage] = useState(null); // For storing the image file
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "isPublic" ? value === "true" : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append form fields
    Object.entries(details).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append image file
    if (image) {
      formData.append("image", image);
    }

    // Get token from localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You need to log in to add an event.");
      navigate("/login");
      return;
    }

    // Post request with axios
    axios
      .post("http://localhost:8080/addevents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Authorization header
        },
      })
      .then((response) => {
        alert("Event added successfully!");
        console.log("Response Data:", response.data);
        navigate("/viewevents"); // Redirect to events page
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        if (error.response) {
          alert("Failed to add event: " + error.response.data.message);
        } else {
          alert("An error occurred while adding the event.");
        }
      });
  };

  return (
    <div className="form-container">
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={details.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={details.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={details.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={details.time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="venueDescription"
          placeholder="Venue Description"
          value={details.venueDescription}
          onChange={handleChange}
          required
        />
        <select
          name="venue"
          value={details.venue}
          onChange={handleChange}
          required
        >
          <option value="" hidden>Select Venue</option>
          <option value="CSE Dept">CSE Dept</option>
          <option value="NAB">New Academic Building</option>
          <option value="EICT">EICT Building</option>
          <option value="ALC">Learning Centre</option>
        </select>
        <select
          name="isPublic"
          value={details.isPublic}
          onChange={handleChange}
          required
        >
          <option value="true">Public</option>
          <option value="false">Private</option>
        </select>
        <input
          type="text"
          name="club"
          placeholder="Club Name"
          value={details.club}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default Form;
