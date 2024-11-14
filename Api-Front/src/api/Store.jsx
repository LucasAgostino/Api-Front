import { configureStore } from '@reduxjs/toolkit';
import userReducer from './SliceUser';
import orderReducer from './SliceOrder';
import categoryReducer from './SliceCategory';

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    category: categoryReducer,
  },
});