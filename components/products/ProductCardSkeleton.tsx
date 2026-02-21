/**
 * Skeleton for ProductCard - matches New Drops layout
 * New badge + image + title + VIEW PRODUCT button
 */
export function ProductCardSkeleton() {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-[#FAFAFA] border border-[#E7E7E3]">
      <div className="relative aspect-square overflow-hidden bg-[#E7E7E3]">
        <div className="absolute left-3 top-3 h-6 w-12 rounded-full bg-[#E7E7E3] animate-pulse" />
        <div className="h-full w-full animate-pulse bg-[#E0E0E0]" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 h-4 w-3/4 rounded bg-[#E7E7E3] animate-pulse" />
        <div className="mb-1 h-4 w-1/2 rounded bg-[#E7E7E3] animate-pulse" />
        <div className="mt-4 h-12 w-full rounded-xl bg-[#E7E7E3] animate-pulse" />
      </div>
    </article>
  );
}
