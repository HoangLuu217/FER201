import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button, Dropdown, InputGroup, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ onSearch, searchTerm = '' }) {
  const [quickSearch, setQuickSearch] = useState(searchTerm);
  const [favouritesCount, setFavouritesCount] = useState(0);
  const navigate = useNavigate();

  // Sync local state with prop changes
  useEffect(() => {
    setQuickSearch(searchTerm);
  }, [searchTerm]);

  // Load favourites count
  useEffect(() => {
    const loadFavouritesCount = () => {
      try {
        const favourites = localStorage.getItem('movieFavourites');
        if (favourites) {
          setFavouritesCount(JSON.parse(favourites).length);
        }
      } catch (error) {
        console.error('Error loading favourites count:', error);
      }
    };

    loadFavouritesCount();

    // Listen for favourites updates
    const handleFavouritesUpdate = () => {
      loadFavouritesCount();
    };

    window.addEventListener('favouritesUpdated', handleFavouritesUpdate);
    window.addEventListener('storage', handleFavouritesUpdate);

    return () => {
      window.removeEventListener('favouritesUpdated', handleFavouritesUpdate);
      window.removeEventListener('storage', handleFavouritesUpdate);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(quickSearch);
    }
    // Navigate to home page to show results
    navigate('/');
  };

  const handleQuickSearchChange = (value) => {
    setQuickSearch(value);
    // Real-time search as user types
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Movie App</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>

          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Quick search..."
                value={quickSearch}
                onChange={(e) => handleQuickSearchChange(e.target.value)}
                className="me-2"
              />
              <Button variant="outline-light" type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>

          <Nav>
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="outline-light" id="dropdown-accounts">
                <i className="bi bi-person-circle me-1"></i>
                Accounts
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/account">Build your Account</Dropdown.Item>
                <Dropdown.Item href="#manage-profiles">Manage Your Profiles</Dropdown.Item>
                <Dropdown.Item href="#change-password">Change Password</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="outline-light" className="me-2">
              <i className="bi bi-box-arrow-in-right me-1"></i>
              Login
            </Button>

            <Button variant="outline-light" as={Link} to="/favourites" className="position-relative">
              <i className="bi bi-heart me-1"></i>
              Favourites
              {favouritesCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                  {favouritesCount}
                </span>
              )}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
