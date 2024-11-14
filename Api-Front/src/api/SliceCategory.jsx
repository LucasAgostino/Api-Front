import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories, createCategory, fetchCategoryById } from './Category';

// Thunks para las operaciones asincrónicas
export const loadCategories = createAsyncThunk('categories/loadCategories', async () => {
  return await fetchCategories();
});

export const addCategory = createAsyncThunk('categories/addCategory', async (category) => {
  return await createCategory(category);
});

export const loadCategoryById = createAsyncThunk('categories/loadCategoryById', async (id) => {
  return await fetchCategoryById(id);
});

// Slice para las categorías
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    selectedCategory: null,  // Definir selectedCategory en el estado inicial
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(loadCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
