import Tools from './Tools';
import Chatroom from './Chatroom';
import '../styles/main.css';

function Main()
{
    return(

        <div className="main">
            <div className='main-board'>
                <Tools />
                <div className='whiteBoard'>WhiteBoard</div>
            </div>
            <Chatroom />
        </div>
    )
}

export default Main;