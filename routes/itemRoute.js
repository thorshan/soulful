const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/items', auth, role(["admin"]), itemController.getAllItems);
router.post('/items', auth, role(["admin"]), itemController.createItem);
router.get('/items/:id', auth, role(["admin"]), itemController.getItem);
router.put('/items/:id', auth, role(["admin"]), itemController.updateItem);
router.delete('/items/:id', auth, role(["admin"]), itemController.deleteItem);

module.exports = router;