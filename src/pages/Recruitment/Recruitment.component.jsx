import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Recruitment.css";

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
  const [role, setRole] = useState(null); // State for role
  const club = localStorage.getItem("club"); // Retrieve the club from localStorage
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Retrieve roles and set the current role
    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) {
      setRole(JSON.parse(storedRoles)); // Parse roles from localStorage
    }

    if (role === "CLUB_SEC") {
      setDetails((prevDetails) => ({
        ...prevDetails,
        club: club, // Prefill the club field
      }));
    }
  }, [role, club]); // Depend on role and club

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(details).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (image) {
      formData.append("image", image);
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
      return;
    }

    axios
      .post("http://localhost:8080/api/postRecruitment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        alert("Added Recruitment successfully");
        navigate("/viewevents");
      })
      .catch((error) => {
        console.error("Error sending recruitment details:", error);
        alert("Recruitment not added");
      });
  };

  const change = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add Recruitment</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          onChange={change}
          placeholder="Title"
          name="title"
          value={details.title}
          required
          className="form-input"
        />
        <textarea
          onChange={change}
          placeholder="Description"
          name="description"
          value={details.description}
          required
          className="form-textarea"
        />
        <input
          type="date"
          onChange={change}
          name="date"
          value={details.date}
          required
          className="form-input"
        />
        <input
          type="time"
          onChange={change}
          name="time"
          value={details.time}
          required
          className="form-calendar"
        />
        <input
          type="text"
          onChange={change}
          placeholder="Venue-description"
          name="venueDescription"
          value={details.venueDescription}
          required
          className="form-input"
        />
        <select
          className="form-select"
          onChange={change}
          name="venue"
          id="venue"
        >
          <option value="" hidden>
            Select Venue
          </option>
          <option value="Department of Computer Science and Engineering">CSE dept</option>
          <option value="New Academic Building (NAB)">NAB</option>
          <option value="Electronic & ICT Academy">E&ICT Building</option>
          <option value="Department Of Electrical & Electronic Engineering">Electrical Dept</option>
          <option value="Dr. B.R. Ambedkar Learning centre">ALC</option>
        </select>
        <input
          type="text"
          onChange={change}
          placeholder="Club presenting"
          name="club"
          value={details.club || club}
          required
          className="form-input"
          readOnly={role === "CLUB_SEC"} // Disable the input if the role is CLUB_SEC
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <input
          type="text"
          onChange={change}
          placeholder="Paste the google form link"
          name="formLink"
          value={details.formLink}
          required
          className="form-input"
        />
        <button type="submit" className="submit-button">
          Add Recruitment
        </button>
      </form>
    </div>
  );
}

export default Recruitment;
