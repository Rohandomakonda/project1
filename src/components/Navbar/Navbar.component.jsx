import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.styles.css";

function Navbar() {
  const [scrolling, setScrolling] = useState(false);

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true); // Add the 'scrolled' class when user scrolls down
    } else {
      setScrolling(false); // Remove the class when back at the top
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
        <li><Link to="/profile">profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
