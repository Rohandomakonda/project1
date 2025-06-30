import React, { useState } from "react";

import { useNavigate } from "react-router-dom"; // Added Link for navigation
import axios from "axios";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import "../LoginPage/Login.css";
import { benefits } from "../../constants";

import { Box } from "@mui/material"; // Import Box and Button from MUI
import Button from "../../components/Button";

import { GradientLight } from "../../components/design/Benefits";
import usePost from "../../customhooks/usePost";

function Form() {
  const [details, setDetails] = useState(() => {
    const initialClub = localStorage.getItem("club") || "";
    return {
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      club: initialClub, // Set club if role is CLUB_SEC
      isPublic: true,
      venueDescription: "",
      category: "",
    };
  });

  const club = localStorage.getItem("club"); // Getting club name from localStorage
  const [image, setImage] = useState(null); // For storing the image file
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);
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

    // Get the club from localStorage
    const clubValue = localStorage.getItem("club");

    // Append form fields
    Object.entries(details).forEach(([key, value]) => {
      // For club field, use the value from localStorage
      if (key === "club") {
        formData.append("club", clubValue);
      } else {
        formData.append(key, value);
      }
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
      .post("http://localhost:8765/api/events/addevents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Authorization header
        },
      })
      .then((response) => {
        alert("Event added successfully!");
        console.log(response.data);
        navigate("/"); // Redirect to events page
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
    <div className="pt-[12rem] -mt-[5.25rem] flex items-center justify-center min-h-screen w-full">
      <div className="container relative w-full max-w-screen-lg flex justify-center items-center">
        <div className="relative z-1 text-center">
          <form
            className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full max-w-[50rem]"
            style={{
              backgroundImage: `url(${benefits[2].backgroundUrl})`,
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              boxSizing: "border-box",
              borderRadius: "8px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onSubmit={handleSubmit}
          >
            <Typography
              variant="h3" // You can use h2, h3, etc., depending on the desired size
              className="text-white mb-5 transform translate-x-[-15px]"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              Add Event
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Title"
                required
                variant="outlined"
                onChange={handleChange}
                name="title"
                sx={{
                  mt: 4,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                    "& input": { color: "white" },
                  },
                  "& .MuiInputLabel-root": { color: "#ADD8E6" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#87CEEB" },
                }}
              />

              <TextField
                label="Description"
                name="description"
                multiline
                rows={4} // Set the number of rows for the text area
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                    "& textarea": { color: "white" }, // Text color for textarea
                  },
                  "& .MuiInputLabel-root": { color: "#ADD8E6" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#87CEEB" },
                }}
              />

              <TextField
                type="date"
                name="date"
                value={details.date}
                onChange={handleChange}
                required
                label="Date"
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                    "& input": { color: "white" },
                  },
                  "& .MuiInputLabel-root": { color: "#ADD8E6" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#87CEEB" },
                }}
              />

              <TextField
                type="time"
                name="time"
                value={details.time}
                onChange={handleChange}
                required
                label="Time"
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                    "& input": { color: "white" },
                  },
                  "& .MuiInputLabel-root": { color: "#ADD8E6" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#87CEEB" },
                }}
              />

              <TextField
                label="Venue Description"
                name="venueDescription"
                required
                variant="outlined"
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                    "& input": { color: "white" },
                  },
                  "& .MuiInputLabel-root": { color: "#ADD8E6" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#87CEEB" },
                }}
              />

              <select
                name="venue"
                value={details.venue}
                onChange={handleChange}
                required
                style={{
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
              >
                <option value="" hidden>
                  Select Venue
                </option>
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
                style={{
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
              >
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>

              <TextField
                label="Club"
                name="club"
                variant="outlined"
                value={details.club || club}
                required
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                    "& input": { color: "white" },
                  },
                  "& .MuiInputLabel-root": { color: "#ADD8E6" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#87CEEB" },
                }}
              />

              <select
                name="category"
                value={details.category}
                onChange={handleChange}
                required
                style={{
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
              >
                <option value="" hidden>
                  Select Category
                </option>
                <option value="workshop">workshop</option>
                <option value="hackathon">hackathon</option>
                <option value="insights">insights</option>
                <option value="quiz">quiz</option>
                <option value="entertainment">entertainment</option>
              </select>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                style={{ color: "white" }}
              />
            </Box>

            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Button className="submit w-full mt-5" type="submit">
                Submit
              </Button>
            )}
          </form>
        </div>
      </div>
      <GradientLight />
    </div>
  );
}

export default Form;
