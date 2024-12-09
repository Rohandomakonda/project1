import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./updateRecruitment.css";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function UpdateRec() {
  const { id } = useParams(); // Extract id from URL
  const navigate = useNavigate(); // For navigation after update

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

  // Fetch event details on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios.get(`http://localhost:8080/getRecruitment/${id}`, {
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
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submit behavior
    const token = localStorage.getItem("authToken");

    axios.put(`http://localhost:8080/updateRecruitment/${id}`, details, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => {
        console.log(resp.data);
        alert("updating");
//       <Alert severity="success">
//         <AlertTitle>Success</AlertTitle>
//         This is a success Alert with an encouraging title.
//       </Alert>
        alert("navigating");
        navigate("/viewRecruitments"); // Redirect to recruitments page after successful update
      })
      .catch((error) => {
        console.error("Error updating recruitment:", error);
        alert("Error updating recruitment: " + error.message);
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
//add event -> club const-> localStorage
//update event & delete -> same ->viewpage same club member -> similar for recruitment
// register-> club-sec -> option -> select club -> localStorage
  return (
    <div className="form-container">
      <h1 className="form-title">Update Recruitment</h1>
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
          <option value="Department of Computer Science and Engineering">CSE dept</option>
          <option value="New Academic Building (NAB)">NAB</option>
          <option value="Electronic & ICT Academy">E&ICT Building</option>
          <option value="Department Of Electrical & Electronic Engineering">Electrical Dept</option>
          <option value="Dr. B.R. Ambedkar Learning centre">ALC</option>
        </select>


        <input
                 type="text"
                 onChange={handleChange}
                 placeholder="Club"
                 name="club"
                 value={details.formLink}
                 required
                 className="form-input"
               />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Club"
          name="club"
          value={details.club}
          required
          className="form-input"
        />
        <button type="submit" className="submit-button">Update Recruitment</button>
      </form>
    </div>
  );
}

export default UpdateRec;
