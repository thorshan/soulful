const express = require('express');
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/reviews", reviewController.getAllReviews);
router.post("/reviews", auth, role(["admin", "moderator", "user"]), reviewController.createReview);
router.get("/reviews/:id", reviewController.getReview);
router.get("/reviews/review-item/:id", reviewController.getReviewByItem);
router.get("/reviews/user/:id", reviewController.getReviewByUser);
router.delete("/reviews/:id", auth, role(["admin", "moderator"]), reviewController.deleteReview);

module.exports = router;