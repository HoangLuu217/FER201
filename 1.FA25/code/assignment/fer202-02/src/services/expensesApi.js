import { instance } from './api';

export const getExpenses = (params = {}) => {
  return instance.get('/expenses', { params });
};

export const createExpense = (data) => {
  return instance.post('/expenses', data);
};

export const updateExpense = (id, data) => {
  return instance.put(`/expenses/${id}`, data);
};

export const deleteExpense = (id) => {
  return instance.delete(`/expenses/${id}`);
};