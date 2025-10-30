import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuth, useAuthActions } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const HeaderBar = () => {
  const { user, isAuthenticated } = useAuth();
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="md" className="mb-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/movies">
          Movies JSON Server
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          {isAuthenticated ? (
            <>
              <Navbar.Text className="me-3">
                Signed in as <strong>{user.fullName}</strong> ({user.role})
              </Navbar.Text>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button as={Link} to="/login" size="sm" variant="outline-primary">
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HeaderBar;
