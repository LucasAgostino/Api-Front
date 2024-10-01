import axios from 'axios';

// Crear una instancia de axios con la base URL para la autenticación
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/auth', // Ajusta la URL base según tu backend
});

// Función para registrar un nuevo usuario
export const registerUser = async (registerData) => {
  try {
    const response = await api.post('/register', registerData);
    return response.data;
  } catch (error) {
    throw new Error('Error al registrar el usuario');
  }
};

// Función para autenticar un usuario
export const authenticateUser = async (authData) => {
  try {
    const response = await api.post('/authenticate', authData);
    return response.data;
  } catch (error) {
    throw new Error('Error al autenticar el usuario');
  }
};
