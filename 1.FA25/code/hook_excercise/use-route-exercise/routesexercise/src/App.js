import React from 'react';

// Import components
import Navbar from './components/Navbar';
import AppRoute from './components/AppRoute.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <AppRoute />
      </main>
    </div>
  );
}

export default App;
