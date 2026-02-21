'use client';

import { useGetProductsQuery } from '@/store/api/productsApi';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { AsyncContent } from '@/components/async/AsyncContent';
import { HeroBanner } from '@/components/home/HeroBanner';

/**
 * Landing page - product listing from API with hero banner
 * Matches Figma design: Hero banner + "New Drops" product grid
 */
export default function HomePage() {
  const { data, isLoading, isError, error, refetch } = useGetProductsQuery();

  return (
    <div className="min-h-screen bg-white">
      <PageLayout fullWidth>
        {/* Hero Banner Section - Full Width */}
        <HeroBanner />

        {/* New Drops Section - Contained */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mb-8">
            <h2 className="text-4xl lg:text-5xl font-black text-black mb-2">
              DON&apos;T MISS OUT
            </h2>
            <h2 className="text-4xl lg:text-5xl font-black text-black">
              NEW DROPS
            </h2>
          </div>

          <AsyncContent
            isLoading={isLoading}
            isError={isError}
            error={error}
            data={data}
            onRetry={() => refetch()}
            errorFallback="Failed to load products."
            emptyMessage="No products found"
            emptyDescription="The store is empty. Check back later."
          >
            {(products) => <ProductGrid products={products} />}
          </AsyncContent>
        </section>
      </PageLayout>
    </div>
  );
}
