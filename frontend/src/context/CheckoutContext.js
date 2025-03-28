'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

const CheckoutContext = createContext();

export function useCheckout() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }) {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  // Checkout steps
  const STEPS = {
    INFORMATION: 'information',
    SHIPPING: 'shipping',
    PAYMENT: 'payment',
    CONFIRMATION: 'confirmation'
  };
  
  const [currentStep, setCurrentStep] = useState(STEPS.INFORMATION);
  const [checkoutData, setCheckoutData] = useState({
    customer: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    shippingAddress: {
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    billingAddress: {
      sameAsShipping: true,
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    shipping: {
      method: 'standard',
      cost: 0
    },
    payment: {
      method: 'credit-card',
      cardNumber: '',
      nameOnCard: '',
      expiryDate: '',
      cvv: ''
    },
    orderNotes: '',
    couponCode: '',
    discountApplied: false,
    discountAmount: 0,
    selectedAddressId: null // To track selected address from saved addresses
  });
  
  // Load checkout data from localStorage on component mount
  useEffect(() => {
    const storedCheckout = localStorage.getItem('checkout');
    
    if (storedCheckout) {
      try {
        setCheckoutData(JSON.parse(storedCheckout));
      } catch (error) {
        console.error('Failed to parse checkout data from localStorage:', error);
      }
    }
  }, []);

  // Pre-fill customer details if user is logged in
  useEffect(() => {
    if (isAuthenticated() && user) {
      // Update customer info
      updateCheckoutData('customer', {
        firstName: user.fullName.split(' ')[0] || '',
        lastName: user.fullName.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.mobile || ''
      });
      
      // If user has a default address, use it
      if (user.addresses && user.addresses.length > 0) {
        const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
        
        // Mark this address as selected
        updateCheckoutData('selectedAddressId', defaultAddress.id);
        
        // Set address details
        let addressParts = defaultAddress.addressLine1.split(',');
        
        updateCheckoutData('shippingAddress', {
          address: defaultAddress.addressLine1,
          apartment: defaultAddress.addressLine2 || '',
          city: defaultAddress.city,
          state: defaultAddress.state,
          zipCode: defaultAddress.pincode,
          country: 'India'
        });
      }
    }
  }, [isAuthenticated, user]);
  
  // Update localStorage whenever checkout data changes
  useEffect(() => {
    localStorage.setItem('checkout', JSON.stringify(checkoutData));
  }, [checkoutData]);
  
  // Update checkout data
  const updateCheckoutData = (section, data) => {
    setCheckoutData(prevData => {
      if (typeof section === 'string') {
        return {
          ...prevData,
          [section]: typeof data === 'object' && data !== null
            ? { ...prevData[section], ...data }
            : data
        };
      }
      return prevData;
    });
  };
  
  // Set address from saved addresses
  const setAddressFromSaved = (addressId) => {
    if (!user || !user.addresses) return;
    
    const selectedAddress = user.addresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      // Mark this address as selected
      updateCheckoutData('selectedAddressId', selectedAddress.id);
      
      // Update shipping address
      updateCheckoutData('shippingAddress', {
        address: selectedAddress.addressLine1,
        apartment: selectedAddress.addressLine2 || '',
        city: selectedAddress.city,
        state: selectedAddress.state,
        zipCode: selectedAddress.pincode,
        country: 'India'
      });
    }
  };
  
  // Go to next step
  const nextStep = () => {
    if (currentStep === STEPS.INFORMATION) {
      setCurrentStep(STEPS.SHIPPING);
    } else if (currentStep === STEPS.SHIPPING) {
      setCurrentStep(STEPS.PAYMENT);
    } else if (currentStep === STEPS.PAYMENT) {
      setCurrentStep(STEPS.CONFIRMATION);
    }
  };
  
  // Go to previous step
  const prevStep = () => {
    if (currentStep === STEPS.SHIPPING) {
      setCurrentStep(STEPS.INFORMATION);
    } else if (currentStep === STEPS.PAYMENT) {
      setCurrentStep(STEPS.SHIPPING);
    } else if (currentStep === STEPS.CONFIRMATION) {
      setCurrentStep(STEPS.PAYMENT);
    }
  };
  
  // Go to specific step
  const goToStep = (step) => {
    if (Object.values(STEPS).includes(step)) {
      setCurrentStep(step);
    }
  };
  
  // Apply coupon
  const applyCoupon = (code) => {
    if (code.toLowerCase() === 'natural20') {
      updateCheckoutData('discountApplied', true);
      updateCheckoutData('discountAmount', subtotal * 0.2); // 20% discount
      updateCheckoutData('couponCode', code);
      return true;
    }
    return false;
  };
  
  // Calculate totals
  const calculateTotals = () => {
    // Calculate subtotal
    const subtotal = cartItems.reduce((total, item) => {
      const itemPrice = item.price * (1 - (item.discount || 0) / 100);
      return total + (itemPrice * item.quantity);
    }, 0);
    
    // Calculate shipping (free for orders over ₹3000)
    const shipping = subtotal >= 3000 ? 0 : 149;
    
    // Apply any discounts from coupon codes
    const discount = checkoutData.coupon?.discount 
      ? (subtotal * checkoutData.coupon.discount / 100) 
      : 0;
    
    // Calculate total
    const total = subtotal + shipping - discount;
    
    return { subtotal, shipping, discount, total };
  };
  
  // Place order
  const placeOrder = () => {
    // In a real app, this would make an API call to process the order
    const orderDetails = {
      items: cartItems,
      customer: checkoutData.customer,
      shipping: {
        address: checkoutData.shippingAddress,
        method: checkoutData.shipping.method
      },
      billing: {
        address: checkoutData.billingAddress.sameAsShipping 
          ? checkoutData.shippingAddress 
          : checkoutData.billingAddress
      },
      payment: {
        method: checkoutData.payment.method
      },
      totals: calculateTotals(),
      orderNotes: checkoutData.orderNotes,
      couponCode: checkoutData.couponCode,
      orderDate: new Date().toISOString()
    };
    
    // Save order to localStorage for demo purposes
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...orderDetails
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart after successful order
    clearCart();
    
    return newOrder;
  };
  
  const value = {
    STEPS,
    currentStep,
    checkoutData,
    updateCheckoutData,
    nextStep,
    prevStep,
    goToStep,
    applyCoupon,
    calculateTotals,
    placeOrder,
    setAddressFromSaved
  };
  
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
} 