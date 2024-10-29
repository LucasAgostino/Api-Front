import { configureStore } from '@reduxjs/toolkit';
import userReducer from './SliceUser'; // Asegúrate de importar el reducer del slice de usuario

export const store = configureStore({
  reducer: {
    user: userReducer, // Añade tu slice aquí
  },
});