const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get('/orders', auth, role(["admin", "moderator", "user"]), orderController.getAllOrders );
router.post('/orders', auth, role(["admin", "moderator", "user"]), orderController.createOrder );
router.get('/orders/:id', auth, role(["admin", "moderator", "user"]), orderController.getOrder );
router.get('/orders/order/:id', auth, role(["admin", "moderator", "user"]), orderController.getOrderByUser );
router.put('/orders/:id', auth, role(["admin", "moderator", "user"]), orderController.updateOrder );
router.delete('/orders/:id', auth, role(["admin", "moderator", "user"]), orderController.deleteOrder ); 

module.exports = router;