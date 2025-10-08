import React from 'react';
import option1Image from '../images/option1.png';
import option2Image from '../images/option2.png';
import option3Image from '../images/option3.png';
import option4Image from '../images/option4.png';

const MenuSection = () => {
  return (
    <section className="py-5 bg-dark">
      <div className="container">
        <h2 className="text-white text-left mb-5">Our Menu</h2>
        <div className="row g-4">
          {/* Margherita Pizza */}
          <div className="col-lg-3 col-md-6">
            <div className="card h-100 position-relative">
              <span className="badge bg-warning position-absolute top-0 start-0 m-2">SALE</span>
              <img src={option1Image} className="card-img-top" alt="Margherita Pizza" style={{height: '200px', objectFit: 'cover'}} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Margherita Pizza</h5>
                <div className="mt-auto">
                  <p className="card-text">
                    <span className="text-decoration-line-through text-muted">$40.00</span>
                    <span className="fw-bold text-danger ms-2">$24.00</span>
                  </p>
                  <button className="btn btn-dark w-100">Buy</button>
                </div>
              </div>
            </div>  
          </div>

          {/* Mushroom Pizza */}
          <div className="col-lg-3 col-md-6">
            <div className="card h-100">
              <img src={option2Image} className="card-img-top" alt="Mushroom Pizza" style={{height: '200px', objectFit: 'cover'}} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Mushroom Pizza</h5>
                <div className="mt-auto">
                  <p className="card-text fw-bold">$25.00</p>
                  <button className="btn btn-dark w-100">Buy</button>
                </div>
              </div>
            </div>
          </div>

          {/* Hawaiian Pizza */}
          <div className="col-lg-3 col-md-6">
            <div className="card h-100 position-relative">
              <span className="badge bg-warning position-absolute top-0 start-0 m-2">NEW</span>
              <img src={option3Image} className="card-img-top" alt="Hawaiian Pizza" style={{height: '200px', objectFit: 'cover'}} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Hawaiian Pizza</h5>
                <div className="mt-auto">
                  <p className="card-text fw-bold">$30.00</p>
                  <button className="btn btn-dark w-100">Buy</button>
                </div>
              </div>
            </div>
          </div>

          {/* Pesto Pizza */}
          <div className="col-lg-3 col-md-6">
            <div className="card h-100 position-relative">
              <span className="badge bg-warning position-absolute top-0 start-0 m-2">SALE</span>
              <img src={option4Image} className="card-img-top" alt="Pesto Pizza" style={{height: '200px', objectFit: 'cover'}} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Pesto Pizza</h5>
                <div className="mt-auto">
                  <p className="card-text">
                    <span className="text-decoration-line-through text-muted">$50.00</span>
                    <span className="fw-bold text-danger ms-2">$30.00</span>
                  </p>
                  <button className="btn btn-primary w-100">Buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;

