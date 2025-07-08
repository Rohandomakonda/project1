import React, { useState, useEffect, useRef } from "react";
import Recruitment from "../../components/Recruitment_Card/Recruitment"; // Assuming you have this component
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress"; // ✅ Loader import

import { curve } from "../../assets";
import Section from "../../components/Section.jsx";
import { BackgroundCircles } from "../../components/design/Hero";

const ViewRecruitments = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [myRecruitments, setMyRecruitments] = useState([]);
  const storedRoles = localStorage.getItem("roles");
  const roles = storedRoles ? JSON.parse(storedRoles) : [];
  const club = localStorage.getItem("club");
  const token = localStorage.getItem("authToken");
  const API_BASE_URL = import.meta.env.VITE_API;
  const parallaxRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    console.log("Fetching recruitments for club with token: ",token);
    console.log(token);
    console.log(`${API_BASE_URL}/recruitments/getAllRecruitments`)
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
        const mcRecruitments = allRecruitmentsResp.data.filter(
          (recruitment) => recruitment.club === club
        );
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
        setRecruitments((prev) =>
          prev.filter((recruitment) => recruitment.id !== id)
        );
        setMyRecruitments((prev) =>
          prev.filter((recruitment) => recruitment.id !== id)
        );
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
              placeholder="Search recruitments"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "2px solid white",
                borderRadius: "8px",
                padding: "0.5rem 1rem",
                color: "white",
                backgroundColor: "transparent",
              }}
            />
          </Box>
        </div>

        <BackgroundCircles />
      </div>

      <div className="container relative z-2">
        {loading ? (
          <div className="flex justify-center items-center min-h-[20vh]">
            <CircularProgress style={{ color: "white" }} />
          </div>
        ) : (
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
        )}
      </div>

      {roles.includes("CLUB_SEC") && myRecruitments.length > 0 && (
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
      )}
    </Section>
  );
};

export default ViewRecruitments;
