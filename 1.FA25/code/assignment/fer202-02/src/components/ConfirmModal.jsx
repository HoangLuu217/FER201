import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({
  show,
  onHide,
  onConfirm,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  cancelVariant = 'secondary',
  isProcessing = false,
}) => (
  <Modal show={show} onHide={onHide} centered backdrop="static">
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="mb-0">{message}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant={cancelVariant} onClick={onHide} disabled={isProcessing}>
        {cancelLabel}
      </Button>
      <Button
        variant={confirmVariant}
        onClick={onConfirm}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : confirmLabel}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmModal;
