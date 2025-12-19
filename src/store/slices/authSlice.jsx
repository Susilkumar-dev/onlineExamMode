import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock users for demo
const mockUsers = [
  { email: 'admin@exam.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { email: 'teacher@exam.com', password: 'teacher123', role: 'teacher', name: 'Teacher User' },
  { email: 'student@exam.com', password: 'student123', role: 'student', name: 'Student User' },
];

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const user = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (user) {
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
      
      return rejectWithValue('Invalid email or password');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id: Date.now(),
        ...userData,
        role: userData.role || 'student'
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    token: null
  },
  reducers: {
    // For testing - set user directly
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        state.error = null;
      });
  }
});

export const { setUser, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;