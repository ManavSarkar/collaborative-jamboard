import Board from './Board';
import Chatroom from './Chatroom';
import '../styles/main.css';

function Main(prop)
{
    return(

        <div className="main">
            <div className='main-board'>
                <Board />
            </div>
            <Chatroom />
        </div>
    )
}

export default Main;