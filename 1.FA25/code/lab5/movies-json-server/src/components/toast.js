import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieToast = () => {
  const { toast } = useMovieState();
  const { dispatch } = useMovieDispatch();

  const handleClose = () => dispatch({ type: 'HIDE_TOAST' });

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast bg={toast.variant} onClose={handleClose} show={toast.show} delay={3000} autohide>
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default MovieToast;
