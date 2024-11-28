import React, { useEffect, useState } from "react";
import FlightCard from "./FlightCard";
import "./Results.css";

const FlightResults = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("flightsData");
    if (storedData) {
      setFlights(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="results-container">
      <h1>Available Flights</h1>
      {flights.length > 0 ? (
        flights.map((flight, index) => <FlightCard key={index} flight={flight} />)
      ) : (
        <p>No flights available.</p>
      )}
    </div>
  );
};

export default FlightResults;