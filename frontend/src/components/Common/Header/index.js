'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import styles from "./Header.module.css";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  // Add effect to prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      // When menu opens, prevent scrolling on the body
      document.body.style.overflow = 'hidden';
    } else {
      // When menu closes, allow scrolling again
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to ensure scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileElement = document.getElementById('profile-dropdown');
      if (profileElement && !profileElement.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navigation} container mx-auto`}>
        <div className={styles.logo}>
          <div className={styles.logoCircle}></div>
          <span className={styles.logoText}>NATURE ESSENTIALS</span>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/shop">SHOP</Link>
          </li>
          <li>COLLECTIONS</li>
          <li>ABOUT US</li>
          <li>SUSTAINABILITY</li>
        </ul>
        <div className={styles.headerActions}>
          <Link href="/cart" className={styles.cartLink}>
            <div className={styles.cartIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.cartSvg}>
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {totalItems > 0 && (
                <span className={styles.cartCount}>{totalItems}</span>
              )}
            </div>
          </Link>
          
          {isAuthenticated() ? (
            <div id="profile-dropdown" className={styles.profileDropdown}>
              <button 
                onClick={toggleProfileDropdown} 
                className={styles.profileBtn}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.profileSvg}>
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {profileDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.userName}>{user.fullName || user.full_name || 'User'}</div>
                  <div className={styles.userEmail}>{user.email}</div>
                  <div className={styles.dropdownDivider}></div>
                  <Link href="/profile" className={styles.dropdownItem}>My Profile</Link>
                  <Link href="/orders" className={styles.dropdownItem}>My Orders</Link>
                  <button onClick={handleLogout} className={styles.dropdownItem}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link href="/login" className={styles.loginLink}>
                LOGIN
              </Link>
              <span className={styles.authDivider}>|</span>
              <Link href="/signup" className={styles.signupLink}>
                SIGNUP
              </Link>
            </div>
          )}
          
          <button 
            className={styles.mobileMenuBtn} 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <button 
          className={styles.closeBtn} 
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          ×
        </button>
        <ul className={styles.mobileNavLinks}>
          <li>
            <Link href="/shop">SHOP</Link>
          </li>
          <li>COLLECTIONS</li>
          <li>ABOUT US</li>
          <li>SUSTAINABILITY</li>
          <li>
            <Link href="/cart" className={styles.mobileCartLink}>
              CART {totalItems > 0 && <span className={styles.mobileCartCount}>{totalItems}</span>}
            </Link>
          </li>
          {isAuthenticated() ? (
            <>
              <li className={styles.userInfoMobile}>
                <span>Hi, {(user.fullName || user.full_name || 'User').split(' ')[0]}</span>
              </li>
              <li>
                <Link href="/profile">MY PROFILE</Link>
              </li>
              <li>
                <Link href="/orders">MY ORDERS</Link>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.logoutBtnMobile}>
                  LOGOUT
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">LOGIN</Link>
              </li>
              <li>
                <Link href="/signup">SIGNUP</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Header; 