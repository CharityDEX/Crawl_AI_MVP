import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faCommentMedical, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { buttonPressed } from '@/app/redux/slices/navBarSlice'
import { addChat } from '@/app/redux/slices/asstListSlice'
import { newChatHistory } from '@/app/redux/slices/currentChatSlice';
import { exitEditMode } from '@/app/redux/slices/editAsstSlice';

const Header = () => {
  const currentAssisstant = useSelector(state => state.asstList.currentAssisstant);
  const currentChat = useSelector(state => state.asstList.currentChat);

  const dispatch = useDispatch();
  
  const handleNavPress = (e) => {
    e.preventDefault();
    dispatch(buttonPressed())
  }

  const addChatPress = (e) => {
    e.preventDefault();
    dispatch(addChat(currentAssisstant));
    dispatch(newChatHistory());
    dispatch(exitEditMode());
  }

  return (
    <div className="header">
      <div className="chat-btns-container">
        <button className="open-sidebar" onClick={handleNavPress}>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
        <button className="new-chat">
          <FontAwesomeIcon icon={faCommentMedical} onClick={addChatPress}/>
        </button>
        <button className='change-model'>GPT-4o
          <FontAwesomeIcon icon={faChevronDown} className="down-carat"/>
        </button>
      </div>
      <div className='assisstant-name-container'>
        <h2 className='assisstant-name'>{`${currentAssisstant} - ${currentChat}`}</h2>
      </div>
      <div className='login-btn-container'>
        <button className='login-btn'>Login</button>
      </div>
    </div>
  );
}

export default Header;