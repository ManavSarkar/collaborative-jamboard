import { faComment, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Members from "./Members";
import Chat from "./Chat";

function Chatroom() {
  const [chatRoom, setChatRoom] = useState(false);
  const [buttonText, setButtonText] = useState("Chat with Everyone");
  const [icon, setIcon] = useState(
    <FontAwesomeIcon icon={faComment} className="mx-2" />
  );

  const handleClick = () => {
    if (chatRoom === false) {
      setChatRoom(true);
      setButtonText("Chat with Everyone");
      setIcon(<FontAwesomeIcon icon={faComment} className="mx-2" />);
    } else {
      setChatRoom(false);
      setButtonText("Joined Members");

      setIcon(<FontAwesomeIcon icon={faUserGroup} className="mx-1" />);
    }
  };
  return (
    <div className="w-full bg-slate-50 min-h-screen pt-10">
      <div className=" bg-slate-50 h-3/4 text-black border-black border-2 my-8  mx-10">
        {chatRoom === false ? <Members></Members> : <Chat></Chat>}
      </div>
      <div className="flex justify-center items-center">
        <button
          className="btn btn-outline btn-primary w-72"
          onClick={handleClick}
        >
          {buttonText} {icon}
        </button>
      </div>
    </div>
  );
}

export default Chatroom;
