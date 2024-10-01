import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/categories',
});

// Función para obtener todas las categorías
export const fetchCategories = async () => {
    try {
        const response = await api.get(); // Endpoint para obtener todas las categorías
        return response.data;
    } catch (error) {
        throw new Error('Error fetching data');
    }
};

// Función para crear una nueva categoría
export const createCategory = async (category) => {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    try {
        const response = await api.post('/', category, {
            headers: {
                Authorization: `Bearer ${token}` // Incluye el token en los encabezados
            }
        });
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
