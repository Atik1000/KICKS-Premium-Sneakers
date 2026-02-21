'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { RootState } from '@/store';

/**
 * Navigation link configuration
 * Centralized navigation data for easy maintenance and updates
 */
const NAV_LINKS = [
  { href: '/', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/cart', label: 'Cart' },
] as const;

/**
 * Navbar Component
 * 
 * A fully responsive navigation bar for the KICKS sneaker store featuring:
 * - Brand logo with hover effect
 * - Desktop horizontal navigation links with smooth underline animation
 * - Search, user profile, and shopping cart icons
 * - Mobile hamburger menu with slide-in animation
 * - Real-time cart item count badge
 * - Sticky positioning for persistent visibility while scrolling
 * - Full accessibility support (ARIA labels, semantic HTML)
 * 
 * @returns {JSX.Element} The main navigation component
 */
export function Navbar() {
  // Local state for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get total cart quantity from Redux store for badge
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  /**
   * Toggles the mobile menu open/closed state
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  /**
   * Closes the mobile menu (called when user clicks a nav link)
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" 
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section: Logo & Desktop Navigation Links */}
          <div className="flex items-center gap-8">
            
            {/* Brand Logo */}
            <Link 
              href="/" 
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200"
              aria-label="KICKS Home"
            >
              KICKS
            </Link>

            {/* Desktop Navigation Links - Hidden on mobile screens */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 relative group"
                >
                  {link.label}
                  {/* Animated underline that appears on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section: Action Icons & Mobile Menu */}
          <div className="flex items-center gap-2">
            
            {/* Search Button */}
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Search products"
              type="button"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {/* User Profile Button */}
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="User profile"
              type="button"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>

            {/* Shopping Cart Button with Item Count Badge */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label={`Shopping cart with ${cartItemCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              
              {/* Cart Item Count Badge - Only shows when cart has items */}
              {cartItemCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-blue-600 rounded-full"
                  aria-label={`${cartItemCount} items in cart`}
                >
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button - Only visible on mobile */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Expands below header on mobile */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden border-t border-gray-200 py-4 space-y-1 animate-in slide-in-from-top-2 duration-300"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="block text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors duration-200"
                role="menuitem"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
