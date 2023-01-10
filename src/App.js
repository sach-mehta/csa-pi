import React from 'react';
import './styles/style.css'
import Pi from './components/Game/pi';
const App = () => (
  <div className="wrapper">
    <h1>π game</h1>
    <div className="instruction">
      <div className="keys"><kbd>&#8593;</kbd><kbd>&#8592;</kbd><kbd>&#8595;</kbd><kbd>&#8594;</kbd></div>
      <div className="text">Use the arrow keys to move the π.<br />Remain undetected for as long as possible.</div>
    </div>
    <Pi></Pi>
  </div>
);

export default App;
