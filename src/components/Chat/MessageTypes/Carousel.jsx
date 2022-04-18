import React from 'react'
import { nanoid } from 'nanoid'
import sendMessageToBot from '../../../apis/sendMessageToBot'

function Carousel({ message, setMessages, messages, setIsTyping }) {
  const car_message = message.elements || message.items
  //
  const sendData = data => {
    const msg = {
      msg_id: nanoid(),
      message_type: 'text',
      msg_payload: data.title,
      sender: 'YOU',
      bubble: 0,
      data,
    }
    setMessages([...messages, msg])
    sendToBot(msg)
  }
  //
  const sendToBot = async textMsg => {
    console.log('send to bot', textMsg)
    setIsTyping(true)
    try {
      const payload = { type: 'text', text: textMsg.data.payload }
      const res = await sendMessageToBot(payload)
      console.log(res.responses)
      if (res.responses.length) {
        const texts = []
        res.responses.forEach((msg, index) => {
          if (index === 0) texts.push({ ...msg, bubble: 0, msg_id: nanoid(), message_type: msg.type, msg_payload: msg.text })
          else texts.push({ ...msg, bubble: 1, msg_id: nanoid(), message_type: msg.type, msg_payload: msg.text })
        })
        //console.log(messages)
        setMessages([...messages, textMsg, ...texts])
      }
    } catch (error) {}
    setIsTyping(false)
  }

  const Button = ({ button }) => (
    <button className='carousel-button' onClick={() => sendData(button)}>
      {button.title}
    </button>
  )

  const Card = ({ element, message }) => {
    const buttons = element.buttons || element.actions
    return (
      <div className={`chat_bubble _${message.bubble}-bot carousel`}>
        <div>{element.title}</div>
        <div className='carousel-options'>
          {buttons?.map((element, i) => (
            <Button key={i} button={element} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {car_message.map((element, i) => (
        <Card key={i} element={element} message={message} />
      ))}
    </div>
  )
}

export default Carousel
