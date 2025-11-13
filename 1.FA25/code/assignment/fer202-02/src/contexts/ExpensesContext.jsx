import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import * as ExpensesApi from '../services/expensesApi';
import { useAuth } from './AuthContext';

const ExpensesContext = createContext();

export const initialExpensesState = {
    expenses: [],
    loading: false,
    error: null,
    filter: 'All categories',
};

export const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'RESET_STATE':
            return { ...initialExpensesState };
        case 'FETCH_EXPENSES_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_EXPENSES_SUCCESS':
            return { ...state, loading: false, expenses: action.payload, error: null };
        case 'FETCH_EXPENSES_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_EXPENSE_SUCCESS':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        case 'UPDATE_EXPENSE_SUCCESS':
            return {
                ...state,
                expenses: state.expenses.map((expense) =>
                    expense.id === action.payload.id ? action.payload : expense
                ),
            };
        case 'DELETE_EXPENSE_SUCCESS':
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense.id !== action.payload),
            };
        case 'SET_FILTER':
            return { ...state, filter: action.payload };
        default:
            return state;
    }
};

export const ExpensesProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [state, dispatch] = useReducer(expensesReducer, initialExpensesState);

    const userId = user?.id;

    const fetchExpenses = useCallback(
        async (params = {}) => {
            if (!userId) {
                dispatch({ type: 'RESET_STATE' });
                return;
            }
            dispatch({ type: 'FETCH_EXPENSES_REQUEST' });
            try {
                const response = await ExpensesApi.getExpenses({
                    userId,
                    ...params,
                });
                dispatch({
                    type: 'FETCH_EXPENSES_SUCCESS',
                    payload: response.data || [],
                });
            } catch (error) {
                dispatch({
                    type: 'FETCH_EXPENSES_FAILURE',
                    payload: error.message || 'Failed to load expenses.',
                });
            }
        },
        [userId]
    );

    useEffect(() => {
        if (isAuthenticated && userId) {
            fetchExpenses();
        } else {
            dispatch({ type: 'RESET_STATE' });
        }
    }, [fetchExpenses, isAuthenticated, userId]);

    const addExpense = useCallback(
        async (data) => {
            if (!userId) return { success: false, error: 'Missing user.' };
            try {
                const payload = { ...data, userId };
                const response = await ExpensesApi.createExpense(payload);
                const created = response.data ?? response;
                dispatch({
                    type: 'ADD_EXPENSE_SUCCESS',
                    payload: created,
                });
                return { success: true, data: created };
            } catch (error) {
                return {
                    success: false,
                    error: error.message || 'Unable to add expense.',
                };
            }
        },
        [userId]
    );

    const updateExpense = useCallback(async (id, data) => {
        try {
            const response = await ExpensesApi.updateExpense(id, data);
            const updated = response.data ?? response;
            dispatch({
                type: 'UPDATE_EXPENSE_SUCCESS',
                payload: updated,
            });
            return { success: true, data: updated };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Unable to update expense.',
            };
        }
    }, []);

    const deleteExpense = useCallback(async (id) => {
        try {
            await ExpensesApi.deleteExpense(id);
            dispatch({ type: 'DELETE_EXPENSE_SUCCESS', payload: id });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Unable to delete expense.',
            };
        }
    }, []);

    const setFilter = useCallback((value) => {
        dispatch({ type: 'SET_FILTER', payload: value });
    }, []);

    const filteredExpenses = useMemo(() => {
        if (state.filter === 'All categories') return state.expenses;
        return state.expenses.filter(
            (expense) =>
                expense.category?.toLowerCase() === state.filter?.toLowerCase()
        );
    }, [state.expenses, state.filter]);

    const categories = useMemo(() => {
        const unique = new Set(
            state.expenses
                .map((expense) => expense.category)
                .filter((category) => !!category)
        );
        return ['All categories', ...unique];
    }, [state.expenses]);

    const totalAmount = useMemo(() => {
        return state.expenses.reduce(
            (sum, expense) => sum + Number(expense.amount || 0),
            0
        );
    }, [state.expenses]);

    useEffect(() => {
        if (
            state.filter !== 'All categories' &&
            !categories.includes(state.filter)
        ) {
            dispatch({ type: 'SET_FILTER', payload: 'All categories' });
        }
    }, [categories, state.filter]);

    const contextValue = {
        expenses: state.expenses,
        filteredExpenses,
        loading: state.loading,
        error: state.error,
        totalAmount,
        filter: state.filter,
        categories,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        setFilter,
    };

    return (
        <ExpensesContext.Provider value={contextValue}>
            {children}
        </ExpensesContext.Provider>
    );
};

export const useExpensesContext = () => useContext(ExpensesContext);
