import React, { useEffect, useState, useRef } from 'react'
import Peer from 'peerjs'

const VoiceChat = () => {
  const [remotePeerID, setRemotePeerID] = useState('')
  const peerRef = useRef(null)
  const myAudioRef = useRef(null)
  const remoteAudioRef = useRef(null)
  useEffect(() => {
    const peer = new Peer()

    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id)
    })
    peer.on('call', (call) => {
      var userMedia = navigator.mediaDevices.getUserMedia({ audio: true })
      userMedia.then((stream) => {
        call.answer(stream)
      })
    })
    peerRef.current = peer
    // get id on launch
    let id = prompt('Enter peer ID', '')
    if (id !== 'a') {
      connectToNewUser(id)
    }
  }, [])

  const connectToNewUser = (id) => {
    var userMedia = navigator.mediaDevices.getUserMedia({ audio: true })
    userMedia
      .then((stream) => {
        const call = peerRef.current.call(id, stream)
        call.on('stream', (remoteStream) => {
          remoteAudioRef.current.srcObject = remoteStream
          remoteAudioRef.current.play()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <audio ref={myAudioRef} autoPlay />
      <audio ref={remoteAudioRef} autoPlay />
    </div>
  )
}

export default VoiceChat
