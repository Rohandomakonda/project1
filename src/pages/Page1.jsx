import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Page1.styles.css"; // Make sure this includes your new styles

function Form() {
    const [details, setDetails] = React.useState({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        club: "",
        isPublic: true
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents default submitting

        // Convert date and time strings to Date and Time objects in the required format
        const formattedDate = new Date(details.date); // Creates a JavaScript Date object
        const formattedTime = details.time + ":00"; // Add seconds to ensure format is HH:MM:SS

        const Details = {
            ...details,
            date: formattedDate.toISOString().split("T")[0], // Format to YYYY-MM-DD
            time: formattedTime // Time in HH:MM:SS
        };
        console.log(details); // Check the values before sending them to the backend
        axios
            .post("http://localhost:8080/addevent", Details)
            .then((resp) => {
                console.log(resp.data);
                alert("Event submitted successfully!");
                navigate("/");
            })
            .catch((error) => {
                alert("Error submitting event: " + error);
            });
    };


   const change = (event) => {
       const { name, value } = event.target;

       setDetails((prevDetails) => ({
           ...prevDetails,
           [name]: name === "isPublic" ? value === "true" : value, // Convert isPublic to boolean
       }));
   };

    return (
        <div className="form-container">
            <h1 className="form-title">Add Event</h1>
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
                    type="text"
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
                    placeholder="Date (DD-MM-YYYY)"
                    name="date"
                    value={details.date}
                    required
                    className="form-input"
                />
                <input
                    type="time"
                    onChange={change}
                    placeholder="Time (HH:MM AM/PM)"
                    name="time"
                    value={details.time}
                    required
                    className="form-input"
                />
{/*                 <input */}
{/*                    type="text" */}
{/*                     onChange={change} */}
{/*                     placeholder="Venue" */}
{/*                     name="venue" */}
{/*                     value={details.venue} */}
{/*                     required */}
{/*                     className="form-input" */}
{/*                 /> */}
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
{/*             <option value="XGMH+JM8 Auditorium">Auditorium</option> */}
            </select>

           <select onChange={change} name="isPublic">
               <option value="" >Select Event Type</option>
               <option value="false">Private</option>
               <option value="true">Public</option>
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
                <button type="submit" className="submit-button">Add Event</button>
            </form>
        </div>
    );
}

export default Form;
