// ============================================
// AUTHAPI.JS - API liên quan đến xác thực
// ============================================
// File này chứa các hàm API liên quan đến authentication
// 
// LƯU Ý:
// - File này tách riêng để dễ quản lý các API liên quan đến auth
// - Import instance từ api.js để tái sử dụng cấu hình axios
// 
// CÁCH SỬ DỤNG:
// import { getUsers, login } from './services/authApi';
// 
// // Lấy danh sách users
// const users = await getUsers();
// 
// // Đăng nhập (nếu cần dùng trực tiếp)
// const result = await login('username', 'password');
// ============================================

import { instance } from './api';

// ============================================
// GET USERS
// ============================================
// Lấy danh sách tất cả users từ database
// 
// RETURNS:
// - Promise<Array> - Mảng các user objects
// 
// EXAMPLE:
// const users = await getUsers();
// console.log(users); // [{ id: 1, username: 'admin', ... }, ...]
// 
// SỬ DỤNG TRONG:
// - AuthContext.jsx: để kiểm tra đăng nhập
// ============================================
export const getUsers = async () => {
    const response = await instance.get('/users');
    return response.data;
};

// ============================================
// LOGIN
// ============================================
// Hàm đăng nhập (có thể dùng cho tương lai nếu cần gọi API trực tiếp)
// 
// PARAMETERS:
// - username: string - Username hoặc email
// - password: string - Mật khẩu
// 
// RETURNS:
// - Promise<object> - Kết quả đăng nhập
// 
// NOTE:
// - Hiện tại AuthContext tự xử lý login bằng cách gọi getUsers() và tìm user
// - Hàm này có thể dùng nếu backend có endpoint login riêng
// 
// EXAMPLE:
// const result = await login('admin', 'admin123');
// ============================================
export const login = async (username, password) => {
    const response = await instance.post('/users', { username, password });
    return response.data;
};

