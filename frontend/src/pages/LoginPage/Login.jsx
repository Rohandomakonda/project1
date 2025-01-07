import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import CustomizedSnackbars from "../../components/SnackBarCustom.jsx";
import "./Login.css";
import { benefits } from "../../constants";
import Button from "../../components/Button";
import { GradientLight } from "../../components/design/Benefits";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton.jsx";
import GoogleSignIn from "./GoogleLogin.jsx";

const Login = () => {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [pwd, setPwd] = useState(true);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);
  const parallaxRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hi");
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8765/api/auth/login",
        credentials
      );
      console.log(response.data.roles);
      const token = response.data.access_token;
      const roles = response.data.roles;
      const name = response.data.name;
      const club = response.data.club;
 console.log(response.data);
 console.log(roles);

      const userId = response.data.id;

      if (token && roles) {
        localStorage.setItem("roles", JSON.stringify(roles)); // Convert roles array to string
        console.log("json stringify " + JSON.stringify(roles));
        localStorage.setItem("authToken", token);
        localStorage.setItem("name", name);
        localStorage.setItem("club", club);
        localStorage.setItem("userId", userId);
console.log("localstorage set");
alert("logging in");

      setSnackbarOpen(true);
      setLoading(false);
      setError(false);
      setTimeout(() => navigate("/"), 1500);

      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      setSnackbarOpen(true);
      setError(true);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      // Send the token to your backend
      console.log(response.credential);

      const backendResponse = await axios.post(
        "http://localhost:8765/api/auth/google",
        { token: response.credential }
      );
      console.log("sent to backend");

      const { access_token, roles, name, club,id } = backendResponse.data;

      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("name", name);
      localStorage.setItem("club", club);
      localStorage.setItem("googleAccessToken", response.credential); // Store Google token for Calendar API
      localStorage.setItem("userId",id);

      setSnackbarOpen(true);
      setLoading(false);
      setError(false);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Google login failed:", error);
      setLoading(false);
      setSnackbarOpen(true);
      setError(true);
    }
  };

  const handleGoogleError = () => {
    setSnackbarOpen(true);
    setError(true);
  };

  return (

       <GoogleOAuthProvider clientId="916755134531-fvnijil1m46cfuu84fgfm9uionutvr66.apps.googleusercontent.com">
      <div className="pt-[12rem] -mt-[5.25rem] flex items-center justify-center min-h-screen w-full">
        <div className="container relative w-full max-w-screen-lg flex justify-center items-center">
          <div className="relative z-1 text-center">
            <form
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full max-w-[50rem]"
              style={{
                backgroundImage: `url(${benefits[2].backgroundUrl})`,
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                boxSizing: "border-box",
                borderRadius: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}

            >
              <h2 className="text-white text-xl font-bold mb-5">Login</h2>

              <div className="pt-[6rem] -mt-[5rem] flex items-center justify-center w-full">
                <div className="container relative w-full max-w-screen-lg flex justify-center items-center">
                  <div className="relative z-1 text-center">
                    <form
                      className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full max-w-[50rem]" // Increased max-width to 50rem
                      onSubmit={handleSubmit}
                    >
                      <TextFixeld
                        id="outlined-email"
                        className="MuiTextField-root pb-5"
                        label="Email"
                        required
                        variant="outlined"
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            email: e.target.value,
                          })
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "white", // White outline
                            },
                            "&:hover fieldset": {
                              borderColor: "white", // White outline on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white", // White outline when focused
                            },
                            "& input": {
                              color: "white", // White text for input
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "#ADD8E6", // Bluish color for the label
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#87CEEB", // Bluish color when focused
                          },
                        }}
                      />

                      {/* Add gap between the fields by giving margin bottom to email */}
                      <div className="mt-5 relative">
                        <TextField
                          id="outlined-password"
                          className="MuiTextField-root"
                          label="Password"
                          variant="outlined"
                          type={pwd ? "password" : "text"}
                          placeholder="Password"
                          required
                          onChange={(e) =>
                            setCredentials({
                              ...credentials,
                              password: e.target.value,
                            })
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "white", // White outline
                              },
                              "&:hover fieldset": {
                                borderColor: "white", // White outline on hover
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white", // White outline when focused
                              },
                              "& input": {
                                color: "white", // White text color inside the input
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#ADD8E6", // Light bluish color for the label
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "#87CEEB", // Slightly darker bluish color when focused
                            },
                          }}
                        />
                        {/* Password visibility toggle button */}
                        <button
                          type="button"
                          className="toggle-visibility absolute right-2 top-2"
                          onClick={() => setPwd(!pwd)}
                        >
                          {pwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </button>
                      </div>

                      {loading ? (
                        <CircularProgress color="inherit" />
                      ) : (
                        <>
                          <Button className="submit w-full mt-5" onClick={handleSubmit}>
                            Login
                          </Button>
                        </>
                      )}
                      <div className="my-4 flex items-center">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="mx-4 text-white">or</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                      </div>
                     {/* <GoogleSignIn/> */}
                     <GoogleSignIn
                     handleGoogleSuccess={handleGoogleSuccess}
                     handleGoogleError={handleGoogleError}
                     />
                      <CustomizedSnackbars
                        open={snackbarOpen}
                        onClose={() => setSnackbarOpen(false)}
                        alertM={
                          error
                            ? "Login unsuccessful, please try again"
                            : "Login successful"
                        }
                        type={error ? "error" : "success"}
                      />

                      <div className="register-link mt-5">
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                      </div>
                      <div className="register-link">
                        <Link to="/forgotPassword">Forgot Password?</Link>
                      </div>
                    </form>
                  </div>
                </div>
                <GradientLight className="z-1 opacity-20" />
              </div>
            </form>
          </div>
        </div>
        <GradientLight className="z-1 opacity-20" />
      </div>
      </ GoogleOAuthProvider>

  );
};

export default Login;
