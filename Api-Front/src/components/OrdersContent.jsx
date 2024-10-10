import React, { useState, useEffect } from 'react';
import {
  getAllOrders,
  getOrderById,
  getUserOrders,
} from '../api/OrderService'; // Asegúrate de que la ruta es correcta
import './styles/OrdersContent.css';
import OrderDetails from './OrderDetails'; // Importa el nuevo componente

const OrdersContent = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null); // Almacena la orden seleccionada
  const [searchedOrder, setSearchedOrder] = useState(null); // Orden buscada por ID
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
    if (!selectedOrderId) return; // Evitar hacer la búsqueda si no hay un ID ingresado
    try {
      const data = await getOrderById(selectedOrderId);
      setSearchedOrder(data); // Asigna la orden buscada por ID al estado
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

      {/* Si hay una orden seleccionada, mostramos los detalles */}
      {orderDetails ? (
        <OrderDetails order={orderDetails} onBack={() => setOrderDetails(null)} />
      ) : (
        <>
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

            {searchedOrder && (
              <div className="searched-order">
                <h4>Resultado de la Búsqueda</h4>
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
                    <tr>
                      <td>{searchedOrder.orderId}</td>
                      <td>{searchedOrder.userName}</td>
                      <td>{searchedOrder.orderDate.join('-')}</td> {/* Ajustar la fecha */}
                      <td>${searchedOrder.totalOrder}</td>
                      <td>
                        <button onClick={() => setOrderDetails(searchedOrder)}>
                          Ver Detalles
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                    <td>{order.orderDate.join('-')}</td> {/* Ajustar la fecha */}
                    <td>${order.totalOrder}</td>
                    <td>
                      <button onClick={() => setOrderDetails(order)}>
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersContent;
