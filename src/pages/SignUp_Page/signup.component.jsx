import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

 import axios from 'axios'// Assume 'api.js' handles axios configuration
import "./signup.css";  // Styling for SignUp

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", password: "", email: "" });
  const navigate = useNavigate();  // To navigate to different routes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to register the user
      const response = await axios.post("http://localhost:8080/api/auth/register", formData);

      // Assuming registration is successful, store the access token and navigate
      const token = response.data.accessToken;  // Assuming the response includes an access token

      if (token) {
        // Store token in localStorage
        localStorage.setItem("authToken", token);

        // Navigate to the viewevents page after successful registration
        alert("Registration successful!");
        navigate("/viewevents");  // Redirect to View Events page
      }
    } catch (error) {
      alert("Error adding user: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
