import React, { useState } from "react";
import api from "../api.jsx";
import "./Login.css"
const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", credentials);
      localStorage.setItem("authToken", response.data);
      alert("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login Unsuccessful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
