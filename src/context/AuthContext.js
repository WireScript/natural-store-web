'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [pendingVerification, setPendingVerification] = useState(null);
  const router = useRouter();

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.verified) {
          setUser(parsedUser);
        } else {
          setPendingVerification(parsedUser);
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    setAuthError(null);
    
    // Simulate API call - in a real app, this would be a fetch to your backend
    try {
      // For demo purposes, check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => 
        u.username === username && u.password === password && u.verified
      );
      
      if (foundUser) {
        const userInfo = { ...foundUser };
        delete userInfo.password; // Don't store password in state
        
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        return true;
      } else {
        setAuthError('Invalid username or password');
        return false;
      }
    } catch (error) {
      setAuthError('An error occurred during login');
      console.error(error);
      return false;
    }
  };

  // Signup function
  const signup = async (userData) => {
    setAuthError(null);
    
    try {
      // Simulate API call - in a real app, this would be a fetch to your backend
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if username already exists
      if (users.some(u => u.username === userData.username)) {
        setAuthError('Username already exists');
        return false;
      }
      
      // Check if email already exists
      if (users.some(u => u.email === userData.email)) {
        setAuthError('Email already exists');
        return false;
      }
      
      // Generate OTP (6 digits)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP valid for 10 minutes
      
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        verified: false,
        otp,
        otpExpiry: otpExpiry.toISOString()
      };
      
      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Set pending verification
      setPendingVerification(newUser);
      localStorage.setItem('pendingVerification', JSON.stringify(newUser));
      
      // In a real app, this would send an OTP to the user's mobile
      console.log(`OTP for ${userData.username}: ${otp}`); // For demo purposes
      
      return true;
    } catch (error) {
      setAuthError('An error occurred during signup');
      console.error(error);
      return false;
    }
  };

  // Verify OTP function
  const verifyOTP = async (enteredOTP) => {
    setAuthError(null);
    
    if (!pendingVerification) {
      setAuthError('No pending verification');
      return false;
    }
    
    try {
      // Check if OTP is expired
      const otpExpiry = new Date(pendingVerification.otpExpiry);
      if (new Date() > otpExpiry) {
        setAuthError('OTP has expired');
        return false;
      }
      
      // Check if OTP matches
      if (enteredOTP === pendingVerification.otp) {
        // Update user in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(u => {
          if (u.id === pendingVerification.id) {
            return { ...u, verified: true };
          }
          return u;
        });
        
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Remove sensitive info
        const userInfo = { ...pendingVerification, verified: true };
        delete userInfo.password;
        delete userInfo.otp;
        delete userInfo.otpExpiry;
        
        // Update state
        setUser(userInfo);
        setPendingVerification(null);
        
        // Update local storage
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.removeItem('pendingVerification');
        
        return true;
      } else {
        setAuthError('Invalid OTP');
        return false;
      }
    } catch (error) {
      setAuthError('An error occurred during verification');
      console.error(error);
      return false;
    }
  };

  // Resend OTP function
  const resendOTP = async () => {
    setAuthError(null);
    
    if (!pendingVerification) {
      setAuthError('No pending verification');
      return false;
    }
    
    try {
      // Generate new OTP
      const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP valid for 10 minutes
      
      // Update user in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => {
        if (u.id === pendingVerification.id) {
          return { ...u, otp: newOTP, otpExpiry: otpExpiry.toISOString() };
        }
        return u;
      });
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Update pendingVerification
      const updatedVerification = { ...pendingVerification, otp: newOTP, otpExpiry: otpExpiry.toISOString() };
      setPendingVerification(updatedVerification);
      localStorage.setItem('pendingVerification', JSON.stringify(updatedVerification));
      
      // In a real app, this would send the new OTP to the user's mobile
      console.log(`New OTP for ${pendingVerification.username}: ${newOTP}`); // For demo purposes
      
      return true;
    } catch (error) {
      setAuthError('An error occurred while resending OTP');
      console.error(error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // Auth context value
  const value = {
    user,
    loading,
    authError,
    pendingVerification,
    login,
    signup,
    verifyOTP,
    resendOTP,
    logout,
    isAuthenticated,
    mobile: pendingVerification?.mobile || ''
  };

  // Return the provider with the value
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 