import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import axios from "axios"; // Assume 'api.js' handles axios configuration
import "./Login.css"; // Styling for Login

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", credentials);
      const token = response.data.accessToken;

      if (token) {
        localStorage.setItem("authToken", token);
        alert("Login successful!");
        window.location.reload();
        navigate("/"); // Redirect to Home
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
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
