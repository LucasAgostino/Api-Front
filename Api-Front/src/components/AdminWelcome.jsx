import React from 'react';
import './styles/AdminWelcome.css';

const AdminWelcome = () => {
  return (
    <div className="admin-welcome-container">
      {/* Fondo decorativo */}
      <div className="background-decor"></div>

      {/* Contenido principal */}
      <div className="welcome-content">
        <div className="logo-container">
          <img src="/techmania.png" alt="TechMania Logo" className="welcome-logo" />
        </div>
        <div className="welcome-message">
          <h1>¡Bienvenido, Administrador!</h1>
          <p>Gestiona tu plataforma de manera fácil y eficiente.</p>
          <p>Selecciona una opción en el menú para comenzar.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;

