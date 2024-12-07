import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faCommentMedical, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useRouter } from "next/navigation";

import { buttonPressed } from '@/app/redux/slices/navBarSlice'
import { addChat } from '@/app/redux/slices/asstListSlice'
import { newChatHistory } from '@/app/redux/slices/currentChatSlice';
import { exitEditMode } from '@/app/redux/slices/editAsstSlice';
import { logout } from '@/app/redux/slices/loginSlice';

const Header = () => {
  const currentAssisstant = useSelector(state => state.asstList.currentAssisstant);
  const currentChat = useSelector(state => state.asstList.currentChat);
  const loggedIn = useSelector(state => state.login.loggedIn);

  const dispatch = useDispatch();
  const router = useRouter();
  
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

  const handleLogin = () => {
    if (loggedIn) {
      dispatch(logout());
      window.location.reload();
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="w-full h-20 fixed top-0 flex items-center justify-around z-10 bg-slate-100">
      <div className="w-1/5 xl:w-1/6 ml-6 h-full flex justify-between items-center">
        <button className="btns text-2xl w-12 h-1/2" onClick={handleNavPress}>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
        <button className="btns text-2xl w-12 h-1/2">
          <FontAwesomeIcon icon={faCommentMedical} onClick={addChatPress}/>
        </button>
        <button className='btns text-lg w-28 h-1/2'>GPT-4o
          <FontAwesomeIcon icon={faChevronDown} className="text-slate-400 text-sm"/>
        </button>
      </div>
      <div className='w-1/2 h-full flex justify-center items-center'>
        <h2 className='text-2xl'>{`${currentAssisstant} - ${currentChat}`}</h2>
      </div>
      <div className='w-1/5 xl:w-1/6 mr-6 h-full flex items-center justify-center'>
        <button className='w-24 h-1/2 text-xl btns' onClick={handleLogin}>{loggedIn ? "Logout" : "Login"}</button>
      </div>
    </div>
  );
}

export default Header;