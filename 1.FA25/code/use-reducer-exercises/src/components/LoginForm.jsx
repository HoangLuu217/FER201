import React, { useReducer } from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';

// 1. Khởi tạo trạng thái ban đầu
const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false
};

// 2. Định nghĩa hàm reducer
function loginReducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload, error: '' };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload, error: '' };
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: '' };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        isLoggedIn: true, 
        error: '',
        username: '',
        password: ''
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        isLoading: false, 
        error: action.payload 
      };
    case 'LOGOUT':
      return { ...initialState };
    case 'CLEAR_ERROR':
      return { ...state, error: '' };
    default:
      return state;
  }
}

function LoginForm() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(loginReducer, initialState);

  // Action handlers
  const handleUsernameChange = (e) => {
    dispatch({ type: 'SET_USERNAME', payload: e.target.value });
  };

  const handlePasswordChange = (e) => {
    dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!state.username || !state.password) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Vui lòng nhập đầy đủ thông tin' });
      return;
    }

    dispatch({ type: 'LOGIN_START' });

    // Simulate API call
    setTimeout(() => {
      if (state.username === 'admin' && state.password === 'password') {
        dispatch({ type: 'LOGIN_SUCCESS' });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Tên đăng nhập hoặc mật khẩu không đúng' });
      }
    }, 1000);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  if (state.isLoggedIn) {
    return (
      <Card style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="text-center text-success">Đăng nhập thành công!</h2>
        <p className="text-center">Chào mừng bạn đến với hệ thống!</p>
        <Button 
          variant="danger" 
          onClick={handleLogout}
          className="w-100"
        >
          Đăng xuất
        </Button>
      </Card>
    );
  }

  return (
    <Card style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 className="text-center mb-4">Đăng Nhập</h2>
      
      {state.error && (
        <Alert variant="danger" onClose={() => dispatch({ type: 'CLEAR_ERROR' })} dismissible>
          {state.error}
        </Alert>
      )}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={state.username}
            onChange={handleUsernameChange}
            disabled={state.isLoading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={state.password}
            onChange={handlePasswordChange}
            disabled={state.isLoading}
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          className="w-100"
          disabled={state.isLoading}
        >
          {state.isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </Form>

      <div className="mt-3 text-center">
        <small className="text-muted">
          Demo: username = "admin", password = "password"
        </small>
      </div>
    </Card>
  );
}

export default LoginForm;
