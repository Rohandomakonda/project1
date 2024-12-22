import React, { useState,useRef } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import axios from "axios";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CustomizedSnackbars from "../../components/SnackBarCustom.jsx";
import "./Login.css"
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







const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [pwd,setPwd] = useState(true);
  const [loading,setLoading] = useState(false);
  const [snackbarOpen,setSnackbarOpen] = useState(false);
  const [error,setError] = useState(false);
    const token = localStorage.getItem("authToken");
     const parallaxRef=useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       setLoading(true);
      const response = await axios.post("http://localhost:8080/api/auth/login", credentials);
      console.log(response.data.roles);
      const token = response.data.accessToken;
      const roles = response.data.roles;
      const name = response.data.name;
      const club=response.data.club;

       const userId=response.data.id;

      if (token && roles) {
        localStorage.setItem("roles", JSON.stringify(roles)); // Convert roles array to string
        console.log("json stringify " + JSON.stringify(roles));
        localStorage.setItem("authToken", token);
        localStorage.setItem("name",name);
        localStorage.setItem("club",club);
        localStorage.setItem("userId",userId);

       setSnackbarOpen(true); // Show success Snackbar
        setLoading(false);
        setError(false);
         setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      setSnackbarOpen(true);
      setError(true);

    }
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
         onSubmit={handleSubmit}
       >
         <h2 className="text-white text-xl font-bold mb-5">Login</h2>
         <TextField
           id="outlined-email"
           className="MuiTextField-root pb-5"
           label="Email"
           required
           variant="outlined"
           onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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

         {/* Add gap between the fields by giving margin bottom to email */}
         <div className="mt-5 relative">
           <TextField
             id="outlined-password"
             className="MuiTextField-root"
             label="Password"
             variant="outlined"
             type={pwd ? "password" : "text"}
             placeholder="Password"
             required
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
           {/* Password visibility toggle button */}
           <button
             type="button"
             className="toggle-visibility absolute right-2 top-2"
             onClick={() => setPwd(!pwd)}
           >
             {pwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
           </button>
         </div>


         {loading ? (
           <CircularProgress color="inherit" />
         ) : (
           <Button className="submit w-full mt-5" type="submit">
             Login
           </Button>
         )}

         <CustomizedSnackbars
           open={snackbarOpen}
           onClose={() => setSnackbarOpen(false)}
           alertM={error ? "Login unsuccessful, please try again" : "Login successful"}
           type={error ? "error" : "success"}
         />

         <div className="register-link mt-5">
           Don't have an account? <Link to="/register">Register</Link>
         </div>
         <div className="register-link">
           <Link to="/forgotPassword">Forgot Password?</Link>
         </div>
       </form>
     </div>
   </div>
   <GradientLight className="z-1 opacity-20" />
 </div>







  );
};

export default Login;
