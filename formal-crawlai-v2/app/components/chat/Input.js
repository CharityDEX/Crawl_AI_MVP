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
    <div className='form-container' style={{height: `${height}px`}}>
      <form onSubmit={handleSubmit} className='input-form'>
        <textarea
          ref={inputRef}
          className="input-field"
          placeholder="Message Your Assisstant"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          style={{height: `${height}px`}}
        />
        <button type="submit" className="send-button">
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      </form>
    </div>
  );
};

export default Input;
