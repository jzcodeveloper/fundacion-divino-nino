let io = null;

const init = server => {
  io = require("socket.io")(server);
  return io;
};

const getIO = () => {
  if (!io) throw new Error("Socket.io is not initialized yet.");
  return io;
};

module.exports = { init, getIO };
