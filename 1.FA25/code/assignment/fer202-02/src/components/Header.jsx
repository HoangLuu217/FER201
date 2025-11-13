

import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../logo.svg';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
            <Container fluid className="px-0">
                <Navbar.Brand className="d-flex align-items-center gap-2 text-dark fw-semibold">
                    <img src={logo} alt="PersonalBudget logo" width={32} height={32} />
                    PersonalBudget
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="primary-navbar" />

                <Navbar.Collapse id="primary-navbar">
                    <Nav className="ms-auto align-items-center gap-3">
                        <Navbar.Text className="text-dark">
                            Signed in as{' '}
                            <strong className="ms-1">{user?.fullName || user?.username}</strong>
                        </Navbar.Text>
                        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
