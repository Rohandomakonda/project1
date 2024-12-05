import React from "react";
import { useNavigate } from "react-router-dom";
import "./Club.style.css"; // Ensure the CSS file is correctly linked

function Club({ id, name, description, image }) {
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    navigate(`/getclub/${name}`); // Corrected navigation to get the club details by name
  };

  return (
    <div className="club-card" onClick={handleClick}>
      <div
        className="club-card-front"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="club-card-details">
        <h2 className="club-card-name">{name}</h2>
        <p className="club-card-description">{description}</p>
      </div>
    </div>
  );
}

export default Club;
