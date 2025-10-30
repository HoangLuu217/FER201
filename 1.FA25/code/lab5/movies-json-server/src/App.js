import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import HeaderBar from './components/HeaderBar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import MovieManager from './pages/MovieManager';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Navigate to="/movies" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/movies"
          element={(
            <ProtectedRoute>
              <MovieManager />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
