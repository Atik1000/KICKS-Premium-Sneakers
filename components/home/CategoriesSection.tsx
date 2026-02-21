'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useGetCategoriesQuery } from '@/store/api/productsApi';
import { ProductImage } from '@/components/products/ProductImage';
import { ROUTES } from '@/lib/constants';
import type { ApiCategory } from '@/types';

/**
 * Categories carousel - dark themed, API data, arrow navigation
 * Matches design: CATEGORIES title, prev/next arrows, cards with image + name + arrow icon
 */
const CARD_GAP = 24;

export function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = (scrollRef.current.offsetWidth - CARD_GAP) / 2;
    const scrollAmount = direction === 'left' ? -(cardWidth + CARD_GAP) : cardWidth + CARD_GAP;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[#1a1a1a] py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-[60px]">
        {/* Title + arrow nav */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-rubik text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
            CATEGORIES
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] text-[#a0a0a0] transition-colors hover:bg-[#3a3a3a] hover:text-white"
              aria-label="Previous categories"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] text-[#a0a0a0] transition-colors hover:bg-[#3a3a3a] hover:text-white"
              aria-label="Next categories"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel — 2 cards visible (same as screenshot) */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth py-2 scrollbar-hide"
          style={{
            gap: CARD_GAP,
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
          ) : categories?.length ? (
            categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CategoryCardSkeleton() {
  return (
    <div
      className="flex shrink-0 flex-col overflow-hidden rounded-t-2xl bg-[#E7E7E3]"
      style={{ flex: `0 0 calc((100% - ${CARD_GAP}px) / 2)`, minWidth: 280 }}
    >
      <div className="aspect-[4/3] animate-pulse bg-[#d0d0d0]" />
      <div className="flex items-center justify-between p-6">
        <div className="h-5 w-32 animate-pulse rounded bg-[#d0d0d0]" />
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-[#d0d0d0]" />
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: ApiCategory }) {
  return (
    <Link
      href={ROUTES.categoryProducts(category.id)}
      className="group flex shrink-0 flex-col overflow-hidden rounded-t-2xl bg-[#E7E7E3] transition-transform hover:scale-[1.02]"
      style={{
        flex: `0 0 calc((100% - ${CARD_GAP}px) / 2)`,
        minWidth: 280,
        scrollSnapAlign: 'start',
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e0e0e0]">
        <ProductImage
          category={category}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="relative flex items-center justify-between p-6">
        <span className="font-rubik text-lg font-bold uppercase tracking-wide text-[#232321]">
          {category.name}
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#232321] text-white transition-colors group-hover:bg-[#333333]">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
