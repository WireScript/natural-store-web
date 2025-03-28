'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/auth.module.css';

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown
  const [error, setError] = useState('');
  const { verifyOTP, mobile, authError, resendOTP, isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Format mobile number for display - show last 4 digits only
  const formatMobile = (number) => {
    if (!number) return '';
    return `XXXXXX${number.toString().slice(-4)}`;
  };
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/');
    }
  }, [isAuthenticated, router]);
  
  // Redirect if no mobile to verify
  useEffect(() => {
    if (!mobile) {
      router.push('/signup');
    }
  }, [mobile, router]);
  
  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  const handleChange = (index, e) => {
    const value = e.target.value;
    
    // Only accept numbers
    if (!/^[0-9]*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Move to next input on entry
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted data is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      
      // Focus on the last input
      const lastInput = document.getElementById('otp-5');
      if (lastInput) lastInput.focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    // On backspace, clear current field and move focus to previous field
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        
        // Update OTP state to clear the previous input
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    
    // Validate OTP
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits of the OTP');
      return;
    }
    
    setIsVerifying(true);
    setError('');
    
    try {
      const success = await verifyOTP(otpValue);
      
      if (success) {
        // Redirection will happen from the auth context when isAuthenticated is set to true
      }
    } catch (err) {
      setError(err.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleResendOTP = async () => {
    if (timeLeft > 0) return;
    
    try {
      await resendOTP();
      setTimeLeft(120); // Reset the timer to 2 minutes
      setError('');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };
  
  return (
    <div className={styles.authContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoCircle}></div>
          <span className={styles.logoText}>NATURE ESSENTIALS</span>
        </div>
        <p className={styles.logoTagline}>The best natural products for your lifestyle</p>
      </div>
      
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Verify Your Mobile</h1>
          <p className={styles.formSubtitle}>
            We've sent a code to {formatMobile(mobile)}
          </p>
        </div>
        
        <div className={styles.formContent}>
          <form onSubmit={handleFormSubmit}>
            {(error || authError) && (
              <div className={`${styles.alert} ${styles.alertError} ${styles.fadeIn}`}>
                <svg className={styles.alertIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{error || authError}</span>
              </div>
            )}
            
            <div className={styles.otpGroup}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  className={styles.otpInput}
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  autoComplete="off"
                  inputMode="numeric"
                  aria-label={`digit ${index + 1} of OTP`}
                />
              ))}
            </div>
            
            <div className={styles.otpTimer}>
              <span>
                {timeLeft > 0 ? (
                  <>Code expires in <span className={styles.countdown}>{formatTime(timeLeft)}</span></>
                ) : (
                  <>Didn't receive the code?</>
                )}
              </span>
              <button
                type="button"
                onClick={handleResendOTP}
                className={`${styles.resendButton} ${timeLeft > 0 ? styles.disabled : ''}`}
                disabled={timeLeft > 0}
              >
                Resend Code
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isVerifying}
              className={`${styles.button} ${styles.buttonPrimary} ${isVerifying ? styles.buttonDisabled : ''}`}
            >
              {isVerifying ? (
                <>
                  <svg className={styles.spinnerIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify and Continue'
              )}
            </button>
          </form>
        </div>
        
        <div className={styles.formFooter}>
          <p className={styles.formFooterText}>
            <Link href="/signup" className={styles.formFooterLink}>
              Go back to sign up
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