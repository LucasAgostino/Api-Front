import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../api/Product'; 
import { addProduct } from '../api/SliceCart'; // Importa la acción desde el slice de Redux
import '../components/styles/ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stockError, setStockError] = useState('');
  const [notification, setNotification] = useState(null);

  // Acceder al carrito y usuario desde el estado de Redux
  const { token, role } = useSelector((state) => state.user); // Accedemos al token y role desde Redux

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        setError('Error fetching product details.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);

    if (newQuantity > product.stock) {
      setStockError('La cantidad seleccionada supera el stock disponible.');
    } else {
      setStockError('');
    }
  };

  const handleAddToCart = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (role !== 'USER') {
      navigate('/');
      return;
    }

    if (quantity > product.stock) {
      setNotification({ message: 'La cantidad seleccionada supera el stock disponible.', type: 'error' });
      return;
    }

    // Despachar la acción de agregar el producto al carrito
    dispatch(addProduct({ productId, quantity }));

    setNotification({ message: 'Producto añadido al carrito', type: 'success' });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

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

  const handlebackToProducts = () => {
    navigate('/products');
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
      {/* Mostrar la notificación si existe */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
        </div>
      )}

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
                onChange={handleQuantityChange} 
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

          <a className="back-to-products" href="#" onClick={handlebackToProducts}>← Volver a productos</a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
