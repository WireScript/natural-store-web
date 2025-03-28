'use client'

import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className={`${styles.navigation} container mx-auto`}>
        <div className={styles.logo}>
          <div className={styles.logoCircle}></div>
          <span className={styles.logoText}>NATURE ESSENTIALS</span>
        </div>
        <ul className={styles.navLinks}>
          <li>SHOP</li>
          <li>COLLECTIONS</li>
          <li>ABOUT US</li>
          <li>SUSTAINABILITY</li>
        </ul>
        <button 
          className={styles.mobileMenuBtn} 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>
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
          <li>SHOP</li>
          <li>COLLECTIONS</li>
          <li>ABOUT US</li>
          <li>SUSTAINABILITY</li>
        </ul>
      </div>
    </>
  );
};

export default Header; 