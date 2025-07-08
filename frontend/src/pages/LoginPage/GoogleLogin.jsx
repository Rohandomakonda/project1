import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Slide from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // success, error, warning, info
    title: ""
  });

  const API_BASE_URL = import.meta.env.VITE_API;
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT;

  // Enhanced alert function
  const showAlert = (message, severity = "info", title = "") => {
    setSnackbar({
      open: true,
      message,
      severity,
      title
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Custom Alert Icon Component
  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      showAlert("Authenticating with Google...", "info", "Signing In");

      // Send the ID token to your backend
      console.log(response);

      const backendResponse = await axios.post(
        `${API_BASE_URL}/auth/google`,
        { 
          token: response.credential,
          // Request calendar access token
          requestCalendarAccess: true
        }
      );
  
      const { access_token, roles, name, club, id, googleAccessToken } = backendResponse.data;
  
      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("name", name);
      localStorage.setItem("club", club);
      localStorage.setItem("googleAccessToken", googleAccessToken); // Store the calendar-enabled access token
      localStorage.setItem("userId", id);
  
      showAlert(
        `Welcome back, ${name}! You have been successfully signed in.`,
        "success",
        "Sign In Successful"
      );

      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error("Google login failed:", error);
      
      const errorMessage = error.response?.data?.message || 
        "Failed to sign in with Google. Please try again.";
      
      showAlert(
        errorMessage,
        "error",
        "Sign In Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    showAlert(
      "Google sign-in was cancelled or failed. Please try again.",
      "error",
      "Sign In Error"
    );
  };

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <div className="bg-gradient-to-br from-[#130b3b]/95 to-[#1a0f4a]/95 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
            <div className="flex items-center space-x-3">
              <CircularProgress 
                size={24} 
                sx={{ 
                  color: '#a855f7',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  }
                }} 
              />
              <span className="text-white font-medium">Signing you in...</span>
            </div>
          </div>
        </div>
      )}

      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <div className={`transition-opacity duration-300 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleSuccess(credentialResponse);
            }}
            onError={handleGoogleError}
            useOneTap
            scope="email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
            // Add access_type and prompt to ensure we get a refresh token
            access_type="offline"
            prompt="consent"
          />
        </div>
      </GoogleOAuthProvider>

      {/* Enhanced MUI Snackbar with Custom Styling */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
          }
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          icon={getAlertIcon(snackbar.severity)}
          sx={{
            background: snackbar.severity === 'success' 
              ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(21, 128, 61, 0.9) 100%)'
              : snackbar.severity === 'error'
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(185, 28, 28, 0.9) 100%)'
              : snackbar.severity === 'warning'
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(180, 83, 9, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(126, 34, 206, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            color: 'white',
            minWidth: '350px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            '& .MuiAlert-icon': {
              color: 'white',
            },
            '& .MuiAlert-action': {
              color: 'white',
              '& .MuiIconButton-root': {
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }
            }
          }}
        >
          {snackbar.title && (
            <AlertTitle sx={{ 
              fontWeight: 'bold', 
              marginBottom: '4px',
              color: 'white'
            }}>
              {snackbar.title}
            </AlertTitle>
          )}
          <div style={{ 
            fontSize: '14px', 
            lineHeight: '1.4',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            {snackbar.message}
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GoogleSignIn;