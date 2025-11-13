// ============================================
// AUTHCONTEXT.JSX - Context quản lý xác thực người dùng
// ============================================
// Context này quản lý đăng nhập/đăng xuất, lưu thông tin user vào localStorage
// Sử dụng Context API và useReducer để quản lý state
// ============================================

import React, { createContext, useContext, useReducer } from 'react';
import { getUsers } from '../services/authApi';

// ============================================
// 1. TẠO CONTEXT
// ============================================
const AuthContext = createContext();

// ============================================
// 2. TRẠNG THÁI KHỞI TẠO BAN ĐẦU
// ============================================
const initialAuthState = {
    isAuthenticated: false,  // Trạng thái đăng nhập
    user: JSON.parse(localStorage.getItem('user')) || null,  // Thông tin user
    isLoading: false,        // Đang tải hay không
    error: null,             // Lỗi nếu có
};

// Kiểm tra nếu đã có user trong localStorage thì set isAuthenticated = true
if (initialAuthState.user) {
    initialAuthState.isAuthenticated = true;
}

// ============================================
// 3. REDUCER ĐỂ QUẢN LÝ CÁC HÀNH ĐỘNG
// ============================================
const authReducer = (state, action) => {
    switch (action.type) {
        // Bắt đầu đăng nhập
        case 'LOGIN_START':
            return { ...state, isLoading: true, error: null };
        
        // Đăng nhập thành công
        case 'LOGIN_SUCCESS':
            // Lưu user vào Local Storage
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { 
                ...state, 
                isLoading: false, 
                isAuthenticated: true, 
                user: action.payload, 
                error: null 
            };
        
        // Đăng nhập thất bại
        case 'LOGIN_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        
        // Đăng xuất
        case 'LOGOUT':
            // Xóa user khỏi Local Storage
            localStorage.removeItem('user');
            return { ...initialAuthState, isAuthenticated: false, user: null };
        
        // Xóa lỗi
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        
        default:
            return state;
    }
};

// ============================================
// 4. AUTH PROVIDER COMPONENT
// ============================================
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    // ============================================
    // 5. HÀM XÓA LỖI
    // ============================================
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // ============================================
    // 6. HÀM ĐĂNG NHẬP
    // ============================================
    // Nhận usernameOrEmail (identifier) và password
    const login = async ({ usernameOrEmail, password }) => {
        dispatch({ type: 'LOGIN_START' });
        
        try {
            // Bước 1: Gọi API để lấy danh sách users từ file db.json
            const accounts = await getUsers();
            
            // Bước 2: Tìm user có username hoặc email khớp và password đúng
            const user = accounts.find(
                (acc) =>
                    (acc.username === usernameOrEmail || (acc.email && acc.email === usernameOrEmail)) &&
                    acc.password === password
            );

            // Bước 3: Xử lý kết quả
            if (user) {
                // Kiểm tra trạng thái của tài khoản
                if (user.status && user.status !== 'active') {
                    const msg = 'Tài khoản bị khóa.';
                    dispatch({ type: 'LOGIN_FAILURE', payload: msg });
                    return { success: false, error: msg };
                }

                // Đăng nhập thành công
                dispatch({ type: 'LOGIN_SUCCESS', payload: user });
                return { success: true, user };
            } else {
                // Đăng nhập thất bại (Invalid username/email hoặc password)
                const errorMessage = 'Invalid username/email or password!';
                dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            // Lỗi mạng hoặc lỗi không xác định từ API
            const errorMessage = error.message || 'Login failed due to a network error.';
            dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    // ============================================
    // 7. HÀM ĐĂNG XUẤT
    // ============================================
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    // ============================================
    // 8. GIÁ TRỊ CUNG CẤP CHO CÁC COMPONENT CON
    // ============================================
    const contextValue = {
        // Trạng thái từ Reducer
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.isLoading,
        error: state.error,
        
        // Actions
        login,
        logout,
        clearError,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// ============================================
// 9. CUSTOM HOOK ĐỂ SỬ DỤNG AUTH CONTEXT
// ============================================
export const useAuth = () => useContext(AuthContext);
