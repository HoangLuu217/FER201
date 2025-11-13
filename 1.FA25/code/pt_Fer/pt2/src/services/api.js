//api.js chứa các hàm gọi API tới JSON Server
import axios from 'axios';

// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001 
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

export const getUserById = async (id) => {
    try {
        const response = await API.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
};

export const updateUser = async (id, user) => {
    try {
        const response = await API.put(`/users/${id}`, user);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};

// Các hàm API cho payments
export const getPayments = async () => {
    try {
        const response = await API.get('/payments');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch payments');
    }
};

export const addPayment = async (payment) => {
    try {
        const response = await API.post('/payments', payment);
        return response.data;
    } catch (error) {
        // Giữ nguyên error để có thể kiểm tra status code trong slice
        throw error;
    }
};

export const refundPayment = async (paymentId) => {
    try {
        // Giả sử có endpoint refund (có thể cần thêm vào JSON Server routes)
        const response = await API.post(`/payments/${paymentId}/refund`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to refund payment');
    }
};

export const updatePayment = async (id, payment) => {
    try {
        const response = await API.put(`/payments/${id}`, payment);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update payment');
    }
};

export const deletePayment = async (id) => {
    try {
        const response = await API.delete(`/payments/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete payment');
    }
};

export default API;
