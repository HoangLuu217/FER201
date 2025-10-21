import React, { useReducer } from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';

// 1. Khởi tạo trạng thái ban đầu
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
  isLoading: false,
  errors: {},
  isSignedUp: false
};

// 2. Định nghĩa hàm reducer
function signUpReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { 
        ...state, 
        [action.field]: action.payload,
        errors: { ...state.errors, [action.field]: '' }
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'SIGNUP_START':
      return { ...state, isLoading: true, errors: {} };
    case 'SIGNUP_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        isSignedUp: true,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        errors: {}
      };
    case 'SIGNUP_FAILURE':
      return { 
        ...state, 
        isLoading: false, 
        errors: action.payload 
      };
    case 'RESET_FORM':
      return { ...initialState };
    default:
      return state;
  }
}

function SignUpForm() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(signUpReducer, initialState);

  // Action handlers
  const handleFieldChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    dispatch({ type: 'SET_FIELD', field, payload: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!state.firstName.trim()) {
      errors.firstName = 'Họ không được để trống';
    }

    if (!state.lastName.trim()) {
      errors.lastName = 'Tên không được để trống';
    }

    if (!state.email.trim()) {
      errors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errors.email = 'Email không hợp lệ';
    }

    if (!state.password) {
      errors.password = 'Mật khẩu không được để trống';
    } else if (state.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (state.password !== state.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!state.agreeToTerms) {
      errors.agreeToTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }

    dispatch({ type: 'SIGNUP_START' });

    // Simulate API call
    setTimeout(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }, 1500);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  if (state.isSignedUp) {
    return (
      <Card style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="text-center text-success">Đăng ký thành công!</h2>
        <p className="text-center">Chào mừng bạn đến với hệ thống!</p>
        <Button 
          variant="primary" 
          onClick={handleReset}
          className="w-100"
        >
          Đăng ký tài khoản mới
        </Button>
      </Card>
    );
  }

  return (
    <Card style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 className="text-center mb-4">Đăng Ký Tài Khoản</h2>
      
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Họ *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ"
                value={state.firstName}
                onChange={handleFieldChange('firstName')}
                disabled={state.isLoading}
                isInvalid={!!state.errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Tên *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên"
                value={state.lastName}
                onChange={handleFieldChange('lastName')}
                disabled={state.isLoading}
                isInvalid={!!state.errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={state.email}
            onChange={handleFieldChange('email')}
            disabled={state.isLoading}
            isInvalid={!!state.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu *</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={state.password}
            onChange={handleFieldChange('password')}
            disabled={state.isLoading}
            isInvalid={!!state.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Xác nhận mật khẩu *</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={state.confirmPassword}
            onChange={handleFieldChange('confirmPassword')}
            disabled={state.isLoading}
            isInvalid={!!state.errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Tôi đồng ý với điều khoản sử dụng"
            checked={state.agreeToTerms}
            onChange={handleFieldChange('agreeToTerms')}
            disabled={state.isLoading}
            isInvalid={!!state.errors.agreeToTerms}
          />
          {state.errors.agreeToTerms && (
            <div className="text-danger small mt-1">
              {state.errors.agreeToTerms}
            </div>
          )}
        </Form.Group>

        <div className="d-grid gap-2">
          <Button 
            variant="primary" 
            type="submit"
            disabled={state.isLoading}
          >
            {state.isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
          </Button>
          <Button 
            variant="outline-secondary" 
            type="button"
            onClick={handleReset}
            disabled={state.isLoading}
          >
            Làm mới
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default SignUpForm;
