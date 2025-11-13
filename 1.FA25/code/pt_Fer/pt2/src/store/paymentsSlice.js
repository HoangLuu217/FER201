// paymentsSlice.js - Quản lý state thanh toán với Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

// Initial State
const initialState = {
  list: [],
  filteredPayments: [],
  isLoading: false,
  error: null,
  filters: {
    search: '',
    semester: '',
    course: '',
  },
  sortBy: 'date_desc',
  totalAmount: 0,
};

// Async Thunk: Fetch Payments
export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (userId, { rejectWithValue }) => {
    try {
      const payments = await api.getPayments();
      // Lọc payments theo userId
      const userPayments = payments.filter((payment) => payment.userId === userId);
      return userPayments;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch payments');
    }
  }
);

// Async Thunk: Tạo Thanh Toán Mới (POST /api/payments)
export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await api.addPayment(paymentData);
      return response;
    } catch (error) {
      // Xử lý lỗi tùy chỉnh: Nếu status code là 402
      if (error.response?.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }
      return rejectWithValue(error.message || 'Failed to create payment');
    }
  }
);

// Async Thunk: Refund Payment (Bài tập 4)
export const refundPayment = createAsyncThunk(
  'payments/refund',
  async (paymentId, { rejectWithValue }) => {
    try {
      // Giả sử API có endpoint refund
      const response = await api.refundPayment(paymentId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Refund failed');
    }
  }
);

// Async Thunk: Update Payment
export const updatePayment = createAsyncThunk(
  'payments/updatePayment',
  async ({ id, paymentData }, { rejectWithValue }) => {
    try {
      const response = await api.updatePayment(id, paymentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update payment');
    }
  }
);

// Async Thunk: Delete Payment
export const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (paymentId, { rejectWithValue }) => {
    try {
      await api.deletePayment(paymentId);
      return paymentId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete payment');
    }
  }
);

// Tạo slice với createSlice
const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    // Set filter
    setFilter: (state, action) => {
      const { field, value } = action.payload;
      state.filters[field] = value;
    },
    // Set sort
    setSort: (state, action) => {
      state.sortBy = action.payload;
    },
    // Apply filters and sort
    applyFiltersAndSort: (state) => {
      let filtered = [...state.list];

      // Filter by search
      if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase();
        filtered = filtered.filter(
          (payment) =>
            payment.semester?.toLowerCase().includes(searchLower) ||
            payment.courseName?.toLowerCase().includes(searchLower)
        );
      }

      // Filter by semester
      if (state.filters.semester) {
        filtered = filtered.filter(
          (payment) => payment.semester === state.filters.semester
        );
      }

      // Filter by course
      if (state.filters.course) {
        filtered = filtered.filter(
          (payment) => payment.courseName === state.filters.course
        );
      }

      // Sort
      filtered.sort((a, b) => {
        switch (state.sortBy) {
          case 'course_asc':
            return a.courseName.localeCompare(b.courseName);
          case 'course_desc':
            return b.courseName.localeCompare(a.courseName);
          case 'date_asc':
            return new Date(a.date) - new Date(b.date);
          case 'date_desc':
            return new Date(b.date) - new Date(a.date);
          case 'amount_asc':
            return a.amount - b.amount;
          case 'amount_desc':
            return b.amount - a.amount;
          default:
            return 0;
        }
      });

      // Tính total amount
      const totalAmount = filtered.reduce((sum, payment) => sum + payment.amount, 0);

      state.filteredPayments = filtered;
      state.totalAmount = totalAmount;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  // Xử lý async thunks trong extraReducers
  extraReducers: (builder) => {
    builder
      // Fetch Payments
      .addCase(fetchPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
        state.error = null;
        // Tự động áp dụng filters và sort sau khi fetch
        // Tính toán filteredPayments và totalAmount
        let filtered = [...state.list];
        if (state.filters.search) {
          const searchLower = state.filters.search.toLowerCase();
          filtered = filtered.filter(
            (payment) =>
              payment.semester.toLowerCase().includes(searchLower) ||
              payment.courseName.toLowerCase().includes(searchLower)
          );
        }
        if (state.filters.semester) {
          filtered = filtered.filter(
            (payment) => payment.semester === state.filters.semester
          );
        }
        if (state.filters.course) {
          filtered = filtered.filter(
            (payment) => payment.courseName === state.filters.course
          );
        }
        filtered.sort((a, b) => {
          switch (state.sortBy) {
            case 'course_asc':
              return a.courseName.localeCompare(b.courseName);
            case 'course_desc':
              return b.courseName.localeCompare(a.courseName);
            case 'date_asc':
              return new Date(a.date) - new Date(b.date);
            case 'date_desc':
              return new Date(b.date) - new Date(a.date);
            case 'amount_asc':
              return a.amount - b.amount;
            case 'amount_desc':
              return b.amount - a.amount;
            default:
              return 0;
          }
        });
        state.filteredPayments = filtered;
        state.totalAmount = filtered.reduce((sum, payment) => sum + payment.amount, 0);
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Payment
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        // Thêm thanh toán mới vào mảng payments
        state.list.push(action.payload);
        state.error = null;
        // Không tự động apply filters ở đây, để FilterBar xử lý
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Refund Payment
      .addCase(refundPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refundPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(refundPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Payment
      .addCase(updatePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Payment
      .addCase(deletePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = state.list.filter((p) => p.id !== action.payload);
        state.error = null;
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setFilter, setSort, applyFiltersAndSort, clearError } = paymentsSlice.actions;

// Export reducer
export default paymentsSlice.reducer;

