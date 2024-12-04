import React, { useState, useEffect } from "react";
import Recruitment from "../../components/Recruitment_Card/Recruitment.jsx"; // Assuming you have this component
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import "./ViewRecruitment.css";

const ViewRecruitments = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

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
        setRecruitments(allRecruitmentsResp.data); // Assuming this is the data you want
      })
      .catch((error) => {
        alert("Error fetching recruitments: " + error.message);
        if (error.response && error.response.status === 403) {
          alert("Session expired. Please login again.");
          window.location.href = "/login";
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("authToken");

    axios
      .delete(`http://localhost:8080/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setRecruitments((prev) => prev.filter((event) => event.id !== id));
        alert("Event deleted successfully");
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

  return (
    <div className="container">
      <div className="search-container">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="Search recruitments"
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="events-container">
        {loading ? <p>Loading recruitments...</p> : renderRecruitmentList(filteredRecruitments)}
      </div>
    </div>
  );
};

export default ViewRecruitments;
