import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QueryProvider from '@/providers/QueryProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LuxeShop | Premium E-commerce',
  description: 'Experience luxury shopping with cutting-edge design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen`}>
        <QueryProvider>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
