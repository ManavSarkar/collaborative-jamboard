import React, { useEffect, useState, useRef } from "react";
import Peer from "peerjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
const VoiceChat = ({ socket }) => {
  const peerRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const myStreamRef = useRef(null);
  const params = useParams();
  const [count, setCount] = useState(0);
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
      call.on("stream", (remoteStream) => {
        document.getElementsByTagName("audio")[count].srcObject = remoteStream;
        document.getElementsByTagName("audio")[count].play();
        document.getElementsByTagName("audio")[count].id = call.peer;
        setCount((count) => count + 1);
        console.log("count", count);
      });
    });
    socket.on("connected-users", (users) => {
      console.log("connected-users", users);
      for (let i = 0; i < users.length; i++) {
        connectToNewUser(users[i]["peerID"]);
      }
    });
    socket.on("user-joined", (user) => {
      connectToNewUser(user["peerID"]);
    });
  }, []);

  const connectToNewUser = (peerID) => {
    if (peerRef.current == null || peerRef.current.id === peerID) return;
    let userMedia = navigator.mediaDevices.getUserMedia({ audio: true });
    userMedia.then((stream) => {
      myStreamRef.current = stream;
      const call = peerRef.current.call(peerID, stream);
      if (call === undefined) return;
      call.on("stream", (remoteStream) => {
        document.getElementsByTagName("audio")[count].srcObject = remoteStream;
        document.getElementsByTagName("audio")[count].play();
        document.getElementsByTagName("audio")[count].id = peerID;
        setCount((count) => count + 1);
        console.log("count", count);
      });
    });
  };
  const handleMute = () => {
    myStreamRef.current.getAudioTracks()[0].enabled =
      !myStreamRef.current.getAudioTracks()[0].enabled;

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
      <div id="audios">
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
        <audio autoPlay></audio>
      </div>
      <FontAwesomeIcon icon={faMicrophone} className="mx-1" />
    </div>
  );
};

export default VoiceChat;
