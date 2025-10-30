import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import pages
import Home from '../pages/Home';
import Products from '../pages/Products';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

function AppRoute() {
  return (
    <Routes>
      {/* Exercise 1: Basic Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/san-pham" element={<Products />} />
      <Route path="/lien-he" element={<Contact />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoute;
