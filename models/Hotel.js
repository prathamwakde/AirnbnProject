const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    price: Number,
    location: String,
    country: String,
    category: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }] // ✅ Reference to Review model
});

module.exports = mongoose.model("Hotel", hotelSchema);
