import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div className="d-flex flex-column" style={{minHeight: '100vh'}}>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
