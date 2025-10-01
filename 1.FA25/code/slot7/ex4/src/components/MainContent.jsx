import React from 'react';

const MainContent = () => {
  return (
    <main className="bg-white py-5" style={{minHeight: '300px'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <section className="text-center mb-4">
              <h2 className="text-dark fw-bold mb-3" style={{fontSize: '32px'}}>About</h2>
              <p className="text-dark mx-auto" style={{fontSize: '18px', lineHeight: '1.6', maxWidth: '600px'}}>This is the about section of the website.</p>
            </section>
            
            <section className="text-center">
              <h2 className="text-dark fw-bold mb-3" style={{fontSize: '32px'}}>Contact</h2>
              <p className="text-dark mx-auto" style={{fontSize: '18px', lineHeight: '1.6', maxWidth: '600px'}}>For any inquiries, please contact us at example@example.com.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;