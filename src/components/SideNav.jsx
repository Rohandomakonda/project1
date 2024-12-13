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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import {useNavigate} from "react-router-dom";
import {useAppStore} from "../appStore.jsx";

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




const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })((
  { theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  backgroundColor: 'black',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        backgroundColor: 'black',
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

export default function SideNav() {
  const theme = useTheme();
 // const [open, setOpen] = React.useState(true);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const navigate = useNavigate();
 // const setOpen = useAppStore((state)=>state.updateOpen);
  const open = useAppStore((state)=>state.dopen);
  const token = localStorage.getItem('authToken');
  const roles = localStorage.getItem("roles");

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };
//
//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

  const toggleView = () => setViewOpen(!viewOpen);
  const toggleAdd = () => setAddOpen(!addOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick = {()=>navigate("/")}>
              <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                  <ListItemIcon>
                      <HomeIcon/>
                   </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
                <List>
                  {['About'].map((text) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick = {()=>navigate("/about")}>
                      <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                          <ListItemIcon>
                              <InfoIcon/>
                           </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
        <Divider />
        <List>
          <ListItemButton onClick={toggleView}>
            <ListItemText primary="View" />
            {viewOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          {viewOpen && (
              <>
                <List>
                  {['Events'].map((text) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick = {()=>navigate("/viewevents")}>
                      <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                          <ListItemIcon>
                              <InfoIcon/>
                           </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <List>
                  {['Recruitment'].map((text) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick = {()=>navigate("/viewRecruitments")}>
                      <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                          <ListItemIcon>
                              <InfoIcon/>
                           </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <List>
                  {['Clubs'].map((text) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick = {()=>navigate("/viewclubs")}>
                      <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                          <ListItemIcon>
                              <InfoIcon/>
                           </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                </>
          )}
        </List>
        <Divider />
            {token && (roles.includes("CLUB_SEC") || roles.includes("ADMIN")) &&
        <List>
          <ListItemButton onClick={toggleAdd}>
            <ListItemText primary="Add" />
            {addOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          {addOpen && (
              <>
                <List>
                  {['Events'].map((text) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick = {()=>navigate("/addevent")}>
                      <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                          <ListItemIcon>
                              <InfoIcon/>
                           </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <List>
                  {['Recruitment'].map((text) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick = {()=>navigate("/recruitments")}>
                      <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                          <ListItemIcon>
                              <InfoIcon/>
                           </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                </>
          )}
        </List>
        }
      </Drawer>
    </Box>
  );
}
