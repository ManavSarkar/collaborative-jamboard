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
  const [audioElements, setAudioElements] = useState([]);
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
        connectToNewUser(user["peerID"]);
      });
    });

    socket.on("user-joined", (user) => {
      connectToNewUser(user["peerID"]);
    });
  }, []);

  const connectToNewUser = (peerID) => {
    if (peerRef.current == null || peerRef.current.id === peerID) return;
    const call = peerRef.current.call(peerID, myStreamRef.current);
    if (call === undefined) return;
    console.log("peerID", peerID);
    call.on("stream", (remoteStream) => {
      // remoteAudioRef.current.srcObject = remoteStream;
      // remoteAudioRef.current.play();
      // append audio element to container with id audios
      const audioEl = document.createElement("audio");
      audioEl.id = peerID;
      audioEl.srcObject = remoteStream;
      audioEl.play();
      setAudioElements([...audioElements, audioEl]);
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
        {audioElements.map((audioEl) => {
          return audioEl;
        })}
      </div>
      <FontAwesomeIcon icon={faMicrophone} className="mx-1" />
    </div>
  );
};

export default VoiceChat;
