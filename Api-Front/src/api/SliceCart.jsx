import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  addProductToCart, 
  updateProductInCart, 
  fetchCart, 
  removeProductFromCart, 
  decreaseProductInCart, 
  checkoutCart 
} from './Cart';

// Estado inicial
const initialState = {
  cartItems: [],   
  loading: false,   
  error: null,      
};

// Thunks para interactuar con la API
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
    const response = await fetchCart();
    console.log('Response from fetchCart:', response);
    // Asegúrate de que 'response.products' sea un arreglo
    return Array.isArray(response.products) ? response.products : [];
});  

export const addProduct = createAsyncThunk('cart/addProduct', async ({ productId, quantity }, { dispatch }) => {
    const response = await addProductToCart(productId, quantity);
    // Después de agregar el producto, obtén el carrito actualizado
    const updatedCart = await fetchCart();
    return updatedCart.products || []; // Asegúrate de que 'products' sea un arreglo
});
  

export const updateProduct = createAsyncThunk('cart/updateProduct', async ({ productId, quantity }) => {
  const response = await updateProductInCart(productId, quantity);
  const updatedCart = await fetchCart();
  return updatedCart.products || [];
});

export const removeProduct = createAsyncThunk('cart/removeProduct', async (productId) => {
  const response = await removeProductFromCart(productId);
  const updatedCart = await fetchCart();
  return updatedCart.products || [];
});

export const decreaseProduct = createAsyncThunk('cart/decreaseProduct', async ({ productId, quantity }) => {
  const response = await decreaseProductInCart(productId, quantity);
  const updatedCart = await fetchCart();
  return updatedCart.products || [];
});

export const checkout = createAsyncThunk('cart/checkout', async () => {
  await checkoutCart(); // No se espera respuesta
});

// Crear el slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload; // Establece los productos del carrito
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Maneja el error
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload; // Actualiza los productos en el carrito
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload; // Actualiza el carrito después de eliminar
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(decreaseProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(decreaseProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(decreaseProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(checkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkout.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = []; // Vacía el carrito después del checkout
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Reducers y acciones generadas automáticamente por el slice
export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
