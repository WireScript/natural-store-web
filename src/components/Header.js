'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#4CAF50]">
            NaturalStore
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-[#4CAF50] transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#4CAF50] transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#4CAF50] transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#4CAF50] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-[#4CAF50] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#4CAF50] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-[#4CAF50] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/products" className="text-gray-700 hover:text-[#4CAF50] transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-[#4CAF50] transition-colors">
                About
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-[#4CAF50] transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#4CAF50] transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 