module.exports = jamboardSocket = async (io) => {
  let joinedMembersDetails = new Map();
  let membersRoom = new Map();
  io.on("connection", (socket) => {
    socket.on("newStroke", (data) => {
      socket.broadcast.emit("newStroke", data);
    });
    socket.on("decrementPage", (data) => {
      socket.broadcast.emit("decrementPage", data);
    });
    socket.on("eraseCompletePage", (data) => {
      socket.broadcast.emit("eraseCompletePage", data);
    });
    socket.on("incrementPage", (data) => {
      socket.broadcast.emit("incrementPage", data);
    });
    socket.on("newPage", (data) => {
      socket.broadcast.emit("newPage", data);
    });
    socket.on("drawing", (data) => {
      socket.broadcast.emit("boardDrawing", data);
    });
    socket.on("clearCanvas", (data) => {
      socket.broadcast.emit("clearCanvasListen", data);
    });
    socket.on("join-session", (data) => {
      socket.join(data.sessionID);
      membersRoom.set(socket.id, data.sessionID);
      // add socket id to data
      data.userDetails.socketID = socket.id;
      if (joinedMembersDetails[data.sessionID]) {
        joinedMembersDetails[data.sessionID].push(data.userDetails);
      } else {
        joinedMembersDetails[data.sessionID] = [data.userDetails];
      }

      io.to(data.sessionID).emit("joined-session");
    });
    socket.on("get-joined-members", (data) => {
      socket.emit("joined-members-list", joinedMembersDetails[data]);
    });

    socket.on("disconnect", () => {
      let roomID = membersRoom.get(socket.id);
      if (roomID) {
        let room = joinedMembersDetails[roomID];
        if (room) {
          let index = room.findIndex((member) => member.socketID === socket.id);

          if (index !== -1) {
            // get the user details from the room and emit to all the members
            let user = room[index];
            user.roomID = roomID;
            socket.broadcast.emit("user-disconnected", user);
            room.splice(index, 1);
            joinedMembersDetails[roomID] = room;
          }
          socket.emit("joined-members-list", room);
        }
      }
      membersRoom.delete(socket.id);
    });
  });
};
