// controllers/hotelController.js
const Hotel = require("../models/Hotel");
const Review = require("../models/reviews");
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.render("index", { hotels });
  } catch (error) {
    res.status(500).send("Error fetching hotels");
  }
};

exports.addHotel = async (req, res) => {
  const { title, description, price, country, location, category } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : "";
  try {
    const hotel = new Hotel({
      title,
      description,
      image,
      price,
      country,
      location,
      category: Array.isArray(category) ? category : [category],
    });
    await hotel.save();
    res.redirect("/hotels");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding hotel");
  }
};

exports.renderEditHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.render("editHotel", { hotel });
  } catch (error) {
    res.status(500).send("Error fetching hotel for edit");
  }
};

exports.updateHotel = async (req, res) => {
  const { title, description, price, country, location, category } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : req.body.existingImage;
  try {
    await Hotel.findByIdAndUpdate(req.params.id, {
      title,
      description,
      image,
      price,
      country,
      location,
      category: Array.isArray(category) ? category : [category],
    });
    res.redirect("/hotels");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating hotel");
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.redirect("/hotels");
  } catch (error) {
    res.status(500).send("Error deleting hotel");
  }
};

module.exports.viewHotel = async (req, res) => {
  try {
      const hotel = await Hotel.findById(req.params.id)
          .populate({
              path: "reviews",
              populate: { path: "user", select: "username" } // Populate user details
          });

      if (!hotel) {
          req.flash("error", "Hotel not found!");
          return res.redirect("/hotels");
      }

      res.render("viewHotel", { hotel, reviews: hotel.reviews || [], successMessage: req.flash("success") });
  } catch (error) {
      console.error(error);
      req.flash("error", "Error fetching hotel.");
      res.redirect("/hotels");
  }
};
