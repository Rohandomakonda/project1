import React, { useState, useEffect } from "react";
import axios from "axios";
import Club from "../../components/Club_Card/Club.jsx";
//import "./viewClub.styles.css";
import useGet from "../../customhooks/useGet.jsx";

function ViewClub() {
  // const [clubs, setClubs] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/viewclubs")
  //     .then((resp) => {
  //       setClubs(resp.data);
  //     })
  //     .catch((err) => {
  //       alert("getError " + err);
  //     });
  // }, []);
  const{data: clubs,loading,error}  = useGet("/viewclubs",null);
  console.log("details is " + clubs);

  return (
    <div className="public-events">

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
