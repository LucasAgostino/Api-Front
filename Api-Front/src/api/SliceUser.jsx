import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, getCurrentUser, getUserByEmail, getUserById } from './User';
import { authenticateUser, registerUser } from './Auth';

// Thunks utilizando las funciones importadas de userApi.js
export const registerUserThunk = createAsyncThunk('user/register', async (registerData) => {
  return await registerUser(registerData);
});

export const authenticateUserThunk = createAsyncThunk(
  'user/authenticate',
  async (authData, { dispatch }) => {
    const data = await authenticateUser(authData);
    console.log('Data:', data); // Log para verificar la respuesta
    const { access_token, role } = data; // Asegúrate de que la respuesta incluya el rol
    dispatch(setToken(access_token));
    dispatch(setRole(role)); // Guarda el rol en el estado
    dispatch(fetchCurrentUser()); // Despacha la acción para obtener los detalles del usuario
    return data;
  }
);

export const fetchAllUsers = createAsyncThunk('user/getAllUsers', async () => {
  return await getAllUsers(); // Esta función ya usará la configuración de Axios
});

export const fetchUserById = createAsyncThunk('user/getUserById', async (id) => {
  return await getUserById(id);
});

export const fetchUserByEmail = createAsyncThunk('user/getUserByEmail', async (email) => {
  return await getUserByEmail(email);
});

export const fetchCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
  return await getCurrentUser();
});

// Slice de usuario
const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    role: null,
    userInfo: null,
    users: [],
    searchedUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.role = null;
      state.searchedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.userInfo = action.payload; // Actualiza el estado con los detalles del usuario actual
      })
      .addCase(authenticateUserThunk.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.searchedUser = action.payload; // Actualiza el estado con el usuario buscado
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setToken, setRole, clearToken } = userSlice.actions;

export default userSlice.reducer;
