import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../api/Cart'; // Servicio para obtener el carrito
import '../components/styles/ShoppingCart.css'; // Archivo CSS que contiene los estilos

const ShoppingCart = () => {
  const [cart, setCart] = useState(null); // Estado para el carrito
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de errores
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    if (!token) {
      // Si no hay token, redirige al login
      navigate('/login');
      return;
    }

    // Cargar el carrito si el usuario está autenticado
    const loadCart = async () => {
      try {
        const fetchedCart = await fetchCart(); // Llamada a la API para obtener el carrito
        setCart(fetchedCart); // Establecemos el carrito
      } catch (err) {
        setError('Error al cargar el carrito.'); // Capturamos errores si falla la API
      } finally {
        setLoading(false); // Finalizamos la carga
      }
    };

    loadCart(); // Cargamos el carrito cuando se monta el componente
  }, [navigate]);

  // Renderiza el carrito
  if (loading) {
    return <p>Cargando carrito...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cart || cart.products.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart-flex">
        <div className="shopping-cart-items">
          <div className="shopping-cart-header">
            <h1>Shopping Cart</h1>
            <h2>{cart.products.length} Items</h2>
          </div>
          <div className="shopping-cart-column-labels">
            <h3>Product Details</h3>
            <h3>Quantity</h3>
            <h3>Price</h3>
            <h3>Total</h3>
          </div>

          {cart.products.map((product) => (
            <div className="shopping-cart-item" key={product.cartProductId}>
              <div className="product-details">
                <div className="product-image">
                  {/* Si tienes una imagen en el backend, puedes añadirla aquí */}
                  <img src={`data:image/jpeg;base64,${product.imageBase64s[0]}`} alt={product.productName} />
                </div>
                <div className="product-info">
                  <p className="product-name">{product.productName}</p>
                  <p className="product-category">Category: {product.categoryName || 'N/A'}</p> {/* Cambiado a categoría */}
                  <a href="#" className="product-remove">Remove</a>
                </div>
              </div>
              <div className="product-quantity">
                <button className="quantity-decrease">-</button>
                <input className="quantity-input" type="text" value={product.quantity} readOnly />
                <button className="quantity-increase">+</button>
              </div>
              <div className="product-price">
                {/* Mostrar ambos precios si hay descuento */}
                {product.discountPrice < product.totalPrice ? (
                  <>
                    <span className="original-price">${product.totalPrice.toFixed(2)}</span>
                    <span className="discount-price">${product.discountPrice.toFixed(2)}</span>
                  </>
                ) : (
                  <span>${product.totalPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="product-total">
                ${product.discountPrice.toFixed(2)}
              </div>
            </div>
          ))}

          <a href="#" className="shopping-cart-continue">
            <span className="icon">&#8592;</span>
            Continue Shopping
          </a>
        </div>

        <div id="summary">
          <h1>Order Summary</h1>
          <div className="summary-item">
            <span>Items {cart.products.length}</span>
            <span>${cart.products.reduce((total, product) => total + product.discountPrice, 0).toFixed(2)}</span>
          </div>
          <div className="summary-shipping">
            <label>Shipping</label>
            <select>
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="summary-promo">
            <label>Promo Code</label>
            <input type="text" placeholder="Enter your code" />
          </div>
          <button className="apply-promo">Apply</button>
          <div className="summary-total">
            <div className="summary-total-label">
              <span>Total cost</span>
              <span>${(cart.products.reduce((total, product) => total + product.discountPrice, 0) + 10).toFixed(2)}</span>
            </div>
          </div>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
