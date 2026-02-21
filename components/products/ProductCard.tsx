'use client';

import Link from 'next/link';
import type { ApiProduct } from '@/types';
import { ProductImage } from './ProductImage';
import { formatPriceShort } from '@/lib/format';
import { ROUTES } from '@/lib/constants';

interface ProductCardProps {
  product: ApiProduct;
}

/**
 * ProductCard - Figma New Drops style: New badge, image, title, VIEW PRODUCT - $price
 */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-[#FAFAFA] border border-[#E7E7E3]">
      <Link
        href={ROUTES.productById(product.id)}
        className="relative block aspect-square overflow-hidden bg-[#E7E7E3]"
      >
        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#4A69E2] px-3 py-1 text-xs font-semibold uppercase text-white">
          New
        </span>
        <ProductImage
          product={product}
          alt={product.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link
          href={ROUTES.productById(product.id)}
          className="mb-3 font-rubik font-semibold text-[#232321] uppercase line-clamp-2 text-sm"
        >
          {product.title}
        </Link>
        <Link
          href={ROUTES.productById(product.id)}
          className="mt-auto block w-full rounded-xl bg-[#232321] px-4 py-3 text-center text-sm font-semibold uppercase text-white transition-colors hover:bg-[#333333]"
        >
          VIEW PRODUCT - {formatPriceShort(product.price)}
        </Link>
      </div>
    </article>
  );
}
