'use client';

import Link from 'next/link';
import { useGetProductsQuery } from '@/store/api/productsApi';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductGridSkeleton } from '@/components/products/ProductGridSkeleton';
import { AsyncContent } from '@/components/async/AsyncContent';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ROUTES } from '@/lib/constants';

/**
 * Landing page - first 4 products from API, skeleton while loading
 * Full products loaded on /products (SHOP NEW DROPS click)
 */
export default function HomePage() {
  const { data, isLoading, isError, error, refetch } = useGetProductsQuery({
    limit: 4,
  });

  return (
    <div className="min-h-screen bg-[#E7E7E3]">
      <PageLayout fullWidth>
        {/* Hero Banner Section - Full Width */}
        <HeroBanner />

        {/* New Drops Section - Figma Frame 22: 1320px, gap 32px */}
        <section className="w-full max-w-[1320px] mx-auto px-4 sm:px-[60px] py-12 lg:py-16 flex flex-col gap-8">
          {/* Heading + CTA row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="font-rubik font-bold text-[#232321] text-3xl sm:text-4xl lg:text-5xl leading-tight">
              DON&apos;T MISS OUT
              <br />
              NEW DROPS
            </h2>
            <Link
              href={ROUTES.products}
              className="inline-flex items-center justify-center shrink-0 h-12 px-6 bg-[#4A69E2] text-white font-semibold text-sm uppercase tracking-wide rounded-lg hover:opacity-90 transition-opacity"
            >
              SHOP NEW DROPS
            </Link>
          </div>

          {/* First 4 products — skeleton while loading */}
          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <AsyncContent
              isLoading={false}
              isError={isError}
              error={error}
              data={data}
              onRetry={() => refetch()}
              errorFallback="Failed to load products."
              emptyMessage="No products found"
              emptyDescription="The store is empty. Check back later."
            >
              {(products) => <ProductGrid products={products.slice(0, 4)} />}
            </AsyncContent>
          )}
        </section>

        {/* Categories carousel — API data, arrow navigation */}
        <CategoriesSection />

        {/* Reviews — product images from API, mock review content */}
        <ReviewsSection />
      </PageLayout>
    </div>
  );
}
