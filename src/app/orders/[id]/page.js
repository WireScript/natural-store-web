'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from '@/styles/profile.module.css';

export default function OrderDetailPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { id } = params;

  // Mock order data - would be fetched from an API in a real app
  useEffect(() => {
    if (isAuthenticated()) {
      // Simulate API call to fetch order details
      setTimeout(() => {
        if (id === 'ORD123456') {
          setOrder({
            id: 'ORD123456',
            date: new Date(2023, 5, 15),
            total: 2499,
            subtotal: 2350,
            shipping: 149,
            status: 'Delivered',
            trackingId: 'TRACK789012',
            deliveryDate: new Date(2023, 5, 18),
            items: [
              { id: 1, name: 'Organic Face Wash', price: 699, quantity: 1, image: '/products/face-wash.jpg' },
              { id: 2, name: 'Herbal Shampoo', price: 599, quantity: 3, image: '/products/shampoo.jpg' }
            ],
            shippingAddress: {
              fullName: 'John Doe',
              addressLine1: '123 Main St',
              city: 'Bangalore',
              state: 'Karnataka',
              pincode: '560001'
            },
            billingAddress: {
              fullName: 'John Doe',
              addressLine1: '123 Main St',
              city: 'Bangalore',
              state: 'Karnataka',
              pincode: '560001'
            },
            paymentMethod: 'UPI',
            paymentDetails: 'UPI ID: johndoe@okbank'
          });
        } else if (id === 'ORD789012') {
          setOrder({
            id: 'ORD789012',
            date: new Date(2023, 5, 10),
            total: 1499,
            subtotal: 1350,
            shipping: 149,
            status: 'Processing',
            items: [
              { id: 3, name: 'Natural Body Lotion', price: 499, quantity: 1, image: '/products/lotion.jpg' },
              { id: 4, name: 'Ayurvedic Hair Oil', price: 349, quantity: 2, image: '/products/hair-oil.jpg' },
              { id: 5, name: 'Herbal Face Pack', price: 299, quantity: 1, image: '/products/face-pack.jpg' }
            ],
            shippingAddress: {
              fullName: 'John Doe',
              addressLine1: '123 Main St',
              city: 'Bangalore',
              state: 'Karnataka',
              pincode: '560001'
            },
            billingAddress: {
              fullName: 'John Doe',
              addressLine1: '123 Main St',
              city: 'Bangalore',
              state: 'Karnataka',
              pincode: '560001'
            },
            paymentMethod: 'Card',
            paymentDetails: 'Card ending with 4242'
          });
        } else {
          // Order not found, redirect
          router.push('/orders');
        }
        setIsLoading(false);
      }, 1000);
    } else {
      // Redirect if not logged in
      router.push('/login');
    }
  }, [id, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.emptyState}>
                <p className={styles.emptyStateText}>Order not found</p>
                <Link href="/orders" className={`${styles.button} ${styles.buttonPrimary}`}>
                  Back to Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Order Details</h1>
        
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Order #{order.id}</h2>
              <p style={{ color: '#718096', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Placed on {order.date.toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className={styles.orderStatus}>{order.status}</div>
          </div>
          
          <div className={styles.cardContent}>
            {/* Order Status Timeline */}
            {order.status === 'Delivered' && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 className={styles.infoSectionTitle}>Order Timeline</h3>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  position: 'relative',
                  margin: '2rem 0',
                  paddingBottom: '1.5rem'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '9px', 
                    left: '0', 
                    right: '0', 
                    height: '2px', 
                    background: '#4CAF50', 
                    zIndex: 0 
                  }}></div>
                  
                  <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: '#4CAF50', 
                      margin: '0 auto 0.5rem' 
                    }}></div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '500', color: '#4a5568' }}>Order Placed</div>
                    <div style={{ fontSize: '0.75rem', color: '#718096' }}>
                      {order.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: '#4CAF50', 
                      margin: '0 auto 0.5rem' 
                    }}></div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '500', color: '#4a5568' }}>Processing</div>
                    <div style={{ fontSize: '0.75rem', color: '#718096' }}>
                      {new Date(order.date.getTime() + 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: '#4CAF50', 
                      margin: '0 auto 0.5rem' 
                    }}></div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '500', color: '#4a5568' }}>Shipped</div>
                    <div style={{ fontSize: '0.75rem', color: '#718096' }}>
                      {new Date(order.date.getTime() + 172800000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: '#4CAF50', 
                      margin: '0 auto 0.5rem' 
                    }}></div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '500', color: '#4a5568' }}>Delivered</div>
                    <div style={{ fontSize: '0.75rem', color: '#718096' }}>
                      {order.deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f0fff4', borderRadius: '0.5rem' }}>
                  <div>
                    <span style={{ fontWeight: '500', color: '#22543d' }}>Order delivered on </span>
                    <span style={{ fontWeight: '600', color: '#22543d' }}>
                      {order.deliveryDate.toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  {order.trackingId && (
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#2f855a' }}>Tracking ID: {order.trackingId}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Order Items */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 className={styles.infoSectionTitle}>Items Ordered</h3>
              <div style={{ marginTop: '1rem' }}>
                {order.items.map((item) => (
                  <div key={item.id} style={{ 
                    display: 'flex',
                    padding: '1rem 0',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <div style={{ width: '60px', height: '60px', backgroundColor: '#f7fafc', borderRadius: '0.25rem', marginRight: '1rem' }}>
                      {/* Placeholder for product image */}
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a0aec0' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5ZM6 6V18H18V6H6ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8ZM8 16C8 14.3431 9.34315 13 11 13H13C14.6569 13 16 14.3431 16 16H8Z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: '500', marginBottom: '0.25rem', color: '#2d3748' }}>{item.name}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                          Quantity: {item.quantity}
                        </div>
                        <div style={{ fontWeight: '500', color: '#2d3748' }}>
                          ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr', 
              gap: '2rem',
              marginBottom: '2rem',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '1.5rem'
            }}>
              {/* Order Summary */}
              <div>
                <h3 className={styles.infoSectionTitle}>Order Summary</h3>
                <div style={{ 
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f7fafc',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ color: '#4a5568' }}>Subtotal:</span>
                    <span style={{ fontWeight: '500' }}>₹{order.subtotal}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ color: '#4a5568' }}>Shipping:</span>
                    <span style={{ fontWeight: '500' }}>₹{order.shipping}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontWeight: '600',
                    borderTop: '1px solid #e2e8f0',
                    paddingTop: '0.5rem',
                    marginTop: '0.5rem'
                  }}>
                    <span>Total:</span>
                    <span>₹{order.total}</span>
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div>
                <h3 className={styles.infoSectionTitle}>Payment Information</h3>
                <div style={{ 
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f7fafc',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#4a5568'
                }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '500', color: '#2d3748' }}>Payment Method: </span>
                    {order.paymentMethod}
                  </div>
                  <div>
                    <span style={{ fontWeight: '500', color: '#2d3748' }}>Payment Details: </span>
                    {order.paymentDetails}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Shipping Address */}
              <div>
                <h3 className={styles.infoSectionTitle}>Shipping Address</h3>
                <div className={styles.addressDetails}>
                  <p>{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                </div>
              </div>
              
              {/* Billing Address */}
              <div>
                <h3 className={styles.infoSectionTitle}>Billing Address</h3>
                <div className={styles.addressDetails}>
                  <p>{order.billingAddress.fullName}</p>
                  <p>{order.billingAddress.addressLine1}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} - {order.billingAddress.pincode}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={styles.formActions}>
              <Link
                href="/orders"
                className={`${styles.button} ${styles.buttonSecondary}`}
              >
                Back to Orders
              </Link>
              
              {order.status !== 'Cancelled' && (
                <button
                  className={`${styles.button} ${styles.buttonDanger}`}
                  onClick={() => {
                    if (window.confirm('Are you sure you want to cancel this order?')) {
                      alert('Order cancellation is not implemented in this demo');
                    }
                  }}
                >
                  Cancel Order
                </button>
              )}
              
              <Link
                href="#"
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.print();
                }}
              >
                Print Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 