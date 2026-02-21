import { Navbar } from '@/components/layout/Navbar';

/**
 * Cart Page Component
 * 
 * Displays the shopping cart with items
 */
export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-600">Your cart is currently empty</p>
          <p className="text-sm text-gray-500 mt-2">Add some awesome kicks to get started!</p>
        </div>
      </main>
    </div>
  );
}
