'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Search, User, ShoppingBag, Menu, X, Flame, ChevronDown } from 'lucide-react';
import { RootState } from '@/store';
import { ROUTES, STATIC_IMAGES } from '@/lib/constants';

/**
 * Navbar - Pixel-perfect match to Figma design
 * Specs: 1320px max, 96px height, 32px padding, 24px radius, #FAFAFA bg
 * Nav: Rubik SemiBold 16px, #232321 | Logo center | Icons right
 */
const NAV_LINKS = [
  { href: ROUTES.home, label: 'New Drops', icon: Flame },
  { href: '#', label: 'Men', hasDropdown: true },
  { href: '#', label: 'Women', hasDropdown: true },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="pt-8 px-[60px] pb-0">
      <nav
        className="max-w-[1320px] mx-auto h-[96px] flex items-center justify-between px-8 rounded-[24px] bg-[#FAFAFA] relative"
        aria-label="Main navigation"
      >
        {/* Left - Nav Links */}
        <div className="hidden md:flex items-center gap-8 flex-1 min-w-0">
          {NAV_LINKS.map((link) => {
            const Icon = 'icon' in link ? link.icon : null;
            const hasDropdown = 'hasDropdown' in link && link.hasDropdown;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="font-rubik font-semibold text-base leading-[100%] text-[#232321] flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                {Icon && <Icon className="w-4 h-4 text-orange-500" strokeWidth={2.5} />}
                {link.label}
                {hasDropdown && <ChevronDown className="w-4 h-4 text-[#232321]" />}
              </Link>
            );
          })}
        </div>

        {/* Center - Logo (absolute for true center) */}
        <Link
          href={ROUTES.home}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-shrink-0"
          aria-label="KICKS Home"
        >
          <Image
            src={STATIC_IMAGES.logo.default}
            alt="KICKS"
            width={128}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Right - Icons */}
        <div className="flex items-center gap-4 flex-1 min-w-0 justify-end">
          <button
            type="button"
            className="p-2 text-[#232321] hover:opacity-70 transition-opacity"
            aria-label="Search"
          >
            <Search className="w-5 h-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="p-2 text-[#232321] hover:opacity-70 transition-opacity"
            aria-label="Profile"
          >
            <User className="w-5 h-5" strokeWidth={2} />
          </button>
          <Link
            href={ROUTES.cart}
            className="relative p-2 text-[#232321] hover:opacity-70 transition-opacity"
            aria-label={`Cart (${cartItemCount} items)`}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={2} />
            <span
              className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 flex items-center justify-center px-1.5 text-xs font-bold text-white bg-orange-500 rounded-full"
              aria-hidden
            >
              {cartItemCount}
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 py-4 bg-[#FAFAFA] rounded-2xl space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-rubik font-semibold text-base text-[#232321] py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
