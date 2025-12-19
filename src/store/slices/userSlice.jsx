import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    currentUser: null,
    isLoading: false,
    error: null,
    stats: {
      total: 0,
      admins: 0,
      teachers: 0,
      students: 0,
      active: 0
    }
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserStats: (state) => {
      const users = state.users;
      state.stats = {
        total: users.length,
        admins: users.filter(u => u.role === 'admin').length,
        teachers: users.filter(u => u.role === 'teacher').length,
        students: users.filter(u => u.role === 'student').length,
        active: users.filter(u => u.status === 'active').length
      };
    }
  },
  extraReducers: (builder) => {
    // Add your async thunks here if needed
  }
});

export const { setCurrentUser, clearError, updateUserStats } = userSlice.actions;
export default userSlice.reducer;