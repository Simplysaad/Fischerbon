import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from '../reportWebVitals';
import App from './App.jsx';
// import App from './App.jsx';
import { registerSW } from 'virtual:pwa-register';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

registerSW({ immediate: true });
reportWebVitals();
