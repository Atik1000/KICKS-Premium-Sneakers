'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  useGetCategoryByIdQuery,
  useGetProductsByCategoryQuery,
} from '@/store/api/productsApi';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { AsyncContent } from '@/components/async/AsyncContent';
import { ROUTES } from '@/lib/constants';
import type { ApiCategory, ApiProduct } from '@/types';

/**
 * Category products page - products filtered by category
 * Combines two queries; shows category when both loaded
 */
export default function CategoryProductsPage() {
  const params = useParams();
  const id = params?.id as string;

  const categoryQuery = useGetCategoryByIdQuery(id!, { skip: !id });
  const productsQuery = useGetProductsByCategoryQuery(id!, { skip: !id });

  const isLoading = categoryQuery.isLoading || productsQuery.isLoading;
  const isError = categoryQuery.isError || productsQuery.isError;
  const error = categoryQuery.error || productsQuery.error;
  const refetch = () => {
    categoryQuery.refetch();
    productsQuery.refetch();
  };

  if (!id) {
    return (
      <PageLayout>
        <ErrorState message="Invalid category ID" />
      </PageLayout>
    );
  }

  const category = categoryQuery.data;
  const products = productsQuery.data;

  return (
    <PageLayout>
      <AsyncContent<{ category: ApiCategory; products: ApiProduct[] }>
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={category && products ? { category, products } : undefined}
        isEmpty={() => false}
        onRetry={refetch}
        errorFallback="Failed to load data."
      >
        {({ category: cat, products: prods }) => (
          <>
            <div className="mb-8 flex items-center gap-4">
              <Link
                href={ROUTES.categories}
                className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
              >
                ← Back to Categories
              </Link>
            </div>
            <h1 className="mb-8 text-3xl font-bold text-gray-900">{cat.name}</h1>

            {!prods || prods.length === 0 ? (
              <EmptyState
                message={`No products in ${cat.name}`}
                description="This category has no products yet."
              />
            ) : (
              <ProductGrid products={prods} />
            )}
          </>
        )}
      </AsyncContent>
    </PageLayout>
  );
}