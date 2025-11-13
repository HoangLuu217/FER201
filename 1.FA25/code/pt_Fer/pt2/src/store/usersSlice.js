// usersSlice.js - Quản lý state người dùng với Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

// Initial State
const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

// Async Thunk: Fetch Users (Đọc danh sách người dùng)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await api.getUsers();
      return users;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

// Tạo slice với createSlice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Reducer đồng bộ: Toggle Admin Status
    toggleAdminStatus: (state, action) => {
      const userId = action.payload;
      const user = state.list.find((u) => u.id === userId);
      if (user) {
        user.role = user.role === 'admin' ? 'user' : 'admin';
      }
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  // Xử lý 3 trạng thái của async thunk trong extraReducers
  extraReducers: (builder) => {
    builder
      // Pending: Khi bắt đầu fetch
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Fulfilled: Khi fetch thành công
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
        state.error = null;
      })
      // Rejected: Khi fetch thất bại
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { toggleAdminStatus, clearError } = usersSlice.actions;

// Export reducer
export default usersSlice.reducer;

