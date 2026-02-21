/**
 * Application constants
 * Centralizes magic strings and values (KISS - Single source of truth)
 */
export const ROUTES = {
  home: '/',
  products: '/products',
  productById: (id: number | string) => `/products/${id}`,
  categories: '/categories',
  categoryProducts: (id: number | string) => `/categories/${id}/products`,
  cart: '/cart',
} as const;

export const PLACEHOLDER_IMAGE = {
  product: 'https://placehold.co/400x400?text=No+Image',
  productLarge: 'https://placehold.co/600x600?text=No+Image',
  category: 'https://placehold.co/600x400?text=Category',
  cart: 'https://placehold.co/100?text=No+Image',
} as const;

/**
 * Static image paths - use images from public/images/
 * e.g. <img src={STATIC_IMAGES.logo.default} alt="Logo" />
 */
export const STATIC_IMAGES = {
  logo: {
    default: '/images/logo/Logo.svg',
    icon: '/images/logo/icon.png',
  },
  products: '/images/products/',
  categories: '/images/categories/',
  ui: '/images/ui/',
} as const;
