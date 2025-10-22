//ToastMessage.jsx - Reusable toast notification component
import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastMessage = ({ 
  show, 
  onClose, 
  title, 
  message, 
  variant = "success", 
  delay = 3000,
  position = "top-end"
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    
    if (show && delay > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [show, delay]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <ToastContainer position={position} className="p-3">
      <Toast 
        show={isVisible} 
        onClose={handleClose}
        bg={variant}
        autohide={delay > 0}
        delay={delay}
      >
        <Toast.Header closeButton>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className={variant === 'light' ? 'text-dark' : 'text-white'}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
