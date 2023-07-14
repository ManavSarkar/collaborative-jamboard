import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useParams } from "react-router-dom";

function Members({ socket }) {
  const params = new useParams();

  const roomID = params.id;

  const [joinedMembers, setJoinedMembers] = useState([]);

  socket.emit("get-joined-members", roomID);
  socket.on("joined-members-list", (data) => {
    setJoinedMembers(data);
  });
  return (
    <div className="my-5 mx-6">
      {joinedMembers.map((member) => {
        return (
          <div className="item flex  bg-gray-50 py-3 rounded-r">
            <Avatar
              name={member.name}
              size={50}
              round="14px"
              className="mx-3"
            />
            <span className="w-full text-black flex items-center mx-3 font-semibold">
              {member.email}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Members;
