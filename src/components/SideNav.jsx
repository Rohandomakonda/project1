import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../appStore.jsx";
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: 'black',
    '& .MuiDrawer-paper': {
      backgroundColor: 'black',
      ...openedMixin(theme),
      ...(open === false && closedMixin(theme)),
    },
  })
);

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: 'black',
  color: 'white',
  zIndex: theme.zIndex.drawer + 1,
}));

export default function SideNav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [viewOpen, setViewOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);  // State for Menu anchor element
  const open = useAppStore((state) => state.dopen); // Get Drawer state from AppStore
  const setOpen = useAppStore((state) => state.updateOpen); // Function to toggle the Drawer state
  const token = localStorage.getItem('authToken');
  const roles = localStorage.getItem("roles");

  const toggleView = () => setViewOpen(!viewOpen);
  const toggleAdd = () => setAddOpen(!addOpen);

  const handleDrawerToggle = () => {
    setOpen(!open); // Toggle the open state of the Drawer
  };

  const handleLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleProfile = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear authToken
    localStorage.removeItem('roles');      // Clear user roles (if needed)
    navigate("/login"); // Navigate to login page
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu on avatar click
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar with black background and white text */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle} // Trigger Drawer toggle when the icon is clicked
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Nitw Events {/* Change this title as per your request */}
          </Typography>

          {/* Conditional Rendering for Avatar/Login */}
          {token ? (
            <IconButton onClick={handleAvatarClick} sx={{ ml: 'auto' }}>
              <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={handleLogin} sx={{ ml: 'auto' }}>
              Login
            </Button>
          )}

          {/* Avatar dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer with black background and white text */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{ color: 'white' }} /> : <ChevronLeftIcon sx={{ color: 'white' }} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => navigate("/")}>
              <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                <ListItemIcon>
                  <HomeIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['About'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => navigate("/about")}>
              <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                <ListItemIcon>
                  <InfoIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        {/* View Section */}
        <List>
          <ListItemButton onClick={toggleView}>
            <ListItemText primary="View" sx={{ color: 'white' }} />
            {viewOpen ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
          </ListItemButton>
          {viewOpen && (
            <>
              <List>
                {['Events'].map((text) => (
                  <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => navigate("/viewevents")}>
                    <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                      <ListItemIcon>
                        <InfoIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{ color: 'white' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <List>
                {['Recruitment'].map((text) => (
                  <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => navigate("/viewRecruitments")}>
                    <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                      <ListItemIcon>
                        <InfoIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{ color: 'white' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <List>
                {['Clubs'].map((text) => (
                  <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => navigate("/viewclubs")}>
                    <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                      <ListItemIcon>
                        <InfoIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{ color: 'white' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </List>
        <Divider />

        {/* Add Section (Only for CLUB_SEC or ADMIN) */}
        {token && (roles.includes("CLUB_SEC") || roles.includes("ADMIN")) && (
          <List>
            <ListItemButton onClick={toggleAdd}>
              <ListItemText primary="Add" sx={{ color: 'white' }} />
              {addOpen ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
            </ListItemButton>
            {addOpen && (
              <>
                <List>
                  {['Events'].map((text) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => navigate("/addevent")}>
                      <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                        <ListItemIcon>
                          <InfoIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ color: 'white' }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <List>
                  {['Recruitment'].map((text) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => navigate("/recruitments")}>
                      <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                        <ListItemIcon>
                          <InfoIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ color: 'white' }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </List>
        )}
      </Drawer>
    </Box>
  );
}
