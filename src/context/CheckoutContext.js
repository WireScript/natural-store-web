'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const CheckoutContext = createContext();

export function useCheckout() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }) {
  const { cartItems, subtotal, clearCart } = useCart();
  
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
    discountAmount: 0
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
  
  // Update localStorage whenever checkout data changes
  useEffect(() => {
    localStorage.setItem('checkout', JSON.stringify(checkoutData));
  }, [checkoutData]);
  
  // Update checkout data
  const updateCheckoutData = (section, data) => {
    setCheckoutData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        ...data
      }
    }));
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
    const shippingCost = checkoutData.shipping.method === 'express' ? 15.99 : (subtotal > 50 ? 0 : 5.99);
    const discountAmount = checkoutData.discountApplied ? subtotal * 0.2 : 0;
    const total = subtotal + shippingCost - discountAmount;
    
    return {
      subtotal,
      shipping: shippingCost,
      discount: discountAmount,
      total
    };
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
    placeOrder
  };
  
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
} 