import axios from 'axios';

// Crear una instancia de axios con la URL base y el token JWT
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/user', // Cambia esto por tu URL base
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

// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/get');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo todos los usuarios:', error);
    throw error;
  }
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/get/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el usuario con ID ${id}:`, error);
    throw error;
  }
};

// Obtener un usuario por email
export const getUserByEmail = async (email) => {
  try {
    const response = await axiosInstance.get('/get/byname', {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el usuario con email ${email}:`, error);
    throw error;
  }
};

// Obtener el usuario actualmente logueado
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/current');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo el usuario actual:', error);
    throw error;
  }
};
