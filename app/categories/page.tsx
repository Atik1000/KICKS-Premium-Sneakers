'use client';

import Link from 'next/link';
import { useGetCategoriesQuery } from '@/store/api/productsApi';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductImage } from '@/components/products/ProductImage';
import { AsyncContent } from '@/components/async/AsyncContent';
import { ROUTES } from '@/lib/constants';
import type { ApiCategory } from '@/types';

/**
 * Categories page - list all product categories from API
 */
export default function CategoriesPage() {
  const { data, isLoading, isError, error, refetch } = useGetCategoriesQuery();

  return (
    <PageLayout>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Categories</h1>
      <AsyncContent<ApiCategory[]>
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={data}
        onRetry={() => refetch()}
        errorFallback="Failed to load categories."
        emptyMessage="No categories found"
        emptyDescription="No product categories available."
      >
        {(categories) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={ROUTES.categoryProducts(category.id)}
                className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <ProductImage category={category} alt={category.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-gray-900 group-hover:underline">{category.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">View products →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </AsyncContent>
    </PageLayout>
  );
}
