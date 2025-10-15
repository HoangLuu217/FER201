import React, { useState } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

const AccountStep = ({ formData, errors, onInputChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const secretQuestions = [
    "What is your first pet's name?",
    "What was the name of your elementary school?",
    "What is your mother's maiden name?",
    "What city were you born in?",
    "What is your favorite movie?",
    "What was your first car?",
    "What is the name of your best friend?",
    "What is your favorite book?"
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <h5 className="mb-4 pb-2 border-bottom">
        <i className="bi bi-lock me-2 text-primary"></i>
        Account Information
      </h5>
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-person me-2 text-muted"></i>
            Username *
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-person"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={formData.username || ''}
              onChange={(e) => onInputChange('username', e.target.value)}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-lock me-2 text-muted"></i>
            Password *
          </Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password || ''}
              onChange={(e) => onInputChange('password', e.target.value)}
              isInvalid={!!errors.password}
            />
            <InputGroup.Text>
              <i 
                className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer' }}
              ></i>
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-lock me-2 text-muted"></i>
            Confirm Password *
          </Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword || ''}
              onChange={(e) => onInputChange('confirmPassword', e.target.value)}
              isInvalid={!!errors.confirmPassword}
            />
            <InputGroup.Text>
              <i 
                className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                onClick={toggleConfirmPasswordVisibility}
                style={{ cursor: 'pointer' }}
              ></i>
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-question-circle me-2 text-muted"></i>
            Secret Question *
          </Form.Label>
          <Form.Select
            value={formData.secretQuestion || ''}
            onChange={(e) => onInputChange('secretQuestion', e.target.value)}
            isInvalid={!!errors.secretQuestion}
          >
            <option value="">Select a secret question</option>
            {secretQuestions.map((question, index) => (
              <option key={index} value={question}>
                {question}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.secretQuestion}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-key me-2 text-muted"></i>
            Answer *
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your answer"
            value={formData.answer || ''}
            onChange={(e) => onInputChange('answer', e.target.value)}
            isInvalid={!!errors.answer}
          />
          <Form.Control.Feedback type="invalid">
            {errors.answer}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AccountStep;
