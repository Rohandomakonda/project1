import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = ({ setEmail, setStep }) => {
  const [emailInput, setEmailInput] = useState("");


  const handleSendOtp = () => {
   axios
     .post("http://localhost:8080/api/auth/forgotPassword", { email: emailInput }, {
       headers: {
         "Content-Type": "application/json", // Explicitly set the content type
       },
     })
     .then((response) => {
       console.log(response.data); // Log success response
       setEmail(emailInput); // Store the email
       setStep(2); // Navigate to the VerifyOTP component
     })
     .catch((error) => {
       console.error(error);
       alert("Error sending OTP. Please try again.");
     });

  };


  return (
    <div className = "forgotPassword">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>

    </div>
  );
};

export default ForgotPassword;
