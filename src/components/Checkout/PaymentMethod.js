'use client';

import { useState } from 'react';
import { useCheckout } from '@/context/CheckoutContext';

export default function PaymentMethod({ onNext, onBack }) {
  const { checkoutData, updateCheckoutData } = useCheckout();
  const [errors, setErrors] = useState({});
  const [sameAsBilling, setSameAsBilling] = useState(checkoutData.billingAddress.sameAsShipping);
  
  const handleChange = (section, field, value) => {
    updateCheckoutData(section, { [field]: value });
    
    // Clear any error for this field when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  const handleSameAsBillingChange = (e) => {
    const checked = e.target.checked;
    setSameAsBilling(checked);
    updateCheckoutData('billingAddress', { sameAsShipping: checked });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (checkoutData.payment.method === 'credit-card') {
      if (!checkoutData.payment.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!checkoutData.payment.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required';
      if (!checkoutData.payment.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!checkoutData.payment.cvv.trim()) newErrors.cvv = 'CVV is required';
    }
    
    if (!sameAsBilling) {
      const { billingAddress } = checkoutData;
      if (!billingAddress.address.trim()) newErrors.billingAddress = 'Address is required';
      if (!billingAddress.city.trim()) newErrors.billingCity = 'City is required';
      if (!billingAddress.state.trim()) newErrors.billingState = 'State is required';
      if (!billingAddress.zipCode.trim()) newErrors.billingZipCode = 'ZIP code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext();
    } else {
      // Scroll to the first error
      const firstErrorField = document.querySelector('[data-error="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
    }
  };
  
  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="form-section-title">
          <svg className="form-section-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 10H23V21H1V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 6H23V10H1V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 3H23V6H1V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 14H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 18H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 18C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16C19.4477 16 19 16.4477 19 17C19 17.5523 19.4477 18 20 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Payment Method
        </h3>
        
        <div className="payment-methods">
          <div 
            className={`payment-method-card ${checkoutData.payment.method === 'credit-card' ? 'selected' : ''}`}
            onClick={() => handleChange('payment', 'method', 'credit-card')}
            style={{
              padding: '1.5rem',
              borderRadius: '8px',
              border: `2px solid ${checkoutData.payment.method === 'credit-card' ? '#4CAF50' : '#ddd'}`,
              marginBottom: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: checkoutData.payment.method === 'credit-card' ? 'rgba(76, 175, 80, 0.05)' : 'white'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: `2px solid ${checkoutData.payment.method === 'credit-card' ? '#4CAF50' : '#999'}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2px'
            }}>
              {checkoutData.payment.method === 'credit-card' && (
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50',
                  animation: 'scaleIn 0.2s ease'
                }}></div>
              )}
            </div>
            <span style={{ fontWeight: 600, color: '#2e3a1f' }}>Credit Card</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              <div style={{ width: '40px', height: '25px', backgroundColor: '#f8f8f8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#666' }}>VISA</div>
              <div style={{ width: '40px', height: '25px', backgroundColor: '#f8f8f8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#666' }}>MC</div>
              <div style={{ width: '40px', height: '25px', backgroundColor: '#f8f8f8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#666' }}>AMEX</div>
            </div>
          </div>
          
          <div 
            className={`payment-method-card ${checkoutData.payment.method === 'paypal' ? 'selected' : ''}`}
            onClick={() => handleChange('payment', 'method', 'paypal')}
            style={{
              padding: '1.5rem',
              borderRadius: '8px',
              border: `2px solid ${checkoutData.payment.method === 'paypal' ? '#4CAF50' : '#ddd'}`,
              marginBottom: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: checkoutData.payment.method === 'paypal' ? 'rgba(76, 175, 80, 0.05)' : 'white'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: `2px solid ${checkoutData.payment.method === 'paypal' ? '#4CAF50' : '#999'}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2px'
            }}>
              {checkoutData.payment.method === 'paypal' && (
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50',
                  animation: 'scaleIn 0.2s ease'
                }}></div>
              )}
            </div>
            <span style={{ fontWeight: 600, color: '#2e3a1f' }}>PayPal</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              <div style={{ width: '60px', height: '25px', backgroundColor: '#f8f8f8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: '#0070ba' }}>PayPal</div>
            </div>
          </div>
        </div>
        
        {checkoutData.payment.method === 'credit-card' && (
          <div className="credit-card-details" style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s ease-out' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                type="text"
                className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                value={checkoutData.payment.cardNumber}
                onChange={(e) => handleChange('payment', 'cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                data-error={errors.cardNumber ? 'true' : 'false'}
                style={{ borderColor: errors.cardNumber ? '#f44336' : '' }}
              />
              {errors.cardNumber && (
                <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.cardNumber}</span>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="nameOnCard">Name on Card</label>
              <input
                id="nameOnCard"
                type="text"
                className={`form-input ${errors.nameOnCard ? 'error' : ''}`}
                value={checkoutData.payment.nameOnCard}
                onChange={(e) => handleChange('payment', 'nameOnCard', e.target.value)}
                placeholder="John Doe"
                data-error={errors.nameOnCard ? 'true' : 'false'}
                style={{ borderColor: errors.nameOnCard ? '#f44336' : '' }}
              />
              {errors.nameOnCard && (
                <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.nameOnCard}</span>
              )}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="expiryDate">Expiry Date</label>
                <input
                  id="expiryDate"
                  type="text"
                  className={`form-input ${errors.expiryDate ? 'error' : ''}`}
                  value={checkoutData.payment.expiryDate}
                  onChange={(e) => handleChange('payment', 'expiryDate', e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  data-error={errors.expiryDate ? 'true' : 'false'}
                  style={{ borderColor: errors.expiryDate ? '#f44336' : '' }}
                />
                {errors.expiryDate && (
                  <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.expiryDate}</span>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  className={`form-input ${errors.cvv ? 'error' : ''}`}
                  value={checkoutData.payment.cvv}
                  onChange={(e) => handleChange('payment', 'cvv', e.target.value)}
                  placeholder="123"
                  maxLength={4}
                  data-error={errors.cvv ? 'true' : 'false'}
                  style={{ borderColor: errors.cvv ? '#f44336' : '' }}
                />
                {errors.cvv && (
                  <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.cvv}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="form-section">
        <h3 className="form-section-title">
          <svg className="form-section-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Billing Address
        </h3>
        
        <div className="form-checkbox" style={{ marginBottom: '1.5rem' }}>
          <input
            id="sameAsShipping"
            type="checkbox"
            checked={sameAsBilling}
            onChange={handleSameAsBillingChange}
          />
          <label htmlFor="sameAsShipping">Same as shipping address</label>
        </div>
        
        {!sameAsBilling && (
          <div className="billing-address-form" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="billingAddress">Address</label>
              <input
                id="billingAddress"
                type="text"
                className={`form-input ${errors.billingAddress ? 'error' : ''}`}
                value={checkoutData.billingAddress.address}
                onChange={(e) => handleChange('billingAddress', 'address', e.target.value)}
                data-error={errors.billingAddress ? 'true' : 'false'}
                style={{ borderColor: errors.billingAddress ? '#f44336' : '' }}
              />
              {errors.billingAddress && (
                <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.billingAddress}</span>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="billingApartment">Apartment, suite, etc. (optional)</label>
              <input
                id="billingApartment"
                type="text"
                className="form-input"
                value={checkoutData.billingAddress.apartment}
                onChange={(e) => handleChange('billingAddress', 'apartment', e.target.value)}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="billingCity">City</label>
                <input
                  id="billingCity"
                  type="text"
                  className={`form-input ${errors.billingCity ? 'error' : ''}`}
                  value={checkoutData.billingAddress.city}
                  onChange={(e) => handleChange('billingAddress', 'city', e.target.value)}
                  data-error={errors.billingCity ? 'true' : 'false'}
                  style={{ borderColor: errors.billingCity ? '#f44336' : '' }}
                />
                {errors.billingCity && (
                  <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.billingCity}</span>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="billingState">State</label>
                <input
                  id="billingState"
                  type="text"
                  className={`form-input ${errors.billingState ? 'error' : ''}`}
                  value={checkoutData.billingAddress.state}
                  onChange={(e) => handleChange('billingAddress', 'state', e.target.value)}
                  data-error={errors.billingState ? 'true' : 'false'}
                  style={{ borderColor: errors.billingState ? '#f44336' : '' }}
                />
                {errors.billingState && (
                  <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.billingState}</span>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="billingZipCode">ZIP Code</label>
                <input
                  id="billingZipCode"
                  type="text"
                  className={`form-input ${errors.billingZipCode ? 'error' : ''}`}
                  value={checkoutData.billingAddress.zipCode}
                  onChange={(e) => handleChange('billingAddress', 'zipCode', e.target.value)}
                  data-error={errors.billingZipCode ? 'true' : 'false'}
                  style={{ borderColor: errors.billingZipCode ? '#f44336' : '' }}
                />
                {errors.billingZipCode && (
                  <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.billingZipCode}</span>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="billingCountry">Country</label>
              <select
                id="billingCountry"
                className="form-select"
                value={checkoutData.billingAddress.country}
                onChange={(e) => handleChange('billingAddress', 'country', e.target.value)}
              >
                <option value="India">India</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn-back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Shipping
        </button>
        <button type="submit" className="btn-next">
          Place Order
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </form>
  );
} 