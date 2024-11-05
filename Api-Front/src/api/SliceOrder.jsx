// src/api/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllOrders, getOrderById, getOrdersByUser, getUserOrders, getUserOrderById } from './OrderService';

// Thunks para las operaciones de órdenes
export const fetchAllOrders = createAsyncThunk('order/fetchAll', async () => {
  return await getAllOrders();
});

export const fetchOrderById = createAsyncThunk('order/fetchById', async (id) => {
  return await getOrderById(id);
});

export const fetchOrdersByUser = createAsyncThunk('order/fetchByUser', async (userId) => {
  return await getOrdersByUser(userId);
});

export const fetchUserOrders = createAsyncThunk('order/fetchUserOrders', async () => {
  return await getUserOrders();
});

export const fetchUserOrderById = createAsyncThunk('order/fetchUserOrderById', async (orderId) => {
  return await getUserOrderById(orderId);
});

// Slice de órdenes
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    currentOrder: null,
    searchedOrder: null,  // Agrega esto para almacenar la orden buscada
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.searchedOrder = null; // También resetea la orden buscada
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.searchedOrder = action.payload; // Cambia esto para actualizar searchedOrder
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchUserOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.error.message;
        }
      );
  },
});


export const { clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
