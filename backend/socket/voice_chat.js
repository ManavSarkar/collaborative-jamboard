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
let userPeerIDs = new Map();
io.on("connection", (socket) => {
  socket.on("user-add", (data) => {
    const roomID = data.roomID;
    // userPeerIDs.set(socket.id, data.peerID);
    let room = userPeerIDs.get(roomID);
    if (room) {
      room.set(socket.id, data.peerID);
      userPeerIDs.set(roomID, room);
    } else {
      userPeerIDs.set(roomID, new Map([[socket.id, data.peerID]]));
    }

    socket.broadcast.emit("user-joined", {
      socketID: socket.id,
      peerID: data.peerID,
    });
  });

  //   send all connected users to the new user
  socket.emit(
    "connected-users",
    [...userPeerIDs].map(([socketID, peerID]) => {
      return { socketID, peerID };
    })
  );

  socket.on("disconnect", () => {
    console.log("user-left", socket.id);
    socket.broadcast.emit("user-left", socket.id);
    userPeerIDs.delete(socket.id);
  });
});

// const port = process.env.PORT || 5000
// server.listen(port, () => {
//   console.log('listening on *:5000')
// })

module.exports = app;
