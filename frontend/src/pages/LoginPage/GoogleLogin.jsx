import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
<<<<<<< HEAD
import axios from "axios";
const GoogleSignIn = () => {
  const handleSuccess = async (response) => {
    console.log(response);
=======

>>>>>>> 82d4541ce2147b3794b0733245ea3506b2f62a88

const GoogleSignIn = ({handleGoogleSuccess,handleGoogleError}) => {


  // const handleSuccess = async (response) => {
  //   alert("successsss");
  //   console.log(response);
  //   const backendResponse = await axios.post(
  //     "http://localhost:8765/api/auth/google",
  //     { token: response.credential }
  //   );
  //   const { accessToken, roles, name, club } = backendResponse.data;
    
  //   localStorage.setItem("roles", JSON.stringify(roles));
  //   localStorage.setItem("authToken", accessToken);
  //   localStorage.setItem("name", name);
  //   localStorage.setItem("club", club);
  //   localStorage.setItem("googleCredential", response.credential); // Store Google token for Calendar API

  //   console.log(localStorage.getItem("roles"));
  //   console.log(localStorage.getItem("authToken"));
  //   console.log(localStorage.getItem("name"));
  //   console.log(localStorage.getItem("club"));
  //   console.log(localStorage.getItem("googleCredential"));
  //   navigate("/viewevents");
  // };
  // const handleError = () => {
  //   alert("error");
  //   console.log("google sign in error");
  // };

  return (
    <div>
      <GoogleOAuthProvider clientId="916755134531-fvnijil1m46cfuu84fgfm9uionutvr66.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleSignIn;
