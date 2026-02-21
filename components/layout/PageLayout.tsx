import { Navbar } from './Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 * Standard page layout with navbar
 */
export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
