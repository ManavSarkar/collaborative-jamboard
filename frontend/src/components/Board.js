import React from "react";
import Tools from "./Tools";
import '../styles/main.css';

function Board(){
    return(
       <div className="board">
           <Tools />
           <div>WhiteBoard</div>
       </div>
    )
}

export default Board;