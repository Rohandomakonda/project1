import React, { useState, useEffect } from "react";
import './App.css';
import View from "./pages/View_Page/View";
import SavedEvents from "./pages/View_Page/savedEvents.jsx";
import Form from "./pages/Add_Event_Page/Page1";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar1 from "./components/Navbar/Navbar.component.jsx";
import Home from "./pages/Home_Page/Home.component.jsx";
import Update from "./pages/update_page/Update.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import SignUp from "./pages/SignUp_Page/signup.component.jsx";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import Recruitment from "./pages/Recruitment/Recruitment.component.jsx";
import ViewRecruitment from "./pages/View_Page/ViewRecruitment.jsx";
import ViewClub from "./pages/clubs/ViewClub_page.jsx";
import Club_info from "./pages/Club_Details/Club_Info.jsx";
import ForgotP from "./pages/ForgotPassword_Page/ForgotP.jsx";
import UpdateRec from "./pages/Recruitment/updateRecruitment.jsx";
import Favourites from "./pages/View_Page/favourites.jsx";
import SideNav from "./components/SideNav.jsx";
import MenuAppBar from "./components/Navbar.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an intro animation or pre-loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds for intro animation
  }, []);

  return (
    <Router>
      {/* Initial Loading Animation */}
      {isLoading && (
        <div className="loading-animation">Welcome to NITW Events</div>
      )}

      {/* Content and Navbar */}
      <div className={`app ${isLoading ? "loading" : ""}`}>
        {!isLoading && (
          <>
            <MenuAppBar/>
            <SideNav />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
               <Route path="/viewclubs" element={<ViewClub />} />

              {/* Protected Routes */}
              <Route
                path="/addevent"
                element={
                  <ProtectedRoute>
                    <Form />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/viewevents"
                element={
                  <ProtectedRoute>
                    <View />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/getclub/:name"
                element={
                  <ProtectedRoute>
                    <Club_info />
                  </ProtectedRoute>
                }
              />
               <Route
                   path="/Update/:id"
                    element={
                   <ProtectedRoute>
                    <Update />
                     </ProtectedRoute>
                      }
                            />
                    <Route
                      path="/updateRecruitment/:id"
                     element={
                      <ProtectedRoute>
                       <UpdateRec />
                        </ProtectedRoute>
                          }
                                />
              <Route
                path="/recruitments"
                element={
                  <ProtectedRoute>
                    <Recruitment />
                  </ProtectedRoute>
                }
              />
             <Route
                path="/getallsavedevents"
                element={
                  <ProtectedRoute>
                    <SavedEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                 path="/getalllikedevents"
                 element={
                   <ProtectedRoute>
                     <Favourites />
                   </ProtectedRoute>
                 }
               />
              <Route
                path="/viewRecruitments"
                element={
                  <ProtectedRoute>
                    <ViewRecruitment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forgotPassword"
                element={
                    <ForgotP />
                }
              />


            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
