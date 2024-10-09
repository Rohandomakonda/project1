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
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/addevent", details)
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
            [name]: value,
        }));
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Add Event</h1>
            <form onSubmit={handleSubmit} className="event-form">
                <input
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
                    onChange={change}
                    placeholder="Date (YYYY-MM-DD)"
                    name="date"
                    value={details.date}
                    required
                    className="form-input"
                />
                <input
                    onChange={change}
                    placeholder="Time (HH:MM AM/PM)"
                    name="time"
                    value={details.time}
                    required
                    className="form-input"
                />
                <input
                    onChange={change}
                    placeholder="Venue"
                    name="venue"
                    value={details.venue}
                    required
                    className="form-input"
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default Form;
