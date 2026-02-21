'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import type { ApiProduct } from '@/types';
import { addToCart } from '@/store/slices/cartSlice';
import { ProductImage } from './ProductImage';
import { formatPrice } from '@/lib/format';
import { ROUTES } from '@/lib/constants';

interface ProductCardProps {
  product: ApiProduct;
}

/**
 * ProductCard - displays product info with add to cart
 * Single Responsibility: Product card presentation
 */
export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={ROUTES.productById(product.id)} className="relative block aspect-square overflow-hidden bg-gray-100">
        <ProductImage product={product} alt={product.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={ROUTES.productById(product.id)} className="mb-1 font-medium text-gray-900 hover:underline line-clamp-2">
          {product.title}
        </Link>
        <p className="mb-3 text-sm text-gray-500">{product.category?.name}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">{formatPrice(product.price)}</span>
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
