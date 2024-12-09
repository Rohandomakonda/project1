import React, { useState,useRef } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import axios from "axios"; // Assume 'api.js' handles axios configuration
import "./Login.css"; // Styling for Login
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CustomizedSnackbars from "../../components/SnackBarCustom.jsx";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [pwd,setPwd] = useState(true);
  const [loading,setLoading] = useState(false);
  const [snackbarOpen,setSnackbarOpen] = useState(false);

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
         setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login unsuccessful!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <TextField
              id="outlined-basic"
              className="MuiTextField-root"
              label="Email"
              required
              variant="outlined"
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <div className="password-container">
        <TextField
         id="outlined-basic"
         className="MuiTextField-root"
         label="password"
         variant="outlined"
          type={pwd ? "password" : "text"}
          placeholder="Password"
          required
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button
            type="button"
            className="toggle-visibility"
            onClick = {()=>{setPwd(!pwd)}}
        >
        {pwd ? <VisibilityOffIcon/> : <VisibilityIcon/> }
        </button>
        </div>


       {loading ? <CircularProgress color="inherit" /> : <button className="submit" type="submit">Login</button>}
       <CustomizedSnackbars
               open={snackbarOpen}
               onClose={() => setSnackbarOpen(false)}
               alertM={"Login successfull"}
               type={"success"}
             />
      </form>
      <div className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
      <div className="register-link">
         <Link to="/forgotPassword">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
