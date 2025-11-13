import { Card, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { format } from 'date-fns';

const formatDate = (value) => {
    if (!value) return '';
    try {
        return format(new Date(value), 'dd-MM-yyyy');
    } catch (error) {
        return value;
    }
};

const formatCurrency = (value) => {
    const amount = Number(value) || 0;
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
    }).format(amount);
};

const ExpensesTable = ({
    title = 'Expense Management',
    expenses,
    loading = false,
    error,
    onEdit,
    onDelete,
    className = '',
}) => {
    return (
        <Card className={`shadow-sm h-100 ${className}`}>
            <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0 fs-5">{title}</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
                {error && (
                    <Alert variant="danger" className="m-3 mb-0">
                        {error}
                    </Alert>
                )}
                <div className="table-responsive">
                    <Table bordered hover striped className="mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th className="text-end">Amount</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-5">
                                        <Spinner animation="border" role="status" />
                                    </td>
                                </tr>
                            ) : expenses.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-muted">
                                        No expenses found.
                                    </td>
                                </tr>
                            ) : (
                                expenses.map((expense) => (
                                    <tr key={expense.id}>
                                        <td>{expense.name}</td>
                                        <td className="text-end">
                                            {formatCurrency(expense.amount)}
                                        </td>
                                        <td>{expense.category}</td>
                                        <td>{formatDate(expense.date)}</td>
                                        <td className="text-center">
                                            <div className="d-inline-flex gap-2">
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() => onEdit?.(expense)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => onDelete?.(expense)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ExpensesTable;

