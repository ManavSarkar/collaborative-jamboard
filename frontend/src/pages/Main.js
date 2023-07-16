import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Board from "../components/Board";
import Chatroom from "../components/Chatroom";

import io from "socket.io-client";
import { useEffect, useState } from "react";
import Utils from "../utils";
import { SOCKET_URL } from "../constants";
function Session() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const socket = io.connect(SOCKET_URL);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const getUser = async () => {
    let res = await new Utils().checkLogin();
    if (res[0]) {
      setUser(res[1]);
      joinSession(res[1]);
    } else {
      navigate("/login");
    }
  };

  const joinSession = (user) => {
    const sessionID = params.id;
    const title = searchParams.get("title");

    socket.emit("join-session", {
      sessionID: sessionID,
      title: title,
      userDetails: {
        name: user.name,
        email: user.email,
      },
    });
    socket.on("joined-session", () => {
      setLoading(false);
    });
  };
  useEffect(() => {
    getUser();
  }, []);
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
