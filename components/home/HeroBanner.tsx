'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

/**
 * HeroBanner - Main banner section with featured product
 * Matches Figma design with "DO IT RIGHT" text and Nike Air Max showcase
 */
export function HeroBanner() {
  const [selectedImage, setSelectedImage] = useState('/images/products/image 14.svg');
  
  const thumbnails = [
    '/images/products/Rectangle 1.svg',
    '/images/products/Rectangle 2.svg',
  ];

  return (
    <section className="relative w-full bg-gradient-to-br from-yellow-100 to-yellow-200 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="relative z-10">
            {/* "DO IT RIGHT" Text */}
            <div className="mb-8">
              <h1 className="text-6xl lg:text-8xl font-black leading-tight">
                <span className="text-black">DO IT</span>
                <br />
                <span className="text-blue-600 relative">
                  RIGHT
                  <span className="absolute -inset-2 border-4 border-red-500 opacity-50" />
                </span>
              </h1>
            </div>

            {/* Product Label */}
            <div className="mb-6">
              <span className="inline-block bg-black text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider rotate-[-2deg]">
                Kicks product of the year
              </span>
            </div>

            {/* Product Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              NIKE AIR MAX
            </h2>

            {/* Product Description */}
            <p className="text-lg text-white mb-8 drop-shadow-md">
              Nike introducing the new air max for everyone&apos;s comfort
            </p>

            {/* CTA Button */}
            <Link
              href={ROUTES.products}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 text-lg transition-colors duration-200"
            >
              SHOP NOW
            </Link>
          </div>

          {/* Right Side - Product Images */}
          <div className="relative flex flex-col lg:flex-row gap-4 items-center lg:items-start">
            {/* Thumbnail Images */}
            <div className="flex flex-col gap-4 order-2 lg:order-1">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(thumb)}
                  className={`relative w-24 h-24 lg:w-32 lg:h-32 border-2 transition-all ${
                    selectedImage === thumb
                      ? 'border-orange-500 scale-105'
                      : 'border-orange-300 hover:border-orange-400'
                  }`}
                  aria-label={`Select thumbnail ${index + 1}`}
                >
                  <Image
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>

            {/* Main Product Image */}
            <div className="relative w-full lg:w-auto flex-1 order-1 lg:order-2">
              <div className="relative aspect-square max-w-md mx-auto">
                <Image
                  src={selectedImage}
                  alt="Nike Air Max - Featured Product"
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
