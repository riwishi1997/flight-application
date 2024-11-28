import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FlightForm from "./components/FlightForm";
import FlightResults from "./components/FlightResults";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<FlightForm />} />
        <Route path="/results" element={<FlightResults />} />
      </Routes>
    </>
  );
};

export default App;