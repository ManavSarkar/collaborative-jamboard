module.exports = jamboardSocket = async (io) => {
  let joinedMembersDetails = new Map();
  let membersRoom = new Map();
  io.on("connection", (socket) => {
    socket.on("drawing", (data) => {
      socket.broadcast.emit("boardDrawing", data);
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
            room.splice(index, 1);
            joinedMembersDetails[roomID] = room;
          }
        }
        socket.emit("joined-members-list", joinedMembersDetails[roomID]);
      }
      membersRoom.delete(socket.id);
    });
  });
};
