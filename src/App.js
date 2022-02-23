import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='weather-container'>
        <h1>Weather</h1>
        <div className='input-container'>
          <input className='input' type='text' name='search' value='' />
          <button>Search</button>
        </div>
      </div>
      <div className='display-data'>Weather info goes here</div>
    </div>
  );
}

export default App;
