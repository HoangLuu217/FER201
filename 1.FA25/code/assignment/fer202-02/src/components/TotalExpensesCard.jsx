import { Card } from 'react-bootstrap';

const formatCurrency = (value) =>
    new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
    }).format(Number(value) || 0);

const TotalExpensesCard = ({ total = 0, className = '' }) => {
    return (
        <Card className={`shadow-sm h-100 ${className}`}>
            <Card.Header>
                <Card.Title className="mb-0 fs-5">Total of Expenses</Card.Title>
            </Card.Header>
            <Card.Body>
                <div className="display-6 fw-semibold">{formatCurrency(total)}</div>
            </Card.Body>
        </Card>
    );
};

export default TotalExpensesCard;

