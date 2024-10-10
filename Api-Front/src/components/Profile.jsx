import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/User';
import { getUserOrders } from '../api/OrderService';
import { useNavigate } from 'react-router-dom'; 
import '../components/styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData); 
      } catch (error) {
        setError('Error obteniendo los datos del usuario.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserOrders = async () => {
      try {
        const userOrders = await getUserOrders();
        setOrders(userOrders);
      } catch (error) {
        setError('Error obteniendo las órdenes.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchUserOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');

    setTimeout(() => {
      window.location.reload();
    }, 100); 
  };

  const formatOrderDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Perfil de Usuario</h1>
        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
      </div>
      {user ? (
        <div className="profile-details">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Nombre de usuario:</strong> {user.userName}</p>
          <p><strong>Nombre:</strong> {user.firstName}</p>
          <p><strong>Apellido:</strong> {user.secondName}</p>
        </div>
      ) : (
        <p>No se encontraron detalles del usuario.</p>
      )}

      <h2>Mis Órdenes</h2>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-item">
              <p><strong>Orden ID:</strong> {order.orderId}</p>
              <p><strong>Fecha:</strong> {order.orderDate ? formatOrderDate(order.orderDate) : 'Fecha no disponible'}</p>
              <p><strong>Total:</strong> {order.totalOrder ? `$${order.totalOrder.toFixed(2)}` : 'Total no disponible'}</p>
              <button className="order-details-btn" onClick={() => navigate(`/order/${order.orderId}`)}>Ver más</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron órdenes.</p>
      )}
    </div>
  );
};

export default Profile;
