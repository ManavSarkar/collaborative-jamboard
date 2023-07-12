module.exports = chatSocket = async (io) => {
  io.on("connection", (socket) => {
    socket.on("send_message", (data) => {
      console.log(data);
      socket.broadcast.emit("receive_message", data);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};
