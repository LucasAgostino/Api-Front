import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { searchProductsByName } from '../api/Product'; // Asegúrate de que esta función está correctamente configurada
import { useNavigate } from 'react-router-dom';
import '../components/styles/Header.css';

const Header = () => {
  const [navbarClass, setNavbarClass] = useState('topnav');
  const [scrollTop, setScrollTop] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleScroll = () => {
    setScrollTop(window.scrollY);
  };

  const toggleNavbar = () => {
    if (navbarClass === 'topnav') {
      setNavbarClass('topnav responsive');
    } else {
      setNavbarClass('topnav');
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollTop > 80) {
      document.getElementById('myTopnav').style.width = '100%';
      document.getElementById('header').style.position = 'fixed';
      document.getElementById('header').style.top = '0%';
    } else {
      document.getElementById('myTopnav').style.width = '80%';
      document.getElementById('header').style.position = 'fixed';
      document.getElementById('header').style.top = '2rem';
    }
  }, [scrollTop]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    console.log('Searching for:', value); // Log para verificar el valor de búsqueda

    if (value.length > 1) {
      try {
        const response = await searchProductsByName(value);
        console.log('Suggestions:', response); // Log para verificar la respuesta de la API
        setSuggestions(response);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };
  

  const handleSuggestionClick = (productId) => {
    setSuggestions([]); // Limpiar las sugerencias después de seleccionar
    navigate(`/product-details/${productId}`);
  };

  const suggestionsPortal = suggestions.length > 0 && (
    <div className="suggestions-portal">
      <div className="suggestions-dropdown">
        {suggestions.map((product) => (
          <div
            key={product.productId}
            className="suggestion-item"
            onClick={() => handleSuggestionClick(product.productId)}
          >
            {product.productName}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <header id="header">
      <div className="topnav" id="myTopnav">
        <a href="/" id="active">
          <img src="/logo.png" className="logo" alt="logo" />
        </a>
        <div className="nav-links">
          <a href="/products">PRODUCTOS</a>

          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <img src="/buscar.png" alt="Buscar" />
          </div>

          <a href="#contact-section" onClick={handleScrollToContact}>
            CONTACTANOS
          </a>
        </div>

        {isAuthenticated ? (
          <div className="auth-links">
            {userRole === 'ADMIN' ? (
              <a href="/admin" className="admin-link">
                ADMIN
              </a>
            ) : (
              <a href="/cart" className="cart-link">
                <img src="/icons/cart.png" className="cart-icon" />
              </a>
            )}
            <a href="/profile" className="profile-link">
              PERFIL
            </a>
          </div>
        ) : (
          <a href="/login" className="login-link">
            INICIA SESIÓN
          </a>
        )}

        <a href="javascript:void(0);" className="icon" onClick={toggleNavbar}>
          &#9776;
        </a>
      </div>

      {createPortal(suggestionsPortal, document.body)}
    </header>
  );
};

export default Header;
