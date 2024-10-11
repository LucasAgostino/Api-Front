import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserOrderById } from '../api/OrderService';

const OrderDetailsUser = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await getUserOrderById(orderId);
        setOrder(orderData);
      } catch (error) {
        setError('No tienes acceso a esta orden o la orden no existe.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Formatear la fecha de la orden a dd/mm/yyyy hh:mm
  const formatOrderDateTime = (dateArray) => {
    const [year, month, day, hours, minutes, seconds] = dateArray;
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  if (loading) return <p>Cargando detalles de la orden...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="invoice-container">
      {order ? (
        <>
          <div className="invoice-header">
            <div className="invoice-header-left">
              <h1>Orden #{order.orderId}</h1>
              <p><strong>Fecha:</strong> {formatOrderDateTime(order.orderDate)}</p>
            </div>
            <div className="invoice-header-right">
              <p><strong>Total:</strong> ${order.totalOrder.toFixed(2)}</p>
            </div>
          </div>

          <table className="product-table">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Producto</th>
                <th>Precio Unitario</th>
                <th>Precio Total</th>
                <th>Descuento</th> 
              </tr>
            </thead>
            <tbody>
              {order.orderProducts.map((product) => {
                const originalPriceTotal = product.totalPrice ;
                const discountPriceTotal = product.price * product.quantity; 
                
                // Calcular el porcentaje de descuento
                const discountPercentage = originalPriceTotal > discountPriceTotal 
                  ? ((originalPriceTotal - discountPriceTotal) / originalPriceTotal) * 100
                  : 0;

                return (
                  <tr key={product.orderProductId}>
                    <td>{product.quantity}</td>
                    <td>{product.productName}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>${discountPriceTotal.toFixed(2)}</td> 
                    <td>{discountPercentage.toFixed(0)}%</td> {/* Mostrar el descuento calculado */}
                  </tr>
                );
              })}
            </tbody>
          </table>



          <div className="total-section">
            <p>Total Orden: ${order.totalOrder.toFixed(2)}</p>
          </div>

          <div className="bottom-section">
            <p>Gracias por tu compra</p>
          </div>

          <p className="back-to-profile-text" onClick={() => navigate('/profile')}>
            ← Volver al perfil
          </p>
        </>
      ) : (
        <p>No se encontraron detalles de la orden.</p>
      )}
    </div>
  );
};

export default OrderDetailsUser;