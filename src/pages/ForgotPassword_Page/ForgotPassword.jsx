import React, { useState,useRef } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import axios from "axios";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CustomizedSnackbars from "../../components/SnackBarCustom.jsx";
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



const ForgotPassword = ({ setEmail, setStep }) => {
  const [emailInput, setEmailInput] = useState("");
 const [loading,setLoading] = useState(false);
    const [snackbarOpen,setSnackbarOpen] = useState(false);
    const [error,setError] = useState(false);
       const parallaxRef=useRef(null);
         const [otp, setOtp] = useState("");











  const handleSendOtp = () => {
   axios
     .post("http://localhost:8080/api/auth/forgotPassword", { email: emailInput }, {
       headers: {
         "Content-Type": "application/json", // Explicitly set the content type
       },
     })
     .then((response) => {
       console.log(response.data); // Log success response
       setEmail(emailInput);
        setLoading(false);
        setSnackbarOpen(false);
        setError(false);
       // Store the email
       setStep(2); // Navigate to the VerifyOTP component
     })
     .catch((error) => {
       console.error(error);
       alert("Error sending OTP. Please try again.");
     });

  };


  return (
      <div className="pt-[12rem] -mt-[5.25rem] flex items-center justify-center min-h-screen w-full">
               <div className="container relative w-full max-w-screen-lg flex justify-center items-center">
                 <div className="relative z-1 text-center">
                   <form
                     className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full max-w-[50rem]" // Increased max-width to 50rem
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
                     <h2 className="text-white text-xl font-bold mb-5">Forgot Password</h2>
                     <TextField
                       id="outlined-email"
                       className="MuiTextField-root pb-5"
                       label="Email"
                       required
                       variant="outlined"
                        onChange={(e) => setEmailInput(e.target.value)}
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
                     {loading ? (
                       <CircularProgress color="inherit" />
                     ) : (
                       <Button className="submit w-full mt-5" type="submit" onClick={handleSendOtp} >
                         Send OTP
                       </Button>
                     )}

                     <CustomizedSnackbars
                       open={snackbarOpen}
                       onClose={() => setSnackbarOpen(false)}
                       alertM={error ? "Login unsuccessful, please try again" : "Login successful"}
                       type={error ? "error" : "success"}
                     />
                   </form>
                 </div>
               </div>
               <GradientLight className="z-1 opacity-20" />
             </div>

  );
};

export default ForgotPassword;
