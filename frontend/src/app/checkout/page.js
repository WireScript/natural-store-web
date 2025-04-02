'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';
import CustomerInformation from '@/components/Checkout/CustomerInformation';
import ShippingMethod from '@/components/Checkout/ShippingMethod';
import PaymentMethod from '@/components/Checkout/PaymentMethod';
import OrderConfirmation from '@/components/Checkout/OrderConfirmation';
import OrderSummary from '@/components/Checkout/OrderSummary';
import './checkout.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, isLoading, subtotal } = useCart();
  const { 
    STEPS, 
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    calculateTotals
  } = useCheckout();
  
  const [pageLoading, setPageLoading] = useState(true);
  
  useEffect(() => {
    // If cart is empty, redirect to the cart page
    if (!isLoading && cartItems.length === 0) {
      router.push('/cart');
    } else {
      setPageLoading(false);
    }
  }, [isLoading, cartItems, router]);
  
  // Current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.INFORMATION:
        return <CustomerInformation onNext={nextStep} />;
      case STEPS.SHIPPING:
        return <ShippingMethod onNext={nextStep} onBack={prevStep} />;
      case STEPS.PAYMENT:
        return <PaymentMethod onNext={nextStep} onBack={prevStep} />;
      case STEPS.CONFIRMATION:
        return <OrderConfirmation />;
      default:
        return <CustomerInformation onNext={nextStep} />;
    }
  };
  
  // Order progress indicators
  const steps = [
    { key: STEPS.INFORMATION, label: 'Information' },
    { key: STEPS.SHIPPING, label: 'Shipping' },
    { key: STEPS.PAYMENT, label: 'Payment' },
    { key: STEPS.CONFIRMATION, label: 'Confirmation' }
  ];
  
  if (isLoading || pageLoading) {
    return (
      <div className="checkout-container loading">
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <Link href="/" className="checkout-brand">
          NATURE ESSENTIALS
        </Link>
      </div>
      
      {currentStep !== STEPS.CONFIRMATION && (
        <div className="checkout-progress">
          {steps.map((step, index) => (
            <div 
              key={step.key} 
              className={`checkout-step ${currentStep === step.key ? 'active' : ''} ${
                Object.values(STEPS).indexOf(currentStep) >= Object.values(STEPS).indexOf(step.key) ? 'completed' : ''
              }`}
            >
              <div 
                className="step-indicator"
                onClick={() => {
                  // Only allow going back to previous steps, not skipping ahead
                  if (Object.values(STEPS).indexOf(currentStep) > Object.values(STEPS).indexOf(step.key)) {
                    goToStep(step.key);
                  }
                }}
              >
                {Object.values(STEPS).indexOf(currentStep) > Object.values(STEPS).indexOf(step.key) ? (
                  <span className="step-check">✓</span>
                ) : (
                  <span className="step-number">{index + 1}</span>
                )}
              </div>
              <span className="step-label">{step.label}</span>
              {index < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>
      )}
      
      <div className="checkout-content">
        <div className="checkout-main">
          {renderCurrentStep()}
        </div>
        
        {currentStep !== STEPS.CONFIRMATION && (
          <div className="checkout-sidebar">
            <OrderSummary />
          </div>
        )}
      </div>
      
      <div className="checkout-footer">
        <p>© {new Date().getFullYear()} Nature Essentials. All rights reserved.</p>
        <div className="secure-checkout">
          <svg className="secure-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zm-1 14h2v2h-2v-2zm0-8h2v6h-2V8z" 
               fill="currentColor" />
          </svg>
          <span>Secure Checkout</span>
        </div>
      </div>
    </div>
  );
} 