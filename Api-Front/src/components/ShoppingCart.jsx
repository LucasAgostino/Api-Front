import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCartItems, removeProduct, addProduct, decreaseProduct, checkout } from '../api/SliceCart';
import '../components/styles/ShoppingCart.css';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cartItems);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const allProducts = useSelector((state) => state.product.allProducts); // Trae todos los productos

  const [paymentMethod, setPaymentMethod] = useState('');
  const [installments, setInstallments] = useState('1');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (cart.length === 0) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, cart.length]);

  const updateQuantity = (productId, quantity, action) => {
    if (action === 'decrease' && quantity > 1) {
      dispatch(decreaseProduct({ productId, quantity: 1 }));
    } else if (action === 'increase') {
      dispatch(addProduct({ productId, quantity: 1 }));
    }
  };

  const calculateTotalCost = () => {
    if (!cart) return 0;
    return cart.reduce((total, product) => {
      const price = product.discountPrice || product.totalPrice; // Usa el precio con descuento si está disponible
      return total + price; // Multiplica el precio por la cantidad
    }, 0);
  };

  const handleReturn = () => {
    navigate('/products');
  };

  const checkStock = () => {
    for (const cartItem of cart) {
      const product = allProducts.find((p) => p.productId === cartItem.productId);
      if (product && product.stock < cartItem.quantity) {
        setErrorMessage(`El producto "${cartItem.productName}" no tiene stock suficiente. Stock disponible: ${product.stock}.`);
        return false;
      }
    }
    return true;
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          <h2 className="empty-cart-title">Tu carrito está vacío</h2>
          <p className="empty-cart-description">
            Parece que todavía no añadiste productos a tu carrito. 
          </p>
          <button 
            className="empty-cart-button" 
            onClick={() => navigate('/products')}
          >
            Explorar productos
          </button>
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart-flex">
        <div className="shopping-cart-items">
          <div className="shopping-cart-header">
            <h1>Carrito</h1>
            <h2>{cart.length} Items</h2>
          </div>
          <div className="shopping-cart-column-labels">
            <h3>Detalles</h3>
            <h3>Cantidad</h3>
            <h3>Precio</h3>
          </div>
          {cart.map((product) => (
            <div className="shopping-cart-item" key={product.productId}>
              <div className="product-details">
                <div className="product-image">
                  <img src={`data:image/jpeg;base64,${product.imageBase64s[0]}`} alt={product.productName} />
                </div>
                <div className="product-info">
                  <p className="product-name">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/product-details/${product.productId}`);
                      }}
                    >
                      {product.productName}
                    </a>
                  </p>
                  <p className="product-category">{product.categoryName || 'N/A'}</p>
                </div>
              </div>

              <div className="product-quantity-container">
                <div className="product-quantity-modify">
                  <button
                    className="quantity-decrease"
                    onClick={(e) => {
                      e.preventDefault(); // Previene el comportamiento por defecto
                      updateQuantity(product.productId, product.quantity, 'decrease');
                    }}
                  >
                    -
                  </button>
                  <input className="quantity-input" type="text" value={product.quantity} readOnly />
                  <button
                    className="quantity-increase"
                    onClick={(e) => {
                      e.preventDefault(); // Previene el comportamiento por defecto
                      updateQuantity(product.productId, product.quantity, 'increase');
                    }}
                  >
                    +
                  </button>
                </div>
                <div>
                  <a
                    href="#"
                    className="product-remove"
                    onClick={(e) => {
                      e.preventDefault(); // Previene el comportamiento por defecto
                      dispatch(removeProduct(product.productId));
                    }}
                  >
                    Eliminar
                  </a>
                </div>
              </div>

              <div className="product-price-cart">
                {product.discountPrice && product.discountPrice < product.totalPrice ? (
                  <>
                    <span className="original-price-cart">${product.totalPrice.toFixed(2)}</span>
                    <span className="discount-price-cart">${product.discountPrice.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="discount-price-cart">${product.totalPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
          ))}
          <a href="#" className="shopping-cart-continue" onClick={(e) => {
            e.preventDefault(); // Previene el comportamiento por defecto
            handleReturn();
          }}>
            ← Seguir Comprando
          </a>
        </div>

        {/* Resumen de la orden */}
        <div id="summary">
          <h1>Resumen de la orden</h1>
          <div className="summary-item">
            <span>Items: {cart.length}</span>
            <span>${calculateTotalCost().toFixed(2)}</span>
          </div>
          <div className="summary-shipping">
            <label>Envío</label>
            <select>
              <option>Envío Gratis - $00.00</option>
              <option>Retiro en Sucursal - $00.00</option>
            </select>
          </div>
          <div className="summary-shipping">
            <label>Método de Pago</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Selecciona un método de pago</option>
              <option value="transferencia">Transferencia</option>
              <option value="debito">Tarjeta de Débito</option>
              <option value="credito">Tarjeta de Crédito</option>
            </select>
          </div>

          {paymentMethod === 'credito' && (
            <div className="summary-shipping">
              <label>Cuotas</label>
              <select
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
              >
                <option value="1">1 cuota</option>
                <option value="3">3 cuotas sin interés</option>
                <option value="6">6 cuotas sin interés</option>
                <option value="12">12 cuotas sin interés</option>
              </select>
            </div>
          )}

          <div className="summary-total">
            <div className="summary-total-label">
              <span>Costo Total</span>
              <span>${calculateTotalCost().toFixed(2)}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={(e) => {
                e.preventDefault();

                // Verificar si no se seleccionó un método de pago
                if (!paymentMethod) {
                  setErrorMessage('Por favor, selecciona un método de pago antes de proceder.');
                  return;
                }

                // Verificar stock antes de proceder
                if (!checkStock()) {
                  return;
                }

                try {
                  dispatch(checkout());
                  setSuccessMessage('Orden exitosa. Gracias por tu compra!');
                  setErrorMessage('');
                  setTimeout(() => {
                    navigate('/');
                  }, 2000);
                } catch (error) {
                  console.error('Error al realizar el checkout:', error);
                  setErrorMessage('Hubo un problema con el checkout. Intenta nuevamente.');
                }
              }}
            >
              Checkout
            </button>

            {errorMessage && (
              <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                {errorMessage}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
