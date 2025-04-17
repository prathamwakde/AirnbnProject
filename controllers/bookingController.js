// controllers/bookingController.js
const Booking = require("../models/Booking");

exports.bookHotel = async (req, res) => {
  const hotelId = req.params.id;
  const userId = req.session.user._id;
  try {
    // Create a new booking
    const booking = new Booking({ hotelId, userId });
    await booking.save();
    res.send("Hotel booked successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error booking hotel");
  }
};

exports.cancelBooking = async (req, res) => {
  const hotelId = req.params.id;
  const userId = req.session.user._id;
  try {
    await Booking.findOneAndDelete({ hotelId, userId });
    res.send("Hotel booking canceled");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error canceling booking");
  }
};
