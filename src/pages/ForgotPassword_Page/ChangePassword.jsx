import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ChangePassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
        await axios.post(
             "http://localhost:8080/api/auth/forgotPassword/changePassword",
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
    navigate("/login")
    } catch (error) {
      alert("Error updating password. Please try again.");
    }
  };

  return (
    <div className = "changepwd">
      <h2>Change Password</h2>
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
      <button onClick={handleChangePassword}>Change Password</button>

    </div>
  );
};

export default ChangePassword;
