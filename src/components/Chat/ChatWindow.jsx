import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message'
import './chat.css'
import Typing from './Typing'

function ChatWindow({ messages, isTyping, setMessages, setIsTyping }) {
  //console.log(messages)
  return (
    <ScrollToBottom className='chat_window'>
      {messages.map(message => (
        <Message setMessages={setMessages} key={message.msg_id} message={message} messages={messages} setIsTyping={setIsTyping} />
      ))}
      {isTyping && <Typing />}
    </ScrollToBottom>
  )
}

export default ChatWindow
