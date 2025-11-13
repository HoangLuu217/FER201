// ============================================
// LOGINPAGE.JSX - Trang đăng nhập
// ============================================
// Trang này hiển thị form đăng nhập sử dụng LoginForm component
// 
// CHỨC NĂNG:
// - Kiểm tra nếu đã đăng nhập thì redirect về trang chủ
// - Hiển thị LoginForm component để người dùng đăng nhập
// 
// CÁCH SỬ DỤNG:
// - Import vào App.js và thêm route: <Route path="/login" element={<LoginPage />} />
// - Tự động redirect nếu đã đăng nhập
// ============================================

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  // Lấy trạng thái đăng nhập từ AuthContext
  const { isAuthenticated } = useAuth();
  
  // Nếu đã đăng nhập thì chuyển về trang chủ
  // Tránh trường hợp user đã đăng nhập nhưng vẫn vào /login
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Nếu chưa đăng nhập thì hiển thị form đăng nhập
  return (
    <LoginForm />
  );
};

export default LoginPage;
