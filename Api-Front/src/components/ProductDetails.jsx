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

    dispatch(addProduct({ productId, quantity }));
    setNotification({ message: 'Producto añadido al carrito', type: 'success' });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
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
        <div className="product-details-content-container">
          <h1>{product.productName}</h1>
          <p>{product.productDescription}</p>
          <p>Precio: ${product.price}</p>
          <p>Stock disponible: {product.stock}</p>
          <div>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <button onClick={handleAddToCart} disabled={quantity > product.stock}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;