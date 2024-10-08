import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api/Product';
import { addProductToCart } from '../api/Cart'; // Importar la función de añadir al carrito
import '../components/styles/ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams(); // Obtener el ID del producto de la URL
  const navigate = useNavigate(); // Para redirigir al login
  const [product, setProduct] = useState(null); // Estado para el producto
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad del producto
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para la imagen actual
  const [stockError, setStockError] = useState(''); // Estado para el mensaje de error de stock

  // Cargar los detalles del producto cuando se monta el componente
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId); // Llamada a la API para obtener el producto por ID
        setProduct(fetchedProduct);
      } catch (error) {
        setError('Error fetching product details.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct(); // Ejecutamos la función para cargar el producto
  }, [productId]);

  // Función para manejar el cambio de cantidad
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    
    // Comprobar si la cantidad supera el stock disponible
    if (newQuantity > product.stock) {
      setStockError('La cantidad seleccionada supera el stock disponible.');
    } else {
      setStockError(''); // Borrar el mensaje de error si la cantidad es válida
    }
  };

  // Función para agregar el producto al carrito
  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Comprobar si la cantidad seleccionada supera el stock antes de añadir al carrito
    if (quantity > product.stock) {
      alert('La cantidad seleccionada supera el stock disponible.');
      return;
    }

    try {
      await addProductToCart(productId, quantity);
      alert('Producto añadido al carrito');
    } catch (error) {
      alert('Error al añadir el producto al carrito');
      console.error(error);
    }
  };

  // Función para cambiar la imagen actual (previa o siguiente)
  const handleImageChange = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.imageBase64s.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.imageBase64s.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No se encontraron detalles para este producto.</p>;
  }

  return (
    <div className="product-details-page-container">
      <div className="product-details-card">
        
        {/* Left side: Product Image */}
        <div className="product-image-container">
          <img 
            src={`data:image/jpeg;base64,${product.imageBase64s[currentImageIndex]}`} 
            alt={product.productName} 
            className="product-details-img"
            style={{ width: '600px', height: '600px'}}
          />
          <button className="image-nav-button prev" onClick={() => handleImageChange('prev')}>❮</button>
          <button className="image-nav-button next" onClick={() => handleImageChange('next')}>❯</button>
        </div>
        
        {/* Right side: Product Details */}
        <div className="product-details-content-container">
          <h1 className="product-details-title">{product.productName}</h1>
          <p className="product-details-description">{product.productDescription}</p>
          
          {/* Mostrar el precio normal o tachado si hay descuento */}
          {product.discountPercentage > 0 ? (
            <>
              <p className="product-details-price strikethrough">Precio: ${product.price.toFixed(2)}</p>
              <p className="product-details-discount">Precio con Descuento del {(product.discountPercentage * 100).toFixed(2)}%: 
              ${(product.price - (product.price * product.discountPercentage)).toFixed(2)}</p>
            </>
          ) : (
            <p className="product-details-price">Precio: ${product.price.toFixed(2)}</p>
          )}
          
          <p className="product-details-category">{product.categoryName}</p>
  
          <div className="product-details-tags">
            {product.tags?.map((tag, index) => (
              <span key={index} className="product-details-tag">{tag}</span>
            ))}
          </div>
  
          <div className="product-details-quantity">
            <p className="quantity-controls">
            Cantidad
              <input
                className="quantity-input"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange} // Cambiar la cantidad
              />
            </p>
            {/* Mostrar el mensaje de error si se supera el stock */}
            {stockError && <p className="stock-error-message">{stockError}</p>}
          </div>
  
          {/* Deshabilitar el botón si no hay suficiente stock */}
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            disabled={quantity > product.stock}
          >
            Añadir al Carrito
          </button>

          <a className="back-to-products" href="/products">← Volver a productos</a>
        </div>
      </div>

    </div>
  );
}

export default ProductDetails;
