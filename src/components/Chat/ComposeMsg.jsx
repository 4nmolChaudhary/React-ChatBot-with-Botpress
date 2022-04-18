import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import sendMessageToBot from '../../apis/sendMessageToBot'
import { SendIcon, MuteIcon, VolumeIcon } from '../../icons'
import { useSpeechSynthesis } from 'react-speech-kit'
import './chat.css'

function ComposeMsg({ setMessages, messages, setIsTyping, isMute, setIsMute }) {
  const [msg, setMessage] = useState('')
  const { speak } = useSpeechSynthesis()

  const sendMessage = () => {
    if (!msg.length) return
    const textMsg = {
      msg_id: nanoid(),
      message_type: 'text',
      msg_payload: msg,
      sender: 'YOU',
      bubble: messages[messages.length - 1]?.sender === 'YOU' ? 1 : 0,
    }
    setMessages([...messages, textMsg])
    sendToBot(textMsg)
    setMessage('')
  }

  const sendToBot = async textMsg => {
    setIsTyping(true)
    try {
      const payload = { type: 'text', text: msg }
      const res = await sendMessageToBot(payload)
      if (res.responses.length) {
        const texts = []
        res.responses.forEach((msg, index) => {
          if (index === 0) texts.push({ ...msg, bubble: 0, msg_id: nanoid(), message_type: msg.type, msg_payload: msg.text })
          else texts.push({ ...msg, bubble: 1, msg_id: nanoid(), message_type: msg.type, msg_payload: msg.text })
        })
        setMessages([...messages, textMsg, ...texts])
        textToSpeech(texts)
      }
    } catch (error) {}
    setIsTyping(false)
  }

  const onKeyUp = e => {
    e.keyCode === 13 && sendMessage()
  }

  const textToSpeech = texts => {
    if (isMute) return
    texts.forEach(async text => {
      console.log('speak', text)
      await speak({ text: text.text })
    })
  }

  return (
    <div className='compose-div'>
      <input placeholder='Enter your message here......' value={msg} onKeyUp={onKeyUp} onChange={e => setMessage(e.target.value)} />
      <button className='icon-button' onClick={() => setIsMute(!isMute)}>
        {isMute ? <MuteIcon /> : <VolumeIcon />}
      </button>
      <button onClick={sendMessage}>
        Send
        <SendIcon />
      </button>
    </div>
  )
}

export default ComposeMsg
