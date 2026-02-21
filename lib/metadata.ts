import type { Metadata, Viewport } from 'next';

/**
 * Application metadata configuration
 * Defines SEO and app information
 */
export const metadata: Metadata = {
  title: 'KICKS - Premium Sneakers & Athletic Footwear',
  description: 'Shop exclusive sneakers, running shoes, and athletic footwear. Browse our collection of premium kicks from top brands.',
  generator: 'Next.js',
  applicationName: 'KICKS',
  keywords: ['sneakers', 'athletic footwear', 'running shoes', 'premium kicks', 'sports shoes'],
  authors: [{ name: 'KICKS Team' }],
};

/**
 * Viewport configuration
 * Ensures proper mobile responsive behavior
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
};
