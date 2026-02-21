'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductImage } from '@/components/products/ProductImage';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatPrice } from '@/lib/format';
import { ROUTES } from '@/lib/constants';

/**
 * Cart page - displays cart items from Redux store
 */
export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleUpdateQuantity = (id: number, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const newQty = Math.max(0, item.quantity + delta);
    if (newQty === 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  return (
    <PageLayout>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

      {items.length === 0 && (
        <EmptyState
          message="Your cart is empty"
          description="Add some products to get started."
        />
      )}

      {items.length > 0 && (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
                  <ProductImage product={item} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={ROUTES.productById(item.id)}
                    className="font-medium text-gray-900 hover:underline line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 text-sm text-gray-500">{item.category?.name}</p>
                  <p className="mt-2 font-semibold text-gray-900">{formatPrice(item.price)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 rounded border border-gray-200">
                    <button
                      type="button"
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      className="p-2 hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2ch] px-2 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                      className="p-2 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-600 hover:text-red-700"
                    aria-label="Remove from cart"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full shrink-0 lg:w-80">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>
                <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 font-semibold text-gray-900">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              <Link
                href={ROUTES.home}
                className="mt-4 block w-full rounded-md bg-gray-900 py-3 text-center text-white hover:bg-gray-800"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
