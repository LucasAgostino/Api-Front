import React, { useState, useEffect } from 'react';
import '../components/styles/HeroCarousel.css'; // Asegúrate de tener el archivo CSS

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      img: '/hola3.jpg',
      title: 'Tu primera Notebook con Copilot',
      description: 'Comienza una nueva era de IA',
    },
    {
      img: '/grafica.jpg',
      title: 'Innovación y Tecnología',
      description: 'Explora el futuro de la tecnología',
    },
    {
      img: '/hola2.jpg',
      title: 'Desempeño Increíble',
      description: 'Optimiza tu trabajo con la mejor tecnología',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 7000); // Timer
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="hero-banner-carousel">
      <img
        src={banners[currentIndex].img}
        alt="Hero Banner"
        className="banner-carousel-image"
      />
      <div className="banner-carousel-text">
        <h1>{banners[currentIndex].title}</h1>
        <p>{banners[currentIndex].description}</p>
      </div>
    </div>
  );
};

export default HeroCarousel;
