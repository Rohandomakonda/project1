import React from "react";
import './App.css';
import Button from "./components/Button";
import Form from "./pages/Page1";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <>
      <Button />
      {/* Other components for the home page */}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addevent" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
