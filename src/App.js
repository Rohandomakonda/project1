import React from "react";
import './App.css';
import View from "./pages/View_Page/View";
import Form from "./pages/Add_Event_Page/Page1";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component.jsx";
import Home from "./pages/Home_Page/Home.component.jsx";

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addevent" element={<Form />} />
        <Route path="/viewevents" element={<View/>}/>
      </Routes>
    </Router>
  );
}

export default App;
