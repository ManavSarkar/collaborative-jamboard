import React, { useEffect, useState, useRef } from "react";
import Peer from "peerjs";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
const VoiceChat = () => {
  const [remotePeerID, setRemotePeerID] = useState("");
  const peerRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const [audioStreams, setAudioStreams] = useState(new Map());
  const [connections, setConnections] = useState([]);
  const [muted, setMuted] = useState(true);
  const myStreamRef = useRef(null);
  useEffect(() => {
    let userMedia = navigator.mediaDevices.getUserMedia({ audio: true });
    let myStream = null;
    userMedia
      .then((stream) => {
        myStreamRef.current = stream;
        myStream = stream;
      })
      .catch((err) => {
        console.log(err);
      });

    const peer = new Peer();
    const socket = io.connect("http://localhost:5000");

    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      socket.emit("user-add", { peerID: peer.id });
    });
    peer.on("call", (call) => {
      call.answer(myStream);
    });
    peerRef.current = peer;

    socket.on("connected-users", (users) => {
      console.log("connected-users", users);
      users.forEach((user) => {
        connectToNewUser(user["socketID"], user["peerID"], myStream);
      });
    });

    socket.on("user-joined", (user) => {
      connectToNewUser(user["socketID"], user["peerID"], myStream);
    });
  }, []);

  const connectToNewUser = (socketID, peerID, myStream) => {
    const call = peerRef.current.call(peerID, myStream);
    if (call === undefined) return;
    call.on("stream", (remoteStream) => {
      remoteAudioRef.current.srcObject = remoteStream;
      remoteAudioRef.current.play();
    });

    setConnections((prevConnections) => [...prevConnections, call]);
  };
  const handleMute = () => {
    myStreamRef.current.getAudioTracks()[0].enabled =
      !myStreamRef.current.getAudioTracks()[0].enabled;
    setMuted(!muted);
  };
  return (
    <div
      className={
        "btn btn-error mx-4 w-40" + (muted ? " btn-active" : " btn-outline")
      }
      onClick={handleMute}
    >
      <button>Mute</button>
      <audio ref={remoteAudioRef} autoPlay />
      <FontAwesomeIcon icon={faMicrophone} className="mx-1" />
    </div>
  );
};

export default VoiceChat;
