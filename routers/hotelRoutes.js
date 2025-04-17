// routes/hotelRoutes.js
const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const multer = require("multer");
const reviewRoutes = require("./reviewRoutes");
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Home page: list hotels
router.get("/hotels", hotelController.getHotels);

// New hotel form (only for logged-in users)
const auth = require("../middleware/auth");
router.get("/hotels", hotelController.getHotels);
router.get("/hotels/new", auth, (req, res) => {
  res.render("newHotel");
});
router.post("/hotels/add", auth, upload.single("image"), hotelController.addHotel);
router.get("/hotels/edit/:id", auth, hotelController.renderEditHotel);
router.post("/hotels/update/:id", auth, upload.single("image"), hotelController.updateHotel);
router.post("/hotels/delete/:id", auth, hotelController.deleteHotel);
router.get("/hotels/:id", hotelController.viewHotel);
router.use("/:id/reviews", reviewRoutes);
module.exports = router;