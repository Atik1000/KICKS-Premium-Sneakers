'use client';

import { ReactNode } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { getErrorMessage } from '@/lib/format';

/**
 * AsyncContent - Handles loading, error, empty states for API queries
 * DRY: Single component for async UI states across all pages
 * Single Responsibility: Renders appropriate state based on query result
 */
interface AsyncContentProps<T> {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  data: T | undefined;
  isEmpty?: (data: T) => boolean;
  onRetry?: () => void;
  errorFallback?: string;
  emptyMessage?: string;
  emptyDescription?: string;
  children: (data: T) => ReactNode;
}

const defaultIsEmpty = <T,>(data: T): boolean =>
  Array.isArray(data) ? data.length === 0 : !data;

export function AsyncContent<T>({
  isLoading,
  isError,
  error,
  data,
  isEmpty = defaultIsEmpty,
  onRetry,
  errorFallback = 'Something went wrong.',
  emptyMessage = 'No items found',
  emptyDescription = 'Check back later.',
  children,
}: AsyncContentProps<T>) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner className="h-12 w-12" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message={getErrorMessage(error, errorFallback)}
        onRetry={onRetry}
      />
    );
  }

  if (!data || isEmpty(data)) {
    return (
      <EmptyState message={emptyMessage} description={emptyDescription} />
    );
  }

  return <>{children(data)}</>;
}
