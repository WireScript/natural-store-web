'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCheckout } from '@/context/CheckoutContext';

export default function OrderConfirmation() {
  const { checkoutData, calculateTotals, placeOrder } = useCheckout();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  
  useEffect(() => {
    // Simulate order processing
    const timer = setTimeout(() => {
      const newOrder = placeOrder();
      setOrderDetails(newOrder);
      setIsProcessing(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [placeOrder]);
  
  if (isProcessing) {
    return (
      <div className="processing-order" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '400px'
      }}>
        <div className="spinner" style={{ width: '50px', height: '50px' }}></div>
        <p style={{ marginTop: '1rem', color: '#666' }}>Processing your order...</p>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const { total, shipping, discount } = calculateTotals();
  
  return (
    <div className="order-confirmation">
      <div className="confirmation-icon">✓</div>
      <h2 className="confirmation-title">Thank You For Your Order!</h2>
      <p className="confirmation-message">
        Your order <span className="order-id">{orderDetails?.id}</span> has been placed successfully. 
        We have sent a confirmation email to <strong>{checkoutData.customer.email}</strong>.
      </p>
      
      <div className="order-details">
        <h3 className="order-details-title">Order Details</h3>
        
        <div className="order-detail-row">
          <span className="order-detail-label">Order Number</span>
          <span className="order-detail-value">{orderDetails?.id}</span>
        </div>
        
        <div className="order-detail-row">
          <span className="order-detail-label">Order Date</span>
          <span className="order-detail-value">{formatDate(orderDetails?.orderDate)}</span>
        </div>
        
        <div className="order-detail-row">
          <span className="order-detail-label">Name</span>
          <span className="order-detail-value">{`${checkoutData.customer.firstName} ${checkoutData.customer.lastName}`}</span>
        </div>
        
        <div className="order-detail-row">
          <span className="order-detail-label">Shipping Address</span>
          <span className="order-detail-value">
            {`${checkoutData.shippingAddress.address}${checkoutData.shippingAddress.apartment ? ', ' + checkoutData.shippingAddress.apartment : ''}, ${checkoutData.shippingAddress.city}, ${checkoutData.shippingAddress.state} ${checkoutData.shippingAddress.zipCode}`}
          </span>
        </div>
        
        <div className="order-detail-row">
          <span className="order-detail-label">Shipping Method</span>
          <span className="order-detail-value">
            {checkoutData.shipping.method === 'express' ? 'Express Shipping' : 'Standard Shipping'}
          </span>
        </div>
        
        <div className="order-detail-row">
          <span className="order-detail-label">Payment Method</span>
          <span className="order-detail-value">
            {checkoutData.payment.method === 'credit-card' ? 'Credit Card' : 'PayPal'}
          </span>
        </div>
        
        <div className="order-detail-row">
          <span className="order-detail-label">Total</span>
          <span className="order-detail-value">₹{Math.round(total)}</span>
        </div>
        
        {discount > 0 && (
          <div className="order-detail-row">
            <span className="order-detail-label">Discount</span>
            <span className="order-detail-value">-₹{Math.round(discount)}</span>
          </div>
        )}
      </div>
      
      <p style={{ marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
        We'll send you shipping confirmation once your order is on the way. 
        If you have any questions, please contact our customer support.
      </p>
      
      <Link href="/shop" className="continue-shopping-btn">
        Continue Shopping
      </Link>
    </div>
  );
} 