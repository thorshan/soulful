const express = require('express');
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/reviews", auth, role(["admin", "moderator"]), reviewController.getAllReviews);
router.post("/reviews", auth, role(["admin", "moderator", , "user"]), reviewController.getAllReviews);
router.get("/reviews/:id", reviewController.getAllReviews);
router.delete("/reviews/:id", auth, role(["admin", "moderator"]), reviewController.getAllReviews);

module.exports = router;