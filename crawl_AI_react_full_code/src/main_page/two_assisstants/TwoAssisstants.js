import React from 'react';
import '../MainPage.css';
import Assistants from '../Assisstants';
import PromptArea from '../PromptArea';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="App">
      <button id="login-button" onClick={handleLoginRedirect}>
        Login/Sign Up
      </button>

      <div className="layout">
        <Assistants />
        <PromptArea promptNumber={1} />
        <PromptArea promptNumber={2} />
      </div>
    </div>
  );
}

export default MainPage;
