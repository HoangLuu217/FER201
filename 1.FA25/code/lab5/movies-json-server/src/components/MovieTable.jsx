// src/components/MovieTable.jsx
import React from 'react';
import { Table, Button, Image, Alert, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';

// NEW: import modal tách file
import ViewDetailModal from './modal';

const MovieTable = () => {
  const {
    movies,
    genres,
    loading,
    movieToDelete,
    showDeleteModal,
    movieToView,
    showDetailModal
  } = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { user } = useAuth();
  const canManage = user?.role === 'admin';

  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const getCategoryBadgeVariant = (genreName) => {
    const categoryColors = {
      'Sci-Fi': 'primary',
      Comedy: 'warning',
      Drama: 'info',
      Horror: 'dark',
      Romance: 'danger',
      Action: 'success',
      Thriller: 'secondary'
    };
    return categoryColors[genreName] || 'secondary';
  };

  const handleEditClick = (movie) => {
    if (!canManage) return;
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };

  const handleViewClick = (movie) => {
    dispatch({ type: 'OPEN_DETAIL_MODAL', payload: movie });
  };

  const handleDeleteClick = (movie) => {
    if (!canManage) return;
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  const closeDeleteModal = () => dispatch({ type: 'CLOSE_DELETE_MODAL' });
  const closeDetailModal = () => dispatch({ type: 'CLOSE_DETAIL_MODAL' });

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" variant="primary" className="me-2" />
          <Alert variant="info" className="mt-3 mb-0">
            Loading movies...
          </Alert>
        </div>
      ) : movies.length === 0 ? (
        <Alert variant="light" className="mt-4 mb-0">
          No movies found. Try adjusting the filters or add a new movie.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="mt-4 align-middle">
          <thead>
            <tr>
              <th>Poster</th>
              <th>ID</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Duration (minutes)</th>
              <th>Year</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td style={{ width: '70px' }}>
                    <Image
                      src={movie.avatar}
                      alt={movie.title}
                      rounded
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <div className="text-muted small">({movie.year})</div>
                  </td>
                  <td>
                    <Badge bg={getCategoryBadgeVariant(genreName)}>{genreName}</Badge>
                  </td>
                  <td>{movie.duration} min</td>
                  <td>{movie.year}</td>
                  <td>{movie.country}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2 text-white"
                      onClick={() => handleViewClick(movie)}
                    >
                      View Details
                    </Button>
                    {canManage && (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditClick(movie)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteClick(movie)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
  

      {/* NEW: Modal chi tiết phim */}
      <ViewDetailModal
        show={showDetailModal}
        movie={movieToView}
        genreMap={genreMap}
        onClose={closeDetailModal}
      />
    </>
  );
};

export default MovieTable;
