const Review = require("../models/Review");

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name")
      .populate("item", "name")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error getting review", error });
  }
};

// Create review
const createReview = async (req, res) => {
  try {
    const { title, item, reviewText, reviewRating, user } = req.body;
    const review = await Review.create({
      title,
      item,
      reviewText,
      reviewRating,
      user,
    });
    res.json({ message: "Review created.", review });
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};

// Get review by Id
const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user", "name")
      .populate("item", "name");
    if (!review) res.json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error getting review", error });
  }
};

// Deltete review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) res.json({ message: "Review not found" });
    await Review.findByIdAndDelete(review._id);
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  getReview,
  deleteReview,
};
