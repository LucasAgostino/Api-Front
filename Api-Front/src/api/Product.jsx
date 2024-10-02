import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/products',
});

// Función para establecer el token en las cabeceras de axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Función para crear un producto
export const createProduct = async (productData) => {
    try {
        const response = await api.post('/create', productData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating product');
    }
};

// Función para agregar imágenes a un producto
export const addImagesToProduct = async (productId, images) => {
    try {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image);
        });
        const response = await api.post(`/add-images`, formData, {
            params: { productId }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error adding images');
    }
};

// Función para eliminar un producto
export const softDeleteProduct = async (productId) => {
    try {
        const response = await api.put(`/delete/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting product');
    }
};

// Función para actualizar un producto
export const updateProduct = async (productId, updatedData) => {
    try {
        const response = await api.put(`/update/${productId}`, updatedData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating product');
    }
};

// Función para obtener todos los productos
export const fetchProductos = async () => {
    try {
        const response = await api.get('/get');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

// Función para obtener un producto por ID
export const fetchProductById = async (productId) => {
    try {
        const response = await api.get(`/get/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching product by ID');
    }
};

// Función para obtener productos por categoría
export const fetchProductsByCategory = async (categoryId) => {
    try {
        const response = await api.get(`/get/cat/${categoryId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products by category');
    }
};

// Función para obtener todos los tags
export const fetchTags = async () => {
    try {
        const response = await api.get('/get/tags');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching tags');
    }
};

// Función para filtrar productos por precio
export const filterProductsByPrice = async (minPrice, maxPrice) => {
    try {
        const response = await api.get('/get/filter', {
            params: { minPrice, maxPrice }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error filtering products by price');
    }
};

// Función para eliminar un tag de un producto
export const removeTagFromProduct = async (productId, tag) => {
    try {
        const response = await api.delete(`/${productId}/removeTag`, {
            params: { tag }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error removing tag from product');
    }
};

// Función para eliminar una imagen de un producto
export const removeImageFromProduct = async (productId, imageId) => {
    try {
        const response = await api.delete(`/${productId}/removeImage`, {
            params: { imageId }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error removing image from product');
    }
};
