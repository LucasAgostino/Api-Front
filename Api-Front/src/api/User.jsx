import api from './AxiosConfig'; // Asegúrate de importar la configuración de Axios

// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await api.get('/user/get');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo todos los usuarios:', error);
    throw error;
  }
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/user/get/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el usuario con ID ${id}:`, error);
    throw error;
  }
};

// Obtener un usuario por email
export const getUserByEmail = async (email) => {
  try {
    const response = await api.get('/user/get/byname', {
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
    const response = await api.get('/user/current');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo el usuario actual:', error);
    throw error;
  }
};
