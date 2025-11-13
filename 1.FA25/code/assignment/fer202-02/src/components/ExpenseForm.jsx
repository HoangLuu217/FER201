import { useEffect, useReducer } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

const defaultValues = {
    name: '',
    amount: '',
    category: '',
    date: '',
};

const initialState = {
    values: defaultValues,
    errors: {},
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_VALUES':
            return { ...state, values: action.payload };
        case 'SET_FIELD':
            return {
                ...state,
                values: { ...state.values, [action.field]: action.value },
            };
        case 'SET_ERROR':
            return {
                ...state,
                errors: { ...state.errors, [action.field]: action.message },
            };
        case 'CLEAR_ERROR':
            const { [action.field]: removed, ...restErrors } = state.errors;
            return {
                ...state,
                errors: restErrors,
            };
        case 'SET_ERRORS':
            return { ...state, errors: action.payload };
        case 'CLEAR_ERRORS':
            return { ...state, errors: {} };
        case 'RESET':
            return { values: defaultValues, errors: {} };
        default:
            return state;
    }
};

const validate = (values) => {
    const errors = {};
    if (!values.name.trim()) {
        errors.name = 'Name is required.';
    }
    if (!values.category.trim()) {
        errors.category = 'Category is required.';
    }
    const amountNumber = Number(values.amount);
    if (!values.amount || Number.isNaN(amountNumber) || amountNumber < 0) {
        errors.amount = 'Value must be greater than or equal to 0.';
    }
    if (!values.date) {
        errors.date = 'Date is required.';
    }
    return errors;
};

const ExpenseForm = ({
    title,
    submitLabel,
    onSubmit,
    onCancel,
    initialValues,
    isSubmitting = false,
    mode = 'add',
    categoryOptions = [],
    className = '',
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (initialValues) {
            dispatch({
                type: 'SET_VALUES',
                payload: { ...defaultValues, ...initialValues },
            });
            dispatch({ type: 'CLEAR_ERRORS' });
        } else {
            dispatch({ type: 'RESET' });
        }
    }, [initialValues]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch({ type: 'SET_FIELD', field: name, value });

        // Validation real-time
        let message = '';
        
        if (name === 'name') {
            if (!value.trim()) {
                message = 'Name is required.';
            }
        }
        
        if (name === 'amount') {
            const amountNumber = Number(value);
            if (!value || Number.isNaN(amountNumber) || amountNumber < 0) {
                message = 'Value must be greater than or equal to 0.';
            }
        }
        
        if (name === 'category') {
            if (!value.trim()) {
                message = 'Category is required.';
            }
        }
        
        if (name === 'date') {
            if (!value) {
                message = 'Date is required.';
            }
        }

        // Cập nhật lỗi hoặc xóa lỗi
        if (message) {
            dispatch({ type: 'SET_ERROR', field: name, message });
        } else {
            dispatch({ type: 'CLEAR_ERROR', field: name });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate(state.values);
        const cleanedErrors = Object.fromEntries(
            Object.entries(errors).filter(([, message]) => Boolean(message))
        );
        if (Object.keys(cleanedErrors).length > 0) {
            dispatch({ type: 'SET_ERRORS', payload: cleanedErrors });
            return;
        }
        const payload = {
            ...state.values,
            amount: Number(state.values.amount),
        };
        onSubmit?.(payload);
    };

    const handleReset = () => {
        if (mode === 'add') {
            dispatch({ type: 'RESET' });
        } else if (initialValues) {
            dispatch({
                type: 'SET_VALUES',
                payload: { ...defaultValues, ...initialValues },
            });
        } else {
            dispatch({ type: 'RESET' });
        }
    };

    return (
        <Card className={`h-100 shadow-sm ${className}`}>
            <Card.Header>
                <Card.Title className="mb-0 fs-5">{title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="expenseName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={state.values.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            isInvalid={!!state.errors.name}
                            placeholder="Enter expense name"
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} md={6} controlId="expenseAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                step="1000"
                                name="amount"
                                value={state.values.amount}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                isInvalid={!!state.errors.amount}
                                placeholder="Enter amount"
                            />
                            <Form.Control.Feedback type="invalid">
                                {state.errors.amount}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md={6} controlId="expenseCategory">
                            <Form.Label>Category</Form.Label>
                            {categoryOptions.length > 0 ? (
                                <Form.Select
                                    name="category"
                                    value={state.values.category}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    isInvalid={!!state.errors.category}
                                >
                                    <option value="">Select category</option>
                                    {categoryOptions
                                        .filter((option) => option !== 'All categories')
                                        .map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                </Form.Select>
                            ) : (
                                <Form.Control
                                    name="category"
                                    value={state.values.category}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    isInvalid={!!state.errors.category}
                                    placeholder="Enter category"
                                />
                            )}
                            <Form.Control.Feedback type="invalid">
                                {state.errors.category}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-4" controlId="expenseDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={state.values.date}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            isInvalid={!!state.errors.date}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.date}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex gap-2">
                        {mode === 'edit' && (
                            <Button
                                variant="outline-secondary"
                                type="button"
                                onClick={onCancel}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={handleReset}
                            disabled={isSubmitting}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            className="ms-auto"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : submitLabel}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ExpenseForm;

