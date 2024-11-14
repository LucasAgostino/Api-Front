import { configureStore } from '@reduxjs/toolkit';
import userReducer from './SliceUser';
import orderReducer from './SliceOrder';
import categoryReducer from './SliceCategory';
import cartReducer from './SliceCart';

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    category: categoryReducer,
    cart: cartReducer,
  },
});