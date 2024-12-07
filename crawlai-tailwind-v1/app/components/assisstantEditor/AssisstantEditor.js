// import './editor.css'

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { changeAsstName } from '@/app/redux/slices/asstListSlice';

const AssisstantEditor = () => {
  const navOpen = useSelector(state => state.navBar.openNav);
  const asstEditorOpen = useSelector(state => state.editAsst.openEditor);
  const { currentAssisstant } = useSelector(state => state.asstList);

  const dispatch = useDispatch();

  const [input, setInput] = useState(currentAssisstant);
  const [vectorInput, setVectorInput] = useState('');

  
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeAsstName(input));
  }

  useEffect(() => {
    setInput(currentAssisstant);
  }, [currentAssisstant])

  const handleVectorChange = (e) => {
    setVectorInput(e.target.value);
  };

  const handleVectorKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleVectorSubmit(e);
    }
  };

  const handleVectorSubmit = (e) => {
    e.preventDefault();
    // Communicate with backend here
    console.log(7);
  }

  if (!asstEditorOpen) return null;
  
  return (
    <div className={`flex flex-col w-full items-center p-4 mt-20 transition-transform duration-300 ease-in-out ${
      navOpen ? "translate-x-[15%]" : ""
    }`}>

      <div className='w-3/5 xl:w-1/2 flex flex-col items-start justify-around'>
        <h3 className='text-lg'>Assistant Name</h3>
        <div className='bg-slate-100 w-full rounded-3xl focus-within:ring-2 focus-within:ring-black'>
          <form className='flex flex-row justify-around' onSubmit={handleSubmit}>
            <input
              className="bg-transparent p-2 outline-none w-[86%] h-full text-lg"
              placeholder="Message Your Assisstant"
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              value={input}
            />
            <button type="submit" className="w-[8%] h-10 btns">
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
          </form>
        </div>
      </div>

      <div className='w-3/5 mt-6 xl:w-1/2 flex flex-col items-start justify-around'>
        <h3 className='text-lg'>Assistant Expertise</h3>
        <div className='bg-slate-100 w-full rounded-3xl focus-within:ring-2 focus-within:ring-black h-36'>
          <form className='flex flex-row justify-around items-center h-full' onSubmit={handleVectorSubmit}>
            <textarea
              className="bg-transparent p-2 outline-none w-[86%] h-full text-lg resize-none"
              placeholder="Type here what you want your assistant to be an expert on! for example, Become an expert at Pokemon Cards from the year 2005"
              onChange={handleVectorChange}
              onKeyDown={handleVectorKeyPress}
              value={vectorInput}
            />
            <button type="submit" className="w-[8%] h-10 btns">
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default AssisstantEditor;