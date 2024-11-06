import React from "react";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add your login validation logic here
    if (username && password) {
      // Redirect to MainPage upon successful login
      navigate('/twoAssisstants');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="layout">
      <div className="command-prompt">
        <h1>Crawl AI Login</h1>
        <div id="login-form" className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button id="login-button" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
