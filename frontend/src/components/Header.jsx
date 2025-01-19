import "./init.jsx";
import * as React from 'react';
import { brainwave } from "../assets";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react"; // Correct import for useState
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import Avatar from "@mui/material/Avatar";
import { HamburgerMenu } from "./design/Header";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import useWebSocket from "../customhooks/useWebSocket.jsx";
import axios from "axios";
import CustomizedSnackbars from "./SnackBarCustom.jsx";
import Menu from '@mui/material/Menu';
import CustomMenu from './Menu.jsx';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Divider from '@mui/material/Divider';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { unstable_useEnhancedEffect } from '@mui/material';



const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const { pathname, hash } = useLocation();
  const [scrolling, setScrolling] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [roles, setRoles] = useState(() => {
    const storedRoles = localStorage.getItem("roles");
    return storedRoles ? JSON.parse(storedRoles) : [];
  });
  const [token,setToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();
   const [unseenEventsCount, setUnseenEventsCount] = useState(0);
 const [unseenEvents, setUnseenEvents] = useState([]);
  const [error, setError] = useState(false); // Add this
 const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {

      // Create SockJS connection
      const socket = new SockJS("http://localhost:8086/ws");

      // Create STOMP client and connect
      const stompClient = new Client({
        webSocketFactory: () => socket, // Use SockJS connection as the WebSocket connection
        reconnectDelay: 5000, // Reconnect after 5 seconds if disconnected
        onConnect: () => {
          console.log("Connected to WebSocket");
            // Subscribe to the notifications topic for this user
            stompClient.subscribe(`/topic/notifications`, (message) => {
              console.log("Broadcast notification received:", message.body);
              setUnseenEventsCount((prev) => prev + 1);
               setUnseenEvents((prev) => [
                  ...prev,
                  {  msg: message.body }, // Adding message body with a unique id
                ]);



            });
        },
        onDisconnect: () => {
          console.log("Disconnected from WebSocket");
        },
        onStompError: (error) => {
          console.error("WebSocket error:", error);
        },
      });

      stompClient.activate(); // Activate the STOMP client to start receiving messages
      // Cleanup on component unmount
      return () => {
        stompClient.deactivate();
      };
    }, []);

    useEffect(()=>{
        console.log("unseenEventsCount is "+unseenEventsCount);
         console.log(unseenEvents);
         setToken(localStorage.getItem("authToken"));

    },[unseenEventsCount])

const handlenavigatelogin=()=>{
     console.log("hello1");
    navigate("/login");
    console.log("hello2");
    setToken(localStorage.getItem("authToken"));
    console.log(token);
    }

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
    } else {
      setOpenNavigation(true);
    }
  };
  const handleClick = () => {
    setOpenNavigation(false);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  // const [loading, setLoading] = useState(false); // Add this

const handleLogout = async () => {
  try {
    if (token) {
   // Indicate loading state
      await axios.post(
        "http://localhost:8765/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.clear();
      setIsAuthenticated(false);
      setRoles([]);
      setSnackbarOpen(true); // Show success snackbar
      setError(false);
      setToken(null);
      setTimeout(() => navigate("/"), 1500); // Redirect after logout
    }
  } catch (error) {
    console.error("Logout error:", error);
    // Handle logout even if server request fails
    localStorage.removeItem("authToken");
    localStorage.removeItem("roles");
    setIsAuthenticated(false);
    setRoles([]);
    setSnackbarOpen(true); // Show error snackbar
   // setLoading(false);
    setError(true);
    setTimeout(() => navigate("/"), 3000);
  }
};


  function handleNavigation() {
    navigate("/");
  }

  function handleViewEvents() {
    localStorage.setItem("unseen", 0);
    setUnseenEventsCount(0);
    navigate("/viewevents");
  }


    const handleClick1 = (event) => {
        setUnseenEventsCount(0);
       setAnchorEl(event.currentTarget);
     };
     const handleClose = () => {
       setAnchorEl(null);
     };



useEffect(() => {
  const interval = setInterval(() => {
    setToken(localStorage.getItem("authToken"));
    setRoles(localStorage.getItem("roles"));
  }, 1000);

  // Cleanup function to clear the interval
  return () => clearInterval(interval);
}, []); // Empty dependency array to run once



  useEffect(() => {
    console.log("unseen changed to " + unseenEventsCount);

  }, [unseenEventsCount]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50   border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="/home">
          <img src={brainwave} width={190} height={40} alt="Brainwave" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            <button
              onClick={handleNavigation}
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
                  px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                    "/" === pathname || "/" === hash
                      ? "z-2 lg:text-n-1"
                      : "lg:text-n-1/50"
                  }  lg:leading-5 lg:hover:text-n-1 xl:px-12 `}
            >
              home
            </button>
            <button
              onClick={() => navigate("/about")}
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
                  px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                    "/about" === pathname || "/about" === hash
                      ? "z-2 lg:text-n-1"
                      : "lg:text-n-1/50"
                  }  lg:leading-5 lg:hover:text-n-1 xl:px-12 `}
            >
              about
            </button>
            {token && (

                <button
                  onClick={handleViewEvents}
                  className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
                px-4 py-4 md:py-5 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  "/viewevents" === pathname || "/viewevents" === hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                }  lg:leading-5 lg:hover:text-n-1 xl:px-12 `}
                >
                  View Events
                </button>

            )}
            {token && (
              <button
                onClick={() => navigate("/viewRecruitments")}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
                px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  "/viewRecruitments" === pathname ||
                  "/viewRecruitments" === hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                }  lg:leading-5 lg:hover:text-n-1 xl:px-12 `}
              >
                View Recruitments
              </button>
            )}
            {token && roles.includes("USER") && (
              <button
                onClick={() => navigate("/getallsavedevents")}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
                px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  "/getallsavedevents" === pathname ||
                  "/getallsavedevents" === hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                }  lg:leading-5 lg:hover:text-n-1 xl:px-12 `}
              >
                Saved Events
              </button>
            )}
            {token && roles.includes("USER") && (
              <button
                onClick={() => navigate("/getalllikedevents")}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
                px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  "/getalllikedevents" === pathname ||
                  "/getalllikedevents" === hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                }  lg:leading-5 lg:hover:text-n-1 xl:px-12 `}
              >
                favourites
              </button>
            )}
            <button
              onClick={() => navigate("/viewclubs")}
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
                px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  "/viewclubs" === pathname || "/viewclubs" === hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                }  lg:leading-5 lg:hover:text-n-1 xl:px-12 `}
            >
              clubs
            </button>
            {token &&
              (roles.includes("CLUB_SEC") || roles.includes("ADMIN")) && (
                <button
                  onClick={() => navigate("/addevent")}
                  className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
                              px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                                "/addevent" === pathname || "/about" === hash
                                  ? "z-2 lg:text-n-1"
                                  : "lg:text-n-1/50"
                              }  lg:leading-5 lg:hover:text-n-1 xl:px-12 `}
                >
                  Add Event
                </button>
              )}
            {token &&
              (roles.includes("CLUB_SEC") || roles.includes("ADMIN")) && (
                <button
                  onClick={() => navigate("/recruitments")}
                  className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
                    px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                      "/recruitments" === pathname || "/recruitment" === hash
                        ? "z-2 lg:text-n-1"
                        : "lg:text-n-1/50"
                    }  lg:leading-5 lg:hover:text-n-1 xl:px-12 `}
                >
                  Add Recruitment
                </button>
              )}
            {token && roles.includes("CLUB_SEC") && (
              <button
                onClick={() => navigate("/dashboard")}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
                    px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                      "/recruitments" === pathname || "/recruitment" === hash
                        ? "z-2 lg:text-n-1"
                        : "lg:text-n-1/50"
                    }  lg:leading-5 lg:hover:text-n-1 xl:px-12 `}
              >
                DashBoard
              </button>
            )}
            <HamburgerMenu />
          </div>




        </nav>

          {token && roles.includes("USER")&& (
            <div className="pr-10">
              <Badge color="error" badgeContent={unseenEventsCount > 0 ? unseenEventsCount : null}>
                <NotificationsActiveIcon
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick1}
                  style={{
                    color: '#9e9e9e',
                    opacity: 0.6,
                    cursor: 'pointer',
                    fontSize: '28px',
                  }}
                />
              </Badge>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                  style: {
                    borderRadius: '10px', // Rounded corners
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow
                    padding: '8px 0',
                    minWidth: '200px',
                    backgroundColor: '#1e1e2f', // Black purplish background
                    color: '#ffffff', // White text for better contrast
                  },
                }}
              >
                {unseenEvents.map((event, index) => (
                  <CustomMenu
                    key={index} // Add a unique key to each CustomMenu
                    handleClose={handleClose}
                    msg={event.msg} // Pass the msg from the event
                  />
                ))}
              </Menu>
            </div>
          )}









        {token == null && (
          <button
            onClick={() => navigate("/register")}
            className="pl-30 button hidden mr-8 text-n-1/50 transition-color hover:text-n-1 lg:block"
          >
            New account
          </button>
        )}
        {/*         {token && <a href="/profile" className="button hidden mr-8 text-n-1/50 transition-color hover:text-n-1 lg:block"> */}
        {/*                             <Avatar {...stringAvatar(name)} /> */}
        {/*                          </a> } */}
        {token && (
          <Button className="hidden lg:flex" onClick={handleLogout}>
            logout
          </Button>
        )}
        {token == null && (
          <Button className="hidden lg:flex" onClick={handlenavigatelogin}>
            sign in
          </Button>
        )}
        <CustomizedSnackbars
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          alertM={
            error ? "Logout unsuccessful, please try again" : "Logout successful"
          }
          type={error ? "error" : "success"}
        />
        <Button
          className="ml-auto lg:hidden "
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

// front -> event -> notification
