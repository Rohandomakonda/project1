import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Track error message
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    setError(""); // Reset error on every submit attempt
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/forgotPassword/changePassword`,
        null, // No request body
        {
          params: {
            email: email,
            newP: newPassword,
            confirmP: confirmPassword,
          },
        }
      );
      alert("Password updated successfully. Please log in.");
      navigate("/login");
    } catch (error) {
      setError("Error updating password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="changepwd">
      <h2>Change Password</h2>

      {/* Error message display */}
      {error && <p className="error">{error}</p>}

      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* Loading spinner while request is in progress */}
      <button onClick={handleChangePassword} disabled={loading}>
        {loading ? "Changing..." : "Change Password"}
      </button>
    </div>
  );
};

export default ChangePassword;
