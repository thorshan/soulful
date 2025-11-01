const express = require("express");
const router = express.Router();
const notiController = require("../controllers/notiController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get(
  "/notifications",
  auth,
  role(["admin", "moderator", "user"]),
  notiController.getAllNotifications,
);
router.post(
  "/notifications/send",
  auth,
  role(["admin", "moderator", "user"]),
  notiController.sendNotification,
);
router.get(
  "/notifications/:id",
  auth,
  role(["admin", "moderator", "user"]),
  notiController.getUserNotifications,
);
// router.put("/notifications/deliver/:id", notiController.deliverStatus);
router.put(
  "/notifications/read/:id",
  auth,
  role(["admin", "moderator", "user"]),
  notiController.markAsRead,
);

module.exports = router;
