// store/index.js - Cấu hình Redux Store với Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import paymentsReducer from './paymentsSlice';

// Cấu hình store với configureStore
// configureStore tự động:
// - Thêm Redux Thunk middleware
// - Bật Redux DevTools Extension
// - Thêm các middleware mặc định để phát hiện lỗi
export const store = configureStore({
  reducer: {
    users: usersReducer,
    payments: paymentsReducer,
  },
  // Có thể thêm middleware tùy chỉnh nếu cần
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua một số action types nếu cần
        ignoredActions: [],
      },
    }),
});

