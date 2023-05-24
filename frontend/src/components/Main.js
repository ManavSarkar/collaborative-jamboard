import Board from "./Board";
import Chatroom from "./Chatroom";

function Main() {
  return (
    <div className="grid grid-cols-3 bg-slate-50">
      <Board />

      <Chatroom />
    </div>
  );
}

export default Main;
