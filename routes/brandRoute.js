const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/brands', brandController.getAllBrands);
router.post('/brands', auth, role(["admin"]), brandController.createBrand);
router.get('/brands/:id', brandController.getBrand);
router.put('/brands/:id', auth, role(["admin"]), brandController.updateBrand);
router.delete('/brands/:id', auth, role(["admin"]), brandController.deleteBrand);

module.exports = router;