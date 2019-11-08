  
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '610px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
 
const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));