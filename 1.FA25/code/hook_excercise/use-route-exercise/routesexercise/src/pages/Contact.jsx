import React from 'react';

function Contact() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="display-4">Liên Hệ</h1>
          <p className="lead">Chúng tôi luôn sẵn sàng hỗ trợ bạn!</p>
        </div>
      </div>
      
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title">📧 Email</h3>
              <p className="card-text">support@example.com</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title">📞 Điện thoại</h3>
              <p className="card-text">+84 123 456 789</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title">📍 Địa chỉ</h3>
              <p className="card-text">123 Đường ABC, Quận XYZ, TP.HCM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Gửi tin nhắn cho chúng tôi</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Họ và tên:</label>
                  <input type="text" className="form-control" id="name" name="name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" className="form-control" id="email" name="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Tin nhắn:</label>
                  <textarea className="form-control" id="message" name="message" rows="4"></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg">Gửi tin nhắn</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
