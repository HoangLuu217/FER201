import React from 'react';
import fptLogo from '../img/fpt.sgv.svg';

const Header = () => {
  return (
    <header className="py-3 bg-light-orange">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Logo and Navigation Links */}
          <div className="col-lg-9 col-md-8 col-sm-12">
            <div className="d-flex align-items-center">
              <div className="me-4">
                <img src={fptLogo} alt="FPT Education" className="img-fluid" style={{height: '50px'}} />
              </div>
              
              {/* Navigation Links */}
              <nav className="navbar navbar-expand-lg">
                <div className="navbar-nav d-flex flex-row">
                  <a className="nav-link d-flex align-items-center px-3 text-orange" href="#">
                    <i className="fas fa-home me-2"></i>
                    <span>Trang chủ</span>
                  </a>
                  <a className="nav-link d-flex align-items-center px-3 text-orange" href="#">
                    <i className="fas fa-info-circle me-2"></i>
                    <span>Ngành học</span>
                  </a>
                  <a className="nav-link d-flex align-items-center px-3 text-orange" href="#">
                    <i className="fas fa-id-card me-2"></i>
                    <span>Tuyển sinh</span>
                  </a>
                  <a className="nav-link d-flex align-items-center px-3 text-orange" href="#">
                    <i className="fas fa-users me-2"></i>
                    <span>Sinh viên</span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="col-lg-3 col-md-4 col-12">
            <div className="d-flex align-items-center justify-content-end">
              <span className="me-2 text-secondary">Search:</span>
              <input 
                type="text" 
                className="form-control w-auto" 
                style={{width: '150px'}} 
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
