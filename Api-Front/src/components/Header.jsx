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
      <div className={navbarClass} id="myTopnav">
        <a href="#" id="active">
          <img src="/logo.png" className="logo" alt="logo" />
        </a>
        <a href="#">HOME</a>
        <a href="#">CONTACT</a>
        <div className="dropdown">
          <button className="dropbtn">
            HOW IT WORKS
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content animate">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <a href="#about">ABOUT US</a>
        <a href="javascript:void(0);" className="icon" onClick={toggleNavbar}>
          &#9776;
        </a>
      </div>
    </header>
  );
};

export default Header;
