import React, { useState, useEffect } from 'react';
import '../components/styles/Header.css';

const Header = () => {
  const [navbarClass, setNavbarClass] = useState('topnav');
  const [scrollTop, setScrollTop] = useState(0);

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

  return (
    <header id="header">
      <div className="topnav" id="myTopnav">
        <a href="/" id="active">
          <img src="/logo.png" className="logo" alt="logo" />
        </a>
        <div className="nav-links">
          <a href="#">PRODUCTOS</a>

          <div className="search-container">
            <input type="text" className="search-input" placeholder="Buscar..." />
            <img src="/buscar.png" alt="Buscar" />
          </div>
          

          <a href="#">CONTACTANOS</a>
        </div>

        <a href="/login" className="login-link">INICIA SESIÓN</a>
        <a href="javascript:void(0);" className="icon" onClick={() => {}}>
          &#9776;
        </a>
      </div>
    </header>
  );
  
};

export default Header;
