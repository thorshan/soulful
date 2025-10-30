const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/items', itemController.getAllItems);
router.post('/items', auth, role(["admin", "moderator"]), itemController.createItem);
router.get('/items/:id', itemController.getItem);
router.get('/items/:id', itemController.getItemWithAllData);
router.get('/items/user/:id', itemController.getItemByUser);
router.put('/items/:id', auth, role(["admin", "moderator"]), itemController.updateItem);
router.delete('/items/:id', auth, role(["admin", "moderator"]), itemController.deleteItem);

module.exports = router;