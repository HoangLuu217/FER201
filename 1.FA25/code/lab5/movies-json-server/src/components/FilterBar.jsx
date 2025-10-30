import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const defaultFilters = {
  q: '',
  genreId: '',
  duration_gte: '',
  duration_lte: '',
  sort: ''
};

const FilterBar = () => {
  const { genres, filters } = useMovieState();
  const { dispatch } = useMovieDispatch();
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (field, value) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: { ...localFilters } });
  };

  const resetFilters = () => {
    setLocalFilters(defaultFilters);
    dispatch({ type: 'SET_FILTERS', payload: { ...defaultFilters } });
  };

  return (
    <Form className="p-3 border rounded mb-4">
      <Row className="g-2 align-items-end">
        <Col md={3}>
          <Form.Label className="fw-semibold">Search</Form.Label>
          <Form.Control
            placeholder="Search by title or description"
            value={localFilters.q}
            onChange={(event) => handleChange('q', event.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Label className="fw-semibold">Genre</Form.Label>
          <Form.Select
            value={localFilters.genreId}
            onChange={(event) => handleChange('genreId', event.target.value)}
          >
            <option value="">All genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label className="fw-semibold">Min duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={localFilters.duration_gte}
            onChange={(event) => handleChange('duration_gte', event.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Label className="fw-semibold">Max duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={localFilters.duration_lte}
            onChange={(event) => handleChange('duration_lte', event.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Label className="fw-semibold">Sort by</Form.Label>
          <Form.Select
            value={localFilters.sort}
            onChange={(event) => handleChange('sort', event.target.value)}
          >
            <option value="">Default</option>
            <option value="title_asc">Title (A - Z)</option>
            <option value="title_desc">Title (Z - A)</option>
          </Form.Select>
        </Col>
        <Col md="auto" className="d-flex gap-2">
          <Button type="button" variant="primary" onClick={applyFilters}>
            Apply
          </Button>
          <Button type="button" variant="secondary" onClick={resetFilters}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterBar;
