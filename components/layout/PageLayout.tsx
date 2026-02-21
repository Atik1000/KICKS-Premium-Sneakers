import { Navbar } from './Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Standard page layout with navbar
 * @param fullWidth - If true, children are not wrapped in max-width container
 */
export function PageLayout({ children, fullWidth = false }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {fullWidth ? (
        <main>{children}</main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      )}
    </div>
  );
}
