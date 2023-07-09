import React, { useEffect, useState, useRef } from 'react'
import Peer from 'peerjs'
import io from 'socket.io-client'
const VoiceChat = () => {
  const [remotePeerID, setRemotePeerID] = useState('')
  const peerRef = useRef(null)
  const remoteAudioRef = useRef(null)
  const [audioStreams, setAudioStreams] = useState(new Map())
  const [connections, setConnections] = useState([])

  useEffect(() => {
    const peer = new Peer()
    const socket = io.connect('http://localhost:5000')

    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id)
      socket.emit('user-add', { peerID: peer.id })
    })
    peer.on('call', (call) => {
      var userMedia = navigator.mediaDevices.getUserMedia({ audio: true })
      userMedia.then((stream) => {
        call.answer(stream)
      })
    })
    peerRef.current = peer

    socket.on('connected-users', (users) => {
      console.log('connected-users', users)
      users.forEach((user) => {
        connectToNewUser(user['socketID'], user['peerID'])
      })
    })

    socket.on('user-joined', (user) => {
      connectToNewUser(user['socketID'], user['peerID'])
    })
  }, [])

  const connectToNewUser = (socketID, peerID) => {
    var userMedia = navigator.mediaDevices.getUserMedia({ audio: true })
    userMedia
      .then((stream) => {
        const call = peerRef.current.call(peerID, stream)
        call.on('stream', (remoteStream) => {
          remoteAudioRef.current.srcObject = remoteStream
          remoteAudioRef.current.play()
        })

        setConnections((prevConnections) => [...prevConnections, call])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <audio ref={remoteAudioRef} autoPlay />
    </div>
  )
}

export default VoiceChat
