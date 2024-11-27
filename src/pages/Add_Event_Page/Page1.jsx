import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Page1.styles.css";

function Form() {
    const [details, setDetails] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        venueDescription: "",
        club: "",
        isPublic: true,
    });
    const [files, setFiles] = useState();
    const [previews, setPreviews] = useState();

    useEffect(() => {
        if (!files) {
            return;
        }
        let tmp = [];
        for (let i = 0; i < files.length; i++) {
            tmp.push(URL.createObjectURL(files[i]));
        }
        setPreviews(tmp);

        // Free memory
        return () => {
            for (let i = 0; i < tmp.length; i++) {
                URL.revokeObjectURL(tmp[i]);
            }
        };
    }, [files]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedDate = new Date(details.date);
        const formattedTime = details.time + ":00"; // Add seconds

        const Details = {
            ...details,
            date: formattedDate.toISOString().split("T")[0],
            time: formattedTime
        };

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
            [name]: name === "isPublic" ? value === "true" : value,
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

                <div className="file-upload-container">
                    <input
                        type="file"
                        accept="image/jpg,image/jpeg,image/png"
                        multiple
                        required
                        id="file-input"
                        className="file-input"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setFiles(e.target.files);
                            }
                        }}
                    />
                    <label htmlFor="file-input" className="file-input-label">
                        Upload Image
                    </label>
                    {files && previews && (
                        <div className="file-preview-container">
                            {previews.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`preview-${index}`}
                                    className="file-preview"
                                />
                            ))}
                        </div>
                    )}
                </div>

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

                <select
                    className="form-select"
                    onChange={change}
                    name="isPublic"
                >
                    <option value="">Select Event Type</option>
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