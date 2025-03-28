'use client';

import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import './FeaturedSections.css';

const FeaturedSections = ({ products }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 30,
    seconds: 0
  });
  
  // Slider state for each section
  const [activeBestSellerIndex, setActiveBestSellerIndex] = useState(0);
  const [activeNewArrivalIndex, setActiveNewArrivalIndex] = useState(0);
  const [activeDealIndex, setActiveDealIndex] = useState(0);
  
  // Refs for sliders
  const bestSellerRef = useRef(null);
  const newArrivalRef = useRef(null);
  const dealRef = useRef(null);
  
  // Refs for slider containers
  const bestSellerContainerRef = useRef(null);
  const newArrivalContainerRef = useRef(null);
  const dealContainerRef = useRef(null);

  // Filter products
  const bestSellers = products.filter(product => product.isBestSeller);
  const newArrivals = products.filter(product => product.isNew);
  const dealsProducts = products.filter(product => product.discount > 0);

  // Number of visible items in sliders based on viewport
  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 992) return 3;
      return 4;
    }
    return 4; // Default for server-side rendering
  };
  
  const [visibleItems, setVisibleItems] = useState(4);
  
  // Update CSS variable when visible items change
  useEffect(() => {
    const updateCSSVariable = () => {
      [bestSellerContainerRef, newArrivalContainerRef, dealContainerRef].forEach(ref => {
        if (ref.current) {
          ref.current.style.setProperty('--visible-items', visibleItems);
        }
      });
    };
    
    updateCSSVariable();
  }, [visibleItems]);
  
  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
    };
    
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay slider functions
  useEffect(() => {
    const bestSellerInterval = setInterval(() => {
      setActiveBestSellerIndex(prev => {
        const maxIndex = Math.max(0, bestSellers.length - visibleItems);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);
    
    const newArrivalInterval = setInterval(() => {
      setActiveNewArrivalIndex(prev => {
        const maxIndex = Math.max(0, newArrivals.length - visibleItems);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);
    
    const dealInterval = setInterval(() => {
      setActiveDealIndex(prev => {
        const maxIndex = Math.max(0, dealsProducts.length - visibleItems);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 6000);
    
    return () => {
      clearInterval(bestSellerInterval);
      clearInterval(newArrivalInterval);
      clearInterval(dealInterval);
    };
  }, [bestSellers.length, newArrivals.length, dealsProducts.length, visibleItems]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                // Timer finished
                clearInterval(timer);
                return prevTime;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Navigation functions
  const slidePrev = (setter, currentIndex) => {
    setter(currentIndex === 0 ? 0 : currentIndex - 1);
  };

  const slideNext = (setter, currentIndex, itemsLength) => {
    const maxIndex = Math.max(0, itemsLength - visibleItems);
    setter(currentIndex === maxIndex ? maxIndex : currentIndex + 1);
  };

  // Slide to specific dot index
  const slideToDot = (setter, index, itemsLength) => {
    const maxIndex = Math.max(0, itemsLength - visibleItems);
    setter(Math.min(index, maxIndex));
  };

  // Generate dots for pagination
  const generateDots = (items, activeIndex, setterFn) => {
    const totalDots = Math.max(1, items.length - visibleItems + 1);
    
    return Array.from({ length: totalDots }, (_, i) => (
      <button 
        key={i}
        className={`slider-dot ${activeIndex === i ? 'active' : ''}`}
        onClick={() => slideToDot(setterFn, i, items.length)}
        aria-label={`Go to slide ${i + 1}`}
      />
    ));
  };

  return (
    <div className="featured-sections">
      {/* Best Selling Products Slider */}
      <section className="best-sellers-section">
        <div className="section-header">
          <h2>Best Sellers</h2>
          <p>Our most popular products based on sales</p>
        </div>
        
        <div className="slider-container" ref={bestSellerContainerRef}>
          <button 
            className="slider-nav-btn prev"
            onClick={() => slidePrev(setActiveBestSellerIndex, activeBestSellerIndex)}
            aria-label="Previous slide"
          >
            &lt;
          </button>
          
          <div className="slider-wrapper">
            <div 
              className="slider-track" 
              ref={bestSellerRef}
              style={{ transform: `translateX(-${activeBestSellerIndex * (100 / visibleItems)}%)` }}
            >
              {bestSellers.map(product => (
                <div key={product.id} className="slider-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="slider-nav-btn next"
            onClick={() => slideNext(setActiveBestSellerIndex, activeBestSellerIndex, bestSellers.length)}
            aria-label="Next slide"
          >
            &gt;
          </button>
        </div>
        
        <div className="slider-dots">
          {generateDots(bestSellers, activeBestSellerIndex, setActiveBestSellerIndex)}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals-section">
        <div className="section-header">
          <h2>New Arrivals</h2>
          <p>Check out our latest products</p>
        </div>
        
        <div className="slider-container" ref={newArrivalContainerRef}>
          <button 
            className="slider-nav-btn prev"
            onClick={() => slidePrev(setActiveNewArrivalIndex, activeNewArrivalIndex)}
            aria-label="Previous slide"
          >
            &lt;
          </button>
          
          <div className="slider-wrapper">
            <div 
              className="slider-track" 
              ref={newArrivalRef}
              style={{ transform: `translateX(-${activeNewArrivalIndex * (100 / visibleItems)}%)` }}
            >
              {newArrivals.map(product => (
                <div key={product.id} className="slider-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="slider-nav-btn next"
            onClick={() => slideNext(setActiveNewArrivalIndex, activeNewArrivalIndex, newArrivals.length)}
            aria-label="Next slide"
          >
            &gt;
          </button>
        </div>
        
        <div className="slider-dots">
          {generateDots(newArrivals, activeNewArrivalIndex, setActiveNewArrivalIndex)}
        </div>
      </section>

      {/* Limited-Time Deals with Countdown */}
      <section className="limited-deals-section">
        <div className="section-header">
          <h2>Limited-Time Deals</h2>
          <div className="countdown-timer">
            <div className="time-block">
              <span className="time-value">{timeLeft.days}</span>
              <span className="time-label">Days</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-block">
              <span className="time-value">{timeLeft.hours}</span>
              <span className="time-label">Hours</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-block">
              <span className="time-value">{timeLeft.minutes}</span>
              <span className="time-label">Mins</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-block">
              <span className="time-value">{timeLeft.seconds}</span>
              <span className="time-label">Secs</span>
            </div>
          </div>
        </div>
        
        <div className="slider-container" ref={dealContainerRef}>
          <button 
            className="slider-nav-btn prev"
            onClick={() => slidePrev(setActiveDealIndex, activeDealIndex)}
            aria-label="Previous slide"
          >
            &lt;
          </button>
          
          <div className="slider-wrapper">
            <div 
              className="slider-track" 
              ref={dealRef}
              style={{ transform: `translateX(-${activeDealIndex * (100 / visibleItems)}%)` }}
            >
              {dealsProducts.map(product => (
                <div key={product.id} className="slider-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="slider-nav-btn next"
            onClick={() => slideNext(setActiveDealIndex, activeDealIndex, dealsProducts.length)}
            aria-label="Next slide"
          >
            &gt;
          </button>
        </div>
        
        <div className="slider-dots">
          {generateDots(dealsProducts, activeDealIndex, setActiveDealIndex)}
        </div>
      </section>
    </div>
  );
};

export default FeaturedSections; 