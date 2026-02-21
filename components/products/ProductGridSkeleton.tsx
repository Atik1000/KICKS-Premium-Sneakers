import { ProductCardSkeleton } from './ProductCardSkeleton';

/**
 * Grid of 4 skeleton cards - matches ProductGrid layout for New Drops
 */
export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
