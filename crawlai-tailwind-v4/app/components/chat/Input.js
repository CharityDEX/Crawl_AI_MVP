import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { addHumanMessage, addAiMessage } from '../../redux/slices/currentChatSlice';
import { updateHeight } from '../../redux/slices/heightSlice';
import { orderChats, orderAssisstants } from '@/app/redux/slices/asstListSlice';

const Input = () => {
  const [input, setInput] = useState('');
  const height = useSelector(state => state.height.height);
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      dispatch(addHumanMessage(input));
      dispatch(addAiMessage());
      setInput('');
      dispatch(updateHeight(60));
      // define these dispatches in asstListSlice
      dispatch(orderChats());
      dispatch(orderAssisstants());
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    const scrollHeight = inputRef.current.scrollHeight;
    const maxHeight = window.innerHeight * 0.3;
    dispatch(updateHeight(scrollHeight > maxHeight ? maxHeight : scrollHeight));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className='w-full flex items-center justify-center fixed bottom-0' style={{height: `${height + 30}px`}}>
      <form onSubmit={handleSubmit} className='bg-slate-100 w-full flex items-center justify-around rounded-3xl mb-2 focus-within:ring-2 focus-within:ring-black'>
        <textarea
          ref={inputRef}
          className="w-[86%] rounded-2xl resize-none bg-inherit text-lg outline-none p-2"
          placeholder="Message Your Assisstant"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          style={{height: `${height}px`}}
        />
        <button type="submit" className="w-[8%] h-10 btns">
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      </form>
    </div>
  );
};

export default Input;
