import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import axios from "axios";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import CustomizedSnackbars from "../../components/SnackBarCustom.jsx";
import "../LoginPage/Login.css";
import { benefits } from "../../constants";
import { curve, heroBackground, robot } from "../../assets";

import { Box } from "@mui/material"; // Import Box and Button from MUI
import Section from "../../components/Section.jsx";
import Button from "../../components/Button";
import {
  BackgroundCircles,
  BottomLine,
  Gradient,
} from "../../components/design/Hero";
import { heroIcons } from "../../constants";
import { ScrollParallax } from "react-just-parallax";

import { GradientLight } from "../../components/design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";

import cardImage from "../../assets/benefits/card-6.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const ForgotP = () => {
  const [step, setStep] = useState(1); // Step 1: ForgotPassword, Step 2: VerifyOTP, Step 3: ChangePassword
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);
  const parallaxRef = useRef(null);
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      console.log("this is " + email + " " + otp);
      await axios.post("http://localhost:8080/api/auth/forgotPassword/verify", {
        email,
        otp,
      });
      setStep(3);
      setLoading(false);
      setSnackbarOpen(false);
      setError(false);
    } catch (error) {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    setError(""); // Reset error on every submit attempt
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8080/api/auth/forgotPassword/changePassword",
        null, // No request body
        {
          params: {
            email: email,
            newP: newPassword,
            confirmP: confirmPassword,
          },
        }
      );
      alert("Password updated successfully. Please log in.");
      navigate("/login");
    } catch (error) {
      setError("Error updating password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = () => {
    alert("hello");
    axios
      .post(
        "http://localhost:8080/api/auth/forgotPassword",
        { email: emailInput },
        {
          headers: {
            "Content-Type": "application/json", // Explicitly set the content type
          },
        }
      )
      .then((response) => {
        console.log(response.data); // Log success response
        setEmail(emailInput);
        setLoading(false);
        setSnackbarOpen(false);
        setError(false);

        setStep(2);
        alert("hello" + step);
      })
      .catch((error) => {
        console.error(error);
        alert;
        alert("Error sending OTP. Please try again.");
      });
  };

  return (
    <div className="pt-[12rem] -mt-[5.25rem] flex items-center justify-center min-h-screen w-full">
      <div className="container relative w-full max-w-screen-lg flex justify-center items-center">
        <div className="relative z-1 text-center">
          {step === 1 && (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full max-w-[50rem]" // Increased max-width to 50rem
              style={{
                backgroundImage: `url(${benefits[2].backgroundUrl})`,
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                boxSizing: "border-box",
                borderRadius: "8px", // Optional: Add rounded corners for better aesthetics
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add slight transparency
              }}
            >
              <h2 className="text-white text-xl font-bold mb-5">
                Forgot Password
              </h2>
              <TextField
                id="outlined-email"
                className="MuiTextField-root pb-5"
                label="Email"
                required
                variant="outlined"
                onChange={(e) => setEmailInput(e.target.value)}
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
              {loading ? (
                <CircularProgress color="inherit" />
              ) : (
                <Button
                  className="submit w-full mt-5"
                  type="submit"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </Button>
              )}

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
            </div>
          )}
          {step == 2 && (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full max-w-[50rem]" // Increased max-width to 50rem
              style={{
                backgroundImage: `url(${benefits[2].backgroundUrl})`,
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                boxSizing: "border-box",
                borderRadius: "8px", // Optional: Add rounded corners for better aesthetics
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add slight transparency
              }}
            >
              <h2 className="text-white text-xl font-bold mb-5">Verify OTP</h2>
              <TextField
                id="outlined-email"
                className="MuiTextField-root pb-5"
                label="OTP"
                required
                variant="outlined"
                onChange={(e) => setOtp(e.target.value)}
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
              {loading ? (
                <CircularProgress color="inherit" />
              ) : (
                <Button
                  className="submit w-full mt-5"
                  type="submit"
                  onClick={handleVerifyOtp}
                >
                  Verify
                </Button>
              )}

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
            </div>
          )}

          {step === 3 && (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full max-w-[50rem]" // Increased max-width to 50rem
              style={{
                backgroundImage: `url(${benefits[2].backgroundUrl})`,
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                boxSizing: "border-box",
                borderRadius: "8px", // Optional: Add rounded corners for better aesthetics
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add slight transparency
              }}
            >
              <h2 className="text-white text-xl font-bold mb-5">
                Change Password
              </h2>
              <div className="mt-5 relative">
                <TextField
                  id="outlined-password"
                  className="MuiTextField-root"
                  label="New Password"
                  variant="outlined"
                  type={pwd ? "password" : "text"}
                  placeholder="Password"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
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
              <div className="mt-5 relative">
                <TextField
                  id="outlined-password"
                  className="MuiTextField-root"
                  label="Confirm Password"
                  variant="outlined"
                  type={pwd ? "password" : "text"}
                  placeholder="Password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Button
                  className="submit w-full mt-5"
                  type="submit"
                  onClick={handleChangePassword}
                >
                  Submit
                </Button>
              )}

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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotP;
