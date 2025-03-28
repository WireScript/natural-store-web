'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import SortDropdown from './SortDropdown';
import './ProductGrid.css';

const ProductGrid = () => {
  // Mock product data (in a real app, this would come from an API)
  const productData = [
    {
      id: 1,
      title: 'Organic Face Cream',
      description: 'Nourishing and hydrating natural face cream',
      price: 29.99,
      image: '/images/products/product-1.jpg',
      secondaryImage: '/images/products/product-1.jpg',
      discount: 10,
      isNew: true,
      isOrganic: true,
      category: 'Skincare'
    },
    {
      id: 2,
      title: 'Herbal Tea Collection',
      description: 'Assortment of organic herbal teas',
      price: 19.99,
      image: '/images/products/product-2.jpg',
      secondaryImage: '/images/products/product-2.jpg',
      discount: 0,
      isBestSeller: true,
      isOrganic: true,
      category: 'Beverages'
    },
    {
      id: 3,
      title: 'Natural Shampoo',
      description: 'Chemical-free shampoo with essential oils',
      price: 14.99,
      image: '/images/products/product-3.jpg',
      secondaryImage: '/images/products/product-3.jpg',
      discount: 15,
      isOrganic: true,
      category: 'Personal Care'
    },
    {
      id: 4,
      title: 'Organic Honey',
      description: 'Pure and raw organic honey',
      price: 12.99,
      image: '/images/products/product-4.jpg',
      secondaryImage: '/images/products/product-4.jpg',
      discount: 0,
      isBestSeller: true,
      isOrganic: true,
      category: 'Food'
    },
    {
      id: 5,
      title: 'Essential Oil Set',
      description: 'Set of 6 pure essential oils',
      price: 34.99,
      image: '/images/products/product-5.jpg',
      secondaryImage: '/images/products/product-5.jpg',
      discount: 0,
      isNew: true,
      isOrganic: true,
      category: 'Personal Care'
    },
    {
      id: 6,
      title: 'Organic Aloe Vera Gel',
      description: '100% pure aloe vera gel for skin',
      price: 9.99,
      image: '/images/products/product-6.jpg',
      secondaryImage: '/images/products/product-6.jpg',
      discount: 0,
      isBestSeller: true,
      isOrganic: true,
      category: 'Skincare'
    }
  ];

  const [sortValue, setSortValue] = useState('popularity');

  const handleSortChange = (value) => {
    setSortValue(value);
    // In a real app, you would apply the sort here
  };

  const handleFilterChange = (filters) => {
    // In a real app, you would apply the filters here
  };

  return (
    <div className="product-section">
      <div className="product-layout">
        <aside className="filter-container">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </aside>
        
        <main className="main-content">
          <div className="top-bar">
            <h2 className="products-title">Our Products</h2>
            <SortDropdown onSortChange={handleSortChange} />
          </div>
          
          <div className="product-grid">
            {productData.map(product => (
              <div key={product.id} className="product-grid-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductGrid; 