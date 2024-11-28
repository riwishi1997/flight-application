const mongoose = require('mongoose');
const moment = require('moment');  // Use moment.js to handle date formatting (you can also use native JS Date methods if preferred)

const flightdetailsSchema = mongoose.Schema(
  {
    flight_name: {
      type: String,
      required: [true, 'please enter valid name'],
    },
    departure_from: {
      type: String,
      required: [true, 'Please enter valid info'],
    },
    arrival: {
      type: String,
      required: [true, 'please enter valid info'],
    },
    duration: {
      type: Number,
      required: [true],
    },
    date: {
      type: Date,
      required: [true, 'Please enter correct numbers'],
    },
    price: {
      type: Number,
      required: [true],
    },
    totalSeats: {
      type: Number,
      required: [false],
      default: 180,
    },
    seatBooked: {
      type: Number,
      required: [false],
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Enable virtuals when using toJSON
    toObject: { virtuals: true }, // Enable virtuals when using toObject
  }
);

// Create a virtual field to format the date as DD-MM-YY
flightdetailsSchema.virtual('formattedDate').get(function () {
  return moment(this.date).format('YYYY-MM-DD');
});

module.exports = mongoose.model('Details', flightdetailsSchema);