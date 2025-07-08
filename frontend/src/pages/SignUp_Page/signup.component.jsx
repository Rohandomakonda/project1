import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  User,
  Lock,
  Users,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    roles: ["USER"],
    club: "",
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("USER");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API;
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.roles.includes("CLUB_SEC") && !formData.club) {
      setError(true);
      setMessage("Please select a club.");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        formData
      );
      setSnackbarOpen(true);
      setError(false);
      setMessage("OTP is being sent to your email");
      setTimeout(() => setStep(2), 1500);
    } catch (err) {
      setSnackbarOpen(true);
      setError(true);
      setMessage(err.response?.data?.message || "Registration unsuccessful");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify`, {
        email: formData.email,
        otp,
      });

      const { token, userId } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("name", formData.name);
      localStorage.setItem("roles", JSON.stringify(formData.roles));
      localStorage.setItem("club", formData.club);
      localStorage.setItem("userId", userId);

      setSnackbarOpen(true);
      setError(false);
      setMessage("Registration successfully completed");
      setTimeout(() => navigate("/viewevents"), 3000);
    } catch (err) {
      setSnackbarOpen(true);
      setError(true);
      setMessage(
        err.response?.data?.message || "Incorrect OTP, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({ ...formData, roles: [event.target.value] });
  };

  const handleClubChange = (e) => {
    setFormData({ ...formData, club: e.target.value });
  };

  const roleOptions = [
    {
      value: "USER",
      label: "User",
      icon: User,
      description: "Regular user account",
    },
    {
      value: "CLUB_SEC",
      label: "Club Secretary",
      icon: Users,
      description: "Club management access",
    },
    {
      value: "ADMIN",
      label: "Admin",
      icon: Shield,
      description: "Full system access",
    },
  ];

  const handleResendOtp = async () => {
    if (!formData.email) return;

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/resend-otp`, null, {
        params: { email: formData.email },
      });
      setSnackbarOpen(true);
      setError(false);
      setMessage("OTP resent successfully");
    } catch (err) {
      setSnackbarOpen(true);
      setError(true);
      setMessage(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const clubOptions = [
    { value: "MECHE", label: "MECHE" },
    { value: "CSES", label: "CSES" },
    { value: "SDC", label: "SDC" },
    { value: "QC", label: "QC" },
  ];

  return (
    <div className="min-h-screen bg-[#130b3b] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Snackbar */}
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

        {/* Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">
              {step === 1 ? "Create Account" : "Verify Your Account"}
            </h1>
            <p className="text-blue-100 mt-2 text-sm">
              {step === 1
                ? "Join our community today"
                : "Enter the OTP sent to your email"}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center py-4 bg-gray-750">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-600 text-gray-400"
                }`}
              >
                1
              </div>
              <div
                className={`h-1 w-12 ${
                  step >= 2 ? "bg-blue-500" : "bg-gray-600"
                }`}
              ></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2
                    ? "bg-blue-500 text-white"
                    : "bg-gray-600 text-gray-400"
                }`}
              >
                2
              </div>
            </div>
          </div>

          <div className="p-6">
            {step === 1 ? (
              <form onSubmit={handleRegister} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-3 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-3 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-3 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Create a secure password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Role */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">
                    Select Your Role
                  </label>
                  <div className="grid gap-3">
                    {roleOptions.map((role) => {
                      const Icon = role.icon;
                      return (
                        <label
                          key={role.value}
                          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer ${
                            selectedOption === role.value
                              ? "border-blue-500 bg-blue-500/10 text-blue-400"
                              : "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500"
                          }`}
                        >
                          <input
                            type="radio"
                            value={role.value}
                            checked={selectedOption === role.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <Icon size={20} className="mr-3" />
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-sm text-gray-400">
                              {role.description}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Club */}
                {selectedOption === "CLUB_SEC" && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Select Club
                    </label>
                    <select
                      value={formData.club}
                      onChange={handleClubChange}
                      required
                      className="w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>
                        Choose your club
                      </option>
                      {clubOptions.map((club) => (
                        <option key={club.value} value={club.value}>
                          {club.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                {/* OTP */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full text-center text-lg tracking-widest px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Verify Account</span>
                  )}
                </button>

                {/* Resend OTP (optional) */}
                <div className="text-center">
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    onClick={handleResendOtp}
                  >
                    Didn't receive the code? Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
