import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Filter from './components/Filter';
import FooterPage from './pages/FooterPage';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import ProfileWizard from './pages/AccountPage';
import FavouritesPage from './pages/FavouritesPage';
import { movies } from './data/movies';

function MainPage() {
  return (
    <div>
      <HomePage />
      <Filter />
      <MoviePage />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/account" element={<ProfileWizard />} />
          </Routes>
        </div>
        <FooterPage />
      </div>
    </Router>
  );
}

export default App;
