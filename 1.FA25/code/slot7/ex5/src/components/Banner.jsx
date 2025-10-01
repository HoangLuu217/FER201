import React from 'react';

const Banner = () => {
  return (
    <section className="py-5 bg-orange">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">
              <div className="bg-light rounded mx-auto d-flex align-items-center justify-content-center" style={{height: '300px', maxWidth: '800px'}}>
                <div className="text-muted">
                  <i className="fas fa-users fa-5x mb-3"></i>
                  <p className="h4">Student Group Photo</p>
                  <small>Placeholder for student group image</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
