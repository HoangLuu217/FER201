import React from 'react';

function Products() {
  const products = [
    { id: 101, name: 'Laptop Gaming', price: '25,000,000 VNĐ' },
    { id: 102, name: 'Điện thoại thông minh', price: '15,000,000 VNĐ' },
    { id: 103, name: 'Tai nghe không dây', price: '2,500,000 VNĐ' }
  ];

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="display-4">Danh Sách Sản Phẩm</h1>
          <p className="lead">Khám phá các sản phẩm tuyệt vời của chúng tôi:</p>
        </div>
      </div>
      
      <div className="row g-4">
        {products.map(product => (
          <div key={product.id} className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-text text-danger fs-5 fw-bold">{product.price}</p>
                <p className="card-text">Sản phẩm chất lượng cao với giá cả hợp lý</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
