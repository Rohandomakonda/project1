import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.styles.css";

function Navbar() {
  return (
    <nav className="navbar">
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
