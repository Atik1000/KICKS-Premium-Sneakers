'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

/** Main cover image - always this, never changes */
const HERO_COVER_IMAGE = '/images/products/image 14.svg';
/** Two small images on the right - static, no click-to-change */
const RIGHT_IMAGES = ['/images/products/Rectangle 1.svg', '/images/products/Rectangle 2.svg'];

const HERO_WIDTH = 1320;
const HERO_HEIGHT = 750;

/**
 * HeroBanner - Cover image 14.svg always; Rectangle 1 & 2 on right, static.
 */
export function HeroBanner() {

  return (
    <section className="relative w-full overflow-hidden">
      {/* Same as navbar: px-[60px], max-w-[1320px] mx-auto. No extra padding so hero can be 1320px. */}
      <div className="px-4 sm:px-[60px] py-8 lg:py-12">
        <div className="max-w-[1320px] mx-auto w-full">
          {/* DO IT RIGHT - aligned with navbar content (32px from left of 1320 box) */}
          <div className="pl-4 sm:pl-8 w-full mb-6 lg:mb-8 overflow-visible">
            <h1
              className="font-rubik font-bold uppercase leading-[100%] whitespace-nowrap text-[48px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[223.5px]"
              style={{ letterSpacing: 0, color: 'inherit' }}
            >
              <span style={{ color: '#232321' }}>DO IT </span>
              <span style={{ color: '#4A69E2' }}>RIGHT</span>
            </h1>
          </div>

          {/* Hero box: exactly 1320×750, opacity 1, no angle */}
          <div
            className="relative w-full rounded-[64px] overflow-hidden bg-[#E7E7E3]"
            style={{
              maxWidth: HERO_WIDTH,
              width: '100%',
              aspectRatio: `${HERO_WIDTH} / ${HERO_HEIGHT}`,
              opacity: 1,
            }}
          >
            {/* Main cover image - always image 14.svg */}
            <div className="absolute inset-0">
              <Image
                src={HERO_COVER_IMAGE}
                alt="Nike Air Max"
                fill
                className="object-cover object-center"
                priority
                unoptimized
              />
            </div>

            {/* Vertical hero label — left aligned, top 80px */}
            <div
              className="absolute left-0 z-10"
              style={{ top: 80 }}
            >
              <Image
                src="/images/logo/hero-vertical.svg"
                alt="Nike product of the year"
                width={67}
                height={237}
                unoptimized
              />
            </div>

            {/* Left: text and button — 32px from left and bottom of hero */}
            <div
              className="absolute z-10 max-w-md"
              style={{ left: 32, bottom: 32 }}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                NIKE AIR MAX
              </h2>
              <p className="text-base lg:text-lg text-white mb-6 drop-shadow-md">
                Nike introducing the new air max for everyone&apos;s comfort
              </p>
              {/* SHOP NOW - Figma: 48px height, 8px radius, padding 8px vertical / 32px horizontal, #4A69E2 */}
              <Link
                href={ROUTES.products}
                className="inline-flex items-center justify-center h-12 px-8 py-2 bg-[#4A69E2] text-white font-semibold text-sm uppercase tracking-wide rounded-[8px] hover:opacity-90 transition-opacity"
              >
                SHOP NOW
              </Link>
            </div>

            {/* Right: two small static images (Rectangle 1, Rectangle 2) — no state change */}
            <div
              className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-[16px] shrink-0"
              style={{ width: 160, height: 336, opacity: 1 }}
            >
              {RIGHT_IMAGES.map((src, index) => (
                <div
                  key={index}
                  className="relative w-[160px] h-[160px] shrink-0 overflow-hidden rounded-[32px] border-[3px] border-[#E7E7E3] bg-[#E7E7E3]"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
