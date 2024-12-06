import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import axios from "axios"; // Assume 'api.js' handles axios configuration
import "./signup.css"; // Styling for SignUp

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", password: "", email: "",roles:[]});
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1 for Registration, Step 2 for OTP Verification
  const [selectedOption,setSelectedOption] = useState("USER");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", formData);
      alert("Registration successful! Check your email for the OTP.");
      setStep(2); // Move to the OTP Verification step
    } catch (error) {
      alert("Error during registration: " + error.response?.data?.message || error.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/verify", {
        email: formData.email, // Use the registered email
        otp, // OTP entered by the user
      });
      const token = response.data.accessToken; // Assuming the response includes an accessToken
      const roles = response.data.roles;

      if (token) {
        localStorage.setItem("authToken", token);
        alert("Verification successful!");
      }
      if(roles){
        localStorage.setItem("roles", JSON.stringify(roles)); // Convert roles array to string
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
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
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

          <button type="submit">Sign Up</button>
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
