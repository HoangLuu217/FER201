//LoginForm.jsx is a functional component that uses the useReducer hook to manage login form state.
import React, { useReducer } from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'; // Import custom hook useAuth
import ModalComponent from './ModalComponent';
import ToastMessage from './ToastMessage';

// Dữ liệu mẫu thay thế cho API call
const mockAccounts = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin',
    status: 'active'
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    password: '123456',
    role: 'user',
    status: 'active'
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    password: '123456',
    role: 'user',
    status: 'locked'
  }
];

// 1. Khởi tạo trạng thái ban đầu
const initialState = { 
  username: '', 
  password: '', 
  errors: {}, 
  isLoading: false,
  showPassword: false,
  showModal: false,
  showToast: false,
  modalData: {},
  toastData: {}
};

// 2. Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { 
        ...state, 
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' } // Clear error when field changes
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'RESET_FORM':
      return initialState;
    case 'TOGGLE_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'SHOW_MODAL':
      return { ...state, showModal: true, modalData: action.data };
    case 'HIDE_MODAL':
      return { ...state, showModal: false, modalData: {} };
    case 'SHOW_TOAST':
      return { ...state, showToast: true, toastData: action.data };
    case 'HIDE_TOAST':
      return { ...state, showToast: false, toastData: {} };
    default:
      return state;
  }
}

function LoginForm() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Sử dụng AuthContext
  const { login } = useAuth(); //Lấy hàm login từ context

  //action handlers
  const setField = (field, value) => dispatch({ type: 'SET_FIELD', field, value });
  const setErrors = (errors) => dispatch({ type: 'SET_ERRORS', errors });
  const setLoading = (isLoading) => dispatch({ type: 'SET_LOADING', isLoading });
  const resetForm = () => dispatch({ type: 'RESET_FORM' });
  const togglePassword = () => dispatch({ type: 'TOGGLE_PASSWORD' });
  const showModal = (data) => dispatch({ type: 'SHOW_MODAL', data });
  const hideModal = () => dispatch({ type: 'HIDE_MODAL' });
  const showToast = (data) => dispatch({ type: 'SHOW_TOAST', data });
  const hideToast = () => dispatch({ type: 'HIDE_TOAST' });

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    if (!state.username.trim()) {
      errors.username = 'Tên đăng nhập không được để trống';
    }
    
    if (!state.password.trim()) {
      errors.password = 'Mật khẩu không được để trống';
    }
    
    return errors;
  };

  // Handle login logic
  const handleLogin = async () => {
    setLoading(true);
    setErrors({});

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const user = mockAccounts.find(account => 
        account.username === state.username && 
        account.password === state.password
      );

      if (!user) {
        showModal({
          title: 'Đăng nhập thất bại',
          message: 'Tên đăng nhập hoặc mật khẩu không đúng',
          variant: 'danger',
          confirmText: 'Thử lại',
          showCancel: false
        });
        return;
      }

      if (user.status === 'locked') {
        showModal({
          title: 'Tài khoản bị khóa',
          message: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.',
          variant: 'warning',
          confirmText: 'Đã hiểu',
          showCancel: false
        });
        return;
      }

      // Login successful - allow all active users to login
      login(user);
      resetForm();
      showToast({
        title: 'Đăng nhập thành công',
        message: `Chào mừng ${user.username} (${user.role})`,
        variant: 'success',
        delay: 3000
      });
      
    } catch (error) {
      showModal({
        title: 'Lỗi hệ thống',
        message: 'Có lỗi xảy ra, vui lòng thử lại sau',
        variant: 'danger',
        confirmText: 'Đã hiểu',
        showCancel: false
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Show confirm modal before login
    showModal({
      title: 'Xác nhận đăng nhập',
      message: `Bạn có chắc chắn muốn đăng nhập với tài khoản "${state.username}"?`,
      variant: 'info',
      confirmText: 'Đăng nhập',
      cancelText: 'Hủy',
      showCancel: true,
      onConfirm: () => {
        hideModal();
        handleLogin();
      }
    });
  };

  return (
    <>
    <Card style={{ maxWidth: '400px', margin: '20px auto', padding: '20px' }}>
      <Card.Header>
        <h2>Đăng Nhập</h2>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {state.errors.general && (
            <Alert variant="danger">{state.errors.general}</Alert>
          )}
          
          <Form.Group className="mb-3">
            <Form.Label>Tên đăng nhập:</Form.Label>
            <Form.Control
              type="text"
              value={state.username}
              onChange={(e) => setField('username', e.target.value)}
              isInvalid={!!state.errors.username}
              placeholder="Nhập tên đăng nhập"
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu:</Form.Label>
            <div style={{ position: 'relative' }}>
              <Form.Control
                type={state.showPassword ? "text" : "password"}
                value={state.password}
                onChange={(e) => setField('password', e.target.value)}
                isInvalid={!!state.errors.password}
                placeholder="Nhập mật khẩu"
                style={{ paddingRight: '50px' }}
              />
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                onClick={togglePassword}
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '5px 8px',
                  border: 'none',
                  background: 'transparent'
                }}
              >
                {state.showPassword ? '🙈' : '👁️'}
              </Button>
            </div>
            <Form.Control.Feedback type="invalid">
              {state.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button 
            type="button" 
            variant="primary" 
            disabled={state.isLoading}
            style={{ width: '100%' }}
            onClick={() => {
              const errors = validateForm();
              if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
              }
              
              // Show confirm modal before login
              showModal({
                title: 'Xác nhận đăng nhập',
                message: `Bạn có chắc chắn muốn đăng nhập với tài khoản "${state.username}"?`,
                variant: 'info',
                confirmText: 'Đăng nhập',
                cancelText: 'Hủy',
                showCancel: true,
                onConfirm: () => {
                  hideModal();
                  handleLogin();
                }
              });
            }}
          >
            {state.isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </Button>
        </Form>
        
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          <p><strong>Tài khoản demo:</strong></p>
          <p>Admin: admin / 123456</p>
          <p>User: user1 / 123456</p>
          <p>Locked: user2 / 123456 (tài khoản bị khóa)</p>
          <p><em>Tất cả tài khoản active đều có thể đăng nhập</em></p>
        </div>
      </Card.Body>
    </Card>
    
    {/* Modal Component */}
    <ModalComponent
      show={state.showModal}
      onHide={hideModal}
      {...state.modalData}
    />
    
    {/* Toast Message */}
    <ToastMessage
      show={state.showToast}
      onClose={hideToast}
      {...state.toastData}
    />
    </>
  );
}

export default LoginForm;
