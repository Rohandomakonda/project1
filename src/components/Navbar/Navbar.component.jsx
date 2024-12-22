import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import "./Navbar.styles.css";
import Avatar from '@mui/material/Avatar';
import FadeMenu from "../FadeMenu/FadeMenu.jsx";
import CustomizedSnackbars from "../SnackBarCustom.jsx";

function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const [snackbarOpen,setSnackbarOpen] = useState(false);

  const token = localStorage.getItem('authToken');
  const name = localStorage.getItem('name');
  console.log(name);
  useEffect(() => {
    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles)); // Parse roles from localStorage
    }

    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    const checkAuthStatus = () => {
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
  }, [token]);

//    useEffect(()=>{
//         alert("snackbarOpen "+snackbarOpen);
//
//    },[snackbarOpen]);
  const handleLogout = async () => {
    try {
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
        localStorage.removeItem('roles'); // Clear roles on logout
        setIsAuthenticated(false);
        setRoles([]);
        setSnackbarOpen(true); // Show success Snackbar
        setLoading(false);
        setError(false);
        setTimeout(() => navigate("/"), 3000);
        alert("Logout successful");

      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token and update state even if server request fails
      localStorage.removeItem('authToken');
      localStorage.removeItem('roles');
      setIsAuthenticated(false);
      setRoles([]);
      setSnackbarOpen(true); // Show success Snackbar
      setLoading(false);
      setError(true);
      setTimeout(() => navigate("/"), 3000);
    }
  };

     function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
      };

      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      };

    const handleMenu=()=>{


    }

  return (
    <nav className={`navbar ${scrolling ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">NITW Events</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {token && <li><Link to="/viewevents">View Events</Link></li>}
        {token && <li><Link to="/viewRecruitments">View Recruitments</Link></li>}

        {/* Check if the role includes CLUB_SEC or ADMIN */}
        {token && (roles.includes("CLUB_SEC") || roles.includes("ADMIN")) && <li><Link to="/addevent">Add Events</Link></li>}
        {token && (roles.includes("CLUB_SEC") || roles.includes("ADMIN")) && <li><Link to="/recruitments">Add Recruitments</Link></li>}
        {token && (roles.includes("USER") ) && <li><Link to="/getallsavedevents">Saved Events</Link></li>}
         {token && (roles.includes("USER") ) && <li><Link to="/getalllikedevents">Favourite Events</Link></li>}
        {token && <li><Link to="/viewclubs">View clubs</Link></li>}
      </ul>
      <ul className="navbar-profile">
        {isAuthenticated ? (
          <li onClick={handleMenu}>
           <Avatar {...stringAvatar("abhiraj d ")} />
           <div className="Profile">
           <FadeMenu setIsAuthenticated={setIsAuthenticated} setRoles={setRoles}/>
           </div>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      <CustomizedSnackbars
       open={snackbarOpen}
       onClose={() => setSnackbarOpen(false)}
        alertM={error ? "Logout unsuccessful pls try again" : "Logout successful"}
        type={error ? "error" : "success"}
        />
    </nav>
  );
}

export default Navbar;
