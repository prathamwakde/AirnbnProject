// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
