import React from 'react'
import Message from './Message'

const MessagesList = ({
                         messages,
    checkboxChange,
    starChange,
    messageBodyChange
                     }) => (
    <div>
        {messages.map(message =>
            <Message
                key={message.id}
                id={message.id}
                message={message}
                checkboxChange={checkboxChange}
                starChange={starChange}
                messageBodyChange={messageBodyChange}
            />)}
    </div>
)

export default MessagesList
