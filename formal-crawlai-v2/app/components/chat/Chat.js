import './chatStyles.css';

import React from 'react'

import Header from './Header.js';
import Input from './Input.js';
import ChatHistory from './ChatHistory.js'
import { useSelector } from 'react-redux';

const Chat = () => {
  const height = useSelector(state => state.height.height);
  const navOpen = useSelector(state => state.navBar.openNav);
  const asstEditorOpen = useSelector(state => state.editAsst.openEditor);

  if (asstEditorOpen) {
    return (
      <div className='chat-container'>
        <Header />
      </div>
    )
  }

  return (
    <div className="chat-container">
      <Header />
      <div className={`chat-body ${navOpen ? "nav-open" : ""}`} style={{height: `calc(100% - max(8vh, 50px) - ${height - 30}px)`}}>
        <div className='chat-history-container'>
          <ChatHistory />
        </div>
        <div className={`input-container ${navOpen ? "nav-open" : ""}`} style={{height: `${height + 30}px`}}>
          <Input />
        </div>
      </div>

    </div>
  );
}

export default Chat;