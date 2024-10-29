// axiosConfig.js
import axios from 'axios';
import store from '../api/Store';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esto por la URL base de tu API
});

// Interceptor para añadir el token a las solicitudes que lo necesiten
api.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token; // Obtiene el token del estado de Redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Añade el token a las cabeceras
    }
    return config; // Devuelve la configuración modificada
  },
  (error) => Promise.reject(error) // Maneja cualquier error
);

export default api; // Exporta la instancia de Axios
