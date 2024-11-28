import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.styles.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const navigate=useNavigate();
  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true); // Add the 'scrolled' class when user scrolls down
    } else {
      setScrolling(false); // Remove the class when back at the top
    }
  };
  const handleLogout = (e) => {
    // Remove the auth token from localStorage (or sessionStorage)
    localStorage.removeItem("authToken");

    // Optional: Send a logout request to the server to clear the session or invalidate the token
    const token = localStorage.getItem("authToken");
    if (token) {
      axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Logged out successfully");
        // Optionally navigate to login page after logout
        window.location.href = "/login";
      })
      .catch((error) => {
        alert("Error logging out: " + error.message);
      });
    }
  };


  useEffect(() => {
    // Set up event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener when component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const token=localStorage.getItem("authToken");

  return (
    <nav className={`navbar ${scrolling ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <Link to="/">NITW Events</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/viewevents">View Events</Link></li>
        <li><Link to="/addevent">Add Events</Link></li>
        <li><Link to="/recruitments">Recruitments</Link></li>
      </ul>
      <ul className="navbar-profile">
        {token ? (
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>

    </nav>
  );
}

export default Navbar;
