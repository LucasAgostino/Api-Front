import React, { useState } from 'react';
import '../components/styles/ProductCarousel.css'; // Importamos el CSS del carrusel

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: "Placa de Video",
      price: "$500",
      img: "/pruebas/1.png"
    },
    {
      id: 2,
      name: "Kit de Limpieza",
      price: "$600",
      img: "/pruebas/2.jpg"
    },
    {
      id: 3,
      name: "Chefcito",
      price: "$700",
      img: "/pruebas/3.png"
    },
  ];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
  };

  // Función para manejar clic en la imagen del producto y redirigir
  const goToProductDetails = (productId) => {
    window.location.href = `/product-details/${productId}`; // Redirige a la página de detalles del producto
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button className="carousel-btn prev-btn" onClick={goToPrevious}>
          &#10094;
        </button>
        <div className="carousel-item fade">
          <img
            src={featuredProducts[currentIndex].img}
            alt={featuredProducts[currentIndex].name}
            className="carousel-image"
            onClick={() => goToProductDetails(featuredProducts[currentIndex].id)} // Redirigir al hacer clic en la imagen
          />
          <div className="carousel-info">
            <h3 className="product-name">{featuredProducts[currentIndex].name}</h3>
            <p className="product-price">{featuredProducts[currentIndex].price}</p>
          </div>
        </div>
        <button className="carousel-btn next-btn" onClick={goToNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
