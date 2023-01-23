import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import selectorMainExtract from 'components/Store/main/selectors/extract.js';

const ChatFooter = ({socket}) => {
    const data = useSelector(selectorMainExtract(['test', 'list', 'user', 'data']))
    const [message, setMessage] = useState("")

    const handleSendMessage = (e) => {
        e.preventDefault()
        if(message.trim() && data) {
        socket.emit("new-message-to-server", 
            {
            text: message, 
            name: data.username, 
            avatar: data.image,
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id
            }
        )
        }
        setMessage("")
    }
  return (
    <div className='chat__footer'>
        <form className='form' onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder='Write message' 
            className='message' 
            value={message} 
            onChange={e => setMessage(e.target.value)}
            />
            <button className="sendBtn">SEND</button>
        </form>
     </div>
  )
}

export default ChatFooter