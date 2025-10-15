import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

const AboutStep = ({ formData, errors, onInputChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onInputChange('avatar', file);
  };

  return (
    <div>
      <h5 className="mb-4 pb-2 border-bottom">
        <i className="bi bi-person me-2 text-primary"></i>
        About Information
      </h5>
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-person me-2 text-muted"></i>
            First Name *
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName || ''}
            onChange={(e) => onInputChange('firstName', e.target.value)}
            isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-person me-2 text-muted"></i>
            Last Name *
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName || ''}
            onChange={(e) => onInputChange('lastName', e.target.value)}
            isInvalid={!!errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-envelope me-2 text-muted"></i>
            Email *
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={formData.email || ''}
            onChange={(e) => onInputChange('email', e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-telephone me-2 text-muted"></i>
            Phone *
          </Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone || ''}
            onChange={(e) => onInputChange('phone', e.target.value)}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-calendar me-2 text-muted"></i>
            Age *
          </Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="120"
            placeholder="Enter your age"
            value={formData.age || ''}
            onChange={(e) => onInputChange('age', e.target.value)}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-person-circle me-2 text-muted"></i>
            Avatar
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            isInvalid={!!errors.avatar}
          />
          <Form.Control.Feedback type="invalid">
            {errors.avatar}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            {formData.avatar ? formData.avatar.name : 'No file chosen'}
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AboutStep;
