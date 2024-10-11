import React, { useState, useEffect } from 'react';
import '../components/styles/ProductCarousel.css'; // Importamos el CSS del carrusel
import { fetchProductos } from '../api/Product'; // Importar la función para obtener productos

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]); // Estado para los productos destacados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los productos destacados
  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const products = await fetchProductos(); // Obtener productos desde la API
        setFeaturedProducts(products.slice(0, 6)); // Tomar los primeros 5 productos de la lista
      } catch (error) {
        setError('Error al cargar los productos destacados.');
      } finally {
        setLoading(false);
      }
    };

    getFeaturedProducts();
  }, []);

  const goToNext = () => {
    if (currentIndex >= featuredProducts.length - 4) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex === 0) {
      setCurrentIndex(featuredProducts.length - 4);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToProductDetails = (productId) => {
    window.location.href = `/product-details/${productId}`; // Redirige a la página de detalles del producto
  };

  // Función para calcular el precio con descuento
  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount);
  };

  if (loading) return <p>Cargando productos destacados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Productos Destacados</h2>
      <div className="carousel">
        <button className="carousel-btn prev-btn" onClick={goToPrevious}>
          &#10094;
        </button>
        <div className="carousel-items">
          {featuredProducts.slice(currentIndex, currentIndex + 4).map((product) => {
            const hasDiscount = product.discountPercentage > 0;
            const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);

            return (
              <div className="carousel-item" key={product.productId}>
                <img
                  src={`data:image/jpeg;base64,${product.imageBase64s[0]}`}
                  alt={product.productName}
                  className="carousel-image"
                  onClick={() => goToProductDetails(product.productId)}
                />
                <div className="carousel-info">
                  <h3 className="product-name">{product.productName}</h3>
                  {hasDiscount ? (
                    <div className="price-info">
                      <span className="original-price1">${product.price.toFixed(2)}</span>
                      <span className="discounted-price1">${discountedPrice.toFixed(2)}</span>
                      <span className="discount-percentage1">({product.discountPercentage * 100}% OFF)</span>
                    </div>
                  ) : (
                    <p className="product-price">${product.price.toFixed(2)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button className="carousel-btn next-btn" onClick={goToNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
