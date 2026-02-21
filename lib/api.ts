/**
 * API configuration
 * Platzi Fake Store API - uses escuelajs.co backend
 */
export const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,
  productById: (id: number | string) => `${API_BASE_URL}/products/${id}`,
  categories: `${API_BASE_URL}/categories`,
  categoryById: (id: number | string) => `${API_BASE_URL}/categories/${id}`,
  categoryProducts: (id: number | string) => `${API_BASE_URL}/categories/${id}/products`,
} as const;
