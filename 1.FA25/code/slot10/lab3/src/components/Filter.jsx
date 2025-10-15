import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

function Filter({ 
  searchTerm = '', 
  yearFilter = '', 
  sortOption = '', 
  onSearch, 
  onFilter, 
  onSort, 
  onClear 
}) {
  const handleSearchChange = (value) => {
    onSearch && onSearch(value);
  };

  const handleFilterChange = (value) => {
    onFilter && onFilter(value);
  };

  const handleSortChange = (value) => {
    onSort && onSort(value);
  };

  const handleClear = () => {
    onClear && onClear();
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-funnel me-2"></i>
          Filter & Search
        </h5>
        <Button variant="outline-light" size="sm" onClick={handleClear}>
          <i className="bi bi-x-circle me-1"></i>
          Clear All
        </Button>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {/* Search */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-search me-1"></i>
                Search
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </Form.Group>
          </Col>

          {/* Filter by Year */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-calendar me-1"></i>
                Filter by Year
              </Form.Label>
              <Form.Select 
                value={yearFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="">All Years</option>
                <option value="<=2000">≤ 2000</option>
                <option value="2001-2015">2001 - 2015</option>
                <option value=">2015">> 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sorting */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-sort-alpha-down me-1"></i>
                Sort by
              </Form.Label>
              <Form.Select 
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Default</option>
                <option value="year-asc">Year ↑</option>
                <option value="year-desc">Year ↓</option>
                <option value="title-asc">Title A→Z</option>
                <option value="title-desc">Title Z→A</option>
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Filter;
