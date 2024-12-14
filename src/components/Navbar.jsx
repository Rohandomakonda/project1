import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import {useAppStore} from "../appStore.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));


export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [roles, setRoles] = useState([]);
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const [snackbarOpen,setSnackbarOpen] = useState(false);
  const updateOpen = useAppStore((state)=>state.updateOpen);
  const dopen = useAppStore((state)=>state.dopen);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  console.log("token is " + token);

  React.useEffect(()=>{
      {token ? setAuth(true) : setAuth(false)}
  },[token])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      navigate('/profile');
    setAnchorEl(null);
  };

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
          setAuth(false);
          setRoles([]);
          setSnackbarOpen(true); // Show success Snackbar
          setLoading(false);
          setError(false);
          setTimeout(() => navigate("/"), 3000);
          alert("Logout successful");
          setAnchorEl(null);

        }
      } catch (error) {
        console.error('Logout error:', error);
        // Still remove token and update state even if server request fails
        localStorage.removeItem('authToken');
        localStorage.removeItem('roles');
        setAuth(false);
        setRoles([]);
        setSnackbarOpen(true); // Show success Snackbar
        setLoading(false);
        setError(true);
        setTimeout(() => navigate("/"), 3000);
      }
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,cursor: 'pointer' }} onClick={()=>navigate("/")}>
            NITW Events
          </Typography>
          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ):(<button onClick={()=>navigate("/login")}> Login in </button>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}