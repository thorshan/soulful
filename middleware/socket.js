require("dotenv").config();
const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../models/TokenBlacklist");
const User = require("../models/User");

const socket = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("No token provided"));
    }

    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      return next(new Error("Token is invalidated"));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new Error("User not found"));
    }

    // Attach user to socket object
    socket.user = user;
    next();
  } catch (err) {
    console.error("Socket auth error:", err.message);
    next(new Error("Authentication failed"));
  }
};

module.exports = socket;
