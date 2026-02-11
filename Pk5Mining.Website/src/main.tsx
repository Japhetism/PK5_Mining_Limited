import "leaflet/dist/leaflet.css";
import "./leaflet-icon-fix";
import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
