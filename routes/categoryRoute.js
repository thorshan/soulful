const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/categories', auth, role(["admin"]), categoryController.getAllCategories);
router.post('/categories', auth, role(["admin"]), categoryController.createCategory);
router.get('/categories/:id', auth, role(["admin"]), categoryController.getCategory);
router.put('/categories/:id', auth, role(["admin"]), categoryController.updateCategory);
router.delete('/categories/:id', auth, role(["admin"]), categoryController.deleteCategory);

module.exports = router;