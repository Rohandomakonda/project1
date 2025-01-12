import "./init.jsx";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react"; // Correct import for useState
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import Avatar from "@mui/material/Avatar";
import { HamburgerMenu } from "./design/Header";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { Client } from '@stomp/stompjs';  // Correct import
import SockJS from "sockjs-client";
import { useWebSocket } from "../customhooks/useWebSocket";
import axios from "axios";


const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const { pathname, hash } = useLocation();
  const [scrolling, setScrolling] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState(() => {
    const storedRoles = localStorage.getItem("roles");
    return storedRoles ? JSON.parse(storedRoles) : [];
  });
  const token = localStorage.getItem("authToken");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const [unseenEventsCount, setUnseenEventsCount] = useState(0);
  const [stompClient, setStompClient] = useState(null);
  const userId = localStorage.getItem("userId");

  const { isConnected, subscribe, send } = useWebSocket({
    brokerURL: "http://localhost:8765/ws-notifications",
    onConnect: () => {
      console.log("Connected to WebSocket")
      if (userId) {
        // Subscribe using /queue prefix as configured in backend
        subscribe(`/queue/notifications/${userId}`, notification => {
          console.log("New notification received:", notification)
          setUnseenEventsCount(prev => prev + 1)
        })
      }
    },
    onDisconnect: () => {
      console.log("Disconnected from WebSocket")
    },
    onError: error => {
      console.error("WebSocket error:", error)
    }
  })

  useEffect(() => {
    if (token && userId) {
      axios
        .get(`http://localhost:8765/api/notifications/unseen/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          setUnseenEventsCount(response.data.length)
        })
        .catch(error => {
          console.error("Error fetching unseen events:", error)
        })
    }
  }, [token, userId])


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
  const handleLogout = async () => {
    try {
      if (token) {
        await axios.post(
          "http://localhost:8080/api/auth/logout",
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
        setSnackbarOpen(true); // Show success Snackbar
        setLoading(false);
        setError(false);
        setTimeout(() => navigate("/"), 3000);
        alert("Logout successful");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still remove token and update state even if server request fails
      localStorage.removeItem("authToken");
      localStorage.removeItem("roles");
      setIsAuthenticated(false);
      setRoles([]);
      setSnackbarOpen(true); // Show success Snackbar
      setLoading(false);
      setError(true);
      setTimeout(() => navigate("/"), 3000);
    }
  };

  function handleNavigation() {
    navigate("/");
  }

  function handleViewEvents() {
    navigate("/viewevents");
    setUnseenEventsCount(0);
  }

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
              <Badge
                badgeContent={unseenEventsCount}
                color="error"
                variant={unseenEventsCount > 0 ? "dot" : undefined}
              >
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
              </Badge>
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
            <HamburgerMenu />
          </div>
        </nav>
        {token == null && (
          <button
            onClick={() => navigate("/register")}
            className="button hidden mr-8 text-n-1/50 transition-color hover:text-n-1 lg:block"
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
          <Button className="hidden lg:flex" onClick={() => navigate("/login")}>
            sign in
          </Button>
        )}
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