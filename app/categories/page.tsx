'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useGetCategoriesQuery } from '@/store/api/productsApi';
import { PageLayout } from '@/components/layout/PageLayout';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';

/**
 * Categories page - list all product categories from API
 */
export default function CategoriesPage() {
  const { data: categories, isLoading, isError, error, refetch } = useGetCategoriesQuery();

  return (
    <PageLayout>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Categories</h1>

      {isLoading && (
        <div className="flex justify-center py-16">
          <LoadingSpinner className="h-12 w-12" />
        </div>
      )}

      {isError && (
        <ErrorState
          message={error && 'message' in error ? String(error.message) : 'Failed to load categories.'}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && (!categories || categories.length === 0) && (
        <EmptyState message="No categories found" description="No product categories available." />
      )}

      {!isLoading && !isError && categories && categories.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}/products`}
              className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <Image
                  src={category.image || 'https://placehold.co/600x400'}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-gray-900 group-hover:underline">{category.name}</h2>
                <p className="mt-1 text-sm text-gray-500">View products →</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
