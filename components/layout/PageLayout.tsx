import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Standard page layout with navbar and footer
 * @param fullWidth - If true, children are not wrapped in max-width container
 */
export function PageLayout({ children, fullWidth = false }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#E7E7E3]">
      <Navbar />
      {fullWidth ? (
        <main className="flex-1">{children}</main>
      ) : (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      )}
      <Footer />
    </div>
  );
}
