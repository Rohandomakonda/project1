import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "../comments/comments";

function EventPage() {
  const { id } = useParams();
  const eventId = parseInt(id, 10);
  console.log("eventid is "+eventId);
  const [details, setDetails] = useState({}); // ✅ Fix: Initialize as an object
  const token = localStorage.getItem("authToken");

 

  useEffect(() => {
    if (isNaN(eventId)) {
      console.error("Invalid event ID");
      return;
    }

    // ✅ Fetch Event Details
    axios
      .get(`http://localhost:8765/api/events/getById/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
        alert("Failed to fetch event: " + error.response?.data?.message);
      });


     },[eventId]) // ✅ Correct dependencies

  return (  
     <div>
        <div>
        {details.imageUrl ? (
          <img
            src={`data:image/jpeg;base64,${details.image}`} 
            alt="Event"
            className="mh-9 w-full h-auto rounded-lg shadow-md"
          />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
      <h5 className="h2 mb-5 z-3">{details.title || "Loading title..."}</h5>
      <p className="body-2 mb-3 text-n-3 z-3">Description</p>
      <p className="body-2 mb-3 text-n-3 z-3">{details.description || "Loading description..."}</p>
      <p className="body-2 mb-3 text-n-3 z-3">Date : {details.date || "TBD"}</p>
      <p className="body-2 mb-3 text-n-3 z-3">Time : {details.time || "TBD"}</p>

      {/* ✅ Comments Component */}
      <Comments id={eventId} key={eventId} />
    </div>
  );
}

export default EventPage;
