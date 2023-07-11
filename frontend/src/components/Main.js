import Board from './Board'
import Chatroom from './Chatroom'
import VoiceChat from './VoiceChat'

function Main() {
  return (
    <div className="grid grid-cols-3 bg-slate-50" style={{ height: '75vh' }}>
      <Board />
      <Chatroom />
    </div>
  )
}

export default Main
