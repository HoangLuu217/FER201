// ============================================
// API.JS - Axios instance và các API chung
// ============================================
// File này chứa:
// - Axios instance được cấu hình sẵn (baseURL, headers)
// - Các hàm API CRUD cho user (không liên quan đến authentication)
// 
// LƯU Ý:
// - Port json-server: 3001 (không phải 3000)
// - Các hàm auth (getUsers, login) nằm trong authApi.js
// 
// CÁCH SỬ DỤNG:
// import { getUserById, createUser, updateUser, instance } from './services/api';
// 
// // Lấy user theo ID
// const user = await getUserById(1);
// 
// // Tạo user mới
// const newUser = await createUser({ username: 'test', email: 'test@test.com' });
// 
// // Cập nhật user
// const updated = await updateUser(1, { username: 'newName' });
// ============================================

import axios from 'axios';

// ============================================
// AXIOS INSTANCE
// ============================================
// Instance được cấu hình sẵn với baseURL và headers
// Export để các file khác (như authApi.js) có thể import và sử dụng
// ============================================
export const instance = axios.create({
    baseURL: 'http://localhost:3001',  // Port của json-server
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============================================
// GET USER BY ID
// ============================================
// Lấy thông tin user theo ID
// 
// PARAMETERS:
// - id: number hoặc string - ID của user
// 
// RETURNS:
// - Promise<object> - Thông tin user
// 
// EXAMPLE:
// const user = await getUserById(1);
// ============================================
export const getUserById = async (id) => {
    const response = await instance.get(`/account/${id}`);
    return response.data;
};

// ============================================
// CREATE USER
// ============================================
// Tạo user mới
// 
// PARAMETERS:
// - user: object - Thông tin user cần tạo
//   {
//     username: string,
//     email: string,
//     password: string,
//     status?: string (optional, mặc định: 'active')
//   }
// 
// RETURNS:
// - Promise<object> - User đã được tạo (có thêm id)
// 
// EXAMPLE:
// const newUser = await createUser({
//   username: 'testuser',
//   email: 'test@example.com',
//   password: 'password123'
// });
// ============================================
export const createUser = async (user) => {
    const response = await instance.post('/account', user);
    return response.data;
};

// ============================================
// UPDATE USER
// ============================================
// Cập nhật thông tin user
// 
// PARAMETERS:
// - id: number hoặc string - ID của user cần cập nhật
// - user: object - Thông tin mới cần cập nhật (chỉ cần gửi các field cần thay đổi)
// 
// RETURNS:
// - Promise<object> - User đã được cập nhật
// 
// EXAMPLE:
// const updated = await updateUser(1, { username: 'newname' });
// ============================================
export const updateUser = async (id, user) => {
    const response = await instance.put(`/account/${id}`, user);
    return response.data;
};

// ============================================
// CÁC HÀM KHÁC CÓ THỂ THÊM:
// ============================================
// 
// DELETE USER:
// export const deleteUser = async (id) => {
//     const response = await instance.delete(`/account/${id}`);
//     return response.data;
// };
// 
// SEARCH USERS:
// export const searchUsers = async (query) => {
//     const response = await instance.get(`/account?q=${query}`);
//     return response.data;
// };
// ============================================  