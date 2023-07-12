module.exports = jamboardSocket = async (io) => {
  io.on("connection", (socket) => {
    socket.on("drawing", (data) => socket.broadcast.emit("drawing", data));
    socket.on("join-session", (data) => {
      socket.join(data.sessionID);
      console.log("joined session", data.sessionID);
      io.to(data.sessionID).emit("joined-session");
    });
  });
};
