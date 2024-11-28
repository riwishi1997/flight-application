const asyncHandler = require("express-async-handler");
const Details = require("../models/flightDetails");
const moment = require('moment');  // Import moment.js to handle date formatting

// Fetch all flight details
const getDetails = asyncHandler(async (req, res) => {
  const details = await Details.find();
  res.status(200).json(details);
});

// Fetch flight details based on form input
const getFormDetails = asyncHandler(async (req, res) => {
  const { departure_from, arrival, date, passengers } = req.query;

  // Convert DDMMYYYY (from query) to ISO Date (YYYY-MM-DD)
  const formattedDate = moment(date, 'DDMMYYYY').format('YYYY-MM-DD');

  const formDetails = {
    departure_from: departure_from, 
    arrival: arrival, 
    date: new Date(formattedDate)  // Use the formatted date in the query
  };

  const details = await Details.find(formDetails);

  // Filter flights based on available seats
  const filteredDetails = details.filter(detail => {
    const available = detail.totalSeats - detail.seatBooked;
    return (available - passengers) >= 0;
  });
  
  res.status(200).json(filteredDetails);
});

// Fetch a single flight detail by ID
const getDetail = asyncHandler(async (req, res) => {
  const details = await Details.findById(req.params.id);
  if (!details) {
    return res.status(404).json({ message: "Details not found" }); 
  }
  res.status(200).json(details); 
});

// Add new flight details
const postDetails = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const {
    flight_name,
    departure_from,
    arrival,
    date,  // Date in DDMMYYYY format
    price,
    duration,
    totalSeats,
    seatsBooked,
  } = req.body;

  // Check if all required fields are provided
  if (
    !flight_name ||
    !departure_from ||
    !arrival ||
    !date ||   // Date is required in request
    !price ||
    !duration
  ) {
    return res.status(400).json({ message: "All fields are mandatory" }); 
  }

  // Convert DDMMYYYY to ISO Date format (YYYY-MM-DD)
  const formattedDate = moment(date, 'DDMMYYYY').format('YYYY-MM-DD');

  // Create new flight details
  const details = await Details.create({
    flight_name,
    departure_from,
    arrival,
    date: new Date(formattedDate),  // Store date in ISO format
    price,
    duration,
    totalSeats: totalSeats || 180,  // Set default value for totalSeats
    seatsBooked: seatsBooked || 0,  // Set default value for seatsBooked
  });

  res.status(201).json(details);  // Send the created flight details
});

// Update flight details by ID
const putDetails = asyncHandler(async (req, res) => {
  const details = await Details.findById(req.params.id);
  if (!details) {
    return res.status(404).json({ message: "Details not found" });
  }

  const updatedDetails = await Details.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  
  res.status(200).json(updatedDetails);  // Send updated flight details
});

// Delete flight details by ID
const deleteDetails = asyncHandler(async (req, res) => {
  const details = await Details.findById(req.params.id);
  if (!details) {
    return res.status(404).json({ message: "Details not found" });
  }

  await Details.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Details deleted successfully" });  // Send success message
});

module.exports = {
  getFormDetails,
  getDetails,
  getDetail,
  postDetails,
  putDetails,
  deleteDetails,
};