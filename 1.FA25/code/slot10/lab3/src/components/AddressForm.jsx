import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const AddressStep = ({ formData, errors, onInputChange }) => {
  const countries = [
    "United States",
    "Canada", 
    "United Kingdom",
    "Germany",
    "France",
    "Japan",
    "Australia",
    "Brazil",
    "India",
    "China",
    "Vietnam",
    "Thailand",
    "Singapore",
    "Malaysia",
    "Philippines"
  ];

  return (
    <div>
      <h5 className="mb-4 pb-2 border-bottom">
        <i className="bi bi-geo-alt me-2 text-primary"></i>
        Address Information
      </h5>
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-house me-2 text-muted"></i>
            Street *
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your street address"
            value={formData.street || ''}
            onChange={(e) => onInputChange('street', e.target.value)}
            isInvalid={!!errors.street}
          />
          <Form.Control.Feedback type="invalid">
            {errors.street}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-building me-2 text-muted"></i>
            City *
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            value={formData.city || ''}
            onChange={(e) => onInputChange('city', e.target.value)}
            isInvalid={!!errors.city}
          />
          <Form.Control.Feedback type="invalid">
            {errors.city}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-map me-2 text-muted"></i>
            State *
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your state/province"
            value={formData.state || ''}
            onChange={(e) => onInputChange('state', e.target.value)}
            isInvalid={!!errors.state}
          />
          <Form.Control.Feedback type="invalid">
            {errors.state}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-mailbox me-2 text-muted"></i>
            Zip Code *
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your zip/postal code"
            value={formData.zipCode || ''}
            onChange={(e) => onInputChange('zipCode', e.target.value)}
            isInvalid={!!errors.zipCode}
          />
          <Form.Control.Feedback type="invalid">
            {errors.zipCode}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-globe me-2 text-muted"></i>
            Country *
          </Form.Label>
          <Form.Select
            value={formData.country || ''}
            onChange={(e) => onInputChange('country', e.target.value)}
            isInvalid={!!errors.country}
          >
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.country}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddressStep;
