'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';

export default function OrderSummary() {
  const { cartItems, subtotal } = useCart();
  const { checkoutData, updateCheckoutData, calculateTotals, applyCoupon } = useCheckout();
  
  const [couponCode, setCouponCode] = useState('');
  const [showCouponMessage, setShowCouponMessage] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);
  
  const { shipping, discount, total } = calculateTotals();
  
  const handleApplyCoupon = () => {
    if (couponCode.trim() === '') return;
    
    const result = applyCoupon(couponCode);
    setCouponSuccess(result);
    setShowCouponMessage(true);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setShowCouponMessage(false);
    }, 3000);
  };
  
  return (
    <div className="order-summary">
      <h2 className="order-summary-title">Order Summary</h2>
      
      <div className="order-items">
        {cartItems.map(item => (
          <div key={item.id} className="order-item">
            <div className="order-item-image">
              <Image
                src={item.image}
                alt={item.title}
                width={50}
                height={50}
              />
            </div>
            <div className="order-item-details">
              <h3 className="order-item-title">{item.title}</h3>
              <p className="order-item-price">
                {item.discount > 0 ? (
                  <>₹{Math.round(item.price * (1 - item.discount / 100))}</>
                ) : (
                  <>₹{item.price}</>
                )}
              </p>
            </div>
            <div className="order-item-quantity">
              <span>x {item.quantity}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{Math.round(subtotal)}</span>
      </div>
      
      <div className="summary-row">
        <span>Shipping</span>
        <span>
          {shipping === 0 
            ? <span className="free-shipping">Free</span> 
            : `₹${shipping}`}
        </span>
      </div>
      
      {discount > 0 && (
        <div className="summary-row discount">
          <span>Discount</span>
          <span>-₹{Math.round(discount)}</span>
        </div>
      )}
      
      <div className="summary-row total">
        <span>Total</span>
        <span>₹{Math.round(total)}</span>
      </div>
      
      {!checkoutData.discountApplied && (
        <>
          <div className="coupon-container">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="form-input"
            />
            <button 
              className="btn-next"
              onClick={handleApplyCoupon}
              style={{ padding: '0.75rem 1rem' }}
            >
              Apply
            </button>
          </div>
          
          {showCouponMessage && (
            <div className={`coupon-message ${couponSuccess ? 'success' : 'error'}`} style={{
              fontSize: '0.85rem',
              marginTop: '0.5rem',
              padding: '0.5rem',
              borderRadius: '4px',
              textAlign: 'center',
              animation: 'fadeIn 0.3s ease-out forwards',
              backgroundColor: couponSuccess ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
              color: couponSuccess ? '#2E7D32' : '#f44336'
            }}>
              {couponSuccess ? 'Coupon applied successfully!' : 'Invalid coupon code'}
            </div>
          )}
        </>
      )}
    </div>
  );
} 