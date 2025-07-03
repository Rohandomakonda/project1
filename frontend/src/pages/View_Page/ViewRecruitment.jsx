import React, { useState, useEffect } from "react";
import Recruitment from "../../components/Recruitment_Card/Recruitment"; // Assuming you have this component
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box"; // Use MUI Box for consistent layout
//import "./View.styles.css";
import TextField from '@mui/material/TextField';
import { curve, heroBackground, robot } from "../../assets";
import { useNavigate } from "react-router-dom";
import Section from "../../components/Section.jsx";
import Button from"../../components/Button";
import { BackgroundCircles, BottomLine, Gradient } from "../../components/design/Hero";
import { heroIcons } from "../../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import { GradientLight } from "../../components/design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";
import cardImage from "../../assets/benefits/card-6.svg";




const ViewRecruitments = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [myRecruitments, setMyRecruitments] = useState([]);
  const storedRoles = localStorage.getItem("roles");
const parallaxRef=useRef(null);
  const roles = storedRoles ? JSON.parse(storedRoles) : [];
  const club = localStorage.getItem("club");
   const token = localStorage.getItem("authToken");
   const API_BASE_URL = import.meta.env.VITE_API;

  useEffect(() => {
    setLoading(true);



    if (!token) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
      return;
    }

    axios
      .get(`${API_BASE_URL}/recruitments/getAllRecruitments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((allRecruitmentsResp) => {
        setRecruitments(allRecruitmentsResp.data);
        const mcRecruitments = allRecruitmentsResp.data.filter((recruitment) => recruitment.club === club);
        setMyRecruitments(mcRecruitments);
      })
      .catch((error) => {
        alert("Error fetching recruitments: " + error.message);
        if (error.response && error.response.status === 403) {
          alert("Session expired. Please login again.");
          window.location.href = "/login";
        }
      })
      .finally(() => setLoading(false));
  }, [club]);

  const handleDelete = (id) => {


    axios
      .delete(`${API_BASE_URL}/recruitments/deleteRecruitment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setRecruitments((prev) => prev.filter((recruitment) => recruitment.id !== id));
        setMyRecruitments((prev) => prev.filter((recruitment) => recruitment.id !== id));

        alert("Recruitment deleted successfully");
      })
      .catch((error) => {
        alert("Error deleting recruitment: " + error.message);
      });
  };

  const filteredRecruitments = recruitments.filter((recruitment) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      recruitment.title.toLowerCase().includes(lowerSearchTerm) ||
      recruitment.description.toLowerCase().includes(lowerSearchTerm) ||
      recruitment.venue.toLowerCase().includes(lowerSearchTerm) ||
      recruitment.club.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const renderRecruitmentList = (recruitmentList) => {
    return recruitmentList.length > 0 ? (
      recruitmentList.map((recruitment) => (
        <Recruitment
          key={recruitment.id}
          id={recruitment.id}
          title={recruitment.title}
          description={recruitment.description}
          date={recruitment.date}
          time={recruitment.time}
          venue={recruitment.venue}
          club={recruitment.club}
          formLink={recruitment.formLink}
          image={`data:image/jpeg;base64,${recruitment.image}`}
          venue_description={recruitment.venueDescription}
          delete={handleDelete}
        />
      ))
    ) : (
      <p>No recruitments found</p>
    );
  };

  const renderSkeletons = (count) =>
    Array.from(new Array(count)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" width="100%" height={150} />
      </Grid>
    ));

  const calculateMarginTop = (recruitmentList, recruitmentList2) => {
    const numberOfColumns = 3;
    const numberOfRows = Math.ceil(recruitmentList.length / numberOfColumns) + Math.ceil(recruitmentList2.length / numberOfColumns);
    return 100 + (numberOfRows - 1) * 38; // Increase mt by 38 for each additional row
  };


  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative mt-20" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            <span className="inline-block relative">
              Recruitments{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <Box sx={{ mb: 4 }} className="search-container">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search events"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "2px solid white", // White border
                borderRadius: "8px", // Optional: rounded corners
                padding: "0.5rem 1rem", // Optional: spacing inside the input
                color: "white", // White text
                backgroundColor: "transparent", // Transparent background
              }}
            />
          </Box>
        </div>

        <BackgroundCircles />
      </div>

      <div className="container relative z-2">
        <div className="flex flex-wrap gap-10 mb-10">
          {filteredRecruitments.map((recruitment) => (
            <Recruitment
              key={recruitment.id}
              id={recruitment.id}
              title={recruitment.title}
              description={recruitment.description}
              date={recruitment.date}
              time={recruitment.time}
              venue={recruitment.venue}
              club={recruitment.club}
              formLink={recruitment.formLink}
              image={`data:image/jpeg;base64,${recruitment.image}`}
              venue_description={recruitment.venueDescription}
              delete={handleDelete}
            />
          ))}
        </div>
      </div>

      {roles.includes("CLUB_SEC") ? (
        myRecruitments.length > 0 ? (
          <div className="container relative mt-20" ref={parallaxRef}>
            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
              <h1 className="h1 mb-6">
                <span className="inline-block relative">
                  My Club Recruitment{" "}
                  <img
                    src={curve}
                    className="absolute top-full left-0 w-full xl:-mt-2"
                    width={624}
                    height={28}
                    alt="Curve"
                  />
                </span>
              </h1>
            </div>
            <div className="container relative z-2">
              <div className="flex flex-wrap gap-10 mb-10">
                {myRecruitments.map((recruitment) => (
                  <Recruitment
                    key={recruitment.id}
                    id={recruitment.id}
                    title={recruitment.title}
                    description={recruitment.description}
                    date={recruitment.date}
                    time={recruitment.time}
                    venue={recruitment.venue}
                    club={recruitment.club}
                    formLink={recruitment.formLink}
                    image={`data:image/jpeg;base64,${recruitment.image}`}
                    venue_description={recruitment.venueDescription}
                    delete={handleDelete}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null
      ) : null}
    </Section>
  );


};

export default ViewRecruitments;
