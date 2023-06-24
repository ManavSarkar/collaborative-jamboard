import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { useMemo } from 'react'

import io from 'socket.io-client'

const socket = io.connect('http://localhost:8080')

function Chat() {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        author: socket.id.toString(),
        message: currentMessage,
        date:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes() +
          ':' +
          new Date(Date.now()).getSeconds(),
      }
      await socket.emit('send_message', messageData)
      setMessageList((list) => [...list, messageData])
      setCurrentMessage('')
    }
  }

  useMemo(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  return (
    <div className="max-w-lg mx-auto " style={{ height: '83%' }}>
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
        </div>
        <div className="px-6 py-4">
          <ul className="space-y-4">
            {/* Message List */}
            {messageList.map((message, index) => (
              <li
                className={
                  'chat' +
                  (message.author === socket.id ? 'chat-end' : ' chat-start')
                }
                key={index}
              >
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={message.author}
                    alt={message.author}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {message.author.name}
                  </p>
                  <p className="text-sm text-gray-700">{message.message}</p>
                  <p className="text-xs text-gray-500">{message.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 py-4 bg-gray-100">
          <div className="flex space-x-3">
            <input
              className="flex-grow border border-gray-300 rounded-md py-2 px-4"
              type="text"
              placeholder="Type a message..."
              value={currentMessage}
              onChange={(event) => setCurrentMessage(event.target.value)}
              onKeyPress={(event) =>
                event.key === 'Enter' ? sendMessage() : null
              }
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
