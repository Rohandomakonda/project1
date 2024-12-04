import React from 'react';
import "./viewClub.styles.css";
import axios from "axios";
import Club from "../../components/Club_Card/Club.jsx";
import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";


function ViewClub(){
const [clubs,setClubs] = useState([]);
const navigate = useNavigate();
useEffect(()=>{
       axios.get("http://localhost:8080/viewclubs")
            .then((resp)=>{
                    setClubs(resp.data);
                })
            .catch((err)=>{
                    alert("getError "+err);
                });


    },[])



const handleClick=()=>{
        navigate("/${clubname}");
    }
    return(
        <div className="public-events">

           <h1>clubs</h1>
            {clubs.map((club) => (
            <Club
              key={club.id}
              id={club.id}
              name={club.name}
              description={club.description}
              image={`data:image/jpeg;base64,${clubs.image}`}
            />
            ))}

        </div>
    )
}

export default ViewClub;