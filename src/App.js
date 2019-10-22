import React from 'react';
import logo from './logo.svg';
import './App.css';
import GridImages from './GridImages';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GridImages></GridImages>
      </header>
    </div>
  );
}

export default App;
