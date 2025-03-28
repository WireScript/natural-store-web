'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import './cart.css';

// Sample cart data (in a real app, this would come from a context/store)
const initialCartItems = [
  {
    id: 1,
    title: 'Organic Face Cream',
    price: 29.99,
    image: '/images/products/product-1.jpg',
    quantity: 2,
    discount: 10,
  },
  {
    id: 2,
    title: 'Herbal Tea Collection',
    price: 19.99,
    image: '/images/products/product-2.jpg',
    quantity: 1,
    discount: 0,
  },
  {
    id: 3,
    title: 'Natural Shampoo',
    price: 14.99,
    image: '/images/products/product-3.jpg',
    quantity: 1,
    discount: 15,
  },
  {
    id: 4,
    title: 'Organic Face Cream',
    price: 29.99,
    image: '/images/products/product-4.jpg',
    quantity: 2,
  },
  {
    id: 5,
    title: 'Organic Face Cream',
    price: 29.99,
    image: '/images/products/product-5.jpg',
    quantity: 2,
  }
];

export default function CartPage() {
  const { 
    cartItems, 
    isLoading, 
    updateQuantity, 
    removeItem,
    subtotal 
  } = useCart();
  
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [showCouponMessage, setShowCouponMessage] = useState(false);
  
  const applyCoupon = () => {
    if (couponCode.trim() === '') return;
    
    // In a real app, you would validate the coupon code with an API
    setShowCouponMessage(true);
    if (couponCode.toLowerCase() === 'natural20') {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
    }
    
    // Hide message after a delay
    setTimeout(() => {
      setShowCouponMessage(false);
    }, 3000);
  };
  
  // Calculate shipping and total
  const shipping = subtotal > 50 ? 0 : 5.99;
  const discount = couponApplied ? subtotal * 0.2 : 0; // 20% discount if coupon applied
  const total = subtotal + shipping - discount;
  
  if (isLoading) {
    return (
      <div className="cart-container loading">
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-container">
      <h1 className="cart-title">YOUR CART</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>It looks like you haven't added any products to your cart yet.</p>
          <Link href="/shop">
            <button className="continue-shopping-btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div 
                key={item.id} 
                id={`cart-item-${item.id}`}
                className="cart-item animate-fade-in-up"
              >
                <div className="item-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <div className="cart-item-price">
                    {item.discount > 0 ? (
                      <>
                        <span className="price-original">₹{item.price}</span>
                        <span className="price-discounted">₹{Math.round(item.price * (1 - item.discount / 100))}</span>
                      </>
                    ) : (
                      <span className="price">₹{item.price}</span>
                    )}
                  </div>
                </div>
                <div className="item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  ₹{Math.round(item.price * (1 - (item.discount || 0) / 100) * item.quantity)}
                </div>
                <button 
                  className="remove-item-btn"
                  onClick={() => {
                    // Animate removal
                    const itemElement = document.getElementById(`cart-item-${item.id}`);
                    if (itemElement) {
                      itemElement.classList.add('animate-slide-out');
                      
                      // Remove from state after animation completes
                      setTimeout(() => {
                        removeItem(item.id);
                      }, 300);
                    }
                  }}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-sidebar">
            <div className="order-summary">
              <h2>Order Summary</h2>
              
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>₹{Math.round(cartItems.reduce((total, item) => total + (item.price * (1 - (item.discount || 0) / 100) * item.quantity), 0))}</span>
              </div>
              
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              
              {discount > 0 && (
                <div className="cart-summary-row discount">
                  <span>Discount (20%)</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              
              <div className="cart-summary-row total">
                <span>Total</span>
                <span>₹{Math.round(cartItems.reduce((total, item) => total + (item.price * (1 - (item.discount || 0) / 100) * item.quantity), 0) + shipping - discount)}</span>
              </div>
              
              <div className="coupon-container">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="coupon-input"
                />
                <button 
                  className="apply-coupon-btn"
                  onClick={applyCoupon}
                >
                  Apply
                </button>
              </div>
              
              {showCouponMessage && (
                <div className={`coupon-message ${couponApplied ? 'success' : 'error'}`}>
                  {couponApplied 
                    ? 'Coupon applied successfully!' 
                    : 'Invalid coupon code'}
                </div>
              )}
              
              <Link href="/checkout">
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </Link>
              
              <Link href="/shop">
                <button className="continue-shopping-link">
                  Continue Shopping
                </button>
              </Link>
              
              <div className="secure-checkout">
                <svg className="secure-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zm-1 14h2v2h-2v-2zm0-8h2v6h-2V8z" 
                     fill="currentColor"/>
                </svg>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 