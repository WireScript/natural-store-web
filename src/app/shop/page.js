import React from 'react';
import ProductSlider from '@/components/ProductSlider';
import ProductGrid from '@/components/ProductGrid';
import './shop.css';

const ShopPage = () => {
  return (
    <div>
      {/* <ProductSlider /> */}
      <div id="products-section">
        <ProductGrid />
      </div>
    </div>
  );
};

export default ShopPage;

