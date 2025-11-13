import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
import { fetchPayments } from '../store/paymentsSlice';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();

    // Fetch payments khi component mount hoặc user thay đổi
    useEffect(() => {
        if (user && user.id) {
            dispatch(fetchPayments(user.id));
        }
    }, [dispatch, user?.id]);

    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />

            {/* 2. Main Dashboard Content (Grid và Card) */}
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Dashboard</h2>
                    <Button
                        variant="success"
                        onClick={() => navigate('/payments/add')}
                    >
                        <FaPlus className="me-2" />
                        Thêm Thanh toán
                    </Button>
                </div>

                <FilterBar />
                <PaymentTable />
            </Container>    
        </>
    );
};

export default DashboardPage;
