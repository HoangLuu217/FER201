//ToastMessage.jsx quản lý toast messages bằng Context API và useReducer
import React, { createContext, useContext, useReducer } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

// 1. Tạo Context
const ToastContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialToastState = {
    toasts: [],
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến toast
const toastReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TOAST':
            return {
                ...state,
                toasts: [...state.toasts, action.payload],
            };
        case 'REMOVE_TOAST':
            return {
                ...state,
                toasts: state.toasts.filter(toast => toast.id !== action.payload),
            };
        default:
            return state;
    }
};

// 4. Tạo ToastProvider để cung cấp Context cho các component con
export const ToastProvider = ({ children }) => {
    const [state, dispatch] = useReducer(toastReducer, initialToastState);

    const showToast = (message, type = 'success', title = '') => {
        const id = Date.now() + Math.random();
        const toast = {
            id,
            message,
            type,
            title,
        };
        dispatch({ type: 'ADD_TOAST', payload: toast });

        // Tự động xóa sau 3 giây
        setTimeout(() => {
            dispatch({ type: 'REMOVE_TOAST', payload: id });
        }, 3000);
    };

    const showSuccess = (message, title = 'Thành công') => {
        showToast(message, 'success', title);
    };

    const showError = (message, title = 'Lỗi') => {
        showToast(message, 'danger', title);
    };

    const showWarning = (message, title = 'Cảnh báo') => {
        showToast(message, 'warning', title);
    };

    const showInfo = (message, title = 'Thông tin') => {
        showToast(message, 'info', title);
    };

    const contextValue = {
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
                {state.toasts.map(toast => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onClose={() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id })}
                    />
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
};

// Component ToastItem để hiển thị từng toast
const ToastItem = ({ toast, onClose }) => {
    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <FaCheckCircle className="text-success me-2" />;
            case 'danger':
                return <FaTimesCircle className="text-danger me-2" />;
            case 'warning':
                return <FaExclamationCircle className="text-warning me-2" />;
            default:
                return <FaInfoCircle className="text-info me-2" />;
        }
    };

    return (
        <Toast onClose={onClose} show={true} delay={3000} autohide>
            <Toast.Header>
                {getIcon()}
                <strong className="me-auto">{toast.title}</strong>
            </Toast.Header>
            <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
    );
};

// 5. Tạo custom hook để sử dụng ToastContext dễ dàng hơn
export const useToast = () => useContext(ToastContext);

