import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home_Page/Home.component.jsx";
import Form from "./pages/Add_Event_Page/AddEvent.jsx";
import View from "./pages/View_Page/View.jsx";
import Update from "./pages/update_page/Update.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import SignUp from "./pages/SignUp_Page/signup.component.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Recruitment from "./pages/Recruitment/Recruitment.component.jsx";
import ViewRecruitment from "./pages/View_Page/ViewRecruitment.jsx";
import ViewClub from "./pages/clubs/ViewClub_page.jsx";
import Club_info from "./pages/Club_Details/Club_Info.jsx";
import ForgotP from "./pages/ForgotPassword_Page/ForgotP.jsx";
import UpdateRec from "./pages/Recruitment/updateRecruitment.jsx";
import Favourites from "./pages/View_Page/favourites.jsx";
import SavedEvents from "./pages/View_Page/savedEvents.jsx";
import Header from "./components/Header";
import ButtonGradient from "./assets/svg/ButtonGradient";
import "./index.css";
import { LoginSignout } from "./pages/LoginPage/GoogleCalendarEvent.jsx";
import {useState} from "react";
import DashBoard from "./DashBoard.jsx";
import EventPage from "./pages/View_Page/EventPage.jsx";

function App() {
   
  return (
    <Router>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/viewclubs" element={<ViewClub />} />

          <Route
            path="/addevent"
            element={
              <ProtectedRoute>
                {" "}
                <Form />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {" "}
                <DashBoard />
              </ProtectedRoute>
            }
          />

           <Route
            path="/calendar"
            element={
                <LoginSignout />
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
            path="/event/:id"
            element={
              <ProtectedRoute>
                <EventPage />
              </ProtectedRoute>
            }
          />
          <Route path="/forgotPassword" element={<ForgotP />} />
        </Routes>
      </div>
      <ButtonGradient />
    </Router>
  );
}

export default App;
