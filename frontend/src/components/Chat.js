import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Utils from "./../utils";
import Avatar from "react-avatar";
function Chat({ socket }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const params = useParams();
  const roomID = params.id;
  const [user, setUser] = useState(null);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: user.name,

        message: currentMessage,
        roomID: roomID,
        date:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  const getUser = async () => {
    let utils = new Utils();
    let res = await utils.checkLogin();
    if (res[0]) {
      setUser(res[1]);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  useMemo(() => {
    socket.on("receive_message", (data) => {
      if (data.roomID !== roomID) return;
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="" style={{ height: "83vh" }}>
      <div className="flex flex-col h-full">
        <header className="py-2 px-4 bg-gray-800 text-white">
          <h1 className="text-lg font-semibold">Chat Header</h1>
        </header>

        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col space-y-2 p-4">
            {messageList.map((message) => (
              <div key={message.id} className="bg-white p-4 rounded-lg flex">
                <Avatar
                  name={message.author}
                  size={50}
                  round="32px"
                  className="mx-3"
                ></Avatar>
                <div>
                  <p className="text-black-600 font-bold mx-2">
                    {message.author}
                  </p>
                  <p className="text-gray-600 mx-2">{message.message}</p>
                  <p className="text-gray-500 text-xs mt-2 mx-2">
                    {message.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-4 px-4">
          <div className="flex">
            <input
              type="text"
              className="bg-slate-50 flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Type your message..."
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg ml-2"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
