import api from '../api/AxiosConfig'; // Usa la instancia configurada

// Función para crear un producto
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products/create', productData);
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
    const response = await api.put(`/products/add-images`, formData, {
      params: { productId },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error adding images');
  }
};

// Función para eliminar un producto
export const softDeleteProduct = async (productId) => {
  try {
    const response = await api.put(`/products/delete/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting product');
  }
};

// Función para actualizar un producto
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await api.put(`/products/update/${productId}`, updatedData, {
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
    const response = await api.get('/products/get');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

// Función para obtener un producto por ID
export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`/products/get/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching product by ID');
  }
};

// Función para obtener todos los tags
export const fetchTags = async () => {
  try {
    const response = await api.get('/products/get/tags');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching tags');
  }
};

// Función para eliminar un tag de un producto
export const removeTagFromProduct = async (productId, tag) => {
  try {
    const response = await api.delete(`/products/${productId}/removeTag`, {
      params: { tag },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error removing tag from product');
  }
};

// Función para eliminar una imagen de un producto
export const removeImageFromProduct = async (productId, imageId) => {
  try {
    const response = await api.put(`/products/${productId}/removeImage/${imageId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error removing image from product');
  }
};

// Función para filtrar productos por precio, categoría y etiquetas
export const filterProducts = async (minPrice, maxPrice, categoryId, tags) => {
  try {
    const response = await api.get('/products/get/filter', {
      params: {
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        categoryId: categoryId || null,
        tags: tags ? Array.from(tags) : null,
      },
      paramsSerializer: (params) => {
        return Object.entries(params)
          .flatMap(([key, value]) =>
            Array.isArray(value)
              ? value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
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

// Función para buscar productos por nombre
export const searchProductsByName = async (name) => {
  try {
    const response = await api.get('/products/search', {
      params: { name },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching product suggestions');
  }
};
