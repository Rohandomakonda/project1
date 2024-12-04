import React from "react";
import { useNavigate } from "react-router-dom";
import "./Club.style.css";

function Club(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/clubs/${props.clubname}`);
  }

  return (
    <div className="card-container" onClick={handleClick}>
      <div
        className="card-face card-front"
        style={{ backgroundImage: `url(${props.image})` }}
      ></div>
      <div className="card-details">
        <h2>{props.clubname}</h2>
      </div>
    </div>
  );
}

export default Club;
