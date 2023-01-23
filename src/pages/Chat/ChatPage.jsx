import React from 'react'
import { useNavigate } from 'react-router-dom'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import './index.css'

let ChatPage = ({
	socket
}) => {
	const navigate = useNavigate()
	const [messages, setMessages] = React.useState([])
	const [typingStatus, setTypingStatus] = React.useState('')
	const lastMessageRef = React.useRef(null)
	const token = localStorage.getItem('token')

	React.useEffect(() => {
		if(token) return;
		navigate('/')
	}, [token])

	React.useEffect(() => {
    	// 👇️ scroll to bottom every time messages change
    	lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
 	}, [messages]);

	return (
		 <div className="chat">
			<ChatBar socket={socket}/>
			<div className='chat__main'>
				<ChatBody socket={socket} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
			<ChatFooter socket={socket}/>
		</div>
	</div>
	)
}

export default ChatPage