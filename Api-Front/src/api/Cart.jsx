import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/cart',
});

// Función para establecer el token en las cabeceras de axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Función para agregar un producto al carrito
export const addProductToCart = async (productId, quantity) => {
    try {
        const response = await api.post('/add', null, {
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
        const response = await api.put('/updateproduct', null, {
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
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error('No se encontró el token en localStorage');
            throw new Error('No token found');
        }

        // Asegúrate de que el token esté configurado en las cabeceras
        setAuthToken(token); 
        console.log('Token enviado en la solicitud:', api.defaults.headers.common['Authorization']);
        
        const response = await api.get('/get');
        console.log('Respuesta del servidor:', response.data);
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
        const response = await api.delete('/remove', {
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
        const response = await api.put('/decrease', null, {
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
        await api.post('/checkout'); // No devuelve datos, solo realiza la acción
    } catch (error) {
        throw new Error('Error checking out cart');
    }
};
