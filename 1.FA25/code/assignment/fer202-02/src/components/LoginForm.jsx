// ============================================
// LOGINFORM.JSX - Component form đăng nhập
// ============================================
// Component này hiển thị form đăng nhập với validation và xử lý đăng nhập
// 
// CHỨC NĂNG:
// - Form đăng nhập với validation real-time
// - Hỗ trợ đăng nhập bằng username hoặc email
// - Tự động chuyển đến trang home sau khi đăng nhập thành công
// 
// CÁCH SỬ DỤNG:
// - Import vào LoginPage: <LoginForm />
// - Tự động xử lý đăng nhập và navigation
// ============================================

import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// ============================================
// 1. KHỞI TẠO TRẠNG THÁI BAN ĐẦU CHO FORM
// ============================================
const initialFormState = {
  formData: {
    identifier: '',  // username hoặc email
    password: '',     // mật khẩu
  },
  errors: {},                    // Lỗi validation
  showSuccessModal: false,       // Hiển thị modal thành công hay không
};

// ============================================
// 2. REDUCER ĐỂ QUẢN LÝ STATE CỦA FORM
// ============================================
function formReducer(state, action) {
  switch (action.type) {
    // Cập nhật giá trị field
    case 'SET_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    
    // Cập nhật lỗi cho field cụ thể
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    
    // Xóa lỗi cho field cụ thể
    case 'CLEAR_ERROR':
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors,
      };
    
    // Cập nhật tất cả lỗi
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    
    // Hiển thị modal thành công
    case 'SHOW_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: true,
      };
    
    // Ẩn modal thành công
    case 'HIDE_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: false,
      };
    
    // Reset form về trạng thái ban đầu
    case 'RESET_FORM':
      return initialFormState;
    
    default:
      return state;
  }
}

// ============================================
// 3. COMPONENT LOGINFORM
// ============================================
function LoginForm() {
  // Hook để điều hướng
  const navigate = useNavigate();
  const location = useLocation();

  // Sử dụng useReducer để quản lý state của form
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  // Lấy các giá trị từ AuthContext
  const { login, loading, error, clearError } = useAuth();

  // ============================================
  // 4. VALIDATION HELPERS
  // ============================================
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Regex kiểm tra email
  const isEmail = (v) => v.includes('@');        // Kiểm tra có phải email không

  // ============================================
  // 5. XỬ LÝ THAY ĐỔI INPUT
  // ============================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cập nhật giá trị field
    dispatch({ type: 'SET_FIELD', field: name, value });

    // Xóa lỗi auth khi user nhập
    if (error) clearError();

    // Validation real-time
    let message = '';
    
    // Validation cho identifier (username hoặc email)
    if (name === 'identifier') {
      if (!value.trim()) {
        message = 'Username or Email is required.';
      } else if (isEmail(value) && !emailRe.test(value)) {
        message = 'Email is invalid format.';
      }
    }

    // Validation cho password
    if (name === 'password') {
      if (!value.trim()) {
        message = 'Password is required.';
      } else if (value.length < 6) {
        message = 'Password must be at least 6 characters.';
      }
    }

    // Cập nhật lỗi hoặc xóa lỗi
    if (message) {
      dispatch({ type: 'SET_ERROR', field: name, message });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  // ============================================
  // 6. VALIDATION FORM TRƯỚC KHI SUBMIT
  // ============================================
  const validateForm = () => {
    const errors = {};
    const { identifier, password } = formState.formData;

    let generalMessage = '';

    // Validation identifier
    if (!identifier.trim()) {
      errors.identifier = 'Username or Email is required.';
    } else if (isEmail(identifier) && !emailRe.test(identifier)) {
      errors.identifier = 'Email is invalid format.';
    }

    // Validation password
    if (!password.trim()) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (!identifier.trim() && !password.trim()) {
      generalMessage = 'Username and password are required.';
    }

    if (generalMessage) {
      errors.general = generalMessage;
    }

    return errors;
  };

  // ============================================
  // 7. XỬ LÝ SUBMIT FORM
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Xóa lỗi trước khi submit lại
    if (error) clearError();

    // Validate form
    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });

    // Nếu có lỗi validation thì dừng lại
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // Gọi hàm login từ AuthContext
      const result = await login({
        usernameOrEmail: formState.formData.identifier.trim(),
        password: formState.formData.password,
      });

      // Nếu đăng nhập thành công
      if (result && result.success) {
        // Reset form về trạng thái ban đầu
        dispatch({ type: 'RESET_FORM' });
        // Tự động chuyển đến trang home (không cần modal xác nhận)
        navigate('/home', { replace: true });
      }
      // Lỗi sẽ được xử lý và hiển thị qua AuthContext error
    } catch (err) {
      // Lỗi mạng hoặc lỗi không xác định
      console.error('Login error:', err);
    }
  };

  // ============================================
  // 8. XỬ LÝ RESET FORM
  // ============================================
  const handleReset = () => {
    // Reset form state về ban đầu
    dispatch({ type: 'RESET_FORM' });
    // Xóa lỗi từ AuthContext nếu có
    if (error) clearError();
  };


  // ============================================
  // 10. RENDER FORM
  // ============================================
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center mb-0">Login</h3>
            </Card.Header>
            <Card.Body>
              {/* Hiển thị lỗi từ AuthContext */}
              {error && (
                <Alert variant="danger" className="mb-3" onClose={clearError} dismissible>
                  {error}
                </Alert>
              )}

              {/* Hiển thị lỗi chung của form nếu có */}
              {formState.errors.general && (
                <Alert variant="danger" className="mb-3">
                  {formState.errors.general}
                </Alert>
              )}

              {/* Hiển thị thông báo từ location.state (nếu có) */}
              {location.state && location.state.error && (
                <Alert variant="warning" className="mb-3">
                  {location.state.error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit} noValidate>
                {/* Field Username or Email */}
                <Form.Group controlId="identifier" className="mb-3">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    value={formState.formData.identifier}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.identifier}
                    placeholder="Enter username or email"
                    disabled={loading}
                  />
                  {/* Hiển thị lỗi validation */}
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.identifier}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Field Password */}
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formState.formData.password}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.password}
                    placeholder="Enter password"
                    disabled={loading}
                  />
                  {/* Hiển thị lỗi validation */}
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    style={{ flex: 1 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" animation="border" role="status" className="me-2" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  <Button 
                    variant="secondary" 
                    type="button" 
                    style={{ flex: 1 }}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
}

export default LoginForm;
