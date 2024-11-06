import React from "react";
import { useNavigate } from 'react-router-dom';

const Subscribe = () => {
  
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="subscription-page">
        <h1>Upgrade Your CrawlAI Plan</h1>
        <p>You've reached the free limit of AI Assistants.</p>
        <p>To add more, consider subscribing to a premium plan.</p>
        <button onClick={goBack}>Subscribe Now</button>
        <p>Currently, the button just takes you back to wherever you came from</p>
    </div>
  )
}

export default Subscribe;