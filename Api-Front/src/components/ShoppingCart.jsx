import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCart, removeProductFromCart, addProductToCart, decreaseProductInCart, checkoutCart } from '../api/Cart'; // Importar la función para eliminar
import '../components/styles/ShoppingCart.css';

const ShoppingCart = () => {
  const [cart, setCart] = useState(null); // Estado para el carrito
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de errores
  const [paymentMethod, setPaymentMethod] = useState(''); // Estado para el método de pago seleccionado
  const [installments, setInstallments] = useState('1'); // Estado para las cuotas seleccionadas
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es admin

  useEffect(() => {
    
      const role = localStorage.getItem('role'); // Obtiene el rol del usuario desde localStorage (o desde tu método preferido)
      if (role === 'USER') {
        setIsAdmin(true);
      } else {
        navigate('/'); 
      };

    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    if (!token) {
      navigate('/login');
      return;
    }

    const loadCart = async () => {
      try {
        const fetchedCart = await fetchCart();
        setCart(fetchedCart);
      } catch (err) {
        setError('Error al cargar el carrito.');
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [navigate]);

  const updateQuantity = async (productId, quantity, action) => {
    try {
      if (action === "decrease" && quantity > 1) {
        await decreaseProductInCart(productId, 1);
      } else if (action === "increase") {
        await addProductToCart(productId, 1);
      } else if (quantity === 1 && action === "decrease") {
        console.warn("La cantidad no puede ser menor que 1.");
        return;
      }

      const updatedCart = await fetchCart();
      setCart(updatedCart);
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto:', error);
    }
  };

  const calculateTotalCost = () => {
    if (!cart) return 0;
    return cart.products.reduce((total, product) => total + product.discountPrice, 0);
  };

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
            <h1>Carrito</h1>
            <h2>{cart.products.length} Items</h2>
          </div>
          <div className="shopping-cart-column-labels">
            <h3>Detalles</h3>
            <h3>Cantidad</h3>
            <h3>Precio</h3>
          </div>
          {cart.products.map((product) => (
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
                    onClick={() => updateQuantity(product.productId, product.quantity, "decrease")}
                  >
                    -
                  </button>
                  <input className="quantity-input" type="text" value={product.quantity} readOnly />
                  <button
                    className="quantity-increase"
                    onClick={() => updateQuantity(product.productId, product.quantity, "increase")}
                  >
                    +
                  </button>
                </div>
                <div>
                  <a
                    href="#"
                    className="product-remove"
                    onClick={async () => {
                      try {
                        await removeProductFromCart(product.productId);
                        const updatedCart = await fetchCart();
                        setCart(updatedCart);
                      } catch (error) {
                        console.error('Error al eliminar el producto del carrito:', error);
                      }
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
          <a href="/products" className="shopping-cart-continue">
            ← Seguir Comprando
          </a>
        </div>

        {/* Order Summary */}
        <div id="summary">
          <h1>Resumen de la orden</h1>
          <div className="summary-item">
            <span>Items: {cart.products.length}</span>
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

          {/* Selector de cuotas si se elige Tarjeta de Crédito */}
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
              <span>${(calculateTotalCost()).toFixed(2)}</span>
            </div>
            <button
              className="checkout-btn"
              disabled={!paymentMethod} // Deshabilita el botón si no se seleccionó un método de pago
              onClick={async () => {
                if (!paymentMethod) {
                  alert('Por favor, selecciona un método de pago antes de proceder.');
                  return;
                }

                try {
                  await checkoutCart(); // Llamar a la función para realizar el checkout
                  setSuccessMessage('Orden exitosa. Gracias por tu compra!');
                  setTimeout(() => {
                    navigate('/'); // Redirigir al home
                  }, 2000); // Retraso para que el usuario vea el mensaje
                } catch (error) {
                  console.error('Error al realizar el checkout:', error);
                  alert('Hubo un problema con el checkout. Intenta nuevamente.');
                }
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
