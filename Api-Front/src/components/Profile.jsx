import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../components/styles/Profile.css';
import { fetchCurrentUser } from '../api/SliceUser';
import { fetchUserOrders } from '../api/SliceOrder';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accede al estado de Redux
  const user = useSelector((state) => state.user.userInfo);
  const orders = useSelector((state) => state.order.orders);
  const loadingUser = useSelector((state) => state.user.loading);
  const loadingOrders = useSelector((state) => state.order.loading);
  const errorUser = useSelector((state) => state.user.error);
  const errorOrders = useSelector((state) => state.order.error);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchUserOrders());
  }, [dispatch]);
  useEffect(() => {
    console.log('Usuario actual:', user);
  }, [user]);
  const handleLogout = () => {
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

  if (loadingUser || loadingOrders) {
    return <p>Cargando perfil...</p>;
  }

  if (errorUser || errorOrders) {
    return <p>{errorUser || errorOrders}</p>;
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
