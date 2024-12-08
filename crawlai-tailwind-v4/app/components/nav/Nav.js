import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

import React, {useState} from "react";

import { useDispatch, useSelector } from 'react-redux'

import { addAssisstant, toggleChatList, setCurrentChat, setCurrentAssisstant, orderAssisstants } from "@/app/redux/slices/asstListSlice";
import { newChatHistory } from '@/app/redux/slices/currentChatSlice';
import { enterEditMode, exitEditMode } from '@/app/redux/slices/editAsstSlice';

const Nav = () => {
  const navOpen = useSelector(state => state.navBar.openNav);
  const assisstants = useSelector(state => state.asstList.assisstants);
  const openChatLists = useSelector(state => state.asstList.openChatLists);

  const [visibleChats, setVisibleChats] = useState({});

  const dispatch = useDispatch();

  const handleAddAssisstant = () => {
    dispatch(addAssisstant());
    dispatch(orderAssisstants());
    dispatch(enterEditMode());
  }

  const handleAssistantClick = (asstName) => {
    dispatch(toggleChatList(asstName));
  }

  const handleShowMore = (asstName) => {
    setVisibleChats((prev) => ({
      ...prev,
      [asstName]: (prev[asstName] || 5) + 5,
    }));
  };

  const handleChatClick = (chatName, asstName) => {
    dispatch(setCurrentChat(chatName));
    dispatch(setCurrentAssisstant(asstName));
    dispatch(newChatHistory());
    dispatch(exitEditMode());
  }

  const editBtnClick = (asstName) => {
    dispatch(setCurrentAssisstant(asstName));
    dispatch(enterEditMode());
  }

  return (
    <div className={`fixed z-20 top-20 bottom-0 w-1/4 lg:w-1/5 overflow-y-auto bg-white flex flex-col items-center transition-transform duration-300 border-r-2 border-r-slate-200 ease-in-out ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
      <div className='w-full mt-2 flex flex-col items-center justify-center'>
        <button onClick={handleAddAssisstant} className='btns w-[95%] h-9 text-base lg:text-lg hover:bg-slate-100'>
          Add Assistant
        </button>
      </div>

      <div className='w-full flex flex-col items-end justify-center'>
        {Object.entries(assisstants).map(([asstName, assisstant]) => {
          const chatLimit = visibleChats[asstName] || 5;
          const chatsToDisplay = assisstant.chats.slice(0, chatLimit);

          return (
            <div key={asstName} className='w-[90%]'>
              <div className='flex items-center justify-between rounded-3xl h-11 hover:bg-slate-200'>
                <div className='w-[80%] h-full p-2 rounded-3xl flex items-center justify-center hover:shadow-lg hover:bg-slate-100'>
                  <button onClick={() => handleAssistantClick(asstName)} className='text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis'>{asstName}</button>
                </div>
                <div className='h-full'>
                  <button className='h-full p-2 rounded-3xl flex items-center justify-center hover:shadow-lg hover:bg-slate-100 text-lg' onClick={() => editBtnClick(asstName)}>
                    <FontAwesomeIcon icon={faPencilAlt}/>
                  </button>
                </div>
              </div>

              <div className='w-full flex items-end justify-center'>
                {openChatLists[asstName] && (
                  <div className='flex flex-col w-[90%]'>
                    {chatsToDisplay.map((chat) => (
                      <button key={chat} onClick={() => handleChatClick(chat, asstName)} className='btns whitespace-nowrap overflow-hidden text-ellipsis hover:bg-slate-100'>{chat}</button>
                    ))}
                    {assisstant.chats.length > chatLimit && (
                      <button onClick={() => handleShowMore(asstName)} className='btns whitespace-nowrap overflow-hidden text-ellipsis hover:bg-slate-100'>
                        Show More
                        <FontAwesomeIcon icon={faChevronDown} className="text-slate-400 text-sm"/>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Nav;