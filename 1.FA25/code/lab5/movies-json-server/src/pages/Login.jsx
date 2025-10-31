import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth, useAuthActions } from '../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const { login } = useAuthActions();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/movies" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    // Validation
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setError('');
    setValidated(true);

    // Kiểm tra username và password không được rỗng
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }

    if (!password.trim()) {
      setError('Password cannot be empty');
      return;
    }

    try {
      await login(username.trim(), password);
      navigate('/movies');
    } catch (err) {
      // Hiển thị lỗi chi tiết
      const errorMessage = err?.message || err?.toString() || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      console.error('Login error:', err);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3 text-center">Sign In</Card.Title>
              
              {/* Hiển thị lỗi với text đỏ */}
              {error && (
                <Alert variant="danger" onClose={() => setError('')} dismissible>
                  <strong>Error: </strong>{error}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    required
                    isInvalid={validated && !username.trim()}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your username
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                    isInvalid={validated && !password.trim()}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your password
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Signing in…' : 'Sign In'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
