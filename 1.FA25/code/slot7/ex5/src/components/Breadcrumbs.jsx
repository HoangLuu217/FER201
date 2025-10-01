import React from 'react';

const Breadcrumbs = () => {
  return (
    <section className="bg-white py-2">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#" className="text-decoration-none">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Students
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumbs;
