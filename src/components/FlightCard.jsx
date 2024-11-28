import React from "react";
import "./FlightCard.css";

const FlightCard = ({ flight }) => {
  return (
    <div className="flight-card">
      <h3>{flight.flight_name}</h3>
      <p><strong>From:</strong> {flight.departure_from}</p>
      <p><strong>To:</strong> {flight.arrival}</p>
      <p><strong>Duration:</strong> {flight.duration}</p>
      <p><strong>Price:</strong> ${flight.price}</p>
      <p><strong>Date:</strong> {flight.date}</p>
    </div>
  );
};

export default FlightCard;