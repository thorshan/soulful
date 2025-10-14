const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/register', auth, role(['admin']), authController.register);
router.post('/login', authController.login);
router.post('/logout', auth, authController.logout);

module.exports = router;