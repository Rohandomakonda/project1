import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import CustomizedSnackbars from "../../components/SnackBarCustom.jsx";
import Button from "../../components/Button";
import { benefits } from "../../constants";

const ForgotP = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [pwd, setPwd] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API;
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/forgotPassword`,
        { email: emailInput },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setEmail(emailInput);
      setSnackbarOpen(true);
      setError(false);
      setMessage("OTP sent to your email");
      setStep(2);
    } catch (err) {
      setSnackbarOpen(true);
      setError(true);
      setMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/forgotPassword/verify`, {
        email,
        otp,
      });
      setStep(3);
      setSnackbarOpen(true);
      setError(false);
      setMessage("OTP Verified");
    } catch (err) {
      setSnackbarOpen(true);
      setError(true);
      setMessage("Invalid OTP. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setSnackbarOpen(true);
      setError(true);
      setMessage("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setSnackbarOpen(true);
      setError(true);
      setMessage("Password must be at least 8 characters long.");
      return;
    }
    try {
      await axios.post(
        `${API_BASE_URL}/auth/forgotPassword/changePassword`,
        null,
        {
          params: {
            email,
            newP: newPassword,
            confirmP: confirmPassword,
          },
        }
      );
      setSnackbarOpen(true);
      setError(false);
      setMessage("Password updated successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setSnackbarOpen(true);
      setError(true);
      setMessage("Error updating password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#130b3b] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {snackbarOpen && (
          <div
            className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
              error ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }`}
          >
            {error ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
            <span className="text-sm font-medium">{message}</span>
            <button
              onClick={() => setSnackbarOpen(false)}
              className="ml-2 text-white hover:text-gray-200 transition-colors"
            >
              ×
            </button>
          </div>
        )}

        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">
              {step === 1
                ? "Forgot Password"
                : step === 2
                ? "Verify OTP"
                : "Change Password"}
            </h1>
            <p className="text-blue-100 mt-2 text-sm">
              {step === 1
                ? "Enter your email to receive OTP"
                : step === 2
                ? "Enter the OTP sent to your email"
                : "Set your new password"}
            </p>
          </div>

          <div className="p-6 space-y-6">
            {step === 1 && (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  className="w-full"
                  disabled={loading}
                  onClick={handleSendOtp}
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Send OTP"}
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  className="w-full"
                  disabled={loading}
                  onClick={handleVerifyOtp}
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Verify OTP"}
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                <div className="relative">
                  <input
                    type={pwd ? "password" : "text"}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pr-10 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                    onClick={() => setPwd(!pwd)}
                  >
                    {pwd ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={pwd ? "password" : "text"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pr-10 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                    onClick={() => setPwd(!pwd)}
                  >
                    {pwd ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <Button
                  type="button"
                  className="w-full"
                  disabled={loading}
                  onClick={handleChangePassword}
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Submit"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotP;