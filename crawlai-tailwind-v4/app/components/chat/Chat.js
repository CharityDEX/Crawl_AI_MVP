// import './chatStyles.css';

import React from 'react'

import Header from './Header.js';
import Input from './Input.js';
import ChatHistory from './ChatHistory.js'
import { useSelector } from 'react-redux';

const Chat = () => {
  const height = useSelector(state => state.height.height);
  const navOpen = useSelector(state => state.navBar.openNav);
  const asstEditorOpen = useSelector(state => state.editAsst.openEditor);

  const currentAssisstant = useSelector(state => state.asstList.currentAssisstant);
  const assisstants = useSelector(state => state.asstList.assisstants);
  let vectorBuilt = assisstants[currentAssisstant].vectorBuilt;


  if (asstEditorOpen && !vectorBuilt) {
    return (
      <div className="w-full flex flex-col">
        <Header />
      </div>
    )
  }

  console.log(height);

  return (
    <div className="w-full flex flex-col h-screen">
      <Header />
      <div
        className={`flex-1 w-3/5 flex flex-col mt-20 transition-transform duration-300 ease-in-out 
          ${navOpen 
            ? (asstEditorOpen ? "translate-x-[60%]" : "translate-x-1/2")
            : (asstEditorOpen ? "translate-x-[40%]" : "translate-x-1/3")}
        `}
      >
        <div
          className="overflow-y-auto mx-auto w-full"
          style={{ height: `calc(100vh - 80px - ${height + 30}px)` }}
        >
          <ChatHistory />
        </div>
        <Input />
      </div>
    </div>
  );
}

export default Chat;