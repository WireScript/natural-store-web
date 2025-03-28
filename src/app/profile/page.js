'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from '@/styles/profile.module.css';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    fullName: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'home',
    isDefault: false
  });
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressFormErrors, setAddressFormErrors] = useState({});
  
  const { user, isAuthenticated, addAddress, editAddress, deleteAddress, setDefaultAddress } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated() && !isLoading) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router, isLoading]);

  const resetAddressForm = () => {
    setAddressFormData({
      fullName: '',
      mobile: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      addressType: 'home',
      isDefault: false
    });
    setEditingAddressId(null);
    setAddressFormErrors({});
  };

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressFormData({
      ...addressFormData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateAddressForm = () => {
    const errors = {};
    
    if (!addressFormData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!addressFormData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(addressFormData.mobile)) {
      errors.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    if (!addressFormData.addressLine1.trim()) {
      errors.addressLine1 = 'Address line 1 is required';
    }
    
    if (!addressFormData.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!addressFormData.state.trim()) {
      errors.state = 'State is required';
    }
    
    if (!addressFormData.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(addressFormData.pincode)) {
      errors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    return errors;
  };

  const handleAddressFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateAddressForm();
    setAddressFormErrors(errors);
    
    // If no errors, submit form
    if (Object.keys(errors).length === 0) {
      if (editingAddressId) {
        // Edit existing address
        editAddress(editingAddressId, addressFormData);
      } else {
        // Add new address
        addAddress(addressFormData);
      }
      
      // Reset form and hide it
      resetAddressForm();
      setShowAddressForm(false);
    }
  };

  const handleEditAddress = (address) => {
    setAddressFormData({
      fullName: address.fullName,
      mobile: address.mobile,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      addressType: address.addressType,
      isDefault: address.isDefault
    });
    setEditingAddressId(address.id);
    setShowAddressForm(true);
    
    // Scroll to the form
    window.scrollTo({
      top: document.getElementById('address-form').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(addressId);
    }
  };

  const handleSetDefaultAddress = (addressId) => {
    setDefaultAddress(addressId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>My Account</h1>
        
        {/* Profile Information Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Profile Information</h2>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={() => router.push('/profile/edit')}
            >
              Edit Profile
            </button>
          </div>
          
          <div className={styles.cardContent}>
            <div className={styles.profileInfoGrid}>
              <div className={styles.infoSection}>
                <h3 className={styles.infoSectionTitle}>Personal Information</h3>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Full Name</div>
                  <div className={styles.infoValue}>{user.fullName}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Username</div>
                  <div className={styles.infoValue}>{user.username}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Email Address</div>
                  <div className={styles.infoValue}>{user.email}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Mobile Number</div>
                  <div className={styles.infoValue}>{user.mobile}</div>
                </div>
              </div>
              
              <div className={styles.infoSection}>
                <h3 className={styles.infoSectionTitle}>Account Information</h3>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Account Created</div>
                  <div className={styles.infoValue}>
                    {new Date(user.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Last Login</div>
                  <div className={styles.infoValue}>Today</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Status</div>
                  <div className={styles.infoValue} style={{ color: '#4CAF50' }}>Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Addresses Section */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>My Addresses</h2>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={() => {
                resetAddressForm();
                setShowAddressForm(!showAddressForm);
              }}
            >
              {showAddressForm ? 'Cancel' : '+ Add New Address'}
            </button>
          </div>
          
          <div className={styles.cardContent}>
            {/* Address Form */}
            {showAddressForm && (
              <div id="address-form" className={styles.formContainer}>
                <h3 className={styles.formTitle}>
                  {editingAddressId ? 'Edit Address' : 'Add New Address'}
                </h3>
                <form onSubmit={handleAddressFormSubmit}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="fullName" className={styles.formLabel}>
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={addressFormData.fullName}
                        onChange={handleAddressFormChange}
                        className={`${styles.formInput} ${addressFormErrors.fullName ? styles.error : ''}`}
                      />
                      {addressFormErrors.fullName && (
                        <p className={styles.errorText}>{addressFormErrors.fullName}</p>
                      )}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="mobile" className={styles.formLabel}>
                        Mobile Number*
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={addressFormData.mobile}
                        onChange={handleAddressFormChange}
                        className={`${styles.formInput} ${addressFormErrors.mobile ? styles.error : ''}`}
                      />
                      {addressFormErrors.mobile && (
                        <p className={styles.errorText}>{addressFormErrors.mobile}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="addressLine1" className={styles.formLabel}>
                      Address Line 1*
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      name="addressLine1"
                      value={addressFormData.addressLine1}
                      onChange={handleAddressFormChange}
                      className={`${styles.formInput} ${addressFormErrors.addressLine1 ? styles.error : ''}`}
                      placeholder="House No., Building Name, Street"
                    />
                    {addressFormErrors.addressLine1 && (
                      <p className={styles.errorText}>{addressFormErrors.addressLine1}</p>
                    )}
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="addressLine2" className={styles.formLabel}>
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      id="addressLine2"
                      name="addressLine2"
                      value={addressFormData.addressLine2}
                      onChange={handleAddressFormChange}
                      className={styles.formInput}
                      placeholder="Area, Colony, Landmark (Optional)"
                    />
                  </div>
                  
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="city" className={styles.formLabel}>
                        City*
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={addressFormData.city}
                        onChange={handleAddressFormChange}
                        className={`${styles.formInput} ${addressFormErrors.city ? styles.error : ''}`}
                      />
                      {addressFormErrors.city && (
                        <p className={styles.errorText}>{addressFormErrors.city}</p>
                      )}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="state" className={styles.formLabel}>
                        State*
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={addressFormData.state}
                        onChange={handleAddressFormChange}
                        className={`${styles.formInput} ${addressFormErrors.state ? styles.error : ''}`}
                      />
                      {addressFormErrors.state && (
                        <p className={styles.errorText}>{addressFormErrors.state}</p>
                      )}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="pincode" className={styles.formLabel}>
                        Pincode*
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={addressFormData.pincode}
                        onChange={handleAddressFormChange}
                        className={`${styles.formInput} ${addressFormErrors.pincode ? styles.error : ''}`}
                      />
                      {addressFormErrors.pincode && (
                        <p className={styles.errorText}>{addressFormErrors.pincode}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Address Type
                    </label>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="addressType"
                          value="home"
                          checked={addressFormData.addressType === 'home'}
                          onChange={handleAddressFormChange}
                          className={styles.radioInput}
                        />
                        <span>Home</span>
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="addressType"
                          value="work"
                          checked={addressFormData.addressType === 'work'}
                          onChange={handleAddressFormChange}
                          className={styles.radioInput}
                        />
                        <span>Work</span>
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="addressType"
                          value="other"
                          checked={addressFormData.addressType === 'other'}
                          onChange={handleAddressFormChange}
                          className={styles.radioInput}
                        />
                        <span>Other</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={addressFormData.isDefault}
                        onChange={handleAddressFormChange}
                        className={styles.checkboxInput}
                      />
                      <span>Make this my default address</span>
                    </label>
                  </div>
                  
                  <div className={styles.formActions}>
                    <button
                      type="button"
                      onClick={() => {
                        resetAddressForm();
                        setShowAddressForm(false);
                      }}
                      className={`${styles.button} ${styles.buttonSecondary}`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`${styles.button} ${styles.buttonPrimary}`}
                    >
                      {editingAddressId ? 'Update Address' : 'Save Address'}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Address List */}
            {user.addresses && user.addresses.length > 0 ? (
              <div className={styles.addressList}>
                {user.addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`${styles.addressCard} ${address.isDefault ? styles.defaultAddress : ''}`}
                  >
                    <div className={styles.addressName}>
                      {address.fullName}
                      <span className={styles.addressType}>{address.addressType}</span>
                      {address.isDefault && (
                        <span className={styles.defaultBadge}>Default</span>
                      )}
                    </div>
                    <div className={styles.addressDetails}>
                      <p>{address.mobile}</p>
                      <p>
                        {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                      </p>
                      <p>
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>
                    <div className={styles.addressActions}>
                      <button
                        onClick={() => handleEditAddress(address)}
                        className={`${styles.actionButton} ${styles.editButton}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                      >
                        Delete
                      </button>
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefaultAddress(address.id)}
                          className={`${styles.actionButton} ${styles.defaultButton}`}
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <p className={styles.emptyStateText}>You haven't saved any addresses yet.</p>
                <button
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  onClick={() => setShowAddressForm(true)}
                >
                  + Add New Address
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Orders Section */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Orders</h2>
            <Link
              href="/orders"
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              View All Orders
            </Link>
          </div>
          
          <div className={styles.cardContent}>
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>You haven't placed any orders yet.</p>
              <Link
                href="/shop"
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 