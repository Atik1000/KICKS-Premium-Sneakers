'use client';

import Link from 'next/link';
import { useGetProductsQuery } from '@/store/api/productsApi';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductGridSkeleton } from '@/components/products/ProductGridSkeleton';
import { AsyncContent } from '@/components/async/AsyncContent';
import { ROUTES } from '@/lib/constants';

/**
 * Full products page — fetches all products from API
 * Linked from "SHOP NEW DROPS" on home
 */
export default function ProductsPage() {
  const { data, isLoading, isError, error, refetch } = useGetProductsQuery();

  return (
    <div className="min-h-screen bg-[#E7E7E3]">
      <PageLayout fullWidth>
        <section className="w-full max-w-[1320px] mx-auto px-4 sm:px-[60px] py-12 lg:py-16 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="font-rubik font-bold text-[#232321] text-3xl sm:text-4xl lg:text-5xl">
              ALL PRODUCTS
            </h1>
            <Link
              href={ROUTES.home}
              className="text-[#4A69E2] font-semibold hover:underline"
            >
              ← Back to Home
            </Link>
          </div>

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
              {(products) => <ProductGrid products={products} />}
            </AsyncContent>
          )}
        </section>
      </PageLayout>
    </div>
  );
}
