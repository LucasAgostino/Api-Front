// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Importa el Provider
import {store} from './api/Store'; // Asegúrate de que el camino al store sea correcto
import App from './App';
import './style.css'; // Importar estilos aquí

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Envuelve App con Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
);
