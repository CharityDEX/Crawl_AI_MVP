import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faCheck } from '@fortawesome/free-solid-svg-icons';

import { changeAsstName, buildVector, clearVector, logNewMessage, clearMessageLog } from '@/app/redux/slices/asstListSlice';

const randomNum = Math.floor(Math.random() * 15) + 10; // change this number to # links
const messages = [
  "Processing requested assistant...",
  "Estimated build time: 10 minutes",
  "Searching for websites",
  `Identified ${randomNum} Websites`,
  "Beginning scraping",
];
for (let i = 1; i <= randomNum; i++) {
  messages.push(`Extracting information from site ${i}/${randomNum}`);
}
messages.push("Building Vector Store");
messages.push("Assembling Assisstant");
messages.push("Assistant is ready!");

const AssisstantEditor = () => {
  const navOpen = useSelector(state => state.navBar.openNav);
  const asstEditorOpen = useSelector(state => state.editAsst.openEditor);
  const currentAssisstant = useSelector(state => state.asstList.currentAssisstant);
  const assisstants = useSelector(state => state.asstList.assisstants);
  
  let loggedMessages = assisstants[currentAssisstant].loggedMessages;
  let vectorBuilt = assisstants[currentAssisstant].vectorBuilt;

  const dispatch = useDispatch();

  const [input, setInput] = useState(currentAssisstant);
  const [vectorInput, setVectorInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [linkSubmit, setLinkSubmit] = useState('');
  const [timeoutIds, setTimeoutIds] = useState([]);
  const [topP, setTopP] = useState(0.5);
  const [temp, setTemp] = useState(0.5);

  const handleChange = (e) => {
    setInput(e.target.value);
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
    timeoutIds.forEach(clearTimeout);
    setTimeoutIds([]);
    dispatch(clearMessageLog());
    dispatch(clearVector());

    const newTimeoutIds = [];
    const currentAssisstantName = currentAssisstant;

    messages.forEach((message, index) => {
      const timeoutId = setTimeout(() => {
        dispatch(logNewMessage([message, currentAssisstantName]))
      }, index * 2000);
      newTimeoutIds.push(timeoutId);
    });

    setTimeoutIds(newTimeoutIds);
  };

  useEffect(() => {
    if (loggedMessages.length == messages.length) {
      dispatch(buildVector());
    }
  }, [loggedMessages])

  const handleLinkChange = (e) => {
    setLinkSubmit("");
    setLinkInput(e.target.value);
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    // send the link to the backend
    setLinkInput("");
    setLinkSubmit("Link is being processed and added to vector store");
  }

  const handlePChange = (event) => {
    setTopP(event.target.value);
  };

  const handleTempChange = (event) => {
    setTemp(event.target.value);
  };

  if (!asstEditorOpen) return null;
  
  return (
    <div className={`flex flex-col items-center p-4 mt-16 transition-all duration-300 ease-in-out
      ${navOpen 
        ? (vectorBuilt ? "translate-x-[55%] w-3/5" : "translate-x-[65%] w-full")
        : (vectorBuilt ? "translate-x-[30%] w-3/5" : "translate-x-1/2 w-full")}

      `}
    >

      {vectorBuilt &&
        <div className='w-4/5 flex flex-col items-start justify-around'>
          <h3 className='text-lg'>Assistant Name</h3>
          <div className='bg-slate-100 w-full rounded-3xl focus-within:ring-2 focus-within:ring-black'>
            <form className='flex flex-row justify-around' onSubmit={handleSubmit}>
              <input
                className="bg-transparent p-2 outline-none w-[86%] h-full text-lg"
                placeholder="Message Your Assisstant"
                onChange={handleChange}
                value={input}
              />
              <button type="submit" className="w-[8%] h-10 btns">
                <FontAwesomeIcon icon={faChevronUp} />
              </button>
            </form>
          </div>
        </div>
      }

      <div className='mt-4 w-4/5 flex flex-col items-start justify-around'>
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

      <div className={`mt-4 w-4/5 bg-slate-100 rounded-3xl overflow-y-auto
        ${vectorBuilt ? "h-32" : ""} 
        ${loggedMessages.length > 0 ? "p-2" : ""}`
      }>
        {loggedMessages.map((el, index) => (
          <div key={index} className='flex items-center'>
            <div className={vectorBuilt ? "" : "loader"}/>
            {vectorBuilt &&
              <FontAwesomeIcon icon={faCheck} className='p-2'/>
            }
            <p>{el}</p>
          </div>
        ))}
      </div>

      {vectorBuilt &&
        <div className='mt-4 w-4/5 flex flex-col items-start justify-around'>
          <h3 className='text-lg'>Add Extra Links</h3>
          <div className='bg-slate-100 w-full rounded-3xl focus-within:ring-2 focus-within:ring-black'>
            <form className='flex flex-row justify-around' onSubmit={handleLinkSubmit}>
              <input
                className="bg-transparent p-2 outline-none w-[86%] h-full text-lg"
                placeholder="Message Your Assisstant"
                onChange={handleLinkChange}
                value={linkInput}
              />
              <button type="submit" className="w-[8%] h-10 btns">
                <FontAwesomeIcon icon={faChevronUp} />
              </button>
            </form>
            {linkSubmit && <p className='text-lg p-2'>{linkSubmit}</p>}
          </div>
        </div>
      }

      {vectorBuilt &&
        <div className='mt-4 w-4/5 flex flex-col items-start justify-around'>
          <p className='text-lg'>Top P</p>
          <div className='bg-slate-100 w-full rounded-3xl flex justify-around items-center'>
            <input type='range' min="0" max="1" step="0.01" onChange={handlePChange}
              className='w-4/5 h-3 rounded-3xl cursor-pointer accent-slate-300 bg-white appearance-none'
              style={{
                background: `linear-gradient(to right, #cbd5e1 ${topP * 100}%, #ffffff ${topP * 100}%)`
              }}
            />
            <p>{topP}</p>
          </div>
        </div>
      }

      {vectorBuilt &&
        <div className='mt-4 w-4/5 flex flex-col items-start justify-around'>
          <p className='text-lg'>Temperature</p>
          <div className='bg-slate-100 w-full rounded-3xl flex justify-around items-center'>
            <input type='range' min="0" max="1" step="0.01" onChange={handleTempChange}
              className='w-4/5 h-3 rounded-3xl cursor-pointer accent-slate-300 bg-white appearance-none'
              style={{
                background: `linear-gradient(to right, #cbd5e1 ${temp * 100}%, #ffffff ${temp * 100}%)`
              }}
            />
            <p>{temp}</p>
          </div>
        </div>
      }

    </div>
  );
}

export default AssisstantEditor;