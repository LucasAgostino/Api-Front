// src/api/OrderService.jsx
import api from './AxiosConfig';

// Obtener todas las órdenes (admin)
export const getAllOrders = async () => {
  try {
    const response = await api.get('/order/admin/get');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo todas las órdenes:', error);
    throw error;
  }
};

// Obtener una orden por ID (admin)
export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/order/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo la orden con ID ${id}:`, error);
    throw error;
  }
};

// Obtener órdenes por usuario (admin)
export const getOrdersByUser = async (userId) => {
  try {
    const response = await api.get(`/order/admin/get/byuser/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo las órdenes del usuario con ID ${userId}:`, error);
    throw error;
  }
};

// Obtener las órdenes del usuario autenticado
export const getUserOrders = async () => {
  try {
    const response = await api.get('/order/user/find');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo las órdenes del usuario autenticado:', error);
    throw error;
  }
};

export const getUserOrderById = async (orderId) => {
  try {
    const response = await api.get(`/order/myorder/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los detalles de la orden del usuario:', error);
    throw error;
  }
};
