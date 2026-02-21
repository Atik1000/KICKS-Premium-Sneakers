import { ProductCard } from './ProductCard';
import type { ApiProduct } from '@/types';

interface ProductGridProps {
  products: ApiProduct[];
}

/**
 * Responsive grid of product cards
 */
export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
