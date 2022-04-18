import React, { useState } from 'react'
import Header from './components/Header/Header'
import ChatWindow from './components/Chat/ChatWindow'
import ComposeMsg from './components/Chat/ComposeMsg'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [isMute, setIsMute] = useState(true)

  return (
    <div className='App'>
      <Header />
      <ChatWindow setMessages={setMessages} messages={messages} isTyping={isTyping} setIsTyping={setIsTyping} />
      <ComposeMsg setMessages={setMessages} messages={messages} setIsTyping={setIsTyping} setIsMute={setIsMute} isMute={isMute} />
    </div>
  )
}

export default App
