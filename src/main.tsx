import "leaflet/dist/leaflet.css";
import "./leaflet-icon-fix";
import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { ConsentProvider } from "./app/consent/ConsentProvider";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConsentProvider>
      <App />
    </ConsentProvider>
  </React.StrictMode>
);
