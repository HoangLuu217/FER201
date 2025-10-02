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
                  <select className="form-select" id="service">
                    <option>Dine In</option>
                    <option>Take Away</option>
                    <option>Delivery</option>
                  </select>
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
