import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Assistants() {
  const [assistants, setAssistants] = useState(["skiing", "jumping", "flying"]);
  const navigate = useNavigate();

  const addAssistant = () => {
    if (assistants.length < 5) {
      setAssistants([...assistants, `Assistant: ${assistants.length + 1}`]);
    } else {
      navigate("/subscribe");
    }
  };

  const handleDelete = (event) => {
    setAssistants(assistants.filter((assistant) => assistant !== event.target.id));
  };

  return (
    <div className="assistants-list">
      <h2>AI Assistants</h2>
      <ul id="assistants" className="scrollable-list">          
        {assistants.map((el) => (
          <li key={el}>
            {`Assistant: ${el}`} 
            <button className="delete-button" id={el} onClick={handleDelete}>X</button>
          </li>
        ))}
      </ul>
      <button id="add-assistant" onClick={addAssistant}>
        Add Assistant
      </button>
    </div>
  );
}

export default Assistants;
