'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import { useGetProductByIdQuery } from '@/store/api/productsApi';
import { addToCart } from '@/store/slices/cartSlice';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductImage } from '@/components/products/ProductImage';
import { ErrorState } from '@/components/ui/ErrorState';
import { AsyncContent } from '@/components/async/AsyncContent';
import { formatPrice } from '@/lib/format';
import { ROUTES } from '@/lib/constants';
import type { ApiProduct } from '@/types';

/**
 * Product detail page - single product from API
 */
export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const dispatch = useDispatch();

  const { data, isLoading, isError, error, refetch } = useGetProductByIdQuery(id!, {
    skip: !id,
  });

  if (!id) {
    return (
      <PageLayout>
        <ErrorState message="Invalid product ID" />
      </PageLayout>
    );
  }

  const handleAddToCart = (product: ApiProduct) => {
    dispatch(addToCart(product));
  };

  return (
    <PageLayout>
      <AsyncContent<ApiProduct>
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={data}
        isEmpty={() => false}
        onRetry={() => refetch()}
        errorFallback="Failed to load product."
      >
        {(product) => (
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 lg:w-1/2">
              <ProductImage product={product} alt={product.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col lg:py-4">
              <p className="mb-1 text-sm font-medium text-gray-500">{product.category?.name}</p>
              <h1 className="mb-4 text-3xl font-bold text-gray-900">{product.title}</h1>
              <p className="mb-6 text-2xl font-semibold text-gray-900">{formatPrice(product.price)}</p>
              <p className="mb-8 text-gray-600">{product.description}</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-2 rounded-md bg-gray-900 px-6 py-3 text-white hover:bg-gray-800"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>
                <Link
                  href={ROUTES.home}
                  className="rounded-md border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50"
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        )}
      </AsyncContent>
    </PageLayout>
  );
}
