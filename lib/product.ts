import type { ApiProduct, ApiCategory } from '@/types';
import { PLACEHOLDER_IMAGE } from './constants';

/**
 * Product helpers
 * Single responsibility - derive product data for display
 */

export function getProductImageUrl(product: ApiProduct): string {
  return product.images?.[0] || product.category?.image || PLACEHOLDER_IMAGE.product;
}

export function getCategoryImageUrl(category: ApiCategory): string {
  return category.image || PLACEHOLDER_IMAGE.category;
}
