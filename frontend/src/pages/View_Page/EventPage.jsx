import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "../comments/comments";
import { curve } from "../../assets/index.js";
import Section from "../../components/Section.jsx";
import Button from "../../components/Button.jsx";
import useGet from "../../customhooks/useGet.jsx";

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
      .get(`${process.env.REACT_APP_API_URL}/api/events/getById/${eventId}`, {
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
     <Section
          className="pt-[12rem] -mt-[5.25rem]"
          crosses
          crossesOffset="lg:translate-y-[5.25rem]"
          customPaddings
          id="hero"
        >
          <div className="container relative mt-20 flex flex " >
              <div>
                  <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200"
                   style={{
                           maxWidth: "90%",
                          maxHeight: "90%",

                           }} />
                  </div>
            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
              <h1 className="h1 mb-6">

                <span className="inline-block relative">
                 {details.title}
                  <img
                    src={curve}
                    className="absolute top-full left-0 w-full xl:-mt-2"
                    width={624}
                    height={28}
                    alt="Curve"
                  />
                </span>
              </h1>
              <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
                {details.description}
              </p>
              <p className="-ml-100 body-1 max-w-3xl mx-auto mb-1 text-n-2 lg:mb-2">• Date: {details.date}</p>
              <p className="-ml-10 body-1 max-w-3xl mx-auto mb-1 text-n-2 lg:mb-2">• Time: {details.time}</p>
              <p className="-ml-10 body-1 max-w-3xl mx-auto mb-1 text-n-2 lg:mb-2">• Venue: {details.venue}</p>

            </div>

          </div>
          <Comments id={eventId} key={eventId} />

        </Section>
  );
}

export default EventPage;
