/**
 * Product interface
 * Represents a product in the store
 */
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

/**
 * Cart item interface
 * Extends Product with quantity and selected options
 */
export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
