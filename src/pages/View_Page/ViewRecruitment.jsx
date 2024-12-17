import React, { useState, useEffect } from "react";
import Recruitment from "../../components/Recruitment_Card/Recruitment"; // Assuming you have this component
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box"; // Use MUI Box for consistent layout
import "./View.styles.css";

const ViewRecruitments = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [myRecruitments, setMyRecruitments] = useState([]);
  const storedRoles = localStorage.getItem("roles");

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

  if (roles.includes("CLUB_SEC")) {
    return (
      <Box sx={{ mt: calculateMarginTop(filteredRecruitments, myRecruitments) }}>
        {/* My Club Recruitments Section */}
        <Box sx={{ mt: 2 }}>
          <h2 className="center-text"style={{color: "white"}}>My Club Recruitments</h2>
          <Grid container spacing={2}>
            {loading ? renderSkeletons(3) : renderRecruitmentList(myRecruitments)}
          </Grid>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 4 }} className="search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search recruitments"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        {/* All Recruitments Section */}
        <Box>
          <h2 className="center-text"style={{color: "white"}}>All Recruitments</h2>
          <Grid container spacing={2}>
            {loading ? renderSkeletons(6) : renderRecruitmentList(filteredRecruitments)}
          </Grid>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box sx={{ mt: calculateMarginTop(filteredRecruitments, myRecruitments) }}>
        {/* Search Bar */}
        <Box sx={{ mb: 4 }} className="search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search recruitments"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        {/* All Recruitments Section */}
        <Box>
          <h2 className="center-text"style={{color: "white"}}>All Recruitments</h2>
          <Grid container spacing={2}>
            {loading ? renderSkeletons(6) : renderRecruitmentList(filteredRecruitments)}
          </Grid>
        </Box>
      </Box>
    );
  }
};

export default ViewRecruitments;
