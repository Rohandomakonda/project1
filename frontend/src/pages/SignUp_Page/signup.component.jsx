import React, { useState,useRef } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import axios from "axios"; // Assume 'api.js' handles axios configuration

import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import CustomizedSnackbars from "../../components/SnackBarCustom.jsx";



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

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", password: "", email: "",roles:["USER"],club: ""});
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1 for Registration, Step 2 for OTP Verification
  const [selectedOption,setSelectedOption] = useState("USER");
  const [pwd,setPwd]=useState(true);
  const [loading,setLoading] = useState(false);
  const [snackbarOpen,setSnackbarOpen] = useState(false);
  const [error,setError] = useState(false);
   const parallaxRef=useRef(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();
    setLoading(true);
    if (formData.roles.includes("CLUB_SEC") && !formData.club) {
        alert("Please select a club.");
        setLoading(false);
        return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", formData);
     // alert("Registration successful! Check your email for the OTP.");
      setSnackbarOpen(true); // Show success Snackbar
      setLoading(false);
      setError(false);
      setTimeout(() => null, 1500);
      setStep(2); // Move to the OTP Verification step
    } catch (error) {
      setLoading(false);
       setSnackbarOpen(true);
        setError(true);
    }
  };

  const handleClubChange = (e) =>{
      setFormData({ ...formData, club: e.target.value });
      console.log(formData.club);
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/api/auth/verify", {
        email: formData.email, // Use the registered email
        otp, // OTP entered by the user
      });
       const name=response.data.name;
      const token = response.data.accessToken; // Assuming the response includes an accessToken
      const roles = response.data.roles;
      const club = response.data.club;
      const userId= response.data.id;

      if (token) {
        localStorage.setItem("authToken", token);
       // alert("Verification successful!");
      }
      if(roles){
          console.log(roles);
           localStorage.setItem("name", name);
        localStorage.setItem("roles", JSON.stringify(roles));
        localStorage.setItem("club",club);
        localStorage.setItem("userId",userId);
        setSnackbarOpen(true); // Show success Snackbar
        setLoading(false);
        setError(false);
        //alert("registerd user type");
         setTimeout(() => navigate("/viewevents"), 3000);
      }
    } catch (error) {
        setSnackbarOpen(true); // Show success Snackbar
        setLoading(false);
        setError(true);
     // alert("Error verifying OTP: " + error.response?.data?.message || error.message);
    }
  };

   const handleChange = (event) => {
      setSelectedOption(event.target.value);
      setFormData({ ...formData, roles: [event.target.value] }); // Update roles in formData
    }

  return (
      <div className="pt-[12rem] -mt-[5.25rem] flex items-center justify-center min-h-screen w-full">
         <div className="container relative w-full max-w-screen-lg flex justify-center items-center">
           <div className="relative z-1 text-center">


              {step === 1 ? (
                      <form onSubmit={handleRegister}  className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full max-w-[50rem]" // Increased max-width to 50rem
                            style={{
                            backgroundImage: `url(${benefits[2].backgroundUrl})`,
                             display: "flex",
                             flexDirection: "column",
                               padding: "1rem",
                               boxSizing: "border-box",
                                 borderRadius: "8px", // Optional: Add rounded corners for better aesthetics
                                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add slight transparency
                            }}
                                >
                       <h2 className="text-white text-xl font-bold mb-5">Register</h2>

                     {/* Email TextField */}
                     {/* Email TextField */}
                     <TextField
                       id="outlined-email"
                       className="MuiTextField-root"
                       label="Email"
                       required
                       variant="outlined"
                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                       sx={{
                         "& .MuiOutlinedInput-root": {
                           "& fieldset": {
                             borderColor: "white",
                           },
                           "&:hover fieldset": {
                             borderColor: "white",
                           },
                           "&.Mui-focused fieldset": {
                             borderColor: "white",
                           },
                           "& input": {
                             color: "white",
                           },
                         },
                         "& .MuiInputLabel-root": {
                           color: "#ADD8E6",
                         },
                         "& .MuiInputLabel-root.Mui-focused": {
                           color: "#87CEEB",
                         },
                         marginBottom: "1.5rem", // Explicit margin for spacing
                       }}
                     />

                     {/* Name TextField */}
                     <TextField
                       id="outlined-name"
                       className="MuiTextField-root"
                       label="Name"
                       required
                       variant="outlined"
                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                       sx={{
                         "& .MuiOutlinedInput-root": {
                           "& fieldset": {
                             borderColor: "white",
                           },
                           "&:hover fieldset": {
                             borderColor: "white",
                           },
                           "&.Mui-focused fieldset": {
                             borderColor: "white",
                           },
                           "& input": {
                             color: "white",
                           },
                         },
                         "& .MuiInputLabel-root": {
                           color: "#ADD8E6",
                         },
                         "& .MuiInputLabel-root.Mui-focused": {
                           color: "#87CEEB",
                         },
                       }}
                     />



                        <div className="mt-5 relative">
                        <TextField
                          id="outlined-password"
                                      className="MuiTextField-root"
                                      label="Password"
                                      variant="outlined"
                                      type={pwd ? "password" : "text"}
                                      placeholder="Password"
                                      required
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          sx={{
                                         "& .MuiOutlinedInput-root": {
                                           "& fieldset": {
                                             borderColor: "white", // White outline
                                           },
                                           "&:hover fieldset": {
                                             borderColor: "white", // White outline on hover
                                           },
                                           "&.Mui-focused fieldset": {
                                             borderColor: "white", // White outline when focused
                                           },
                                           "& input": {
                                             color: "white", // White text color inside the input
                                           },
                                         },
                                         "& .MuiInputLabel-root": {
                                           color: "#ADD8E6", // Light bluish color for the label
                                         },
                                         "& .MuiInputLabel-root.Mui-focused": {
                                           color: "#87CEEB", // Slightly darker bluish color when focused
                                         },
                                       }}
                        />
                        <button
                            type="button"
                              className="toggle-visibility absolute right-2 top-2"
                            onClick = {()=>{setPwd(!pwd)}}
                        >
                        {pwd ? <VisibilityOffIcon/> : <VisibilityIcon/> }
                        </button>
                        </div>

                        <label>
                          <input
                            type="radio"
                            value="USER"
                            checked={selectedOption === "USER"}
                            onChange={handleChange}
                          />
                          <span></span>
                          User
                        </label>

                        <label>
                          <input
                            type="radio"
                            value="CLUB_SEC"
                            checked={selectedOption === "CLUB_SEC"}
                            onChange={handleChange}
                          />
                          <span></span>
                          Club Sec
                        </label>

                        <label>
                          <input
                            type="radio"
                            value="ADMIN"
                            checked={selectedOption === "ADMIN"}
                            onChange={handleChange}
                          />
                          <span></span>
                          Admin
                        </label>

                        {selectedOption==="CLUB_SEC" ? (
                      <select
                        name="club"
                        club={formData.club}
                        onChange={handleClubChange}
                        required
                      >
                        <option value="" hidden>Select Club</option>
                        <option value="MECHE">MECHE</option>
                        <option value="CSES">CSES</option>
                        <option value="SDC">SDC</option>
                        <option value="QC">QC</option>
                      </select>

                        ) : (null) }
                        {loading ? <CircularProgress color="inherit" /> : <Button  type="submit">Sign Up</Button>}
                     <CustomizedSnackbars
                      open={snackbarOpen}
                      onClose={() => setSnackbarOpen(false)}
                      alertM={error ? "registration unsuccessful" : "OTP is being sent to your email"}
                      type={error ? "error" : "success"}
                      />
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOtp}  className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full max-w-[50rem]" // Increased max-width to 50rem
                                                                                   style={{
                                                                                   backgroundImage: `url(${benefits[2].backgroundUrl})`,
                                                                                    display: "flex",
                                                                                    flexDirection: "column",
                                                                                      padding: "1rem",
                                                                                      boxSizing: "border-box",
                                                                                        borderRadius: "8px", // Optional: Add rounded corners for better aesthetics
                                                                                         backgroundColor: "rgba(0, 0, 0, 0.5)",}}>
                        <h2 className="text-white text-xl font-bold mb-5">Verify Your Account</h2>
                        <p className="text-white text-xl font-bold mb-5">Please enter the OTP sent to your email address.</p>
                        <TextField
                          id="outlined-email"
                                     className="MuiTextField-root pb-5"
                                     label="OTP"
                                     required
                                     variant="outlined"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          sx={{
                                       "& .MuiOutlinedInput-root": {
                                         "& fieldset": {
                                           borderColor: "white", // White outline
                                         },
                                         "&:hover fieldset": {
                                           borderColor: "white", // White outline on hover
                                         },
                                         "&.Mui-focused fieldset": {
                                           borderColor: "white", // White outline when focused
                                         },
                                         "& input": {
                                           color: "white", // White text for input
                                         },
                                       },
                                       "& .MuiInputLabel-root": {
                                         color: "#ADD8E6", // Bluish color for the label
                                       },
                                       "& .MuiInputLabel-root.Mui-focused": {
                                         color: "#87CEEB", // Bluish color when focused
                                       },
                                     }}

                        />

                        {loading ? <CircularProgress color="inherit" /> : <Button type="submit">Verify</Button>}
                        <CustomizedSnackbars
                                open={snackbarOpen}
                                onClose={() => setSnackbarOpen(false)}
                                alertM={error ? "Incorrect OTP pls type again" : "registration successfully completed"}
                                type={error ? "error" : "success"}
                         />
                      </form>
                    )}

           </div>
         </div>
         <GradientLight className="z-1 opacity-20" />
       </div>

  );
};

export default SignUp;