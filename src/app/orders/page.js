'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated() && !isLoading) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router, isLoading]);

  // For demo purposes, we'll create some dummy orders
  const dummyOrders = [
    {
      id: 'ORD123456',
      date: new Date(2023, 6, 15),
      status: 'Delivered',
      total: 1895,
      items: 3
    },
    {
      id: 'ORD123457',
      date: new Date(2023, 7, 2),
      status: 'Processing',
      total: 2499,
      items: 2
    },
    {
      id: 'ORD123458',
      date: new Date(2023, 7, 10),
      status: 'Shipped',
      total: 999,
      items: 1
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">View and track your orders</p>
            </div>
            
            {dummyOrders.length > 0 ? (
              <div className="space-y-6">
                {dummyOrders.map(order => (
                  <div 
                    key={order.id} 
                    className="border border-gray-200 rounded-lg p-6 transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{order.id}</h3>
                        <p className="text-sm text-gray-500">
                          Placed on {order.date.toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        <p className="text-sm text-gray-600">
                          {order.items} {order.items === 1 ? 'item' : 'items'}
                        </p>
                        <p className="font-medium">₹{order.total}</p>
                      </div>
                      <div className="mt-3 sm:mt-0 w-full sm:w-auto">
                        <Link
                          href={`/orders/${order.id}`}
                          className="block w-full sm:w-auto text-center px-4 py-2 border border-green-600 rounded-md text-green-600 hover:bg-green-50 transition-colors"
                        >
                          View Order
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't placed any orders yet.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={() => router.push('/shop')}
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 