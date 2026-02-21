'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  useGetCategoryByIdQuery,
  useGetProductsByCategoryQuery,
} from '@/store/api/productsApi';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';

/**
 * Category products page - products filtered by category
 */
export default function CategoryProductsPage() {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: category,
    isLoading: categoryLoading,
    isError: categoryError,
    error: categoryErrorObj,
    refetch: refetchCategory,
  } = useGetCategoryByIdQuery(id!, { skip: !id });

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorObj,
    refetch: refetchProducts,
  } = useGetProductsByCategoryQuery(id!, { skip: !id });

  const isLoading = categoryLoading || productsLoading;
  const isError = categoryError || productsError;
  const error = categoryError || productsError ? (categoryErrorObj || productsErrorObj) : null;
  const refetch = () => {
    refetchCategory();
    refetchProducts();
  };

  if (!id) {
    return (
      <PageLayout>
        <ErrorState message="Invalid category ID" />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {isLoading && (
        <div className="flex justify-center py-16">
          <LoadingSpinner className="h-12 w-12" />
        </div>
      )}

      {isError && (
        <ErrorState
          message={error && 'message' in error ? String(error.message) : 'Failed to load data.'}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && category && (
        <>
          <div className="mb-8 flex items-center gap-4">
            <Link
              href="/categories"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              ← Back to Categories
            </Link>
          </div>
          <h1 className="mb-8 text-3xl font-bold text-gray-900">{category.name}</h1>

          {(!products || products.length === 0) && (
            <EmptyState
              message={`No products in ${category.name}`}
              description="This category has no products yet."
            />
          )}

          {products && products.length > 0 && <ProductGrid products={products} />}
        </>
      )}
    </PageLayout>
  );
}
