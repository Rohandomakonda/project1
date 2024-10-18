import React, { useState, useEffect } from 'react';
import Event from "../../components/Event_Card/Event";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.styles.css";

function Home() {
    const [publicEvents, setPublicEvents] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // New state to manage loading
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/public/events")
            .then((resp) => {
                setPublicEvents(resp.data);
                setIsLoaded(true); // Set isLoaded to true when data is fetched
            })
            .catch((err) => {
                alert("getError " + err);
            });
    }, []);

    const handleDelete = () => {
        alert("Cannot delete a public event");
    };

    const handleClick = () => {
        navigate("/signin");
    };

    return (
        <div className="public-events">
            <h1>Public Events</h1>
            {isLoaded ? (
                <div className="events-container">
                    {publicEvents.map((event, index) => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            description={event.description}
                            date={event.date}
                            time={event.time}
                            venue={event.venue}
                            club={event.club}
                            delete={handleDelete}
                            className="boom-effect" // Add boom-effect class for animation
                            style={{ animationDelay: `${index * 0.3}s` }} // Stagger the animation
                        />
                    ))}
                </div>
            ) : (
                <div className="loading">Loading events...</div>
            )}
            <button onClick={handleClick}>Get Started</button>
        </div>
    );
}

export default Home;
