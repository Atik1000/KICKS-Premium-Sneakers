import { Package } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  description?: string;
}

/**
 * Empty state UI when no data is returned
 */
export function EmptyState({
  message = 'No items found',
  description = 'Check back later for new products.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
      <Package className="h-12 w-12 text-gray-400" aria-hidden />
      <p className="font-medium text-gray-800">{message}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
