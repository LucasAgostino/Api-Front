import { configureStore } from '@reduxjs/toolkit';
import userReducer from './SliceUser';
import orderReducer from './SliceOrder';

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
});