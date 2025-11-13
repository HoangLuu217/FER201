// selectors.js - Reselect selectors cho Redux state
import { createSelector } from '@reduxjs/toolkit';

// Selector cơ bản: Lấy payments state
export const selectPaymentsState = (state) => state.payments;

// Selector: Lấy danh sách payments
export const selectAllPayments = (state) => state.payments.list;

// Selector: Lấy filtered payments
export const selectFilteredPayments = (state) => state.payments.filteredPayments;

// Selector: Lấy loading state
export const selectPaymentsLoading = (state) => state.payments.isLoading;

// Selector: Lấy error state
export const selectPaymentsError = (state) => state.payments.error;

// Reselect Selector: Chỉ lấy các thanh toán có status: 'SUCCESS'
// Sử dụng createSelector để memoize kết quả
export const selectSuccessfulPayments = createSelector(
  [selectAllPayments],
  (payments) => {
    // Lọc các payments có status là 'SUCCESS'
    // Lưu ý: Trong db.json hiện tại không có field status, 
    // nhưng selector này sẽ hoạt động khi có field status
    return payments.filter((payment) => payment.status === 'SUCCESS');
  }
);

// Selector: Lấy total amount
export const selectTotalAmount = (state) => state.payments.totalAmount;

// Selector: Lấy filters
export const selectPaymentsFilters = (state) => state.payments.filters;

// Selector: Lấy sortBy
export const selectPaymentsSortBy = (state) => state.payments.sortBy;

// Helper selectors: Lấy unique semesters và courses
export const selectUniqueSemesters = createSelector(
  [selectAllPayments],
  (payments) => {
    const semesters = [...new Set(payments.map((p) => p.semester))];
    return semesters.sort();
  }
);

export const selectUniqueCourses = createSelector(
  [selectAllPayments],
  (payments) => {
    const courses = [...new Set(payments.map((p) => p.courseName))];
    return courses.sort();
  }
);

// Users Selectors
export const selectUsersState = (state) => state.users;
export const selectAllUsers = (state) => state.users.list;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;

