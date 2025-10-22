//ModalComponent.jsx - Reusable modal component
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ 
  show, 
  onHide, 
  title, 
  message, 
  confirmText = "Xác nhận", 
  cancelText = "Hủy", 
  onConfirm, 
  variant = "primary",
  showCancel = true 
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        {showCancel && (
          <Button variant="secondary" onClick={onHide}>
            {cancelText}
          </Button>
        )}
        <Button variant={variant} onClick={handleConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
