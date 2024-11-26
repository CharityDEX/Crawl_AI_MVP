import { useSelector } from 'react-redux'
import React, { useEffect, useRef } from 'react';

const ChatHistory = () => {
  const humanChat = useSelector(state => state.currentChat.humanChat);
  const aiChat = useSelector(state => state.currentChat.aiChat);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behaviour: "smooth" });
      console.log(humanChat[1]);
    }
  }, [humanChat, aiChat])

  return (
    <div className="chat-content">
      {humanChat.map((humanMessage, index) => (
        <React.Fragment key={index}>
          <div className='human-chat-container'>
            <p className="human-chat">{humanMessage}</p>
          </div>
          <br />
          <div className='ai-chat-container'>
            <p className="ai-chat">{aiChat[index]}</p>
          </div>
        </React.Fragment>
      ))}
      <br />
      <br />
      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatHistory;