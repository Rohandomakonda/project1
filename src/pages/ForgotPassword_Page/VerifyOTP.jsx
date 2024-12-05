import React, { useState } from "react";
import axios from "axios";

const VerifyOTP = ({ email, setStep }) => {
  const [otp, setOtp] = useState("");


  const handleVerifyOtp = async () => {
    try {
        console.log("this is "+email+" "+otp);
      await axios.post("http://localhost:8080/api/auth/forgotPassword/verify", { email, otp });
      setStep(3); // Navigate to ChangePassword component
    } catch (error) {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className = "verifyOtp">
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify</button>

    </div>
  );
};

export default VerifyOTP;
