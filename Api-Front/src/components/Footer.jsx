import React from 'react';
import '../components/styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>Sobre Nosotros</h3>
          <p>
          Somos una plataforma de comercio electrónico líder, dedicada a ofrecerte productos de la más alta calidad al mejor precio. Nuestra misión es garantizarte una experiencia de compra única y excepcional.
          </p>
        </div>

        <div className="footer-section social">
          <h3>Seguinos en</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.png" alt="Instagram" />
            </a>
            <a href="mailto:contact@ecommerce.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/gmail.png" alt="Gmail" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/youtube.png" alt="YouTube" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.png" alt="Facebook" />
            </a>
          </div>
        </div>

        <div className="footer-section contact">
          <h3>Contactanos</h3>
          <p>Email: contacto@techmania.com</p>
          <p>Telefono: +54 11 1234-5678</p>
          <p>Ubicacion: Uade, Monserrat, CABA</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>2024 E-Commerce. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
