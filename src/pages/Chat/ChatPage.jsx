import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import './index.css'
import io from "socket.io-client"


let ChatPage = () => {
	const [socket, setSocket] = React.useState(null);

	React.useEffect(() => {
		const newSocket = io(`http://localhost:4000`);
		setSocket(newSocket);
		return () => newSocket.close();
	}, [setSocket]);
	const location = useLocation()
	const [datas, setData] = React.useState([])
	const navigate = useNavigate()
	const [typingStatus, setTypingStatus] = React.useState('')
	
	const token = localStorage.getItem('token')
	console.log(socket)

	React.useEffect(() => {
		if(token) return;
		navigate('/')
	}, [token])
	return (<React.Fragment>
		 {socket
		 	? <div className="chat">
				<ChatBar socket={socket}/>
				<div className='chat__main'>
					<ChatBody socket={socket} typingStatus={typingStatus} />
					<ChatFooter socket={socket}/>
				</div>
			</div>
		 	: <p>Not connected</p>
		 }
	</React.Fragment>)
}

export default ChatPage