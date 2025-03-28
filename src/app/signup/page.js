'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/auth.module.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullName: '',
    mobile: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup, authError, pendingVerification, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Redirect to OTP verification if signup was successful
  useEffect(() => {
    if (pendingVerification) {
      router.push('/verify-otp');
    }
  }, [pendingVerification, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    const { username, password, confirmPassword, email, fullName, mobile } = formData;

    // Validate username
    if (!username.trim()) {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    // Validate password
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate full name
    if (!fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    // Validate mobile
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobile) {
      errors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(mobile)) {
      errors.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);
    
    // If no errors, submit form
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      const userData = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        fullName: formData.fullName,
        mobile: formData.mobile
      };
      
      const success = await signup(userData);
      setIsSubmitting(false);
      
      if (success) {
        // Redirect will happen in useEffect when pendingVerification is set
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      
      <div className={`${styles.formContainer} ${styles.signupContainer}`}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Create Your Account</h1>
          <p className={styles.formSubtitle}>
            Join us and explore our natural products collection
          </p>
        </div>
        
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit}>
            {authError && (
              <div className={`${styles.alert} ${styles.alertError} ${styles.fadeIn}`}>
                <svg className={styles.alertIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{authError}</span>
              </div>
            )}
            
            <div className={styles.formGrid}>
              {/* Full Name Field */}
              <div className={styles.formGroup}>
                <label htmlFor="fullName" className={styles.formLabel}>
                  Full Name
                </label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`${styles.formInput} ${formErrors.fullName ? styles.error : ''}`}
                    placeholder="John Doe"
                  />
                </div>
                {formErrors.fullName && (
                  <p className={`${styles.errorText} ${styles.slideDown}`}>{formErrors.fullName}</p>
                )}
              </div>

              {/* Username Field */}
              <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.formLabel}>
                  Username
                </label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className={`${styles.formInput} ${formErrors.username ? styles.error : ''}`}
                    placeholder="johndoe123"
                  />
                </div>
                {formErrors.username && (
                  <p className={`${styles.errorText} ${styles.slideDown}`}>{formErrors.username}</p>
                )}
              </div>
              
              {/* Email Field */}
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email Address
                </label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`${styles.formInput} ${formErrors.email ? styles.error : ''}`}
                    placeholder="john@example.com"
                  />
                </div>
                {formErrors.email && (
                  <p className={`${styles.errorText} ${styles.slideDown}`}>{formErrors.email}</p>
                )}
              </div>
              
              {/* Mobile Field */}
              <div className={styles.formGroup}>
                <label htmlFor="mobile" className={styles.formLabel}>
                  Mobile Number
                </label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`${styles.formInput} ${formErrors.mobile ? styles.error : ''}`}
                    placeholder="9876543210"
                  />
                </div>
                {formErrors.mobile && (
                  <p className={`${styles.errorText} ${styles.slideDown}`}>{formErrors.mobile}</p>
                )}
              </div>
              
              {/* Password Field */}
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`${styles.formInput} ${formErrors.password ? styles.error : ''}`}
                    placeholder="••••••"
                  />
                </div>
                {formErrors.password && (
                  <p className={`${styles.errorText} ${styles.slideDown}`}>{formErrors.password}</p>
                )}
              </div>
              
              {/* Confirm Password Field */}
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.formLabel}>
                  Confirm Password
                </label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`${styles.formInput} ${formErrors.confirmPassword ? styles.error : ''}`}
                    placeholder="••••••"
                  />
                </div>
                {formErrors.confirmPassword && (
                  <p className={`${styles.errorText} ${styles.slideDown}`}>{formErrors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className={styles.checkbox} style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className={styles.checkboxInput}
                required
              />
              <div className={styles.checkboxLabel}>
                <label htmlFor="terms">
                  I agree to the{' '}
                  <a href="#" className={styles.formFooterLink}>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className={styles.formFooterLink}>
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.button} ${styles.buttonPrimary} ${isSubmitting ? styles.buttonDisabled : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className={styles.spinnerIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>
        
        <div className={styles.formFooter}>
          <p className={styles.formFooterText}>
            Already have an account?{' '}
            <Link href="/login" className={styles.formFooterLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      <div className={styles.backLink}>
        <Link href="/" className={styles.backLinkButton}>
          <svg className={styles.backLinkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  );
} 