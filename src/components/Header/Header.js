'use client'

import Link from 'next/link';
import { useState } from 'react';
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.Header}>
      <div className={styles.HeaderContainer}>
        <div className={styles.HeaderContent}>
          {/* Logo */}
          <Link href="/" className={styles.HeaderLogo}>
            NaturalStore
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.HeaderNav}>
            <Link href="/products" className={styles.HeaderNavLink}>
              Products
            </Link>
            <Link href="/about" className={styles.HeaderNavLink}>
              About
            </Link>
            <Link href="/blog" className={styles.HeaderNavLink}>
              Blog
            </Link>
            <Link href="/contact" className={styles.HeaderNavLink}>
              Contact
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className={styles.HeaderActions}>
            <button className={styles.HeaderCartButton}>
              <svg
                className={styles.HeaderCartIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className={styles.HeaderCartBadge}>0</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className={styles.HeaderMenuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className={styles.HeaderMenuIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={styles.HeaderMobileNav}>
            <div className={styles.HeaderMobileNavList}>
              <Link href="/products" className={styles.HeaderNavLink}>
                Products
              </Link>
              <Link href="/about" className={styles.HeaderNavLink}>
                About
              </Link>
              <Link href="/blog" className={styles.HeaderNavLink}>
                Blog
              </Link>
              <Link href="/contact" className={styles.HeaderNavLink}>
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 