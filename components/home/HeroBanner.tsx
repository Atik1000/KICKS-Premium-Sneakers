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
    <section className="relative w-full overflow-hidden">
      {/* Same alignment as navbar: px-[60px] + max-w-[1320px] mx-auto px-8 */}
      <div className="relative px-4 sm:px-[60px] py-12 lg:py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          {/* "DO IT RIGHT" - One line, aligned with navbar content */}
          <div className="w-full mb-8 lg:mb-12 overflow-visible">
          <h1
            className="font-rubik font-bold uppercase leading-[100%] whitespace-nowrap text-[48px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[223.5px]"
            style={{ letterSpacing: 0 }}
          >
            <span style={{ color: '#232321' }}>DO IT </span>
            <span style={{ color: '#4A69E2' }}>RIGHT</span>
          </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="relative z-10">
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
      </div>
    </section>
  );
}
