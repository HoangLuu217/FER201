import React, { useState } from 'react';
import { Card, Row, Col, Badge, Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { movies } from '../../data/movies';

function MovieCard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

 
  const getFavourites = () => {
    const favourites = localStorage.getItem('movieFavourites');
    return favourites ? JSON.parse(favourites) : [];
  };

  // Lưu phim vào danh sách yêu thích
  const addToFavourites = (movie) => {
    const favourites = getFavourites();
    if (!favourites.find(fav => fav.id === movie.id)) {
      favourites.push(movie);
      localStorage.setItem('movieFavourites', JSON.stringify(favourites));
      setToastMessage('Added to favourites!');
      setShowToast(true);
    } else {
      setToastMessage('Movie already in favourites!');
      setShowToast(true);
    }
  };

  // Mở modal xem chi tiết
  const viewDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  // Rút gọn mô tả
  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <>
      <Row className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm border-0 rounded-3 overflow-hidden">
              <Card.Img 
                variant="top" 
                src={movie.poster} 
                alt={`${movie.title} poster`}
                className="object-fit-cover"
                style={{ height: '500px' }}
              />
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title className="h5 mb-3 text-dark fw-semibold">{movie.title}</Card.Title>
                <Card.Text className="text-muted mb-3 flex-grow-1 small lh-base">
                  {truncateDescription(movie.description)}
                </Card.Text>
                
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">
                      <strong>Year:</strong> {movie.year}
                    </small>
                    <small className="text-muted">
                      <strong>Duration:</strong> {movie.duration} min
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">
                      <strong>Country:</strong> {movie.country}
                    </small>
                    <Badge bg="primary" className="px-2 py-1">{movie.genre}</Badge>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    className="rounded-2 fw-medium"
                    onClick={() => addToFavourites(movie)}
                  >
                    Add to Favourites
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="rounded-2 fw-medium"
                    onClick={() => viewDetails(movie)}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal xem chi tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" className="rounded-3">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="h4 fw-bold text-dark">{selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          {selectedMovie && (
            <div>
              <Row className="g-4">
                <Col md={4}>
                  <img 
                    src={selectedMovie.poster} 
                    alt={`${selectedMovie.title} poster`}
                    className="img-fluid rounded-3 shadow-sm"
                  />
                </Col>
                <Col md={8}>
                  <h5 className="mb-3 text-primary">Movie Details</h5>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <p className="mb-1"><strong>Year:</strong> {selectedMovie.year}</p>
                    </div>
                    <div className="col-6">
                      <p className="mb-1"><strong>Duration:</strong> {selectedMovie.duration} minutes</p>
                    </div>
                    <div className="col-6">
                      <p className="mb-1"><strong>Country:</strong> {selectedMovie.country}</p>
                    </div>
                    <div className="col-6">
                      <p className="mb-1"><strong>Genre:</strong> <Badge bg="primary" className="ms-1">{selectedMovie.genre}</Badge></p>
                    </div>
                  </div>
                  
                  <h6 className="mt-3 mb-2 text-success">Showtimes</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedMovie.showtimes.map((time, index) => (
                      <Badge key={index} bg="success" className="px-3 py-2">{time}</Badge>
                    ))}
                  </div>
                </Col>
              </Row>
              
              <div className="mt-4">
                <h6 className="mb-3 text-info">Full Description</h6>
                <p className="text-muted lh-base">{selectedMovie.fullDescription}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" className="rounded-2" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button 
            variant="outline-primary" 
            className="rounded-2"
            onClick={() => {
              addToFavourites(selectedMovie);
              setShowModal(false);
            }}
          >
            Add to Favourites
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
          className="rounded-3 border-0 shadow"
        >
          <Toast.Header className="bg-success text-white border-0">
            <strong className="me-auto">Movie App</strong>
          </Toast.Header>
          <Toast.Body className="bg-light">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default MovieCard;
