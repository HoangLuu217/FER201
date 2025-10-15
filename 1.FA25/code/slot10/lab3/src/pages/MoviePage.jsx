import React from 'react';
import MovieCard from '../components/movie/MovieCard.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert } from 'react-bootstrap';
import { movies as allMovies } from '../data/movies';
  
export default function MoviePage() {

  // Dynamic title based on sorting
  const getCollectionTitle = () => {
    // No dynamic sorting without hooks/state
      const sortLabels = {
        'year-asc': {
          title: 'Movies by Year (Oldest First)',
          icon: 'bi-calendar-event'
        },
        'year-desc': {
          title: 'Movies by Year (Newest First)',
          icon: 'bi-calendar-event'
        },
        'title-asc': {
          title: 'Movies by Title (A-Z)',
          icon: 'bi-sort-alpha-down'
        },
        'title-desc': {
          title: 'Movies by Title (Z-A)',
          icon: 'bi-sort-alpha-up'
        },
        'duration-asc': {
          title: 'Movies by Duration (Shortest First)',
          icon: 'bi-clock'
        },
        'duration-desc': {
          title: 'Movies by Duration (Longest First)',
          icon: 'bi-clock'
        }
      };
    return { title: 'Featured Movies Collection', icon: 'bi-film' };
  };

  const titleInfo = getCollectionTitle();

  return (
    <div className="mt-5">
        <h2 className='mb-4 text-center'>
          <i className={`${titleInfo.icon} me-2 text-primary`}></i>
          <span className="transition-all" style={{ transition: 'all 0.3s ease' }}>
            {titleInfo.title}
          </span>
          
        </h2>
        
        {/* Static summary */}
        <div className="d-flex justify-content-between align-items-center mb-4 text-muted">
          <div>
            <i className="bi bi-film me-1"></i>
            Showing {allMovies.length} movies
          </div>
        </div>

        {/* Movies Grid */}
        {allMovies.length > 0 ? (
          <Row xs={1} md={3} className="g-4"> 
            {allMovies.map((movie) => (
              <Col key={movie.id}>
                <MovieCard 
                  key={movie.id} 
                  img={movie.poster}
                  title={movie.title}
                  text={movie.description} 
                  genre={movie.genre} 
                  movie={movie}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="info" className="text-center">
            <i className="bi bi-search me-2"></i>
            No movies found matching your criteria. Try adjusting your search or filters.
          </Alert>
        )}
    </div>
  );
}
