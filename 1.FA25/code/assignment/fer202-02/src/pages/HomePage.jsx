import { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import ExpenseFilter from '../components/ExpenseFilter';
import TotalExpensesCard from '../components/TotalExpensesCard';
import ConfirmModal from '../components/ConfirmModal';
import { useExpensesContext } from '../contexts/ExpensesContext';

const HomePage = () => {
    const {
        filteredExpenses,
        categories,
        filter,
        loading,
        error,
        totalAmount,
        addExpense,
        updateExpense,
        deleteExpense,
        setFilter,
    } = useExpensesContext();

    const [editingExpense, setEditingExpense] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const resetFeedback = () => setFeedback(null);

    const handleAddExpense = async (payload) => {
        resetFeedback();
        const result = await addExpense(payload);
        if (result.success) {
            setFeedback({ type: 'success', message: 'Expense added successfully.' });
            setEditingExpense(null);
        } else {
            setFeedback({ type: 'danger', message: result.error });
        }
    };

    const handleUpdateExpense = async (payload) => {
        if (!editingExpense) return;
        resetFeedback();
        const result = await updateExpense(editingExpense.id, {
            ...editingExpense,
            ...payload,
        });
        if (result.success) {
            setFeedback({ type: 'success', message: 'Expense updated successfully.' });
            setEditingExpense(null);
        } else {
            setFeedback({ type: 'danger', message: result.error });
        }
    };

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        resetFeedback();
        const result = await deleteExpense(pendingDelete.id);
        if (result.success) {
            setFeedback({ type: 'success', message: 'Expense deleted.' });
            if (editingExpense?.id === pendingDelete.id) {
                setEditingExpense(null);
            }
        } else {
            setFeedback({ type: 'danger', message: result.error });
        }
        setPendingDelete(null);
    };

    const handleCancelEdit = () => {
        setEditingExpense(null);
        resetFeedback();
    };

    const currentFormConfig = editingExpense
        ? {
              mode: 'edit',
              title: 'Edit Expense',
              submitLabel: 'Save',
              initialValues: editingExpense,
              onSubmit: handleUpdateExpense,
              onCancel: handleCancelEdit,
              categoryOptions: categories,
          }
        : {
              mode: 'add',
              title: 'Add Expense',
              submitLabel: 'Add expense',
              initialValues: null,
              onSubmit: handleAddExpense,
              categoryOptions: categories,
          };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Header />
            <main className="flex-grow-1 py-4">
                <Container fluid className="px-0">
                    {feedback && (
                        <Alert
                            variant={feedback.type}
                            dismissible
                            onClose={() => setFeedback(null)}
                        >
                            {feedback.message}
                        </Alert>
                    )}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {editingExpense && (
                        <Alert
                            variant="info"
                            className="d-flex align-items-center justify-content-between"
                        >
                            <span>
                                Editing expense:{' '}
                                <strong>{editingExpense.name}</strong>
                            </span>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-info"
                                onClick={handleCancelEdit}
                            >
                                Cancel edit
                            </button>
                        </Alert>
                    )}
                    <Row className="g-4 mb-4">
                        <Col lg={4} md={6} sm={12}>
                            <TotalExpensesCard total={totalAmount} />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <ExpenseFilter
                                filter={filter}
                                categories={categories}
                                onChange={setFilter}
                            />
                        </Col>
                        <Col lg={4} className="d-none d-lg-block" />
                    </Row>
                    <Row className="g-4">
                        <Col lg={4} md={6} sm={12}>
                            <ExpenseForm {...currentFormConfig} />
                        </Col>
                        <Col lg={8} sm={12}>
                            <ExpensesTable
                                expenses={filteredExpenses}
                                loading={loading}
                                error={null}
                                onEdit={setEditingExpense}
                                onDelete={setPendingDelete}
                            />
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer />
            <ConfirmModal
                show={Boolean(pendingDelete)}
                onHide={() => setPendingDelete(null)}
                onConfirm={confirmDelete}
                title="Confirm Delete"
                message={
                    pendingDelete
                        ? `Do you really want to delete "${pendingDelete.name}"?`
                        : 'Do you really want to delete this expense?'
                }
                confirmVariant="danger"
                confirmLabel="Delete"
            />
        </div>
    );
};

export default HomePage;