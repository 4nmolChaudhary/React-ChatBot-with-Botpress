import React from 'react'

function Image({ message }) {
  const src = message.image || message.url
  return <img src={src} className={message.sender === 'YOU' ? `chat_bubble by-you _${message.bubble}-you` : `chat_bubble _${message.bubble}-bot`} />
}

export default Image
