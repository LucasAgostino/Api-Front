import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProductos,
  createProduct,
  updateProduct,
  softDeleteProduct,
  addImagesToProduct,
  fetchProductById,
  fetchTags,
  removeTagFromProduct,
  removeImageFromProduct,
  filterProducts,
  searchProductsByName,
} from '../api/Product'; // Ruta de tu archivo de funciones de la API

// Thunks asincrónicos

// Obtener todos los productos
export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProductos',
  async (_, thunkAPI) => {
    try {
      const response = await fetchProductos();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Error fetching products');
    }
  }
);

// Crear un producto
export const createProductsThunk = createAsyncThunk(
  'products/createProduct',
  async (productData, thunkAPI) => {
    try {
      const response = await createProduct(productData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Error creating product');
    }
  }
);

// Actualizar un producto
export const updateProductsThunk = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, updatedData }, thunkAPI) => {
    try {
      const response = await updateProduct(productId, updatedData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Error updating product');
    }
  }
);

// Eliminar un producto
export const softDeleteProductsThunk = createAsyncThunk(
  'products/softDeleteProduct',
  async (productId, thunkAPI) => {
    try {
      const response = await softDeleteProduct(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Error deleting product');
    }
  }
);

// Filtrar productos
export const filterProductsThunk = createAsyncThunk(
  'products/filterProducts',
  async ({ minPrice, maxPrice, categoryId, tags }, thunkAPI) => {
    try {
      const response = await filterProducts(minPrice, maxPrice, categoryId, tags);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Error filtering products');
    }
  }
);

// Buscar productos por nombre
export const searchProductsThunk = createAsyncThunk(
  'products/searchProductsByName',
  async (name, thunkAPI) => {
    try {
      const response = await searchProductsByName(name);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Error searching products');
    }
  }
);

// Obtener etiquetas
export const fetchTagsThunk = createAsyncThunk(
  'products/fetchTags',
  async (_, thunkAPI) => {
    try {
      const response = await fetchTags();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Error fetching tags');
    }
  }
);

// Agregar imágenes a un producto
export const addImagesToProductThunk = createAsyncThunk(
  'products/addImagesToProduct',
  async ({ productId, images }, thunkAPI) => {
    try {
      const response = await addImagesToProduct(productId, images);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Error adding images to product');
    }
  }
);

// Obtener un producto por ID
export const fetchProductByIdThunk = createAsyncThunk(
  'products/fetchProductById',
  async (productId, thunkAPI) => {
    try {
      const response = await fetchProductById(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Error fetching product by ID');
    }
  }
);

// Eliminar una etiqueta de un producto
export const removeTagFromProductThunk = createAsyncThunk(
  'products/removeTagFromProduct',
  async ({ productId, tag }, thunkAPI) => {
    try {
      const response = await removeTagFromProduct(productId, tag);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Error removing tag from product');
    }
  }
);

// Eliminar una imagen de un producto
export const removeImageFromProductThunk = createAsyncThunk(
  'products/removeImageFromProduct',
  async ({ productId, imageId }, thunkAPI) => {
    try {
      const response = await removeImageFromProduct(productId, imageId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Error removing image from product');
    }
  }
);

// Slice de Redux
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    featuredProducts: [],
    tags: [],
    loading: false,
    error: null,
    currentProduct: null, // Para almacenar el producto seleccionado por ID
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Obtener productos
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        if (state.featuredProducts.length === 0) {
          state.featuredProducts = action.payload.slice(0, 4);
        }
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Crear producto
      .addCase(createProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Actualizar producto
      .addCase(updateProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Eliminar producto
      .addCase(softDeleteProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(softDeleteProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.meta.arg
        );
      })
      .addCase(softDeleteProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Filtrar productos
      .addCase(filterProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      // Buscar productos por nombre
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      // Obtener etiquetas
      .addCase(fetchTagsThunk.fulfilled, (state, action) => {
        state.tags = action.payload;
      })

      // Agregar imágenes a un producto
      .addCase(addImagesToProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addImagesToProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.meta.arg.productId
        );
        if (index !== -1) {
          state.products[index].images.push(...action.payload);
        }
      })
      .addCase(addImagesToProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Obtener un producto por ID
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Eliminar una etiqueta de un producto
      .addCase(removeTagFromProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTagFromProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, tag } = action.meta.arg;
        const product = state.products.find((prod) => prod.id === productId);
        if (product) {
          product.tags = product.tags.filter((t) => t !== tag);
        }
      })
      .addCase(removeTagFromProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Eliminar una imagen de un producto
      .addCase(removeImageFromProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeImageFromProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, imageId } = action.meta.arg;
        const product = state.products.find((prod) => prod.id === productId);
        if (product) {
          product.images = product.images.filter((img) => img.id !== imageId);
        }
      })
      .addCase(removeImageFromProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;
