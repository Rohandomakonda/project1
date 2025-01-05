import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleSignIn = () => {
  const handleSuccess = async (response) => {
    console.log(response);

    const backendResponse = await axios.post(
      "http://localhost:8765/api/auth/google",
      { token: response.credential }
    );
    console.log("sent to backend");
  };

  const handleError = () => {
    console.log("google sign in error");
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="916755134531-fvnijil1m46cfuu84fgfm9uionutvr66.apps.googleusercontent.com">
        <GoogleLogin OnSuccess={handleSuccess} OnError={handleError} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleSignIn;
