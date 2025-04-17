// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const auth = require("../middleware/auth");

// Book a hotel
router.post("/hotels/book/:id", auth, bookingController.bookHotel);

// Cancel a booking
router.post("/hotels/cancel-booking/:id", auth, bookingController.cancelBooking);

module.exports = router;
