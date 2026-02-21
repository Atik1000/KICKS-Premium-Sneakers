/**
 * Formatting utilities
 * Single responsibility - format values for display (DRY)
 */

/** Extracts readable message from RTK Query / fetch error */
export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong.'
): string {
  if (!error) return fallback;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return fallback;
}

/** Formats price for display (e.g. $125.00) */
export function formatPrice(price: number): string {
  const value = typeof price === 'number' && !Number.isNaN(price) ? price : 0;
  return `$${value.toFixed(2)}`;
}

/** Formats price compact for buttons (e.g. $125) */
export function formatPriceShort(price: number): string {
  const value = typeof price === 'number' && !Number.isNaN(price) ? price : 0;
  return `$${Math.round(value)}`;
}
