import React, { useState, useEffect } from "react";
import Recruitment from "../../components/Recruitment_Card/Recruitment.jsx"; // Assuming you have this component
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
import Grid from "@mui/material/Grid";
import "./View.styles.css";

const ViewRecruitments = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [myRecruitments, setMyRecruitments] = useState([]);
  const storedRoles = localStorage.getItem("roles");

  // Parse the roles stored in localStorage
  const roles = storedRoles ? JSON.parse(storedRoles) : [];
  const club = localStorage.getItem("club");

  useEffect(() => {
    setLoading(true);

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://localhost:8080/api/getAllRecruitments", {
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
    const token = localStorage.getItem("authToken");

    axios
      .delete(`http://localhost:8080/deleteRecruitment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setRecruitments((prev) => prev.filter((event) => event.id !== id));
        setMyRecruitments((prev) => prev.filter((event) => event.id !== id));

        alert("Recruitment deleted successfully");
      })
      .catch((error) => {
        alert("Error deleting event: " + error.message);
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

  if (roles.includes("CLUB_SEC")) {
      return (
        <div className="container">
          {/* My Club Events Section */}
          <div className="ongoing-events">
            <h2 className="center-text">My Club Recruitments</h2>
            <Grid container spacing={2}>
              {loading ? renderSkeletons(3) : renderRecruitmentList(myRecruitments)}
            </Grid>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search events"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* All Events Section */}
          <Grid container spacing={2}>
            {loading ? renderSkeletons(6) : renderRecruitmentList(filteredRecruitments)}
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="container">


          {/* Search Bar */}
          <div className="search-container">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search events"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* All Events Section */}
          <Grid container spacing={2}>
            {loading ? renderSkeletons(6) :  renderRecruitmentList(filteredRecruitments)}
          </Grid>
        </div>
      );
    }
};

export default ViewRecruitments;
