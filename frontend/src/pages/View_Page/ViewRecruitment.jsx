import React, { useState, useEffect, useRef } from "react";
import Recruitment from "../../components/Recruitment_Card/Recruitment"; // Assuming you have this component
import axios from "axios";
import { curve } from "../../assets";
import Section from "../../components/Section.jsx";
import { BackgroundCircles } from "../../components/design/Hero";
import { 
  Search, 
  Users, 
  Filter,
  Sparkles,
  Activity,
  UserCheck,
  Building
} from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0520] via-[#0f0829] to-[#130b3b]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500 border-t-transparent mx-auto"></div>
              <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-purple-300/20 mx-auto animate-pulse"></div>
              <div className="absolute inset-4 rounded-full h-12 w-12 bg-gradient-to-r from-purple-600/30 to-pink-600/30 mx-auto animate-pulse"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Loading Recruitments</h2>
            <p className="text-purple-200 text-lg">Finding opportunities for you...</p>
            
            <div className="flex items-center justify-center mt-6 space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      <Section
        className="pt-[12rem] -mt-[5.25rem]"
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
        id="hero"
      >
        {/* Hero Section */}
        <div className="container relative" ref={parallaxRef}>
          {/* Hero Background Image */}
          <div className="absolute inset-0 opacity-15 -z-10">
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920" 
              alt="Recruitments background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0520]/90 via-[#0f0829]/70 to-[#130b3b]" />
          </div>

          <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem] mt-20">
            {/* Floating badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8">
              <UserCheck className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-purple-200 font-medium">Career Opportunities</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              <span className="inline-block relative">
                Recruitments
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2 opacity-60"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </h1>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-[#130b3b]/80 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-2">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl mr-4">
                      <Search className="w-5 h-5 text-purple-300" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search recruitments by title, description, venue, or club..."
                      className="flex-1 bg-transparent text-white placeholder-purple-300 text-lg outline-none py-3"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl ml-4">
                      <Filter className="w-5 h-5 text-purple-300" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Search Stats */}
              <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-purple-300">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  <span>{filteredRecruitments.length} opportunities found</span>
                </div>
                {searchTerm && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                    <span>Searching for "{searchTerm}"</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <BackgroundCircles />
        </div>

        {/* All Recruitments Section */}
        <div className="container relative z-2">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-purple-200 text-sm font-medium">All Recruitments</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Find Your <span className="text-purple-400">Perfect Opportunity</span>
            </h2>
            
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Explore recruitment opportunities from clubs across campus
            </p>
          </div>

          {/* Recruitments Grid */}
          {!loading && (
            <>
              {filteredRecruitments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
                  {filteredRecruitments.map((recruitment) => (
                    <div key={recruitment.id} className="transform transition-all duration-500 hover:scale-[1.02]">
                      <Recruitment
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">No Recruitments Found</h3>
                  <p className="text-purple-200 text-lg max-w-md mx-auto mb-8">
                    {searchTerm 
                      ? `No recruitments match your search for "${searchTerm}". Try different keywords.`
                      : "No recruitment opportunities are currently available. Check back soon!"
                    }
                  </p>
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* My Club Recruitments Section */}
        {roles.includes("CLUB_SEC") && myRecruitments.length > 0 && (
          <div className="container relative mt-32">
            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
              {/* Section Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-indigo-500/30 mb-8">
                <Building className="w-5 h-5 text-indigo-400 mr-2" />
                <span className="text-indigo-200 font-medium">Club Management</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="inline-block relative">
                  My Club Recruitments
                  <img
                    src={curve}
                    className="absolute top-full left-0 w-full xl:-mt-2 opacity-60"
                    width={624}
                    height={28}
                    alt="Curve"
                  />
                </span>
              </h2>
              
              <p className="text-purple-200 text-lg max-w-2xl mx-auto">
                Manage and track recruitment opportunities for your club
              </p>
            </div>

            <div className="container relative z-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
                {myRecruitments.map((recruitment) => (
                  <div key={recruitment.id} className="transform transition-all duration-500 hover:scale-[1.02]">
                    <Recruitment
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
};

export default ViewRecruitments;