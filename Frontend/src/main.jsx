import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from '../reportWebVitals';
import App from './App.jsx';
import { registerSW } from 'virtual:pwa-register';
// import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <App />
    {/* </AuthProvider> */}
  </React.StrictMode>
);
registerSW({ immediate: true });
reportWebVitals();
