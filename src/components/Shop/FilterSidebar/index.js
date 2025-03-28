'use client';

import React, { useState } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ onFilterChange }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [availability, setAvailability] = useState('all');

  const categories = [
    'Skincare',
    'Food',
    'Supplements',
    'Beverages',
    'Personal Care',
    'Home & Living'
  ];

  const certifications = [
    'USDA Organic',
    'Eco-Friendly',
    'Vegan',
    'Cruelty-Free',
    'Fair Trade'
  ];

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleCertificationToggle = (certification) => {
    setSelectedCertifications(prev =>
      prev.includes(certification)
        ? prev.filter(c => c !== certification)
        : [...prev, certification]
    );
  };

  return (
    <>
      <button 
        className="mobile-filter-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        Filters {isMobileOpen ? '✕' : '☰'}
      </button>

      <div className={`filter-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="filter-section">
          <h3>Categories</h3>
          <div className="filter-options">
            {categories.map(category => (
              <label key={category} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Price Range</h3>
          <div className="price-range">
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
            <div className="price-inputs">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <h3>Rating</h3>
          <div className="rating-filter">
            {[5, 4, 3, 2, 1].map(rating => (
              <label key={rating} className="rating-option">
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === rating}
                  onChange={() => setSelectedRating(rating)}
                />
                <span className="stars">{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
                <span className="rating-text">& up</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Certifications</h3>
          <div className="filter-options">
            {certifications.map(certification => (
              <label key={certification} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedCertifications.includes(certification)}
                  onChange={() => handleCertificationToggle(certification)}
                />
                {certification}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Availability</h3>
          <div className="availability-options">
            <label className="availability-option">
              <input
                type="radio"
                name="availability"
                checked={availability === 'all'}
                onChange={() => setAvailability('all')}
              />
              All Products
            </label>
            <label className="availability-option">
              <input
                type="radio"
                name="availability"
                checked={availability === 'in-stock'}
                onChange={() => setAvailability('in-stock')}
              />
              In Stock
            </label>
            <label className="availability-option">
              <input
                type="radio"
                name="availability"
                checked={availability === 'pre-order'}
                onChange={() => setAvailability('pre-order')}
              />
              Pre-Order
            </label>
          </div>
        </div>

        <button className="apply-filters">
          Apply Filters
        </button>
      </div>
    </>
  );
};

export default FilterSidebar; 