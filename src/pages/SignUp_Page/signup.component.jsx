import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import axios from "axios"; // Assume 'api.js' handles axios configuration
import "./signup.css"; // Styling for SignUp
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", password: "", email: "",roles:["USER"],club: ""});
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1 for Registration, Step 2 for OTP Verification
  const [selectedOption,setSelectedOption] = useState("USER");
  const [pwd,setPwd]=useState(true);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.roles.includes("CLUB_SEC") && !formData.club) {
        alert("Please select a club.");
        return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", formData);
      alert("Registration successful! Check your email for the OTP.");
      setStep(2); // Move to the OTP Verification step
    } catch (error) {
      alert("Error during registration: " + error.response?.data?.message || error.message);
    }
  };

  const handleClubChange = (e) =>{
      setFormData({ ...formData, club: e.target.value });
      console.log(formData.club);
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
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
        alert("Verification successful!");
      }
      if(roles){
          console.log(roles);
           localStorage.setItem("name", name);
        localStorage.setItem("roles", JSON.stringify(roles));
        localStorage.setItem("club",club);
        localStorage.setItem("userId",userId);
        alert("registerd user type");
        navigate("/viewevents"); // Redirect to View Events page after verification

      }
    } catch (error) {
      alert("Error verifying OTP: " + error.response?.data?.message || error.message);
    }
  };

   const handleChange = (event) => {
      setSelectedOption(event.target.value);
      setFormData({ ...formData, roles: [event.target.value] }); // Update roles in formData
    }

  return (
    <div className="signup-container">
      {step === 1 ? (
        <form onSubmit={handleRegister} className="signup-form">
          <h2>Create an Account</h2>

           <TextField
           id="outlined-basic"
           label="Name"
           variant="outlined"
            type="text"
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
              type="button"
              className="toggle-visibility"
              onClick = {()=>{setPwd(!pwd)}}
          >
          {pwd ? <VisibilityOffIcon/> : <VisibilityIcon/> }
          </button>
          </div>
        <div className="email">
        <TextField
              id="outlined-basic"
              className="MuiTextField-root"
              label="Email"
              required
              variant="outlined"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
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

          <button className="submit" type="submit">Sign Up</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="signup-form">
          <h2>Verify Your Account</h2>
          <p>Please enter the OTP sent to your email address.</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
      )}
      <div className="login-link">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default SignUp;