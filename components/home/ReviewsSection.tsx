'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { useGetProductsQuery } from '@/store/api/productsApi';
import { ProductImage } from '@/components/products/ProductImage';
import { ROUTES } from '@/lib/constants';
import type { ApiProduct } from '@/types';

/**
 * Mock review data - API has no reviews endpoint
 * Uses products from API for images; review text is placeholder
 */
const MOCK_REVIEWS = [
  { title: 'Good Quality', text: 'I highly recommend shopping from kicks', rating: 5, reviewer: 'Alex M.' },
  { title: 'Good Quality', text: 'I highly recommend shopping from kicks', rating: 5, reviewer: 'Jordan K.' },
  { title: 'Good Quality', text: 'I highly recommend shopping from kicks', rating: 5, reviewer: 'Sam R.' },
];

export function ReviewsSection() {
  const { data: products, isLoading } = useGetProductsQuery({ limit: 6 });
  const reviewProducts = products?.slice(0, 3) ?? [];

  return (
    <section className="w-full bg-[#E7E7E3] py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-[60px]">
        {/* Header: REVIEWS + SEE ALL */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-rubik text-2xl font-bold uppercase tracking-wide text-[#232321] sm:text-3xl">
            REVIEWS
          </h2>
          <Link
            href={ROUTES.products}
            className="inline-flex items-center justify-center rounded-lg bg-[#4A69E2] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            SEE ALL
          </Link>
        </div>

        {/* Review cards — product images from API, mock review content */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <ReviewCardSkeleton key={i} />)
          ) : reviewProducts.length > 0 ? (
            reviewProducts.map((product, i) => (
              <ReviewCard
                key={product.id}
                product={product}
                review={MOCK_REVIEWS[i % MOCK_REVIEWS.length]}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-[#666]">No reviews yet. Shop products to add yours!</p>
          )}
        </div>
      </div>
    </section>
  );
}

function ReviewCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white">
      <div className="p-5">
        <div className="mb-2 h-4 w-24 animate-pulse rounded bg-[#e0e0e0]" />
        <div className="mb-4 h-3 w-full animate-pulse rounded bg-[#e0e0e0]" />
        <div className="mb-4 flex items-center gap-2">
          <div className="h-5 w-24 animate-pulse rounded bg-[#e0e0e0]" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-[#e0e0e0]" />
        </div>
      </div>
      <div className="aspect-[4/3] animate-pulse bg-[#e0e0e0]" />
    </div>
  );
}

function ReviewCard({
  product,
  review,
}: {
  product: ApiProduct;
  review: (typeof MOCK_REVIEWS)[0];
}) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.reviewer)}&size=80&background=232321&color=fff`;

  return (
    <Link
      href={ROUTES.productById(product.id)}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 font-rubik font-bold text-[#232321]">{review.title}</h3>
        <p className="mb-3 text-sm text-[#666]">{review.text}</p>
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-[#FFD700] text-[#FFD700]"
              aria-hidden
            />
          ))}
          <span className="ml-2 text-sm font-semibold text-[#232321]">{review.rating}.0</span>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt={review.reviewer}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-[#232321]">{review.reviewer}</span>
        </div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e0e0e0]">
        <ProductImage
          product={product}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
