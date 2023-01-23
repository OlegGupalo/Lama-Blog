import React from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector} from 'react-redux'
import { Avatar } from '@mui/material'
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/ru'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Loader from 'components/Loader';
import { TypographyText } from 'components/Typography'

const formatter = buildFormatter(frenchStrings)

const ChatBody = ({socket, typingStatus}) => { 
  const navigate = useNavigate()
  const data = useSelector(selectorMainExtract(['test', 'list', 'user', 'data']))
  const [messages, setMessages] = React.useState([])
  const lastMessageRef = React.useRef(null)
  console.log("Data", data)

  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")
    window.location.reload()
  }

  React.useEffect(() => {
    socket.on('all-messages-to-client', data => {
      setMessages(data)
    })
    return () => socket.off('all-messages-to-client');
  }, [socket, messages])

  React.useEffect(() => {
    socket.on('new-message-to-client', data => {
      setMessages(state => [
        ...state,
        {
          sender: data.sender,
          message: data.message,
          image: data.image,
          id: data.id,
          date: data.date  
        }
        
      ])
      console.log("message NEW", messages)
    })
    return () => socket.off('new-message-to-client');
  }, [socket, messages])

  React.useEffect(() => {
      lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  console.log(messages)

  
  return (
    <>
      <header className='chat__mainHeader'>
          <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
        </header>
        <div className='message__container'>
            {data === null || data === undefined
              ? <Loader />
              : Array.isArray(messages)
                ? messages.length >= 0
                    ? messages.map(item => (
                        item.sender === data.username ? (
                          <div className="message__chats" key={item.id}>
                            <p className='sender__name'>You</p>
                            <div className='message__sender'>
                                <TypographyText>{item.message}</TypographyText>
                                <TimeAgo className='date_message' date={item.date} formatter={formatter} />

                            </div>

                          </div>
                        ): 
                          <div className="message__chats" key={item.id}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center'
                            }}>
                            <Avatar 
                              src={`http://localhost:4200/files/avatars/${item.image}`}
                              sx={{
                                  width: 60,
                                  height: 60
                                }} alt="" />
                              <div style={{
                                marginLeft: '0.5rem'
                              }}>
                                <p>{item.sender}</p>
                                <div className='message__recipient'>
                                    <TypographyText>{item.message}</TypographyText>
                                </div>
                              <TimeAgo className='date_message' date={item.date} formatter={formatter} />
                              </div>
                            </div>
                          </div>
                      ))
                  : <React.Fragment></React.Fragment>
                : <Loader visible={!Array.isArray(messages)}/>
              }
            

          <div className='message__status'>
            <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef} />   
        </div>
    </>
  )
}

export default ChatBody