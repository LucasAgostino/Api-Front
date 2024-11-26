import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../api/SliceCart';
import { fetchProductByIdThunk } from '../api/ProductSlice'; // Importa correctamente tu slice
import '../components/styles/ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentProduct: product, loading, error } = useSelector((state) => state.product);
  const { token, role } = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchProductByIdThunk(productId));
  }, [productId, dispatch]);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
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
    if (quantity <= 0){
      setNotification({ message: 'La cantidad seleccionada debe ser válida.', type: 'error' });
      return;
    }

    dispatch(addProduct({ productId, quantity }));
    setNotification({ message: 'Producto añadido al carrito', type: 'success' });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleVolver = () => {
      navigate("/products")
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.imageBase64s.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imageBase64s.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <div className="product-details-page-container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
        </div>
      )}

      <div className="product-details-card">
        <div className="product-image-container">
          <button
            className="image-nav-button prev"
            onClick={handlePrevImage}
          >
            &lt;
          </button>
          <img
            src={`data:image/jpeg;base64,${product.imageBase64s[currentImageIndex]}`}
            alt={product.productName}
            className="product-image"
            style={{ width: '600px', height: '600px', objectFit: 'cover' }}
          />
          <button
            className="image-nav-button next"
            onClick={handleNextImage}
          >
            &gt;
          </button>
        </div>
        <div className="product-details-content-container">
          <h1 className="product-details-title">{product.productName}</h1>
          <p className="product-details-description">{product.productDescription}</p>
          
          <p 
            className={`product-details-price ${
              product.discountPercentage > 0 ? 'strikethrough' : ''
            }`}
          >
            Precio: ${product.price.toFixed(2)}
          </p>

          {product.discountPercentage > 0 && (
            <p className="product-details-discount">
              Precio con Descuento del {(product.discountPercentage * 100)}%: 
              ${(product.price - (product.price * product.discountPercentage)).toFixed(2)}
            </p>
          )}

          <p className="product-details-category">{product.categoryName}</p>

          <div className="product-details-tags">
            {product.tags?.map((tag, index) => (
              <span key={index} className="product-details-tag">{tag}</span>
            ))}
          </div>

          <p>Stock disponible: {product.stock}</p>
          <div className="product-details-quantity">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
          </div>
          <button
            onClick={handleAddToCart}
            disabled={quantity > product.stock}
            className="add-to-cart-btn"
          >
            Añadir al carrito
          </button>

          <a className="back-to-products" href="#" onClick={handleVolver}>← Volver a productos</a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
