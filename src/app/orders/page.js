'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from '@/styles/profile.module.css';

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Mock order data - would be fetched from an API in a real app
  const [orders, setOrders] = useState([
    {
      id: 'ORD123456',
      date: new Date(2023, 5, 15),
      total: 2499,
      status: 'Delivered',
      items: [
        { id: 1, name: 'Organic Face Wash', price: 699, quantity: 1 },
        { id: 2, name: 'Herbal Shampoo', price: 599, quantity: 3 }
      ],
      shippingAddress: {
        fullName: 'John Doe',
        addressLine1: '123 Main St',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001'
      },
      paymentMethod: 'UPI'
    },
    {
      id: 'ORD789012',
      date: new Date(2023, 5, 10),
      total: 1499,
      status: 'Processing',
      items: [
        { id: 3, name: 'Natural Body Lotion', price: 499, quantity: 1 },
        { id: 4, name: 'Ayurvedic Hair Oil', price: 349, quantity: 2 },
        { id: 5, name: 'Herbal Face Pack', price: 299, quantity: 1 }
      ],
      shippingAddress: {
        fullName: 'John Doe',
        addressLine1: '123 Main St',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001'
      },
      paymentMethod: 'Card'
    }
  ]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated() && !isLoading) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router, isLoading]);

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
        <h1 className={styles.pageTitle}>My Orders</h1>
        
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Order History</h2>
            <Link href="/profile" className={`${styles.button} ${styles.buttonSecondary}`}>
              Back to Profile
            </Link>
          </div>
          
          <div className={styles.cardContent}>
            {orders.length > 0 ? (
              <div className={styles.orderList}>
                {orders.map((order) => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div className={styles.orderNumber}>Order #{order.id}</div>
                      <div className={styles.orderStatus}>{order.status}</div>
                    </div>
                    
                    <div className={styles.orderContent}>
                      <div className={styles.orderDetails}>
                        <div className={styles.orderDetailGroup}>
                          <div className={styles.orderDetailLabel}>Order Date</div>
                          <div className={styles.orderDetailValue}>
                            {order.date.toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        
                        <div className={styles.orderDetailGroup}>
                          <div className={styles.orderDetailLabel}>Total Amount</div>
                          <div className={styles.orderDetailValue}>₹{order.total}</div>
                        </div>
                        
                        <div className={styles.orderDetailGroup}>
                          <div className={styles.orderDetailLabel}>Payment Method</div>
                          <div className={styles.orderDetailValue}>{order.paymentMethod}</div>
                        </div>
                      </div>
                      
                      <div className={styles.infoSectionTitle}>Items</div>
                      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ textAlign: 'left', padding: '0.5rem 0', fontSize: '0.875rem', color: '#718096' }}>Product</th>
                            <th style={{ textAlign: 'center', padding: '0.5rem 0', fontSize: '0.875rem', color: '#718096' }}>Quantity</th>
                            <th style={{ textAlign: 'right', padding: '0.5rem 0', fontSize: '0.875rem', color: '#718096' }}>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #f7fafc' }}>
                              <td style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: '#4a5568' }}>{item.name}</td>
                              <td style={{ textAlign: 'center', padding: '0.75rem 0', fontSize: '0.875rem', color: '#4a5568' }}>{item.quantity}</td>
                              <td style={{ textAlign: 'right', padding: '0.75rem 0', fontSize: '0.875rem', color: '#4a5568' }}>₹{item.price}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={2} style={{ textAlign: 'right', padding: '1rem 0', fontWeight: '500', color: '#2d3748' }}>Total:</td>
                            <td style={{ textAlign: 'right', padding: '1rem 0', fontWeight: '700', color: '#2d3748' }}>₹{order.total}</td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <div className={styles.infoSectionTitle}>Shipping Address</div>
                      <div className={styles.addressDetails}>
                        <p>{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.addressLine1}</p>
                        <p>
                          {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                        </p>
                      </div>
                      
                      <div className={styles.formActions} style={{ marginTop: '1.5rem' }}>
                        <Link 
                          href={`/orders/${order.id}`} 
                          className={`${styles.button} ${styles.buttonPrimary}`}
                        >
                          View Order Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                <p className={styles.emptyStateText}>You haven't placed any orders yet.</p>
                <Link
                  href="/shop"
                  className={`${styles.button} ${styles.buttonPrimary}`}
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 