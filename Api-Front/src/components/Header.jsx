// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">ElectroShop</div>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li> {/* Enlace al catálogo */}
          <li><a href="#about">Sobre Nosotros</a></li>
          <li><a href="#contact">Contacto</a></li>
          <li><Link to="/login">Iniciar Sesión</Link></li> {/* Enlace al login */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
