import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("authToken");

  // If no token is found, redirect to the login page
  if (!token) {
    alert("Unauthorized! Please log in.");
    return <Navigate to="/login" />;
  }

  // Render the protected component if the token exists
  return children;
};

export default ProtectedRoute;
