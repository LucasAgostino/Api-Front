import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories, createCategory, fetchCategoryById} from './Category';

// Thunks para las operaciones asincrónicas
export const loadCategories = createAsyncThunk('categories/loadCategories', async () => {
  const categories = await fetchCategories();
  return categories;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (category) => {
  const newCategory = await createCategory(category);
  return newCategory;
});

export const loadCategoryById = createAsyncThunk('categories/loadCategoryById', async (id) => {
  const category = await fetchCategoryById(id);
  return category;
});

// Slice para las categorías
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(loadCategoryById.fulfilled, (state, action) => {
        state.selectedCategory = action.payload;
      });
  },
});

export default categorySlice.reducer;
