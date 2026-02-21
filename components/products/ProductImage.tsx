'use client';

import { useState } from 'react';
import type { ApiProduct, ApiCategory } from '@/types';
import { getProductImageUrl, getCategoryImageUrl } from '@/lib/product';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';

/**
 * ProductImage - Handles product/category image with fallback on error
 * Single Responsibility: Image display with error recovery (KISS)
 */

interface ProductImageProps {
  product?: ApiProduct;
  category?: ApiCategory;
  src?: string;
  alt: string;
  className?: string;
  fallbackOnError?: boolean;
}

export function ProductImage({
  product,
  category,
  src: srcProp,
  alt,
  className = 'h-full w-full object-cover',
  fallbackOnError = true,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc =
    srcProp ??
    (product && getProductImageUrl(product)) ??
    (category && getCategoryImageUrl(category)) ??
    PLACEHOLDER_IMAGE.product;
  const finalSrc = hasError && fallbackOnError ? PLACEHOLDER_IMAGE.product : resolvedSrc;

  // Using img for onError fallback; Next/Image does not support onError
  /* eslint-disable-next-line @next/next/no-img-element */
  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      onError={() => fallbackOnError && setHasError(true)}
    />
  );
}
