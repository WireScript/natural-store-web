'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    // Add the product to cart
    addToCart(product, 1);
    
    // Show adding animation for a short period
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-badges">
        {product.isNew && <span className="badge new">New Arrival</span>}
        {product.isBestSeller && <span className="badge best-seller">Best Seller</span>}
        {product.discount > 0 && <span className="badge discount">{product.discount}% OFF</span>}
        {product.isOrganic && <span className="badge organic">Organic</span>}
      </div>

      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.title}
          className={`product-image ${isHovered ? 'hovered' : ''}`}
        />
        {product.secondaryImage && (
          <img 
            src={product.secondaryImage} 
            alt={`${product.title} alternate view`}
            className={`product-image secondary ${isHovered ? 'show' : ''}`}
          />
        )}
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
        
        <div className="product-price">
          {product.discount > 0 ? (
            <>
              <span className="price-original">${product.price}</span>
              <span className="price-discounted">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="price">${product.price}</span>
          )}
        </div>

        <div className="product-actions">
          <button 
            className={`btn-add-cart ${isAddingToCart ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <span className="adding-icon">✓</span>
                Added
              </>
            ) : (
              'Add to Cart'
            )}
          </button>
          <button className="btn-view-details">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 