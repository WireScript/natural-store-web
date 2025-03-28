'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import SortDropdown from './SortDropdown';
import FeaturedSections from './FeaturedSections';
import './ProductGrid.css';

const ProductGrid = ({ productData }) => {
  const [sortValue, setSortValue] = useState('popularity');
  const [visibleProducts, setVisibleProducts] = useState(9);

  const handleSortChange = (value) => {
    setSortValue(value);
    // In a real app, you would apply the sort here
  };

  const handleFilterChange = (filters) => {
    // In a real app, you would apply the filters here
  };

  const handleShowMore = () => {
    setVisibleProducts(prev => prev + 9);
  };

  return (
    <div className="product-section">
      <div className="product-layout">
        <aside className="filter-container">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </aside>
        
        <main className="main-content">
          <div className="top-bar">
            <h2 className="products-title">All Products</h2>
            <SortDropdown onSortChange={handleSortChange} />
          </div>
          
          <div className="product-grid">
            {productData.slice(0, visibleProducts).map(product => (
              <div key={product.id} className="product-grid-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {visibleProducts < productData.length && (
            <div className="show-more-container">
              <button className="show-more-button" onClick={handleShowMore}>
                Show More
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductGrid; 