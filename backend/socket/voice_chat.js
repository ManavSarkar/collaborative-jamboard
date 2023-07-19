module.exports = voiceChatSocket = async (io) => {
  let userPeerIDs = new Map();
  io.on("connection", (socket) => {
    socket.on("user-add", (data) => {
      const roomID = data.roomID;
      // console.log("user-add", roomID, socket.id, data.peerID);
      // userPeerIDs.set(socket.id, data.peerID);
      let room = userPeerIDs.get(roomID);
      if (room) {
        room.set(socket.id, data.peerID);
        userPeerIDs.set(roomID, room);
      } else {
        userPeerIDs.set(roomID, new Map([[socket.id, data.peerID]]));
      }

      io.to(roomID).emit("user-joined", {
        socketID: socket.id,
        peerID: data.peerID,
      });
      socket.emit(
        "connected-users",
        [...userPeerIDs.get(roomID)].map(([socketID, peerID]) => {
          return { socketID, peerID };
        })
      );
    });

    //   send all connected users to the new user
    // socket.emit(
    //   "connected-users",
    //   [...userPeerIDs].map(([socketID, peerID]) => {
    //     return { socketID, peerID };
    //   })
    // );

    socket.on("disconnect", () => {
      socket.broadcast.emit("user-left", socket.id);
      userPeerIDs.delete(socket.id);
      //  // remove user from userPeerIDs
      // userPeerIDs.forEach((room, roomID) => {
      //   if (room.has(socket.id)) {
      //     room.delete(socket.id);
      //     userPeerIDs.set(roomID, room);
      //   }
      // });
    });
  });
};
