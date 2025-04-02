'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import './product-detail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = products.find(p => p.id.toString() === id);
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-container loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container error">
        <h2>Product Not Found</h2>
        <p>Sorry, the product you are looking for does not exist.</p>
        <Link href="/shop">
          <button className="back-to-shop">Back to Shop</button>
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(product, quantity);
    
    // Show adding animation for a short period
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  // Generate images array - in a real app, product would have multiple images
  const productImages = [
    product.image,
    product.secondaryImage || product.image,
    ...(product.additionalImages || [])
  ].filter(Boolean);

  const finalPrice = product.discount > 0 
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  // Function to validate image URL exists
  const validateImagePath = (path) => {
    return path && path.startsWith('/');
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-breadcrumb">
        <Link href="/">Home</Link> {'>'} 
        <Link href="/shop">Shop</Link> {'>'} 
        <span>{product.title}</span>
      </div>

      <div className="product-detail-content">
        <div className="product-detail-gallery">
          <div className="product-detail-main-image">
            <Image 
              src={validateImagePath(productImages[activeImage]) ? productImages[activeImage] : '/images/products/product-1.jpg'} 
              alt={product.title}
              width={500}
              height={500}
              priority
            />
            
            <div className="product-badges">
              {product.isNew && <span className="badge new">New Arrival</span>}
              {product.isBestSeller && <span className="badge best-seller">Best Seller</span>}
              {product.discount > 0 && <span className="badge discount">{product.discount}% OFF</span>}
              {product.isOrganic && <span className="badge organic">Organic</span>}
            </div>
          </div>
          
          {productImages.length > 1 && (
            <div className="product-detail-thumbnails">
              {productImages.map((img, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image 
                    src={validateImagePath(img) ? img : '/images/products/product-1.jpg'} 
                    alt={`${product.title} - view ${index + 1}`}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-detail-price">
            {product.discount > 0 ? (
              <>
                <span className="price-original">₹{product.price}</span>
                <span className="price-discounted">₹{finalPrice}</span>
                <span className="price-saving">Save ₹{product.price - finalPrice}</span>
              </>
            ) : (
              <span className="price">₹{product.price}</span>
            )}
          </div>
          
          <div className="product-detail-description">
            <p>{product.fullDescription || product.description}</p>
          </div>
          
          <div className="product-detail-meta">
            {product.categories && (
              <div className="product-detail-categories">
                <span className="meta-label">Categories:</span>
                <span className="meta-value">{Array.isArray(product.categories) ? product.categories.join(', ') : product.categories}</span>
              </div>
            )}
            
            {product.tags && (
              <div className="product-detail-tags">
                <span className="meta-label">Tags:</span>
                <span className="meta-value">{Array.isArray(product.tags) ? product.tags.join(', ') : product.tags}</span>
              </div>
            )}
            
            <div className="product-detail-sku">
              <span className="meta-label">SKU:</span>
              <span className="meta-value">{product.sku || `PROD-${product.id}`}</span>
            </div>
          </div>
          
          <div className="product-detail-add-to-cart">
            <div className="quantity-selector">
              <button 
                className="quantity-btn" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange}
              />
              <button 
                className="quantity-btn" 
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
            
            <button 
              className={`btn-add-to-cart ${isAddingToCart ? 'adding' : ''}`}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <>
                  <span className="adding-icon">✓</span>
                  Added to Cart
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
          
          {product.inStock === 0 && (
            <div className="product-out-of-stock">
              <span>Out of Stock</span>
            </div>
          )}
          
          {product.inStock > 0 && product.inStock < 10 && (
            <div className="product-stock-info">
              <span>Only {product.inStock} left in stock</span>
            </div>
          )}
          
          <div className="product-detail-features">
            <div className="feature">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Free shipping on orders over ₹1500</span>
            </div>
            <div className="feature">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7L9 18L4 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Satisfaction guaranteed</span>
            </div>
            <div className="feature">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Top rated products</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="product-detail-tabs">
        <div className="tabs-header">
          <div 
            className={`tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => changeTab('description')}
          >
            Description
          </div>
          <div 
            className={`tab ${activeTab === 'additional' ? 'active' : ''}`}
            onClick={() => changeTab('additional')}
          >
            Additional Information
          </div>
          <div 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => changeTab('reviews')}
          >
            Reviews
          </div>
        </div>
        
        <div className="tab-content">
          <div className={`tab-pane ${activeTab === 'description' ? 'active' : ''}`}>
            <p>{product.fullDescription || product.description}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          
          <div className={`tab-pane ${activeTab === 'additional' ? 'active' : ''}`}>
            <h3>Product Specifications</h3>
            <table className="product-specs">
              <tbody>
                <tr>
                  <td>Weight</td>
                  <td>0.5 kg</td>
                </tr>
                <tr>
                  <td>Dimensions</td>
                  <td>10 × 5 × 5 cm</td>
                </tr>
                <tr>
                  <td>Ingredients</td>
                  <td>100% Organic {product.title}</td>
                </tr>
                <tr>
                  <td>Origin</td>
                  <td>India</td>
                </tr>
                <tr>
                  <td>Certifications</td>
                  <td>USDA Organic, Non-GMO Project Verified</td>
                </tr>
                <tr>
                  <td>Shelf Life</td>
                  <td>24 months</td>
                </tr>
                <tr>
                  <td>Storage</td>
                  <td>Store in a cool, dry place away from direct sunlight</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className={`tab-pane ${activeTab === 'reviews' ? 'active' : ''}`}>
            <div className="reviews-summary">
              <div className="average-rating">
                <span className="rating-number">4.8</span>
                <div className="rating-stars">★★★★★</div>
                <span className="total-reviews">Based on 24 reviews</span>
              </div>
              
              <div className="write-review">
                <h3>Share your thoughts</h3>
                <p>If you&apos;ve used this product, share your thoughts with other customers</p>
                <button className="write-review-btn">Write a Review</button>
              </div>
            </div>
            
            <div className="reviews-list">
              <div className="review-item">
                <div className="review-header">
                  <span className="reviewer-name">Jane S.</span>
                  <div className="review-rating">★★★★★</div>
                  <span className="review-date">2 months ago</span>
                </div>
                <h4 className="review-title">Great quality product</h4>
                <p className="review-content">
                  I&apos;ve tried many similar products but this one stands out for its quality. Will definitely buy again.
                </p>
              </div>
              
              <div className="review-item">
                <div className="review-header">
                  <span className="reviewer-name">Michael T.</span>
                  <div className="review-rating">★★★★☆</div>
                  <span className="review-date">1 month ago</span>
                </div>
                <h4 className="review-title">Good but shipping was slow</h4>
                <p className="review-content">
                  Product works as described but shipping took longer than expected. Otherwise happy with my purchase.
                </p>
              </div>
              
              <div className="review-item">
                <div className="review-header">
                  <span className="reviewer-name">Sarah W.</span>
                  <div className="review-rating">★★★★★</div>
                  <span className="review-date">3 weeks ago</span>
                </div>
                <h4 className="review-title">Excellent customer service</h4>
                <p className="review-content">
                  Not only is the product amazing but when I had questions, the customer service team was incredibly helpful!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="related-products">
        <h2>You Might Also Like</h2>
        <div className="related-products-grid">
          {products
            .filter(p => p.id !== product.id && (p.categories?.some(cat => product.categories?.includes(cat)) || p.tags?.some(tag => product.tags?.includes(tag))))
            .slice(0, 4)
            .map(relatedProduct => (
              <div key={relatedProduct.id} className="related-product-card">
                <Link href={`/product/${relatedProduct.id}`}>
                  <div className="related-product-image">
                    <Image 
                      src={validateImagePath(relatedProduct.image) ? relatedProduct.image : '/images/products/product-1.jpg'} 
                      alt={relatedProduct.title}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="related-product-info">
                    <h3>{relatedProduct.title}</h3>
                    <div className="related-product-price">
                      {relatedProduct.discount > 0 ? (
                        <>
                          <span className="price-original">₹{relatedProduct.price}</span>
                          <span className="price-discounted">
                            ₹{Math.round(relatedProduct.price * (1 - relatedProduct.discount / 100))}
                          </span>
                        </>
                      ) : (
                        <span className="price">₹{relatedProduct.price}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
} 