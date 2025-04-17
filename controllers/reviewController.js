const Review = require('../models/reviews');
const Hotel = require('../models/Hotel'); // Assuming you have a Hotel model.

module.exports.createReview = async (req, res) => {
  const { hotelId } = req.params;
  const { rating, comment } = req.body.review;
  const userId = req.session.user._id; // Assuming session holds authenticated user info.

  try {
    const review = new Review({ rating, comment, user: userId });
    await review.save();

    const hotel = await Hotel.findById(hotelId);
    hotel.reviews.push(review);
    await hotel.save();

    req.flash('success', 'Review added successfully!');
    res.redirect(`/hotels/${hotelId}`);
  } catch (error) {
    req.flash('error', 'Error adding review!');
    res.redirect(`/hotels/${hotelId}`);
  }
};

module.exports.deleteReview = async (req, res) => {
  const { hotelId, reviewId } = req.params;

  try {
    await Review.findByIdAndDelete(reviewId);

    const hotel = await Hotel.findById(hotelId);
    hotel.reviews = hotel.reviews.filter((r) => r.toString() !== reviewId);
    await hotel.save();

    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/hotels/${hotelId}`);
  } catch (error) {
    req.flash('error', 'Error deleting review!');
    res.redirect(`/hotels/${hotelId}`);
  }
};