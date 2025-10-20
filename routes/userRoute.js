const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get("/users", auth, role(["admin", "moderator"]), userController.allUsers);
router.post("/users", auth, role(["admin"]), userController.createUser);
router.get("/users/:id", auth, role(["admin", "moderator", "user"]), userController.getUser);
router.put("/users/:id", auth, role(["admin"]), userController.updateUser);
router.delete("/users/:id", auth, role(["admin"]), userController.deleteUser);

module.exports = router;