import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCart, removeProductFromCart } from '../api/Cart'; // Importar la función para eliminar
import '../components/styles/ShoppingCart.css';

const ShoppingCart = () => {
  const [cart, setCart] = useState(null); // Estado para el carrito
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de errores
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    console.log("Token:", token); // Verificar si el token está presente
    

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

  // Función para calcular el total de los productos en el carrito
  const calculateTotalCost = () => {
    if (!cart) return 0;
    return cart.products.reduce((total, product) => total + product.discountPrice , 0);
  };

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
            <h1>Carrito</h1>
            <h2>{cart.products.length} Items</h2>
          </div>
          <div className="shopping-cart-column-labels">
            <h3>Detalles</h3>
            <h3>Cantidad</h3>
            <h3>Precio</h3>
          </div>
          {cart.products.map((product) => (
            <div className="shopping-cart-item">
            <div className="product-details">
                <div className="product-image">
                    <img src={`data:image/jpeg;base64,${product.imageBase64s[0]}`}  alt={product.productName} />
                </div>
                <div className="product-info">
                    <p className="product-name">{product.productName}</p>
                    <p className="product-category">{product.categoryName || 'N/A'}</p>
                    <a
                        href="#"
                        className="product-remove"
                        onClick={async () => {
                            try {
                                console.log(product.productId);  // Verifica el productId antes de hacer la solicitud
                                await removeProductFromCart(product.productId); // Llamamos a la API para eliminar el producto
                                const updatedCart = await fetchCart(); // Volvemos a cargar el carrito
                                setCart(updatedCart); // Actualizamos el estado con el carrito actualizado
                            } catch (error) {
                                console.error('Error al eliminar el producto del carrito:', error);
                            }
                        }}
                    >
                        Eliminar
                    </a>
                </div>
            </div>
        
            <div className="product-quantity-container">
                <button className="quantity-decrease" onClick={() => updateQuantity(product.cartProductId, product.quantity - 1)}>
                    -
                </button>
                <input className="quantity-input" type="text" value={product.quantity} readOnly />
                <button className="quantity-increase" onClick={() => updateQuantity(product.cartProductId, product.quantity + 1)}>
                    +
                </button>
            </div>
        
            <div className="product-price">
                {product.discountPrice && (
                    <>
                        <span className="original-price">${product.totalPrice.toFixed(2)}</span>
                        <span className="discount-price">${product.discountPrice.toFixed(2)}</span>
                    </>
                )}
                {!product.discountPrice && (
                    <span>${product.totalPrice.toFixed(2)}</span>
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
          <div className="summary-promo">
            <label>Promo Code</label>
            <input type="text" placeholder="Enter your code" />
            <button className="apply-promo">Apply</button>
          </div>
          <div className="summary-total">
            <div className="summary-total-label">
              <span>Costo Total</span>
              <span>${(calculateTotalCost()).toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
