const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });
  socket.on("drawing", (data) => socket.broadcast.emit("drawing", data));
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

// const port = process.env.PORT || 8080
// server.listen(port, () => {
//   console.log('listening on *:4000')
// })

module.exports = app;
