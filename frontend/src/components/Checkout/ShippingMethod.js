'use client';

import { useCheckout } from '@/context/CheckoutContext';

export default function ShippingMethod({ onNext, onBack }) {
  const { checkoutData, updateCheckoutData, calculateTotals } = useCheckout();
  const { subtotal } = calculateTotals();
  
  const handleMethodChange = (method) => {
    updateCheckoutData('shipping', { method });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };
  
  // Define shipping methods
  const shippingMethods = [
    {
      id: 'standard',
      title: 'Standard Shipping',
      description: 'Delivery in 5-7 business days',
      price: subtotal > 50 ? 0 : 5.99
    },
    {
      id: 'express',
      title: 'Express Shipping',
      description: 'Delivery in 2-3 business days',
      price: 15.99
    }
  ];
  
  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="form-section-title">
          <svg className="form-section-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 3H1V16H16V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 8H20L23 11V16H16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.5 21C6.88071 21 8 19.8807 8 18.5C8 17.1193 6.88071 16 5.5 16C4.11929 16 3 17.1193 3 18.5C3 19.8807 4.11929 21 5.5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 21C19.8807 21 21 19.8807 21 18.5C21 17.1193 19.8807 16 18.5 16C17.1193 16 16 17.1193 16 18.5C16 19.8807 17.1193 21 18.5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Shipping Method
        </h3>
        
        <div className="shipping-methods">
          {shippingMethods.map(method => (
            <div 
              key={method.id}
              className={`shipping-method-card ${checkoutData.shipping.method === method.id ? 'selected' : ''}`}
              onClick={() => handleMethodChange(method.id)}
              style={{
                padding: '1.5rem',
                borderRadius: '8px',
                border: `2px solid ${checkoutData.shipping.method === method.id ? '#4CAF50' : '#ddd'}`,
                marginBottom: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: checkoutData.shipping.method === method.id ? 'rgba(76, 175, 80, 0.05)' : 'white'
              }}
            >
              <div className="shipping-method-info">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: `2px solid ${checkoutData.shipping.method === method.id ? '#4CAF50' : '#999'}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2px'
                  }}>
                    {checkoutData.shipping.method === method.id && (
                      <div style={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%',
                        backgroundColor: '#4CAF50',
                        animation: 'scaleIn 0.2s ease'
                      }}></div>
                    )}
                  </div>
                  <h4 style={{ margin: 0, fontWeight: 600, color: '#2e3a1f' }}>{method.title}</h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{method.description}</p>
              </div>
              <div className="shipping-method-price" style={{ fontWeight: 600, color: '#2e3a1f' }}>
                {method.price === 0 ? (
                  <span className="free-shipping">FREE</span>
                ) : (
                  `$${method.price.toFixed(2)}`
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="orderNotes">Order Notes (optional)</label>
          <textarea
            id="orderNotes"
            className="form-input"
            value={checkoutData.orderNotes}
            onChange={(e) => updateCheckoutData('orderNotes', e.target.value)}
            placeholder="Special instructions for delivery or package handling"
            rows={3}
            style={{ resize: 'vertical', minHeight: '80px' }}
          ></textarea>
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn-back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Information
        </button>
        <button type="submit" className="btn-next">
          Continue to Payment
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </form>
  );
} 