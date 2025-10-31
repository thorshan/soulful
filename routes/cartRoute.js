const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");


router.get("/cart/:userId", auth, role(["admin", "moderator", "user"]), cartController.getCart);
router.post("/cart/add", auth, role(["admin", "moderator", "user"]), cartController.addToCart);
router.put("/cart/update", auth, role(["admin", "moderator", "user"]), cartController.updateQuantity);
router.delete("/cart/remove", auth, role(["admin", "moderator", "user"]), cartController.removeFromCart);
router.delete("/cart/clear/:userId", auth, role(["admin", "moderator", "user"]), cartController.clearCart);

module.exports = router;