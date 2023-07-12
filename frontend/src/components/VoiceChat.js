import React, { useEffect, useState, useRef } from "react";
import Peer from "peerjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
const VoiceChat = ({ socket }) => {
  const [remotePeerID, setRemotePeerID] = useState("");
  const peerRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const [audioStreams, setAudioStreams] = useState(new Map());
  const [connections, setConnections] = useState([]);
  const [muted, setMuted] = useState(false);
  const myStreamRef = useRef(null);
  const params = useParams();
  useEffect(() => {
    let userMedia = navigator.mediaDevices.getUserMedia({ audio: true });

    userMedia
      .then((stream) => {
        myStreamRef.current = stream;
      })
      .catch((err) => {
        console.log(err);
      });

    const peer = new Peer();

    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      socket.emit("user-add", { peerID: peer.id, roomID: params.id });
      peerRef.current = peer;
    });
    peer.on("call", (call) => {
      call.answer(myStreamRef.current);
    });

    socket.on("connected-users", (users) => {
      console.log("connected-users", users);
      users.forEach((user) => {
        connectToNewUser(user["socketID"], user["peerID"]);
      });
    });

    socket.on("user-joined", (user) => {
      connectToNewUser(user["socketID"], user["peerID"]);
    });
  }, []);

  const connectToNewUser = (socketID, peerID) => {
    if (peerRef.current == null || peerRef.current.id === peerID) return;
    const call = peerRef.current.call(peerID, myStreamRef.current);
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

    alert(myStreamRef.current.getAudioTracks()[0].enabled);
    setMuted(!muted);
  };
  return (
    <div
      className={
        "btn btn-outline mx-4 w-40" + (muted ? " btn-error " : " btn-success")
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
