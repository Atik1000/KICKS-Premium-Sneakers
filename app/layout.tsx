import { Inter, Rubik } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { metadata as siteMetadata, viewport as siteViewport } from '@/lib/metadata';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const rubik = Rubik({ subsets: ['latin'], weight: ['600'], variable: '--font-rubik' });

// Export metadata and viewport from centralized config
export const metadata = siteMetadata;
export const viewport = siteViewport;

/**
 * Root Layout Component
 * 
 * Wraps the entire application with:
 * - Redux state management provider
 * - Global font configuration
 * - Consistent HTML structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${rubik.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
