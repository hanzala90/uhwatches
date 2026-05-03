import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'UH Custom Watches - Time, Redefined',
  description: 'Design your custom minimalist watch completely from case to core.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-black flex flex-col text-white selection:bg-[#C5A059] selection:text-black mt-0 pt-0">
        <Navbar />
        <main className="flex-1 flex flex-col pointer-events-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
