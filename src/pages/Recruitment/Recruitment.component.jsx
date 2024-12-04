import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Recruitment.css";

function Recruitment(){

        const [details, setDetails] = useState({
            title: "",
            description: "",
            date: "",
            time: "",
            venue: "",
            venueDescription: "",
            club: "",
            formLink: ""
        });

        const navigate = useNavigate();

        const [image, setImage] = useState(null); // For storing the image file

        const handleSubmit = async (e) => {
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


                const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
                  if (!token) {
                      alert("Session expired. Please login again.");
                      window.location.href = "/login"; // Redirect to login if token is missing
                      return;
                  }

                const response = axios.post(
                        "http://localhost:8080/api/postRecruitment",
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                 Authorization: `Bearer ${token}`, // Authorization header
                            },
                        }
                    )
                    .then((response) => {
                        // This code will run when the request is successful
                        console.log('Response:', response.data);
                        alert("added Recruitment successfully");
                        navigate("/viewevents");
                    })
                    .catch((error) => {
                        // This code will run when an error occurs
                        console.error('Error sending recruitment details:', error);
                        alert("Recruitment not added");

                    });





        };

        const change = (event) => {
            const { name, value } = event.target; //destructing name and value from event.target
            setDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        };

        const handleImageChange = (e) => {
            setImage(e.target.files[0]); // Store the selected file
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
                        <option value="">Select Venue</option>
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
                        value={details.club}
                        required
                        className="form-input"
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
                    <button type="submit" className="submit-button">Add Recruitment</button>
                </form>
            </div>
        );

 }

 export default Recruitment;