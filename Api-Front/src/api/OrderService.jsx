// src/api/OrderService.js
import axios from 'axios';

// Crear una instancia de axios con la URL base y el token JWT
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/order', // Cambia esto por tu URL base
});

// Interceptor para agregar el token JWT a todas las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Obtener todas las órdenes (admin)
export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get('/admin/get');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo todas las órdenes:', error);
    throw error;
  }
};

// Obtener una orden por ID (admin)
export const getOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo la orden con ID ${id}:`, error);
    throw error;
  }
};

// Obtener órdenes por usuario (admin)
export const getOrdersByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/admin/get/byuser/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo las órdenes del usuario con ID ${userId}:`, error);
    throw error;
  }
};

// Obtener las órdenes del usuario autenticado
export const getUserOrders = async () => {
  try {
    const response = await axiosInstance.get('/user/find');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo las órdenes del usuario autenticado:', error);
    throw error;
  }
};
