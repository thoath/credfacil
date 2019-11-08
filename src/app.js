import React from 'react';
import './app.css';
import logo from './assets/logo.png';
import Routes from './routes';

function App() {
  return (
    <div className="container">
        <img src={logo} alt="credifacil"/>
        <div className="content">
          <Routes />
        </div>
    </div>
    );
}

export default App;