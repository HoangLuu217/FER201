//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Import useAuth
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddPaymentPage from '../pages/AddPaymentPage';
import UserList from '../pages/UserList';

// Component để bảo vệ các route cần xác thực
const PrivateRoute = ({ children }) => {
    // Lấy trực tiếp isAuthenticated từ useAuth()
    const { isAuthenticated, user } = useAuth(); 

    // Nếu chưa đăng nhập, chuyển hướng đến /login
    if (!isAuthenticated) return <Navigate to="/login" />;

    // Nếu đã đăng nhập nhưng không phải admin -> không cho vào Dashboard
    if (user && user.role !== 'admin') {
        return <Navigate to="/login" state={{ error: 'Bạn không có quyền truy cập vào Dashboard.' }} replace />;
    }

    // Nếu tài khoản không active -> báo lỗi và yêu cầu đăng nhập lại
    if (user && user.status && user.status !== 'active') {
        return <Navigate to="/login" state={{ error: 'Tài khoản bị khóa.' }} replace />;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* 1. Trang mặc định: Chuyển hướng đến /home nếu đã đăng nhập, ngược lại là /login */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                
                {/* 2. Trang Đăng nhập */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* 3. Định nghĩa route bảo vệ cho Trang Chủ/Dashboard (yêu cầu: /home ) */}
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            {/* Component Trang chủ/Dashboard */}
                            <DashboardPage /> 
                        </PrivateRoute>
                    } 
                />
                
                {/* 4. Route thêm thanh toán */}
                <Route 
                    path="/payments/add" 
                    element={
                        <PrivateRoute>
                            <AddPaymentPage />
                        </PrivateRoute>
                    } 
                />

                {/* User Management */}
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <UserList />
                        </PrivateRoute>
                    }
                />
                
                {/* 5. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /home */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

