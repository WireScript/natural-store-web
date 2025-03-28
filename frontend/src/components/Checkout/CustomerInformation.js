'use client';

import { useState } from 'react';
import { useCheckout } from '@/context/CheckoutContext';
import { useAuth } from '@/context/AuthContext';

export default function CustomerInformation({ onNext }) {
  const { checkoutData, updateCheckoutData, setAddressFromSaved } = useCheckout();
  const { user, isAuthenticated, addAddress } = useAuth();
  const [errors, setErrors] = useState({});
  const [showNewAddressForm, setShowNewAddressForm] = useState(!checkoutData.selectedAddressId);
  
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
  
  const validateForm = () => {
    const newErrors = {};
    const { customer } = checkoutData;
    
    // Validate customer info
    if (!customer.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!customer.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!customer.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(customer.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!customer.phone.trim()) newErrors.phone = 'Phone is required';
    
    // If showing new address form, validate shipping address
    if (showNewAddressForm) {
      const { shippingAddress } = checkoutData;
      if (!shippingAddress.address.trim()) newErrors.address = 'Address is required';
      if (!shippingAddress.city.trim()) newErrors.city = 'City is required';
      if (!shippingAddress.state.trim()) newErrors.state = 'State is required';
      if (!shippingAddress.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    } else {
      // If using saved addresses, ensure one is selected
      if (!checkoutData.selectedAddressId) {
        newErrors.selectedAddress = 'Please select an address';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // If user is logged in and checked the save address box, save the address to their account
      if (isAuthenticated() && checkoutData.saveAddress && showNewAddressForm) {
        const { shippingAddress, customer } = checkoutData;
        const newAddress = {
          fullName: `${customer.firstName} ${customer.lastName}`.trim(),
          mobile: customer.phone,
          addressLine1: shippingAddress.address,
          addressLine2: shippingAddress.apartment || '',
          city: shippingAddress.city,
          state: shippingAddress.state,
          pincode: shippingAddress.zipCode,
          addressType: 'home'
        };
        
        // Use the addAddress function from AuthContext
        addAddress(newAddress);
      }
      
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

  const handleSelectAddress = (addressId) => {
    setAddressFromSaved(addressId);
    if (errors.selectedAddress) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.selectedAddress;
        return newErrors;
      });
    }
  };
  
  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="form-section-title">
          <svg className="form-section-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Contact Information
        </h3>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              className={`form-input ${errors.firstName ? 'error' : ''}`}
              value={checkoutData.customer.firstName}
              onChange={(e) => handleChange('customer', 'firstName', e.target.value)}
              data-error={errors.firstName ? 'true' : 'false'}
              style={{ borderColor: errors.firstName ? '#f44336' : '' }}
            />
            {errors.firstName && (
              <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.firstName}</span>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              className={`form-input ${errors.lastName ? 'error' : ''}`}
              value={checkoutData.customer.lastName}
              onChange={(e) => handleChange('customer', 'lastName', e.target.value)}
              data-error={errors.lastName ? 'true' : 'false'}
              style={{ borderColor: errors.lastName ? '#f44336' : '' }}
            />
            {errors.lastName && (
              <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.lastName}</span>
            )}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={checkoutData.customer.email}
              onChange={(e) => handleChange('customer', 'email', e.target.value)}
              data-error={errors.email ? 'true' : 'false'}
              style={{ borderColor: errors.email ? '#f44336' : '' }}
            />
            {errors.email && (
              <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.email}</span>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              className={`form-input ${errors.phone ? 'error' : ''}`}
              value={checkoutData.customer.phone}
              onChange={(e) => handleChange('customer', 'phone', e.target.value)}
              data-error={errors.phone ? 'true' : 'false'}
              style={{ borderColor: errors.phone ? '#f44336' : '' }}
            />
            {errors.phone && (
              <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.phone}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="form-section-title">
          <svg className="form-section-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Shipping Address
        </h3>

        {/* Show saved addresses if user is logged in and has addresses */}
        {isAuthenticated() && user && user.addresses && user.addresses.length > 0 && (
          <div className="saved-addresses-section">
            <div className="form-group">
              <label className="form-label">Select from saved addresses</label>
              <div className="saved-addresses-list" style={{ marginBottom: '1rem' }}>
                {user.addresses.map(address => (
                  <div 
                    key={address.id}
                    className={`saved-address-card ${checkoutData.selectedAddressId === address.id ? 'selected' : ''}`}
                    onClick={() => handleSelectAddress(address.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: checkoutData.selectedAddressId === address.id 
                        ? '2px solid #4CAF50' 
                        : '1px solid #e2e8f0',
                      marginBottom: '0.75rem',
                      cursor: 'pointer',
                      backgroundColor: checkoutData.selectedAddressId === address.id 
                        ? '#f0fff4' 
                        : '#fff'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <p className="text-lg font-semibold">{address.fullName}</p>
                        <p>{address.mobile}</p>
                        <p>
                          {address.addressLine1}
                          {address.addressLine2 ? `, ${address.addressLine2}` : ''}
                        </p>
                        <p>{address.city}, {address.state}, {address.pincode}</p>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: checkoutData.selectedAddressId === address.id 
                          ? '2px solid #4CAF50' 
                          : '1px solid #a0aec0',
                        padding: '3px'
                      }}>
                        {checkoutData.selectedAddressId === address.id && (
                          <div style={{ 
                            width: '12px', 
                            height: '12px', 
                            borderRadius: '50%', 
                            backgroundColor: '#4CAF50' 
                          }}></div>
                        )}
                      </div>
                    </div>
                    {address.isDefault && (
                      <div style={{ 
                        marginTop: '0.5rem', 
                        padding: '0.25rem 0.5rem', 
                        backgroundColor: '#e6fffa', 
                        color: '#2c7a7b', 
                        borderRadius: '0.25rem',
                        display: 'inline-block',
                        fontSize: '0.75rem'
                      }}>
                        Default Address
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {errors.selectedAddress && !showNewAddressForm && (
                <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.selectedAddress}</span>
              )}
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <button 
                type="button" 
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                className="text-button"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#4CAF50',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                {showNewAddressForm ? '← Use a saved address' : '+ Add a new address'}
              </button>
            </div>
          </div>
        )}
        
        {/* New Address Form */}
        {showNewAddressForm && (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                className={`form-input ${errors.address ? 'error' : ''}`}
                value={checkoutData.shippingAddress.address}
                onChange={(e) => handleChange('shippingAddress', 'address', e.target.value)}
                data-error={errors.address ? 'true' : 'false'}
                style={{ borderColor: errors.address ? '#f44336' : '' }}
              />
              {errors.address && (
                <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.address}</span>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="apartment">Apartment, suite, etc. (optional)</label>
              <input
                id="apartment"
                type="text"
                className="form-input"
                value={checkoutData.shippingAddress.apartment}
                onChange={(e) => handleChange('shippingAddress', 'apartment', e.target.value)}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  className={`form-input ${errors.city ? 'error' : ''}`}
                  value={checkoutData.shippingAddress.city}
                  onChange={(e) => handleChange('shippingAddress', 'city', e.target.value)}
                  data-error={errors.city ? 'true' : 'false'}
                  style={{ borderColor: errors.city ? '#f44336' : '' }}
                />
                {errors.city && (
                  <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.city}</span>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="state">State</label>
                <input
                  id="state"
                  type="text"
                  className={`form-input ${errors.state ? 'error' : ''}`}
                  value={checkoutData.shippingAddress.state}
                  onChange={(e) => handleChange('shippingAddress', 'state', e.target.value)}
                  data-error={errors.state ? 'true' : 'false'}
                  style={{ borderColor: errors.state ? '#f44336' : '' }}
                />
                {errors.state && (
                  <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.state}</span>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="zipCode">ZIP Code</label>
                <input
                  id="zipCode"
                  type="text"
                  className={`form-input ${errors.zipCode ? 'error' : ''}`}
                  value={checkoutData.shippingAddress.zipCode}
                  onChange={(e) => handleChange('shippingAddress', 'zipCode', e.target.value)}
                  data-error={errors.zipCode ? 'true' : 'false'}
                  style={{ borderColor: errors.zipCode ? '#f44336' : '' }}
                />
                {errors.zipCode && (
                  <span className="error-message" style={{ color: '#f44336', fontSize: '0.8rem' }}>{errors.zipCode}</span>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="country">Country</label>
              <select
                id="country"
                className="form-select"
                value={checkoutData.shippingAddress.country}
                onChange={(e) => handleChange('shippingAddress', 'country', e.target.value)}
              >
                <option value="India">India</option>
              </select>
            </div>

            {/* Option to save address if user is logged in */}
            {isAuthenticated() && (
              <div className="form-group">
                <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    style={{ marginRight: '0.5rem' }}
                    onChange={(e) => updateCheckoutData('saveAddress', e.target.checked)}
                  />
                  <span>Save this address to my account for future use</span>
                </label>
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="form-actions">
        <div></div>
        <button type="submit" className="btn-next">
          Continue to Shipping
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </form>
  );
} 