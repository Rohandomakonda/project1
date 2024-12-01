import React from 'react'
import Event from "../../components/Event_Card/Event";
import axios from "axios";
import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./Home.styles.css";

function Home(){
const [publicEvents,setpublicEvents] = useState([]);
const navigate = useNavigate();
useEffect(()=>{
       axios.get("http://localhost:8080/public/events")
            .then((resp)=>{
                    setpublicEvents(resp.data);
                })
            .catch((err)=>{
                    alert("getError "+err);
                });


    },[])

const handleDelete=()=>{
        alert("cannot delete an public event");
    }

const handleClick=()=>{
        navigate("/register");
    }
    return(
        <div className="public-events">
           <h1>Public events</h1>
            {publicEvents.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              time={event.time}
              venue={event.venue}
              imgUrl={event.imgUrl}
              club={event.club}
              delete={handleDelete}
            />
            ))}
        <button onClick = {handleClick}>Get started</button>
        </div>
    )
}

export default Home;