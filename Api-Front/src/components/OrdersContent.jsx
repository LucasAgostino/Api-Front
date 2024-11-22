import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, fetchOrderById, fetchUserOrders } from '../api/SliceOrder'; 
import './styles/OrdersContent.css';
import OrderDetails from './OrderDetails';

const OrdersContent = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const searchedOrder = useSelector((state) => state.order.searchedOrder);
  const [selectedOrderId, setSelectedOrderId] = React.useState('');
  const [orderDetails, setOrderDetails] = React.useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleGetOrderById = () => {
    if (selectedOrderId) {
      dispatch(fetchOrderById(selectedOrderId));
    }
  };

  return (
    <div className="orders-content">
      <h2>Gestión de Órdenes</h2>

      {orderDetails ? (
        <OrderDetails order={orderDetails} onBack={() => setOrderDetails(null)} />
      ) : (
        <>
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
                      <td>{searchedOrder.orderDate.join('-')}</td>
                      <td>${searchedOrder.totalOrder}</td>
                      <td>
                        <button className='ver_detalles_admin' onClick={() => setOrderDetails(searchedOrder)}>
                          Ver Detalles
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

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
                    <td>{order.orderDate.join('-')}</td>
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
