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
    
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await fetch('http://localhost:7070/api/v1/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setAuthError(data.detail || 'Login failed');
        return false;
      }
      
      // Fetch user details with the token
      const userResponse = await fetch('http://localhost:7070/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      });
      
      if (!userResponse.ok) {
        setAuthError('Failed to get user information');
        return false;
      }
      
      const userInfo = await userResponse.json();
      
      // Store user info and token
      const userData = {
        ...userInfo,
        fullName: userInfo.full_name,
        phoneNumber: userInfo.phone_number,
        token: data.access_token,
        verified: true,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
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
      const response = await fetch('http://localhost:7070/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          full_name: userData.fullName,
          username: userData.username,
          phone_number: userData.mobile,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setAuthError(data.detail || 'Signup failed');
        return false;
      }
      
      // Store user data for OTP verification
      const pendingUser = {
        ...userData,
        id: data._id,
        verified: false,
      };
      
      setPendingVerification(pendingUser);
      localStorage.setItem('pendingVerification', JSON.stringify(pendingUser));
      
      // Send OTP
      const otpResponse = await fetch('http://localhost:7070/api/v1/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: userData.mobile,
        }),
      });
      
      if (!otpResponse.ok) {
        const otpData = await otpResponse.json();
        setAuthError(otpData.detail || 'Failed to send OTP');
        return false;
      }
      
      // Redirect to verify-otp page
      router.push('/verify-otp');
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
      const response = await fetch('http://localhost:7070/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: pendingVerification.mobile,
          otp: enteredOTP,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setAuthError(data.detail || 'OTP verification failed');
        return false;
      }
      
      // Login the user after successful verification
      const loginSuccess = await login(
        pendingVerification.username,
        pendingVerification.password
      );
      
      if (loginSuccess) {
        setPendingVerification(null);
        localStorage.removeItem('pendingVerification');
        
        // Redirect to shop page
        router.push('/shop');
        return true;
      }
      
      return false;
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
      const response = await fetch('http://localhost:7070/api/v1/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: pendingVerification.mobile,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setAuthError(data.detail || 'Failed to resend OTP');
        return false;
      }
      
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

  // Add a new address
  const addAddress = (address) => {
    if (!user) return false;

    try {
      // Use an incrementing counter for IDs, stored in localStorage
      let nextId = parseInt(localStorage.getItem('nextAddressId') || '1');
      const addressId = `addr_${nextId}`;
      localStorage.setItem('nextAddressId', (nextId + 1).toString());
      
      const newAddress = { id: addressId, ...address };
      
      // Add default flag if this is the first address
      if (!user.addresses || user.addresses.length === 0) {
        newAddress.isDefault = true;
      }
      
      // Create a new addresses array (or use the existing one)
      const addresses = user.addresses ? [...user.addresses, newAddress] : [newAddress];
      
      // Update user in state
      const updatedUser = { ...user, addresses };
      setUser(updatedUser);
      
      // Update user in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Also update in users array in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          const updatedUserInArray = { ...u, addresses };
          return updatedUserInArray;
        }
        return u;
      });
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      return true;
    } catch (error) {
      console.error('Failed to add address:', error);
      return false;
    }
  };

  // Edit an existing address
  const editAddress = (addressId, updatedAddress) => {
    if (!user || !user.addresses) return false;

    try {
      // Find and update the address
      const addresses = user.addresses.map(addr => {
        if (addr.id === addressId) {
          return { ...addr, ...updatedAddress };
        }
        return addr;
      });
      
      // Update user in state
      const updatedUser = { ...user, addresses };
      setUser(updatedUser);
      
      // Update user in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Also update in users array in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          const updatedUserInArray = { ...u, addresses };
          return updatedUserInArray;
        }
        return u;
      });
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      return true;
    } catch (error) {
      console.error('Failed to edit address:', error);
      return false;
    }
  };

  // Delete an address
  const deleteAddress = (addressId) => {
    if (!user || !user.addresses) return false;

    try {
      // Filter out the address to delete
      let addresses = user.addresses.filter(addr => addr.id !== addressId);
      
      // If the deleted address was the default and we have other addresses, set a new default
      if (user.addresses.find(addr => addr.id === addressId)?.isDefault && addresses.length > 0) {
        addresses = addresses.map((addr, index) => {
          if (index === 0) {
            return { ...addr, isDefault: true };
          }
          return addr;
        });
      }
      
      // Update user in state
      const updatedUser = { ...user, addresses };
      setUser(updatedUser);
      
      // Update user in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Also update in users array in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          const updatedUserInArray = { ...u, addresses };
          return updatedUserInArray;
        }
        return u;
      });
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      return true;
    } catch (error) {
      console.error('Failed to delete address:', error);
      return false;
    }
  };

  // Set an address as default
  const setDefaultAddress = (addressId) => {
    if (!user || !user.addresses) return false;

    try {
      // Update isDefault flag for all addresses
      const addresses = user.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }));
      
      // Update user in state
      const updatedUser = { ...user, addresses };
      setUser(updatedUser);
      
      // Update user in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Also update in users array in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          const updatedUserInArray = { ...u, addresses };
          return updatedUserInArray;
        }
        return u;
      });
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      return true;
    } catch (error) {
      console.error('Failed to set default address:', error);
      return false;
    }
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
    mobile: pendingVerification?.mobile || '',
    addAddress,
    editAddress,
    deleteAddress,
    setDefaultAddress
  };

  // Return the provider with the value
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 