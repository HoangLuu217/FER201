import React, { useState } from 'react';
import { Container, Card, ProgressBar, Nav, Button, Row, Col } from 'react-bootstrap';
import AboutStep from '../components/AboutForm';
import AccountStep from '../components/AccountForm';
import AddressStep from '../components/AddressForm';

const ProfileWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // About Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    avatar: null,
    // Account Information
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    answer: '',
    // Address Information
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 'about', title: 'About', component: AboutStep },
    { id: 'account', title: 'Account', component: AccountStep },
    { id: 'address', title: 'Address', component: AddressStep }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleFinish();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    if (validateCurrentStep()) {
      console.log('Profile form data:', formData);
      alert('Profile form created successfully!');
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (currentStep === 0) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.age) newErrors.age = 'Age is required';
    } else if (currentStep === 1) {
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.secretQuestion) newErrors.secretQuestion = 'Secret question is required';
      if (!formData.answer) newErrors.answer = 'Answer is required';
    } else if (currentStep === 2) {
      if (!formData.street) newErrors.street = 'Street is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
      if (!formData.country) newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Card style={{ maxWidth: '800px', width: '100%' }}>
        <Card.Header className="bg-white border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">
              <i className="bi bi-person-circle me-2 text-primary"></i>
              Build Your Profile
            </h4>
            <Button variant="outline-secondary" size="sm">
              <i className="bi bi-x"></i>
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          {/* Progress Bar */}
          <div className="position-relative mb-4">
            <ProgressBar now={progress} variant="success" style={{ height: '8px' }} />
            <small className="position-absolute top-0 end-0 text-muted">
              {Math.round(progress)}%
            </small>
          </div>

          {/* Step Navigation */}
          <Nav variant="tabs" className="mb-4 border-0">
            {steps.map((step, index) => (
              <Nav.Item key={step.id}>
                <Nav.Link
                  active={index === currentStep}
                  onClick={() => handleStepClick(index)}
                  className={`d-flex align-items-center ${
                    index === currentStep 
                      ? 'text-primary border-primary' 
                      : index < currentStep 
                        ? 'text-primary border-primary' 
                        : 'text-muted'
                  }`}
                >
                  <i className={`bi bi-${index === 0 ? 'person-circle' : index === 1 ? 'lock' : 'geo-alt'} me-2`}></i>
                  {step.title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* Current Step Content */}
          <div className="min-vh-50">
            <CurrentStepComponent
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
            />
          </div>
        </Card.Body>

        <Card.Footer className="bg-light border-top">
          <Row>
            <Col>
              <Button
                variant="outline-secondary"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
            </Col>
            <Col className="text-end">
              <Button
                variant={currentStep === steps.length - 1 ? "success" : "primary"}
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ProfileWizard;
