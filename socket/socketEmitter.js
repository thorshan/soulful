const Notification = require("../models/Notification");

let io;
const onlineUsers = new Map(); // userId -> { socketId, role }

const setIO = (ioInstance) => {
  io = ioInstance;
};

const addOnlineUser = (userId, socketId, role) => {
  onlineUsers.set(userId, { socketId, role });
};

const removeOnlineUser = (userId) => {
  onlineUsers.delete(userId);
};

const getOnlineUsers = () => onlineUsers;

const notifyUser = async (userId, data) => {
  const user = onlineUsers.get(userId);
  if (user && io) {
    io.to(user.socketId).emit("notification", data);

    if (data.notificationId) {
      await Notification.findByIdAndUpdate(data.notificationId, {
        isDelivered: true,
      });
    }
  }
};

const notifyAdmins = (data) => {
  if (!io) return;
  for (const [userId, userData] of onlineUsers.entries()) {
    if (userData.role === "admin" || userData.role === "moderator") {
      io.to(userData.socketId).emit("notification", data);
    }
  }
};

module.exports = {
  setIO,
  addOnlineUser,
  removeOnlineUser,
  getOnlineUsers,
  notifyUser,
  notifyAdmins,
};
