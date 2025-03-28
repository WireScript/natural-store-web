'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        // Ensure cartItems is always an array
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        setCartItems([]);
      }
    } else {
      // For demo purposes, initialize with sample items
      // In production, this would start with an empty array
      const sampleItems = [
        {
          id: 1,
          title: 'Organic Face Cream',
          price: 29.99,
          image: '/images/products/product-1.jpg',
          quantity: 2,
          discount: 10,
        },
        {
          id: 2,
          title: 'Herbal Tea Collection',
          price: 19.99,
          image: '/images/products/product-2.jpg',
          quantity: 1,
          discount: 0,
        },
        {
          id: 3,
          title: 'Natural Shampoo',
          price: 14.99,
          image: '/images/products/product-3.jpg',
          quantity: 1,
          discount: 15,
        }
      ];
      setCartItems(sampleItems);
    }
    
    setIsLoading(false);
  }, []);
  
  // Update localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);
  
  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Ensure prevItems is an array
      const items = Array.isArray(prevItems) ? prevItems : [];
      
      // Check if item is already in cart
      const existingItemIndex = items.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item
        return [...items, { ...product, quantity }];
      }
    });
  };
  
  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => {
      // Ensure prevItems is an array
      const items = Array.isArray(prevItems) ? prevItems : [];
      
      return items.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity } 
          : item
      );
    });
  };
  
  // Remove item from cart
  const removeItem = (itemId) => {
    setCartItems(prevItems => {
      // Ensure prevItems is an array
      const items = Array.isArray(prevItems) ? prevItems : [];
      return items.filter(item => item.id !== itemId);
    });
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Calculate total number of items - ensure cartItems is an array
  const totalItems = Array.isArray(cartItems) 
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;
  
  // Calculate cart subtotal - ensure cartItems is an array
  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => {
        const itemPrice = item.discount > 0 
          ? item.price * (1 - item.discount / 100) 
          : item.price;
        return total + (itemPrice * item.quantity);
      }, 0)
    : 0;
  
  const value = {
    cartItems,
    isLoading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    subtotal
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
} 