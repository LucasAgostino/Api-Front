import React, { useState } from 'react';
import '../components/styles/ProductCarousel.css'; // Importamos el CSS del carrusel

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: "Procesador Intel Core i3",
      price: "$192.540",
      img: "/pruebas/1.png"
    },
    {
      id: 2,
      name: "Mouse Corsair M75",
      price: "$74.990",
      img: "/pruebas/2.jpg"
    },
    {
      id: 3,
      name: "Procesador Intel Core i7",
      price: "$540.790",
      img: "/pruebas/3.png"
    },
    {
      id: 4,
      name: "Teclado",
      price: "$350.000",
      img: "/pruebas/1.png"
    },
    {
      id: 5,
      name: "Kit De Limpieza",
      price: "$420.000",
      img: "/pruebas/2.jpg"
    }
  ];

  const goToNext = () => {
    // Si estamos en el final, vuelve al inicio
    if (currentIndex >= featuredProducts.length - 4) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    // Si estamos al principio, vuelve al final
    if (currentIndex === 0) {
      setCurrentIndex(featuredProducts.length - 4);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Función para manejar clic en la imagen del producto y redirigir
  const goToProductDetails = (productId) => {
    window.location.href = `/product-details/${productId}`; // Redirige a la página de detalles del producto
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Productos Destacados</h2>
      <div className="carousel">
        <button className="carousel-btn prev-btn" onClick={goToPrevious}>
          &#10094;
        </button>
        <div className="carousel-items">
          {featuredProducts.slice(currentIndex, currentIndex + 4).map((product) => (
            <div className="carousel-item" key={product.id}>
              <img
                src={product.img}
                alt={product.name}
                className="carousel-image"
                onClick={() => goToProductDetails(product.id)}
              />
              <div className="carousel-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-btn next-btn" onClick={goToNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
