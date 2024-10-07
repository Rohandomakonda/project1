import React from "react";
import { useNavigate } from "react-router-dom";

function Button() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleClick = () => {
    navigate("/addevent"); // Redirects to the '/addevent' path when the button is clicked
    console.log("clicked");
  };

  return (
    <button onClick={handleClick}>Add Event</button>
  );
}

export default Button;
