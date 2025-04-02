'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/auth.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, authError, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
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
      const success = await login(username, password);
      setIsSubmitting(false);
      
      if (success) {
        router.push('/');
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Welcome Back</h1>
          <p className={styles.formSubtitle}>
            Please enter your credentials to continue
          </p>
        </div>
        
        <div className={styles.formContent}>
          <form className={`${styles.form}`} onSubmit={handleSubmit}>
            {authError && (
              <div className={`${styles.alert} ${styles.alertError} ${styles.fadeIn}`}>
                <svg className={styles.alertIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{authError}</span>
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.formLabel}>
                Username
              </label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`${styles.formInput} ${formErrors.username ? styles.error : ''}`}
                  placeholder="Enter your username"
                />
              </div>
              {formErrors.username && (
                <p className={`${styles.errorText} ${styles.slideDown}`}>{formErrors.username}</p>
              )}
            </div>
            
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles.formInput} ${formErrors.password ? styles.error : ''}`}
                  placeholder="Enter your password"
                />
              </div>
              {formErrors.password && (
                <p className={`${styles.errorText} ${styles.slideDown}`}>{formErrors.password}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className={styles.checkbox}>
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={styles.checkboxInput}
                />
                <label htmlFor="remember-me" className={styles.checkboxLabel}>
                  Remember me
                </label>
              </div>
              
              <div>
                <a href="#" className={styles.formFooterLink}>
                  Forgot password?
                </a>
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
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
        
        <div className={styles.formFooter}>
          <p className={styles.formFooterText}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className={styles.formFooterLink}>
              Create an account
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