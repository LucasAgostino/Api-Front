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
        const response = await api.put(`/add-images`, formData, {
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
        const response = await api.put(`/update/${productId}`, updatedData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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


// Función para obtener todos los tags
export const fetchTags = async () => {
    try {
        const response = await api.get('/get/tags');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching tags');
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

// Función para filtrar productos por precio, categoría y etiquetas
export const filterProducts = async (minPrice, maxPrice, categoryId, tags) => {
    try {
        const response = await api.get('/get/filter', {
            params: {
                minPrice: minPrice || null, // Si no hay minPrice, se envía como null
                maxPrice: maxPrice || null, // Si no hay maxPrice, se envía como null
                categoryId: categoryId || null, // Si no hay categoryId, se envía como null
                // Asegúrate de que 'tags' se envíe como un arreglo
                tags: tags ? Array.from(tags) : null // Convierte el conjunto a un array si no es null
            },
            paramsSerializer: (params) => {
                // Serializar los parámetros de modo que 'tags' aparezca varias veces
                return Object.entries(params)
                    .flatMap(([key, value]) =>
                        Array.isArray(value)
                            ? value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
                            : value != null
                            ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                            : []
                    )
                    .join('&');
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error filtering products');
    }
};

export const searchProductsByName = async (name) => {
    try {
      const response = await api.get('/search', {
        params: { name },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching product suggestions');
    }
  };

