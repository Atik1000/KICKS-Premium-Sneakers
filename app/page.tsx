'use client';

import { useGetProductsQuery } from '@/store/api/productsApi';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { AsyncContent } from '@/components/async/AsyncContent';

/**
 * Landing page - product listing from API
 * Clean: Delegates async state to AsyncContent (DRY)
 */
export default function HomePage() {
  const { data, isLoading, isError, error, refetch } = useGetProductsQuery();

  return (
    <PageLayout>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Products</h1>
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
    </PageLayout>
  );
}
