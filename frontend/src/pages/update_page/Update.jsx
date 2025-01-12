
import { useParams, useNavigate,Link } from "react-router-dom";
import axios from "axios";
//import "./Update.styles.css";
import CircularProgress from "@mui/material/CircularProgress";
import CustomizedSnackbars from "../../components/SnackBarCustom.jsx";
import TextField from '@mui/material/TextField';


import React, { useState, useEffect,useRef } from "react";



import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';

import Alert from '@mui/material/Alert';


import "../LoginPage/Login.css"
import { benefits } from "../../constants";
import { curve, heroBackground, robot } from "../../assets";

import { Box } from "@mui/material"; // Import Box and Button from MUI
import Section from "../../components/Section.jsx";
import Button from"../../components/Button";
import { BackgroundCircles, BottomLine, Gradient } from "../../components/design/Hero";
import { heroIcons } from "../../constants";
import { ScrollParallax } from "react-just-parallax";

import { GradientLight } from "../../components/design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";

import cardImage from "../../assets/benefits/card-6.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function Update() {
  const { id } = useParams(); // Extract id from URL
  const navigate = useNavigate(); // For navigation after update
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Manage Snackbar visibility

    const [error,setError] = useState(false);

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
    console.log(token);
    axios
      .get(`http://localhost:8765/api/events/getEvent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const event = response.data;
        console.log(event.description);
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

    // Log details.description when details state changes
    useEffect(() => {
      console.log("Updated Details Description:", details.description);
    }, [details]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submit behavior
    setLoading(true);

    const token = localStorage.getItem("authToken");

    axios
      .put(`http://localhost:8765/api/events/updateEvent/${id}`, details, {
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
                        Update Event
                      </Typography>


                       <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                         <TextField
                           label="Title"
                           required
                           variant="outlined"
                           value={details.title}
                           onChange={handleChange}
                           name="title"
                           sx={{
                               mt:4,
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
                          value = {details.description}
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
                           value = {details.venueDescription}
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
                           value={details.club }
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


                       </Box>

                       {loading ? (
                         <CircularProgress color="inherit" />
                       ) : (
                         <Button className="submit w-full mt-5" type="submit">
                           Update Event
                         </Button>
                       )}
                     </form>
                   </div>
                 </div>
                 <GradientLight/>
               </div>





//
//
//
//
//     <div className="form-container">
//       <h1 className="form-title">Update Event</h1>
//       <form onSubmit={handleSubmit} className="event-form">
//         <input
//           type="text"
//           onChange={handleChange}
//           placeholder="Title"
//           name="title"
//           value={details.title}
//           required
//           className="form-input"
//         />
//         <textarea
//           type="text"
//           onChange={handleChange}
//           placeholder="Description"
//           name="description"
//           value={details.description}
//           required
//           className="form-textarea"
//         />
//         <input
//           type="date"
//           onChange={handleChange}
//           name="date"
//           value={details.date}
//           required
//           className="form-input"
//         />
//         <input
//           type="time"
//           onChange={handleChange}
//           name="time"
//           value={details.time}
//           required
//           className="form-input"
//         />
//         <input
//           type="text"
//           onChange={handleChange}
//           placeholder="Venue Description"
//           name="venueDescription"
//           value={details.venueDescription}
//           required
//           className="form-input"
//         />
//         <select
//           className="form-select"
//           onChange={handleChange}
//           name="venue"
//           value={details.venue}
//         >
//           <option value="">Select Venue</option>
//           <option value="Department of Computer Science and Engineering">
//             CSE dept
//           </option>
//           <option value="New Academic Building (NAB)">NAB</option>
//           <option value="Electronic & ICT Academy">E&ICT Building</option>
//           <option value="Department Of Electrical & Electronic Engineering">
//             Electrical Dept
//           </option>
//           <option value="Dr. B.R. Ambedkar Learning centre">ALC</option>
//         </select>
//
//         <select
//           className="form-select"
//           onChange={handleChange}
//           name="isPublic"
//           value={details.isPublic !== undefined ? details.isPublic.toString() : ""}
//         >
//           <option value="">Select Event Type</option>
//           <option value="false">Private</option>
//           <option value="true">Public</option>
//         </select>
//
//         <input
//           type="text"
//           onChange={handleChange}
//           placeholder="Club"
//           name="club"
//           value={details.club}
//           required
//           className="form-input"
//         />
//
//         {loading ? (
//           <CircularProgress disableShrink />
//         ) : (
//           <button type="submit" className="submit-button">
//             Update Event
//           </button>
//         )}
//       </form>
//       {/* Snackbar Component */}
//       <CustomizedSnackbars
//         open={snackbarOpen}
//         onClose={() => setSnackbarOpen(false)}
//         alertM={"Event updated successfully"}
//         type={"success"}
//       />
//     </div>
  );
}

export default Update;
