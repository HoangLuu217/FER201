import React from 'react';

const BookingForm = () => {
  return (
    <section className="py-5 bg-dark">
      <div className="container">
        <h2 className="text-white text-center mb-5">Book Your Table</h2>
        <div className="row justify-content-center">
          <div className="col-lg-12 col-xl-12">
            <form>
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label htmlFor="name" className="form-label text-white">Your Name *</label>
                  <input type="text" className="form-control" id="name" required />
                </div>
                <div className="col-md-4">
                  <label htmlFor="email" className="form-label text-white">Your Email *</label>
                  <input type="email" className="form-control" id="email" required />
                </div>
                <div className="col-md-4">
                  <label htmlFor="service" className="form-label text-white">Select a Service</label>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle w-100" type="button" id="serviceDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                      Select a Service
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="serviceDropdown">
                      <li><a className="dropdown-item" href="#">Dine In</a></li>
                      <li><a className="dropdown-item" href="#">Take Away</a></li>
                      <li><a className="dropdown-item" href="#">Delivery</a></li>
                    </ul>
                  </div>
                  
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label text-white">Please write your comment</label>
                <textarea className="form-control" id="comment" rows="4"></textarea>
              </div>
              <div className="text-left">
                <button type="submit" className="btn btn-warning btn-lg px-5">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
