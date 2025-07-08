import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Loader2, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";
import CustomizedSnackbars from "../../components/SnackBarCustom.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignIn from "./GoogleLogin.jsx";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      const { access_token, roles, name, club, id } = response.data;

      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("name", name);
      localStorage.setItem("club", club);
      localStorage.setItem("userId", id);

      setSnackbarOpen(true);
      setError(false);
      setMessage("Login successful");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Login failed:", error);
      setSnackbarOpen(true);
      setError(true);
      setMessage("Login unsuccessful, please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      const backendResponse = await axios.post(`${API_BASE_URL}/auth/google`, { token: response.credential });
      const { access_token, roles, name, club, id } = backendResponse.data;

      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("name", name);
      localStorage.setItem("club", club);
      localStorage.setItem("googleAccessToken", response.credential);
      localStorage.setItem("userId", id);

      setSnackbarOpen(true);
      setError(false);
      setMessage("Login successful");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Google login failed:", error);
      setSnackbarOpen(true);
      setError(true);
      setMessage("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setSnackbarOpen(true);
    setError(true);
    setMessage("Google login failed");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
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
              <h1 className="text-2xl font-bold text-white">Login</h1>
              <p className="text-blue-100 mt-2 text-sm">Welcome back! Please sign in.</p>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="email"
                      required
                      value={credentials.email}
                      onChange={(e) =>
                        setCredentials({ ...credentials, email: e.target.value })
                      }
                      className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials({ ...credentials, password: e.target.value })
                      }
                      className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <span>Login</span>
                  )}
                </button>

                <div className="text-center">
                  <span className="text-gray-400">or</span>
                </div>

                <GoogleSignIn
                  handleGoogleSuccess={handleGoogleSuccess}
                  handleGoogleError={handleGoogleError}
                />

                <div className="text-sm text-center text-gray-400">
                  Don&apos;t have an account?{' '}
                  <Link to="/register" className="text-blue-400 hover:underline">
                    Register
                  </Link>
                </div>
                <div className="text-sm text-center text-gray-400">
                  <Link to="/forgotPassword" className="text-blue-400 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
