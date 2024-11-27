import React, { useState } from "react";
import api from "../api";
import "./signup.css"
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", password: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
   axios
               .post("http://localhost:8080/api/auth/register", formData)
               .then((resp) => {
                   console.log(resp.data);
                   alert("User added successfully!");
               })
               .catch((error) => {
                   alert("Error adding User: " + error);
               });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
