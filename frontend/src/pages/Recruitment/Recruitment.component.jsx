import axios from "axios";
import React, { useState, useEffect,useRef } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation

import TextField from '@mui/material/TextField';

import CircularProgress from '@mui/material/CircularProgress';

import "../LoginPage/Login.css"
import { benefits } from "../../constants";


import { Box } from "@mui/material"; // Import Box and Button from MUI

import Button from"../../components/Button";


import { GradientLight } from "../../components/design/Benefits";




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
 const [loading,setLoading] = useState(false);
  const [snackbarOpen,setSnackbarOpen] = useState(false);
    const [error,setError] = useState(false);
     const token = localStorage.getItem("authToken");
     const API_BASE_URL = import.meta.env.VITE_API;
   
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
console.log(details);

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
      return;
    }

    axios
      .post(`${API_BASE_URL}/recruitments/postRecruitment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        alert("Added Recruitment successfully");
        navigate("/viewRecruitments");
      })
      .catch((error) => {
        console.error("Error sending recruitment details:", error);
        alert("Recruitment not added");
      });
  };

  const change = (e) => {
    const { name, value } = e.target;
    console.log(name);
        setDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
    console.log(details);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
                    <h2 className="text-white text-4xl font-bold transform translate-x-[-30px]">Add Recruitment</h2>



                       <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                         <TextField
                           label="Title"
                           name="title"
                           required
                           variant="outlined"
                           onChange={change}
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
                          name="Description"
                          multiline
                          rows={4} // Set the number of rows for the text area
                          onChange={change}
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
                           onChange={change}
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
                           onChange={change}
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
                           required
                           variant="outlined"
                            name="venueDescription"
                           onChange={change}
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
                           onChange={change}
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

                         <TextField
                                              label="Club"
                                              variant="outlined"
                                              value={details.club || club}
                                              required
                                              name="club"
                                              onChange={change}
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
                            label="google link"
                            variant="outlined"
                            required
                            name="formLink"
                            onChange={change}
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
                           Add Recruitment
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
//
//
//
//     <div className="form-container">
//       <h1 className="form-title">Add Recruitment</h1>
//       <form onSubmit={handleSubmit} className="event-form">
//         <input
//           type="text"
//           onChange={change}
//           placeholder="Title"
//           name="title"
//           value={details.title}
//           required
//           className="form-input"
//         />
//         <textarea
//           onChange={change}
//           placeholder="Description"
//           name="description"
//           value={details.description}
//           required
//           className="form-textarea"
//         />
//         <input
//           type="date"
//           onChange={change}
//           name="date"
//           value={details.date}
//           required
//           className="form-input"
//         />
//         <input
//           type="time"
//           onChange={change}
//           name="time"
//           value={details.time}
//           required
//           className="form-calendar"
//         />
//         <input
//           type="text"
//           onChange={change}
//           placeholder="Venue-description"
//           name="venueDescription"
//           value={details.venueDescription}
//           required
//           className="form-input"
//         />
//         <select
//           className="form-select"
//           onChange={change}
//           name="venue"
//           id="venue"
//         >
//           <option value="" hidden>
//             Select Venue
//           </option>
//           <option value="Department of Computer Science and Engineering">CSE dept</option>
//           <option value="New Academic Building (NAB)">NAB</option>
//           <option value="Electronic & ICT Academy">E&ICT Building</option>
//           <option value="Department Of Electrical & Electronic Engineering">Electrical Dept</option>
//           <option value="Dr. B.R. Ambedkar Learning centre">ALC</option>
//         </select>
//         <input
//           type="text"
//           onChange={change}
//           placeholder="Club presenting"
//           name="club"
//           value={details.club || club}
//           required
//           className="form-input"
//           readOnly={role === "CLUB_SEC"} // Disable the input if the role is CLUB_SEC
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           required
//         />
//         <input
//           type="text"
//           onChange={change}
//           placeholder="Paste the google form link"
//           name="formLink"
//           value={details.formLink}
//           required
//           className="form-input"
//         />
//         <button type="submit" className="submit-button">
//           Add Recruitment
//         </button>
//       </form>
//     </div>
  );
}

export default Recruitment;
