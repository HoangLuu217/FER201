import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

const MovieDetailModal = ({ show, movie, genreMap, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Movie Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {movie ? (
          <div className="d-flex flex-column flex-md-row gap-4">
            <Image
              src={movie.avatar}
              alt={movie.title}
              rounded
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <div>
              <h4 className="mb-3">{movie.title}</h4>
              <p className="text-muted">
                {movie.description || 'No description available.'}
              </p>
              <div>
                <div><strong>Genre:</strong> {genreMap[movie.genreId] || 'Unknown'}</div>
                <div><strong>Duration:</strong> {movie.duration} min</div>
                <div><strong>Year:</strong> {movie.year}</div>
                <div><strong>Country:</strong> {movie.country}</div>
              </div>
            </div>
          </div>
        ) : (
          'Movie not found.'
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieDetailModal;
