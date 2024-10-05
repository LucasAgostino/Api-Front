import React, { useState, useEffect } from 'react';
import {
  getAllOrders,
  getOrderById,
  getUserOrders,
} from '../api/OrderService'; // Asegúrate de que la ruta es correcta
import './styles/OrdersContent.css'; // Importa el CSS

const OrdersContent = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  // Obtener todas las órdenes al cargar el componente
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error al obtener todas las órdenes:', error);
      }
    };
    fetchAllOrders();
  }, []);

  // Obtener una orden por ID
  const handleGetOrderById = async () => {
    try {
      const data = await getOrderById(selectedOrderId);
      setOrderDetails(data);
    } catch (error) {
      console.error(`Error al obtener la orden con ID ${selectedOrderId}:`, error);
    }
  };

  // Obtener las órdenes del usuario autenticado
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const data = await getUserOrders();
        setUserOrders(data);
      } catch (error) {
        console.error('Error al obtener las órdenes del usuario autenticado:', error);
      }
    };
    fetchUserOrders();
  }, []);

  return (
    <div className="orders-content">
      <h2>Gestión de Órdenes</h2>

      {/* Buscar una orden por ID */}
      <div className="search-order">
        <h3>Buscar Orden por ID</h3>
        <input
          type="text"
          value={selectedOrderId}
          onChange={(e) => setSelectedOrderId(e.target.value)}
          placeholder="ID de la orden"
        />
        <button onClick={handleGetOrderById}>Buscar Orden</button>
        {orderDetails && (
          <div className="order-details">
            <h4>Detalles de la Orden</h4>
            <p><strong>ID de la Orden:</strong> {orderDetails.orderId}</p>
            <p><strong>Usuario:</strong> {orderDetails.userName}</p>
            <p><strong>Fecha:</strong> {orderDetails.orderDate.join('-')}</p> {/* Transformar la fecha */}
            <p><strong>Total de la Orden:</strong> ${orderDetails.totalOrder}</p>

            <h5>Productos de la Orden:</h5>
            <div className="order-products">
              {orderDetails.orderProducts.length > 0 ? (
                orderDetails.orderProducts.map((product, index) => (
                  <div key={index} className="product">
                    <p><strong>Producto:</strong> {product.productName}</p>
                    <p><strong>Cantidad:</strong> {product.quantity}</p>
                    <p><strong>Precio Total:</strong> ${product.totalPrice}</p>
                  </div>
                ))
              ) : (
                <p>No hay productos en esta orden.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lista de todas las órdenes */}
      <div className="orders-list">
        <h3>Todas las Órdenes</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.userName}</td>
                <td>{order.orderDate.join('-')}</td> {/* Transformar la fecha */}
                <td>${order.totalOrder}</td>
                <td>
                  <button onClick={() => setSelectedOrderId(order.orderId)}>Ver Detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lista de órdenes del usuario autenticado */}
      <div className="user-orders">
        <h3>Mis Órdenes</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.totalOrder}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersContent;
