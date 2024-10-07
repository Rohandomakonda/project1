import React from "react";
import './App.css';
import Button from "./components/Button";
import Form from "./pages/Page1";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router

function App() {
  return (
    <Router> {/* Wrap your routes with BrowserRouter */}
      <Routes>
        <Route path="/addevent" element={<Form />} />
      </Routes>
      <Button />
    </Router>
  );
}

export default App;
