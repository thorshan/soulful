const express = require('express');
const router = express.Router();
const promoController = require("../controllers/promoController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get('/promotions', promoController.getAllPromos);
router.post('/promotions', auth, role(["admin", "moderator"]), promoController.createPromo);
router.get('/promotions/:id', promoController.getPromo);
router.put('/promotions/:id', auth, role(["admin", "moderator"]), promoController.updatePromo);
router.delete('/promotions/:id', auth, role(["admin", "moderator"]), promoController.deletePromo); 

module.exports = router;