'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useGetCategoriesQuery } from '@/store/api/productsApi';
import { ROUTES } from '@/lib/constants';

const FOOTER_TOP_LOGO = '/images/logo/footer-top-logo.png';
const FOOTER_LOGO = '/images/logo/Logo.png';

/**
 * Footer - matches design: blue top (newsletter + logo), dark gray middle (links), large logo bottom
 */
export function Footer() {
  const [email, setEmail] = useState('');
  const { data: categories } = useGetCategoriesQuery();

  const FALLBACK_CATEGORIES = [
    { id: 1, name: 'Runners', slug: 'runners' },
    { id: 2, name: 'Sneakers', slug: 'sneakers' },
    { id: 3, name: 'Basketball', slug: 'basketball' },
    { id: 4, name: 'Outdoor', slug: 'outdoor' },
    { id: 5, name: 'Golf', slug: 'golf' },
    { id: 6, name: 'Hiking', slug: 'hiking' },
  ];
  const categoryLinks = categories?.length ? categories.slice(0, 6) : FALLBACK_CATEGORIES;

  return (
    <footer className="mt-auto w-full overflow-hidden rounded-t-[32px] bg-[#1a1a1a]">
      {/* Top section — blue, newsletter + footer-top-logo */}
      <div className="flex flex-col items-center justify-between gap-8 bg-[#4A69E2] px-4 py-10 sm:flex-row sm:px-[60px] sm:py-12 lg:gap-16">
        <div className="flex-1">
          <h3 className="mb-2 font-rubik text-xl font-bold uppercase leading-tight text-white sm:text-2xl lg:text-3xl">
            JOIN OUR KICKSPLUS CLUB & GET 15% OFF
          </h3>
          <p className="mb-4 text-sm text-white/90 sm:text-base">
            Sign up for free! Join the community.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-l-lg border border-[#3b5bd4] bg-[#5b7ef5] px-4 py-3 text-white placeholder:text-white/70 focus:border-white focus:outline-none sm:w-64"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-[#232321] px-6 py-3 font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:rounded-l-none"
            >
              SUBMIT
            </button>
          </form>
        </div>
        <div className="relative hidden shrink-0 sm:block">
          <Image
            src={FOOTER_TOP_LOGO}
            alt="Kicks Plus"
            width={180}
            height={80}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Middle section — dark gray, 4 columns */}
      <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-[60px] lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About us */}
          <div>
            <h4 className="mb-4 font-rubik text-sm font-bold uppercase tracking-wide text-[#FF6B35]">
              About us
            </h4>
            <p className="text-sm leading-relaxed text-white/90">
              We are the biggest hyperstore in the universe. We got you all cover
              with our exclusive collections and latest drops.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 font-rubik text-sm font-bold uppercase tracking-wide text-[#FF6B35]">
              Categories
            </h4>
            <ul className="space-y-2">
              {categoryLinks.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={ROUTES.categoryProducts(cat.id)}
                    className="text-sm text-white/90 transition-colors hover:text-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-rubik text-sm font-bold uppercase tracking-wide text-white">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTES.home} className="text-sm text-white/90 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-white/90 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-white/90 hover:text-white">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h4 className="mb-4 font-rubik text-sm font-bold uppercase tracking-wide text-white">
              Follow us
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-white/90 transition-colors hover:text-white"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/90 transition-colors hover:text-white"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-white/90 transition-colors hover:text-white"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section — large Logo.png + copyright */}
      <div className="border-t border-white/10 px-4 py-10 sm:px-[60px] sm:py-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Image
            src={FOOTER_LOGO}
            alt="Kicks"
            width={280}
            height={80}
            className="object-contain"
            unoptimized
          />
          <p className="text-sm text-white/80">© All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
