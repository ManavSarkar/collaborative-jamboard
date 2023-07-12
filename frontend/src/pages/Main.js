import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Board from "../components/Board";
import Chatroom from "../components/Chatroom";

import io from "socket.io-client";
import { useEffect, useState } from "react";
function Session() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const socket = io.connect("http://localhost:5000/");
  const [loading, setLoading] = useState(true);
  // useEffect(() => {}, []);
  const sessionID = params.id;
  const title = searchParams.get("title");
  socket.on("connect", () => {
    console.log("connected");
  });
  socket.emit("join-session", { sessionID: sessionID, title: title });
  socket.on("joined-session", () => {
    setLoading(false);
  });
  if (loading) {
    return (
      <div>
        <div
          className="flex justify-center items-center"
          style={{ height: "80vh" }}
        >
          <div className="loader ease-linear rounded-3xl border-8 border-t-8 border-gray-200 h-32 w-32 animate-spin"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 bg-slate-50" style={{ height: "70vh" }}>
      <Board socket={socket} />
      <Chatroom socket={socket} />
    </div>
  );
}

export default Session;
