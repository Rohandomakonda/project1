import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Navbar.styles.css"

function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };

    window.addEventListener('scroll', handleScroll);
    checkAuthStatus(); // Check auth status on mount

    // Set an interval to refresh the authentication status every 100ms
    const interval = setInterval(() => {
      checkAuthStatus(); // Refresh authentication status
    }, 100);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await axios.post(
          'http://localhost:8080/api/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        alert("Logout successful");
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token and update state even if server request fails
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      navigate('/');
    }
  };

  return (
    <nav className={`navbar ${scrolling ? 'scrolled' : ''}`}>
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
        {isAuthenticated ? (
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
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
