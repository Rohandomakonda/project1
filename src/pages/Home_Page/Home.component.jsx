import React, { useState, useEffect } from 'react';
import Event from "../../components/Event_Card/Event";
import axios from "axios";
import { curve, heroBackground, robot } from "../../assets";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material"; // Import Box and Button from MUI
import Section from "../../components/Section.jsx";
import Button from"../../components/Button";
import { BackgroundCircles, BottomLine, Gradient } from "../../components/design/Hero";
import { heroIcons } from "../../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import { GradientLight } from "../../components/design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";

import cardImage from "../../assets/benefits/card-6.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
function Home() {

  const [publicEvents, setPublicEvents] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
   const parallaxRef=useRef(null);
useEffect(() => {
  // Fetch events and set liked/saved status
  axios.get("http://localhost:8080/public/events")
    .then((response) => setPublicEvents(response.data))
    .catch((error) => console.error("Error fetching events:", error));
}, []);  // Adding an empty dependency array ensures the effect runs only once when the component mounts.

 function handleDelete(id) {
    e.stopPropagation();
   axios
   .delete("http://localhost:8080/event/${id}")

     .catch((error) => console.error("Error deleting event:", error));

  }





  // Function to calculate the margin-top based on the number of events


  return (

       <Section
            className="pt-[12rem] -mt-[5.25rem]"
            crosses
            crossesOffset="lg:translate-y-[5.25rem]"
            customPaddings
            id="hero"
          >
            <div className="container relative mt-20" ref={parallaxRef} >
              <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
                <h1 className="h1 mb-6">
                  Explore the NITW Events {` `}
                   <span className="inline-block relative">
                                Public Events{" "}
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
                           inorder to view all the events u must register or if u don't have and account then register
                          </p>
                      <Button href={token!=null ? '/viewevents' : '/login'} white>
                        Get started
                      </Button>

                </div>




                                <BackgroundCircles />


                                </div>
<div className="container relative z-2">


        <div className="flex flex-wrap gap-10 mb-10">
         {publicEvents.map((event) => (
           <Event
             key={event.id}
             id={event.id}
             title={event.title}
             description={event.description}
             date={event.date}
             time={event.time}
             venue={event.venue}
             image={`data:image/jpeg;base64,${event.image}`} // Fix here: Use template literal properly
             club={event.club}
             delete={handleDelete}

           />
         ))}


                              </div>
                            </div>







          </Section>








  );
}

export default Home;
