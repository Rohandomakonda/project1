import React, { useState } from "react";
import api from "../api";
import "./signup.css"
const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", formData);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("user registration unsuccessfull" + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
