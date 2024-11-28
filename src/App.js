import React, { useState, useEffect } from "react";
import './App.css';
import View from "./pages/View_Page/View";
import Form from "./pages/Add_Event_Page/Page1";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component.jsx";
import Home from "./pages/Home_Page/Home.component.jsx";
import Update from "./pages/update_page/Update.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import SignUp from "./pages/SignUp_Page/signup.component.jsx";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

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
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />

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
                path="/Update/:id"
                element={
                  <ProtectedRoute>
                    <Update />
                  </ProtectedRoute>
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
