import React from 'react';

function Home() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="display-4">Trang Chủ</h1>
          <p className="lead">Chào mừng bạn đến với trang chủ của ứng dụng React Router!</p>
        </div>
      </div>
      
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title">🚀 Hiện đại</h3>
              <p className="card-text">Sử dụng React Router v6 với các tính năng mới nhất</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title">⚡ Nhanh chóng</h3>
              <p className="card-text">Điều hướng không cần tải lại trang</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title">🎯 Chính xác</h3>
              <p className="card-text">URL đồng bộ với giao diện người dùng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

