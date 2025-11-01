const socket = require("../middleware/socket");
const socketEmitter = require("./socketEmitter");

module.exports = (io) => {
  // Attach IO instance globally
  socketEmitter.setIO(io);

  // Middleware for auth
  io.use(socket);

  io.on("connection", (socket) => {
    const user = socket.user;
    socketEmitter.addOnlineUser(user._id.toString(), socket.id, user.role);
    console.log(`${user.name} (${user.role}) connected [${socket.id}]`);

    socket.on("disconnect", () => {
      socketEmitter.removeOnlineUser(user._id.toString());
      console.log(`${user.name} disconnected`);
    });
  });
};
