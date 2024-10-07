import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/categories',
});

// Función para establecer el token en las cabeceras de axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Función para obtener todas las categorías
export const fetchCategories = async () => {
  try {
    const response = await api.get(); // Endpoint para obtener todas las categorías
    return response.data;
  } catch (error) {
    throw new Error('Error fetching categories');
  }
};

// Función para crear una nueva categoría
export const createCategory = async (category) => {
  try {
    const response = await api.post('',category); // El token ya está en los headers gracias a setAuthToken
    return response.data; // Devuelve la categoría creada
  } catch (error) {
    throw new Error('Error creating category');
  }
};

// Función para obtener una categoría por ID
export const fetchCategoryById = async (id) => {
  try {
    const response = await api.get(`/${id}`); // Endpoint para obtener categoría por ID
    return response.data; // Devuelve la categoría
  } catch (error) {
    throw new Error('Error fetching category by ID');
  }
};
