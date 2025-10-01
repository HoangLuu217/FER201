import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 bg-orange">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h6 className="text-white mb-3">Our Address</h6>
            <div className="text-white">
              <div className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                Khu đô thị FPT Đà Nẵng
              </div>
              <div className="mb-2">
                <i className="fas fa-phone me-2"></i>
                +8423111131
              </div>
              <div className="mb-2">
                <i className="fas fa-phone me-2"></i>
                +852 8765 4321
              </div>
              <div>
                <i className="fas fa-envelope me-2"></i>
                Mail@fpt.edu.vn
              </div>
            </div>
          </div>
          
          <div className="col-md-6 text-md-end">
            <div className="mb-3">
              <a href="#" className="text-white me-3">
                <i className="fab fa-google-plus-g fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-linkedin-in fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-youtube fa-lg"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fas fa-envelope fa-lg"></i>
              </a>
            </div>
            <div className="text-white">
              <small>© Copyright 2023</small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
