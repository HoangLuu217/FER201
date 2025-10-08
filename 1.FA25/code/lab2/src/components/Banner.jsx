import React, { useState, useEffect, useCallback } from 'react';
import bannerImage from '../images/banner.png';
import banner1Image from '../images/banner1.png';
import banner2Image from '../images/banner2.png';
import banner3Image from '../images/banner3.png';
import banner4Image from '../images/banner4.png';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    { image: banner1Image, title: "Neapolitan Pizza", description: "If you are looking for a traditional Italian pizza, the Neapolitan is the best option!" },
    { image: bannerImage, title: "Margherita Pizza", description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil." },
    { image: banner2Image, title: "Pepperoni Pizza", description: "Delicious pepperoni pizza with our signature sauce and cheese." },
    { image: banner3Image, title: "Hawaiian Pizza", description: "Sweet and savory combination of ham, pineapple, and cheese." },
    { image: banner4Image, title: "Supreme Pizza", description: "Loaded with all your favorite toppings for the ultimate pizza experience." }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 2000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="banner-section position-relative">
      <img 
        src={banners[currentSlide].image} 
        alt="Pizza Banner" 
        className="w-100" 
        style={{height: '500px', objectFit: 'cover'}} 
      />
      
      {/* Content Overlay */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x text-center text-white mb-5">
        <div className=" bg-opacity-90 p-4 rounded">
          <h1 className="display-4 fw-bold text-white mb-3">{banners[currentSlide].title}</h1>
          <p className="lead text-white">{banners[currentSlide].description}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button 
        className="btn position-absolute top-50 start-0 translate-middle-y ms-3"
        style={{ background: 'none', border: 'none', color: 'white', fontSize: '2rem' }}
        onClick={prevSlide}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      
      <button 
        className="btn position-absolute top-50 end-0 translate-middle-y me-3"
        style={{ background: 'none', border: 'none', color: 'white', fontSize: '2rem' }}
        onClick={nextSlide}
      >
        <i className="bi bi-chevron-right"></i>
      </button>

      {/* Slide Indicators */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
        <div className="d-flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                index === currentSlide ? 'btn-warning' : 'btn-light'
              }`}
              style={{ width: '40px', height: '4px', padding: 0, borderRadius: '2px' }}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;

