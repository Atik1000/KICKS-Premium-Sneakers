'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import type { ApiProduct } from '@/types';
import { addToCart } from '@/store/slices/cartSlice';

interface ProductCardProps {
  product: ApiProduct;
}

/**
 * Product card - displays product info with add to cart
 */
export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const imageUrl = product.images?.[0] || product.category?.image || 'https://placehold.co/400x400';
  const fallbackUrl = 'https://placehold.co/400x400?text=No+Image';
  const price = typeof product.price === 'number' ? product.price : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-gray-100">
        <div className="relative h-full w-full">
          {imageError ? (
            <img
              src={fallbackUrl}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={imageUrl}
              alt={product.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${product.id}`} className="mb-1 font-medium text-gray-900 hover:underline line-clamp-2">
          {product.title}
        </Link>
        <p className="mb-3 text-sm text-gray-500">{product.category?.name}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">${price.toFixed(2)}</span>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center gap-1 rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
