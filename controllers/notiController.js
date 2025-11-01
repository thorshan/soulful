const Notification = require("../models/Notification");
const socketEmitter = require("../socket/socketEmitter");

// Send notification
const sendNotification = async (req, res) => {
  try {
    const { receiverId, message, type } = req.body;

    let userNotification;
    if (receiverId) {
      userNotification = await Notification.create({
        user: receiverId,
        message,
        type: type || "info",
      });

      await socketEmitter.notifyUser(receiverId, {
        message,
        type,
        notificationId: userNotification._id,
        createdAt: userNotification.createdAt,
      });
    }

    const adminNotification = await Notification.create({
      message,
      type: type || "alert",
      user: null, // broadcast
    });

    socketEmitter.notifyAdmins({
      message,
      type: type || "alert",
      notificationId: adminNotification._id,
      createdAt: adminNotification.createdAt,
    });

    res.json({ success: true, userNotification, adminNotification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending notification" });
  }
};

// Get notifications for logged-in user
const getUserNotifications = async (req, res) => {
  try {
    let notifications;

    if (req.user.role === "admin" || req.user.role === "moderator") {
      notifications = await Notification.find({ user: null }).sort({
        createdAt: -1,
      });
    } else {
      notifications = await Notification.find({ user: req.user._id }).sort({
        createdAt: -1,
      });
    }

    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true },
    );
    res.json({ success: true, notification: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    let notifications;
    if (req.user.role === "admin" || req.user.role === "moderator") {
      notifications = await Notification.find({ user: null }).sort({
        createdAt: -1,
      });
    } else {
      notifications = await Notification.find({ user: req.user._id }).sort({
        createdAt: -1,
      });
    }

    res.json({ success: true, notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

module.exports = {
  sendNotification,
  getUserNotifications,
  markAsRead,
  getAllNotifications,
};
