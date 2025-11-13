import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ExpensesProvider } from './contexts/ExpensesContext';

test('renders login page heading', () => {
    render(
        <MemoryRouter initialEntries={['/login']}>
            <AuthProvider>
                <ExpensesProvider>
                    <App />
                </ExpensesProvider>
            </AuthProvider>
        </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});
