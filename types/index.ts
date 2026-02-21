/**
 * API Category - matches Platzi Fake Store API response
 */
export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
}

/**
 * API Product - matches Platzi Fake Store API response
 */
export interface ApiProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: ApiCategory;
  images: string[];
}

/**
 * Product interface for app usage
 * Normalized from API with backward compatibility for cart
 */
export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: ApiCategory;
  images: string[];
}

/**
 * Cart item - extends Product with quantity
 */
export interface CartItem extends Product {
  quantity: number;
}
