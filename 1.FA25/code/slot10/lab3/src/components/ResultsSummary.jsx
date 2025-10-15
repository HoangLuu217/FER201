import React from 'react';
import { Badge, Row, Col } from 'react-bootstrap';

function ResultsSummary({ 
  totalResults, 
  searchTerm, 
  yearFilter, 
  sortOption, 
  onClearFilter 
}) {
  const hasActiveFilters = searchTerm || yearFilter || sortOption;

  if (!hasActiveFilters) {
    return (
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="text-muted">
          <i className="bi bi-film me-1"></i>
          Showing all {totalResults} movies
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <Row className="align-items-center">
        <Col md={6}>
          <div className="text-muted">
            <i className="bi bi-film me-1"></i>
            Showing {totalResults} movie{totalResults !== 1 ? 's' : ''}
            {hasActiveFilters && (
              <span className="ms-2">
                <i className="bi bi-funnel me-1"></i>
                with active filters
              </span>
            )}
          </div>
        </Col>
        <Col md={6} className="text-end">
          <div className="d-flex justify-content-end align-items-center flex-wrap gap-2">
            {searchTerm && (
              <Badge bg="primary" className="d-flex align-items-center">
                <i className="bi bi-search me-1"></i>
                Search: "{searchTerm}"
                <button 
                  className="btn-close btn-close-white ms-2" 
                  style={{ fontSize: '0.6rem' }}
                  onClick={() => onClearFilter('search')}
                  aria-label="Remove search filter"
                ></button>
              </Badge>
            )}
            {yearFilter && (
              <Badge bg="success" className="d-flex align-items-center">
                <i className="bi bi-calendar me-1"></i>
                Year: {yearFilter}
                <button 
                  className="btn-close btn-close-white ms-2" 
                  style={{ fontSize: '0.6rem' }}
                  onClick={() => onClearFilter('year')}
                  aria-label="Remove year filter"
                ></button>
              </Badge>
            )}
            {sortOption && (
              <Badge bg="info" className="d-flex align-items-center">
                <i className="bi bi-sort-alpha-down me-1"></i>
                Sort: {sortOption.replace('-', ' ')}
                <button 
                  className="btn-close btn-close-white ms-2" 
                  style={{ fontSize: '0.6rem' }}
                  onClick={() => onClearFilter('sort')}
                  aria-label="Remove sort option"
                ></button>
              </Badge>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ResultsSummary;


