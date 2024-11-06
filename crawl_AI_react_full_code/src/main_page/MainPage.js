import React from "react";
import "./MainPage.css"
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const redirectToTwoAssisstants = () => {
    navigate("/twoAssisstants");
  }

  const redirectToOneAssisstant = () => {
    navigate("/oneAssisstant");
  }

  return (
    <div className="landing-container">
        <h1>Welcome to CrawlAI!</h1>
        <p>Experience the future of AI assistance. Ready to start?</p>
        <button id="try-now-button" onClick={redirectToTwoAssisstants}>Two Assisstants</button>
        <button id="try-now-button" onClick={redirectToOneAssisstant}>One Assisstant</button>
    </div>
  );
}

export default MainPage;