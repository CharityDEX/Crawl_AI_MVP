import './nav.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import React, {useState} from "react";

import { useDispatch, useSelector } from 'react-redux'

import { addAssisstant, toggleChatList, setCurrentChat, setCurrentAssisstant } from "@/app/redux/slices/asstListSlice";
import { newChatHistory } from '@/app/redux/slices/currentChatSlice';

const Nav = () => {
  const navOpen = useSelector(state => state.navBar.openNav);
  const { assisstants, openChatLists } = useSelector(state => state.asstList);

  const [visibleChats, setVisibleChats] = useState({});

  const dispatch = useDispatch();

  const handleAddAssisstant = () => {
    dispatch(addAssisstant());
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

  if (!navOpen) return null;

  const handleChatClick = (chatName, asstName) => {
    dispatch(setCurrentChat(chatName));
    dispatch(setCurrentAssisstant(asstName));
    dispatch(newChatHistory());
  }

  return (
    <div className="nav-container">
      <div className='add-asst-container'>
        <button onClick={handleAddAssisstant} className='add-asst-btn'>
          Add Assisstant
        </button>
      </div>

      <div className='asst-list-container'>
        {Object.entries(assisstants).map(([asstName, assisstant]) => {
          const chatLimit = visibleChats[asstName] || 5;
          const chatsToDisplay = assisstant.chats.slice(0, chatLimit);

          return (
            <div key={asstName} className='asst-details-container'>
              <div className='asst-details'>
                <div className='asst-btn-container'>
                  <button onClick={() => handleAssistantClick(asstName)} className='asst-btn'>{asstName}</button>
                </div>
                <div className='edit-btn-container'>
                  <button className='edit-btn'>edit</button>
                </div>
              </div>

              {openChatLists[asstName] && (
                <div className='navChat-btns-container'>
                  {chatsToDisplay.map((chat) => (
                    <button key={chat} onClick={() => handleChatClick(chat, asstName)} className='navChat-btn'>{chat}</button>
                  ))}
                  {assisstant.chats.length > chatLimit && (
                    <button onClick={() => handleShowMore(asstName)} className='show-more-btn'>
                      Show More
                      <FontAwesomeIcon icon={faChevronDown} className="down-carat"/>
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Nav;