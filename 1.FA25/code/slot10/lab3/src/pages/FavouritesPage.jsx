import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Card } from 'react-bootstrap';
import MovieCard from '../components/movie/MovieCard';

function FavouritesPage() {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favourites from localStorage
  useEffect(() => {
    const loadFavourites = () => {
      try {
        const favourites = localStorage.getItem('movieFavourites');
        if (favourites) {
          setFavouriteMovies(JSON.parse(favourites));
        }
      } catch (error) {
        console.error('Error loading favourites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavourites();

    // Listen for storage changes (when favourites are added/removed from other pages)
    const handleStorageChange = (e) => {
      if (e.key === 'movieFavourites') {
        loadFavourites();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    const handleFavouritesUpdate = () => {
      loadFavourites();
    };

    window.addEventListener('favouritesUpdated', handleFavouritesUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favouritesUpdated', handleFavouritesUpdate);
    };
  }, []);

  const removeFromFavourites = (movieId) => {
    const updatedFavourites = favouriteMovies.filter(movie => movie.id !== movieId);
    setFavouriteMovies(updatedFavourites);
    localStorage.setItem('movieFavourites', JSON.stringify(updatedFavourites));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('favouritesUpdated'));
  };

  const clearAllFavourites = () => {
    setFavouriteMovies([]);
    localStorage.removeItem('movieFavourites');
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('favouritesUpdated'));
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your favourites...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">
          <i className="bi bi-heart-fill text-danger me-3"></i>
          My Favourite Movies
        </h1>
        <p className="lead text-muted">
          Your personal collection of favourite movies
        </p>
      </div>

      {/* Favourites Summary */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <i className="bi bi-heart text-danger me-2" style={{ fontSize: '1.5rem' }}></i>
                <div>
                  <h5 className="mb-0">Favourite Movies</h5>
                  <small className="text-muted">
                    {favouriteMovies.length} movie{favouriteMovies.length !== 1 ? 's' : ''} in your collection
                  </small>
                </div>
              </div>
            </Col>
            <Col md={6} className="text-end">
              {favouriteMovies.length > 0 && (
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={clearAllFavourites}
                >
                  <i className="bi bi-trash me-1"></i>
                  Clear All Favourites
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Favourites Grid */}
      {favouriteMovies.length > 0 ? (
        <Row xs={1} md={3} className="g-4">
          {favouriteMovies.map((movie) => (
            <Col key={movie.id}>
              <div className="position-relative">
                <MovieCard 
                  img={movie.poster}
                  title={movie.title}
                  text={movie.description}
                  genre={movie.genre}
                  movie={movie}
                />
                {/* Remove from favourites button */}
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 end-0 m-2"
                  style={{ zIndex: 10 }}
                  onClick={() => removeFromFavourites(movie.id)}
                  title="Remove from favourites"
                >
                  <i className="bi bi-heart-fill"></i>
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="text-center">
          <i className="bi bi-heart me-2" style={{ fontSize: '2rem' }}></i>
          <h4 className="mt-3">No Favourite Movies Yet</h4>
          <p className="mb-3">
            Start building your collection by adding movies to your favourites!
          </p>
          <Button variant="primary" href="/">
            <i className="bi bi-arrow-left me-1"></i>
            Browse Movies
          </Button>
        </Alert>
      )}

      {/* Statistics */}
      {favouriteMovies.length > 0 && (
        <Card className="mt-5">
          <Card.Header>
            <h5 className="mb-0">
              <i className="bi bi-graph-up me-2"></i>
              Your Favourites Statistics
            </h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={3} className="text-center">
                <div className="border-end">
                  <h3 className="text-primary">{favouriteMovies.length}</h3>
                  <small className="text-muted">Total Movies</small>
                </div>
              </Col>
              <Col md={3} className="text-center">
                <div className="border-end">
                  <h3 className="text-success">
                    {new Set(favouriteMovies.map(m => m.genre)).size}
                  </h3>
                  <small className="text-muted">Genres</small>
                </div>
              </Col>
              <Col md={3} className="text-center">
                <div className="border-end">
                  <h3 className="text-info">
                    {Math.round(favouriteMovies.reduce((sum, m) => sum + m.duration, 0) / favouriteMovies.length)} min
                  </h3>
                  <small className="text-muted">Avg Duration</small>
                </div>
              </Col>
              <Col md={3} className="text-center">
                <h3 className="text-warning">
                  {Math.min(...favouriteMovies.map(m => m.year))} - {Math.max(...favouriteMovies.map(m => m.year))}
                </h3>
                <small className="text-muted">Year Range</small>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default FavouritesPage;


