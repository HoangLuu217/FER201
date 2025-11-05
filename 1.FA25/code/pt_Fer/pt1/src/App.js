import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { ToastProvider } from './components/ToastMessage';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;
