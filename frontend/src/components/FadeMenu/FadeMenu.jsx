import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import axios from "axios";

export default function FadeMenu({setIsAuthenticated,setRoles}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
      const token = localStorage.getItem('authToken');
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
          alert("Logout successful");
          navigate('/');
        }
      } catch (error) {
        console.error('Logout error:', error);
        // Still remove token and update state even if server request fails
        localStorage.removeItem('authToken');
        localStorage.removeItem('roles');
        setIsAuthenticated(false);
        setRoles([]);
        navigate('/');
      }

        handleClose();
    };

    const handleAccount = () => {
        navigate("/myAccount");
        handleClose();
    }

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Profile
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >

        <MenuItem onClick={handleAccount}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}