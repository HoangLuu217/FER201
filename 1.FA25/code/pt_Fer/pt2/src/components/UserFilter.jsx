import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const UserFilter = ({ filters, setFilters }) => {
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Row className="mb-3">
      <Col md={4}>
        <Form.Control
          placeholder="Search by id, username or full name"
          value={filters.q}
          onChange={handleChange('q')}
        />
      </Col>
      <Col md={2}>
        <Form.Select value={filters.role} onChange={handleChange('role')}>
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select value={filters.status} onChange={handleChange('status')}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
          <option value="locked">Locked</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select value={filters.sortBy} onChange={handleChange('sortBy')}>
          <option value="id">Sort by ID</option>
          <option value="username">Sort by Username</option>
          <option value="fullName">Sort by Full Name</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select value={filters.sortDir} onChange={handleChange('sortDir')}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default UserFilter;
