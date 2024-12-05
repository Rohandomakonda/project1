import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import VerifyOTP from "./VerifyOTP";
import ChangePassword from "./ChangePassword";
import "./ForgotPassword.css";

const ForgotP = () => {
  const [step, setStep] = useState(1); // Step 1: ForgotPassword, Step 2: VerifyOTP, Step 3: ChangePassword
  const [email, setEmail] = useState("");

  return (
    <div>
      {step === 1 && <ForgotPassword setEmail={setEmail} setStep={setStep} />}
      {step === 2 && <VerifyOTP email={email} setStep={setStep} />}
      {step === 3 && <ChangePassword email={email} />}
    </div>
  );
};

export default ForgotP;
