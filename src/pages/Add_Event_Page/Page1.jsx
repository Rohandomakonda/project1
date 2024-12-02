import React, { useState } from "react";
import axios from "axios";

function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    club: "",
    venueDescription:"",
    isPublic: false,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const response = axios
      .post("http://localhost:8080/addevents", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        // This block executes when the request is successful
        alert("Event added successfully!");
        console.log("Response Data:", response.data);
      })
      .catch((error) => {
        // This block executes when there's an error
        console.error("Error adding event:", error);
        if (error.response) {
          // Server responded with a status code other than 2xx
          alert("Failed to add event: " + error.response.data.message);
        } else if (error.request) {
          // Request was made, but no response received
          alert("Failed to add event: No response from server.");
        } else {
          // Something else went wrong
          alert("Failed to add event: " + error.message);
        }
      });
  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="date" name="date" onChange={handleChange} required />
      <input type="time" name="time" onChange={handleChange} required />
      <input type="text" name="venue" placeholder="Venue" onChange={handleChange} required />
      <input type="text" name="venueDescription" placeholder="venueDescription" onChange={handleChange} required />
      <input type="text" name="club" placeholder="Club" onChange={handleChange} required />
      <label>
        Public Event
        <input type="checkbox" name="isPublic" onChange={handleChange} />
      </label>
      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default AddEvent;
