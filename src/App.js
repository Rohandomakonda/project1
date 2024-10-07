import React from "react";
import './App.css';
import Button from "./components/Button";
import Form from "./pages/Page1";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
       <Routes>
      <Route path="/addevent" element={<Form />} />
      {/* The button will be displayed outside the Routes, but you can still navigate */}
      
    </Routes>
    <Button />
    </div>
   
  );
}

export default App;
