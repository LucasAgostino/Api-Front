import { configureStore } from '@reduxjs/toolkit';
import userReducer from './SliceUser';
import orderReducer from './SliceOrder';
import categoryReducer from './SliceCategory';
import cartReducer from './SliceCart';
import productReducer from './ProductSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    category: categoryReducer,
    cart: cartReducer,
    product: productReducer,
  },
});