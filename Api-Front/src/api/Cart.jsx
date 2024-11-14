import api from './AxiosConfig'; // Importa la instancia de Axios configurada

// Función para agregar un producto al carrito
export const addProductToCart = async (productId, quantity) => {
    try {
      const response = await api.post('/cart/add', null, {
        params: { productId, quantity }
      });
      return response.data; // Devuelve el mensaje de respuesta
    } catch (error) {
      throw new Error('Error adding product to cart');
    }
  };

// Función para actualizar un producto en el carrito
export const updateProductInCart = async (productId, quantity) => {
    try {
        const response = await api.put('/cart/updateproduct', null, {
            params: { productId, quantity }
        });
        return response.data; // Devuelve el mensaje de respuesta
    } catch (error) {
        throw new Error('Error updating product in cart');
    }
};

// Función para obtener el carrito del usuario
export const fetchCart = async () => {
    try {
        const response = await api.get('/cart/get');
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error del servidor:', error.response.data);
            console.error('Código de estado HTTP:', error.response.status);
        } else if (error.request) {
            console.error('Error en la solicitud, sin respuesta del servidor:', error.request);
        } else {
            console.error('Error inesperado:', error.message);
        }
        throw new Error('Error fetching cart');
    }
};

// Función para eliminar un producto del carrito
export const removeProductFromCart = async (productId) => {
    try {
        const response = await api.delete('/cart/remove', {
            params: { productId }
        });
        return response.data; // Devuelve el mensaje de respuesta
    } catch (error) {
        throw new Error('Error removing product from cart');
    }
};

// Función para disminuir la cantidad de un producto en el carrito
export const decreaseProductInCart = async (productId, quantity) => {
    try {
        const response = await api.put('/cart/decrease', null, {
            params: { productId, quantity }
        });
        return response.data; // Devuelve el mensaje de respuesta
    } catch (error) {
        throw new Error('Error decreasing product in cart');
    }
};

// Función para realizar el checkout del carrito
export const checkoutCart = async () => {
    try {
        await api.post('/cart/checkout'); // No devuelve datos, solo realiza la acción
    } catch (error) {
        throw new Error('Error checking out cart');
    }
};
