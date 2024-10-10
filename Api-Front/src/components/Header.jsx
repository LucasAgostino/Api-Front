import React, { useState, useEffect } from 'react';
import '../components/styles/Header.css';

const Header = () => {
  const [navbarClass, setNavbarClass] = useState('topnav');
  const [scrollTop, setScrollTop] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Estado para el rol del usuario

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
    // Verificar si el token y el rol están en localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Asegúrate de guardar el rol del usuario en localStorage

    if (token) {
      setIsAuthenticated(true);
      setUserRole(role); // Establecemos el rol del usuario
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  return (
    <header id="header">
      <div className="topnav" id="myTopnav">
        <a href="/" id="active">
          <img src="/logo.png" className="logo" alt="logo" />
        </a>
        <div className="nav-links">
          <a href="/products">PRODUCTOS</a>

          <div className="search-container">
            <input type="text" className="search-input" placeholder="Buscar..." />
            <img src="/buscar.png" alt="Buscar" />
          </div>

          <a href="#">CONTACTANOS</a>
        </div>
        
        {isAuthenticated ? (
          <div className="auth-links">
            {/* Si el usuario tiene rol de ADMIN, mostrar "Sección Admin" */}
            {userRole === 'ADMIN' ? (
              <a href="/admin" className="admin-link">ADMIN</a>
            ) : (
              <a href="/cart" className="cart-link" ><img src="/icons/cart.png" className='cart-icon' /></a>
            )}
            <a href="/profile" className="profile-link">PERFIL</a>
          </div>
        ) : (
          <a href="/login" className="login-link">INICIA SESIÓN</a>
        )}

        <a href="javascript:void(0);" className="icon" onClick={toggleNavbar}>
          &#9776;
        </a>
      </div>
    </header>
  );
};

export default Header;
