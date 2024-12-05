import React, { useState, useEffect } from 'react';
import axios from "axios";
import Club from "../../components/Club_Card/Club.jsx";
import "./viewClub.styles.css";

function ViewClub() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewclubs")
      .then((resp) => {
        setClubs(resp.data);
      })
      .catch((err) => {
        alert("getError " + err);
      });
  }, []);

  return (
    <div className="public-events">

      <div className="top-image-container">
        <img
          src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg"
          alt="Top Image"
          className="top-image"
        />
      </div>

      <div className="clubs-container">
        {clubs.map((club) => (
          <Club
            key={club.id}
            id={club.id}
            name={club.clubname}
            description={club.description}
            image={`data:image/jpeg;base64,${club.image}`} // Assuming club.image is base64
          />
        ))}
      </div>
    </div>
  );
}

export default ViewClub;
