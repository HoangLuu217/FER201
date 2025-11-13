import { Card, Form } from 'react-bootstrap';

const ExpenseFilter = ({
    title = 'Filter',
    filter,
    categories = [],
    onChange,
    className = '',
}) => {
    return (
        <Card className={`shadow-sm h-100 ${className}`}>
            <Card.Header>
                <Card.Title className="mb-0 fs-5">{title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form.Group controlId="filterCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        value={filter}
                        onChange={(event) => onChange?.(event.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default ExpenseFilter;

