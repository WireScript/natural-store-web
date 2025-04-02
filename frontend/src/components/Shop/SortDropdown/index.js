'use client';

import React, { useState } from 'react';
import './SortDropdown.css';

const SortDropdown = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('popularity');

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'newest', label: 'New Arrivals' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Ratings' }
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
    if (onSortChange) {
      onSortChange(option.value);
    }
  };

  return (
    <div className="sort-dropdown">
      <div 
        className="sort-dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Sort By: {sortOptions.find(opt => opt.value === selectedOption).label}</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>&#9662;</span>
      </div>
      
      {isOpen && (
        <div className="sort-dropdown-options">
          {sortOptions.map(option => (
            <div
              key={option.value}
              className={`sort-option ${selectedOption === option.value ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown; 