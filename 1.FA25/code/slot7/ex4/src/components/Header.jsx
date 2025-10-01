import React from 'react';
import fptLogo from '../img/fpt.png';

const Header = () => {
  return (
    <header className="bg-warning py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="mb-4">
              <img src={fptLogo} alt="FPT Education" className="img-fluid" style={{height: '80px'}} />
            </div>
            <nav className="d-flex justify-content-center gap-4">
              <a href="#home" className="text-decoration-none text-dark fw-medium fs-5" style={{color: '#8B4513'}} onMouseOver={(e) => e.target.style.color = '#654321'} onMouseOut={(e) => e.target.style.color = '#8B4513'}>Home</a>
              <a href="#about" className="text-decoration-none text-dark fw-medium fs-5" style={{color: '#8B4513'}} onMouseOver={(e) => e.target.style.color = '#654321'} onMouseOut={(e) => e.target.style.color = '#8B4513'}>About</a>
              <a href="#contact" className="text-decoration-none text-dark fw-medium fs-5" style={{color: '#8B4513'}} onMouseOver={(e) => e.target.style.color = '#654321'} onMouseOut={(e) => e.target.style.color = '#8B4513'}>Contact</a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;