import React from 'react';
import './styles/OrderDetails.css'; // Importa el CSS del detalle de la orden

const OrderDetails = ({ order, onBack }) => {
  return (
    <div className="order-details-form">
      <div className="header">
        <img src="/logo.png" alt="Techmania Logo" className="logo" />
        <h2>Detalles del Pedido</h2>
      </div>

      <div className="order-info">
        <div className="order-column">
          <p><strong>ID de la Orden:</strong> {order.orderId}</p>
          <p><strong>Usuario:</strong> {order.userName}</p>
          <p><strong>Fecha:</strong> {order.orderDate.join('-')}</p>
        </div>
        <div className="order-column">
          <p><strong>Total de la Orden:</strong> ${order.totalOrder}</p>
        </div>
      </div>

      <h4 className="order-products-title">Productos de la Orden:</h4> {/* Título fuera de la tabla */}
      <table className="order-products-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>
          {order.orderProducts.length > 0 ? (
            order.orderProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>${product.totalPrice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay productos en esta orden.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="footer">
        <button className="back-button" onClick={onBack}>Volver a la Lista</button>
      </div>
    </div>
  );
};

export default OrderDetails;
