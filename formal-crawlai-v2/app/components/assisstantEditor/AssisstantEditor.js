import './editor.css'

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
    <div className={`edit-container ${navOpen ? "nav-open" : ""}`}>

      <div className='asst-name-editor'>
        <h3 className='asst-name'>Assisstant Name</h3>
        <div className='name-form-container'>
          <form className='name-form' onSubmit={handleSubmit}>
            <input
              className="new-name"
              placeholder="Message Your Assisstant"
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              value={input}
            />
            <button type="submit" className="name-send-button">
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
          </form>
        </div>
      </div>

      <div className='asst-name-editor'>
        <h3 className='asst-name'>Assisstant Expertise</h3>
        <div className='name-form-container'>
          <form className='name-form' onSubmit={handleVectorSubmit}>
            <textarea
              className="new-name asst-skill"
              placeholder="Type here what you want your assisstant to be an expert on! for example, Become an expert at Pokemon Cards from the year 2005"
              onChange={handleVectorChange}
              onKeyDown={handleVectorKeyPress}
              value={vectorInput}
            />
            <button type="submit" className="name-send-button">
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default AssisstantEditor;