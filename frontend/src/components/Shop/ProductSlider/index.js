'use client';

import React, { useState, useEffect, useMemo } from 'react';
import './ProductSlider.css';

const ProductSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(() => [
    {
      id: 1,
      image: '/banner/paste.jpeg'
    },
    {
      id: 2,
      image: '/banner/soap.jpeg'
    },
    // {
    //   id: 3,
    //   image: '/banner/oil.jpeg'
    // }
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>
      
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button 
        className="slider-arrow prev"
        onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}
        aria-label="Previous slide"
      >
        ❮
      </button>
      <button 
        className="slider-arrow next"
        onClick={() => setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}
        aria-label="Next slide"
      >
        ❯
      </button>
    </div>
  );
};

export default ProductSlider; 