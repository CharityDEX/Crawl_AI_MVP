import { useSelector } from 'react-redux'
import React, { useEffect, useRef } from 'react';

const ChatHistory = () => {
  const humanChat = useSelector(state => state.currentChat.humanChat);
  const aiChat = useSelector(state => state.currentChat.aiChat);
  const height = useSelector(state => state.height.height);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [humanChat, aiChat, height])

  return (
    <div className="flex flex-col">
      {humanChat.map((humanMessage, index) => (
        <React.Fragment key={index}>
          <div className='w-full flex justify-end pr-1 mt-4'>
            <p className="w-3/4 bg-slate-100 rounded-3xl p-1 whitespace-pre-wrap break-words">{humanMessage}</p>
          </div>
          <br />
          <div className='w-full flex justify-start pl-1 -mt-2'>
            <p className="w-3/4 bg-white rounded-3xl p-1 whitespace-pre-wrap break-words">{aiChat[index]}</p>
          </div>
        </React.Fragment>
      ))}
      <br />
      <br />
      <div className='scroll-smooth duration-200' ref={bottomRef}></div>
    </div>
  );
}

export default ChatHistory;