import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="btn-google-auth"
          href="/auth/google"
        >
          Sign In With Google
        </a>
        <a
          className="btn-fb-auth"
          href="/auth/facebook"
        >
          Sign In With Facebook
        </a>
      </header>
    </div>
  );
}

export default App;
