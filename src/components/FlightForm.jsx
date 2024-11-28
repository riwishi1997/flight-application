import React from "react";
import { useNavigate } from "react-router-dom";
import "./FlightForm.css";

const FlightForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target.departureFrom.value;
    const to = e.target.arrival.value;
    const date = e.target.date.value;
    const passengers = e.target.passengers.value;

    const formattedDate = date.split("-").reverse().join(""); // DDMMYYYY format
    const url = `http://localhost:6010/api/flightDetails/getFormDetails?departure_from=${from}&arrival=${to}&date=${formattedDate}&passengers=${passengers}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          localStorage.setItem("flightsData", JSON.stringify(data));
          navigate("/results");
        } else {
          alert("No flights found.");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="form-container">
      <h2>Flight Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Departure From:</label>
        <input type="text" name="departureFrom" required />
        <label>Arrival:</label>
        <input type="text" name="arrival" required />
        <label>Date:</label>
        <input type="date" name="date" required />
        <label>No. of Passengers:</label>
        <input type="number" name="passengers" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FlightForm;