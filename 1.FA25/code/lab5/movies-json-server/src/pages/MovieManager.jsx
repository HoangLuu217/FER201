import React from 'react';
import { Container, Toast, ToastContainer } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import FilterBar from '../components/FilterBar';
import { useMovieDispatch, useMovieState } from '../contexts/MovieContext';

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

const MovieManagerContent = () => (
  <Container className="mt-5">
    <h1 className="text-center mb-4">🎬 Quản lý Phim (Context + useReducer + Axios)</h1>

    <FilterBar />

    <MovieForm />

    <h2 className="mt-4">Danh sách Phim</h2>

    <MovieTable />

    <MovieToast />
  </Container>
);

const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;
