// import React from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// const GoogleSignIn = ({ handleGoogleSuccess, handleGoogleError }) => {
  
//   return (
//     <div>
//       <GoogleOAuthProvider clientId="916755134531-fvnijil1m46cfuu84fgfm9uionutvr66.apps.googleusercontent.com">
//         <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={handleGoogleError}
//           useOneTap
//           scope="email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
//         />
//       </GoogleOAuthProvider>
//     </div>
//   );
// };

// export default GoogleSignIn;
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleSignIn = () => {
  const handleGoogleSuccess = async (response) => {
    try {
      //setLoading(true);
      // Send the ID token to your backend
      console.log(response);

      const backendResponse = await axios.post(
        "http://localhost:8765/api/auth/google",
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
  
     // setSnackbarOpen(true);
      //setLoading(false);
      //setError(false);
      alert("success")
      //setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Google login failed:", error);
      alert("failed")
     // setLoading(false);
     // setSnackbarOpen(true);
     // setError(true);
    }

  };

  return (
    <div>
      <GoogleOAuthProvider clientId="916755134531-fvnijil1m46cfuu84fgfm9uionutvr66.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleGoogleSuccess(credentialResponse);
          }}
          onError={()=>{console.log("error")}}
          useOneTap
          scope="email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
          // Add access_type and prompt to ensure we get a refresh token
          access_type="offline"
          prompt="consent"
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleSignIn;

