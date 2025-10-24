const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/carts", auth, role(["admin", "moderator", "user"]), cartController.getAllCarts);
router.post("/carts", cartController.createCart);
router.get("/carts/:id", auth, role(["admin", "moderator", "user"]), cartController.getCart);
router.get("/carts/cart/:id", auth, role(["admin", "moderator", "user"]), cartController.getCartItem);
router.put("/carts/:id", auth, role(["admin", "moderator", "user"]), cartController.updateCart);
router.delete("/carts/:id", auth, role(["admin", "moderator", "user"]), cartController.deleteCart);

module.exports = router;