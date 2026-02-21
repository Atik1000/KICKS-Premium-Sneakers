'use client';

import { useGetProductsQuery } from '@/store/api/productsApi';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';

/**
 * Landing page - product listing from API
 */
export default function HomePage() {
  const { data: products, isLoading, isError, error, refetch } = useGetProductsQuery();

  return (
    <PageLayout>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Products</h1>

      {isLoading && (
        <div className="flex justify-center py-16">
          <LoadingSpinner className="h-12 w-12" />
        </div>
      )}

      {isError && (
        <ErrorState
          message={error && 'message' in error ? String(error.message) : 'Failed to load products.'}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && (!products || products.length === 0) && (
        <EmptyState message="No products found" description="The store is empty. Check back later." />
      )}

      {!isLoading && !isError && products && products.length > 0 && (
        <ProductGrid products={products} />
      )}
    </PageLayout>
  );
}
