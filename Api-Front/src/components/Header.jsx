import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { searchProductsByName } from '../api/Product';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../components/styles/Header.css';

const Header = () => {
  const [navbarClass, setNavbarClass] = useState('topnav');
  const [scrollTop, setScrollTop] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Accede al estado de Redux
  const token = useSelector((state) => state.user.token);
  const userRole = useSelector((state) => state.user.role);

  // Verificación de autenticación y rol
  const isAuthenticated = !!token; // Verifica si hay un token
  console.log('Token:', token); // Log para verificar el token
  console.log('User Role:', userRole); // Log para verificar el rol

  const handleScroll = () => {
    setScrollTop(window.scrollY);
  };

  const toggleNavbar = () => {
    setNavbarClass((prev) => (prev === 'topnav' ? 'topnav responsive' : 'topnav'));
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
    const topnavElement = document.getElementById('myTopnav');
    const headerElement = document.getElementById('header');

    if (scrollTop > 80) {
      topnavElement.style.width = '100%';
      headerElement.style.position = 'fixed';
      headerElement.style.top = '0%';
    } else {
      topnavElement.style.width = '80%';
      headerElement.style.position = 'fixed';
      headerElement.style.top = '2rem';
    }
  }, [scrollTop]);

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    console.log('Searching for:', value);

    if (value.length > 1) {
      try {
        const response = await searchProductsByName(value);
        console.log('Suggestions:', response);
        setSuggestions(response);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (productId) => {
    setSuggestions([]);
    navigate(`/product-details/${productId}`);
  };

  const handleProductsClick = () => {
    navigate('/products'); // Navega a la página de productos
  };

  const handleCartClick = () => {
    navigate('/cart'); // Navega a la página del carrito
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
      <div className={`topnav ${navbarClass}`} id="myTopnav">
        <a href="#" onClick={() => navigate('/')} id="active">
          <img src="/logo.png" className="logo" alt="logo" />
        </a>
        <div className="nav-links">
          <a href="#" onClick={handleProductsClick}>PRODUCTOS</a> {/* Navegación a productos */}
          
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
              <a href="#" onClick={handleCartClick} className="cart-link">
                <img src="/icons/cart.png" className="cart-icon" alt="Cart" />
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
