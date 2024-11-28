import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios" // Assume 'api.js' handles axios configuration
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", credentials);
      const token = response.data.accessToken;

      // Store the token in localStorage
      if (token) {
        localStorage.setItem("authToken", token);
        alert("Login successful!");
        navigate("/");  // Redirect to Home
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login unsuccessful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
