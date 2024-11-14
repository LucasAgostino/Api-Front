import api from './AxiosConfig';

// Función para obtener todas las categorías
export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories'); // Endpoint para obtener todas las categorías
    return response.data;
  } catch (error) {
    throw new Error('Error fetching categories');
  }
};

// Función para crear una nueva categoría
export const createCategory = async (category) => {
  try {
    const response = await api.post('/categories',category); // El token ya está en los headers gracias a setAuthToken
    return response.data; // Devuelve la categoría creada
  } catch (error) {
    throw new Error('Error creating category');
  }
};

// Función para obtener una categoría por ID
export const fetchCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`); // Endpoint para obtener categoría por ID
    return response.data; // Devuelve la categoría
  } catch (error) {
    throw new Error('Error fetching category by ID');
  }
};
