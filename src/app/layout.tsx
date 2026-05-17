import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'UH Custom Watches — Time, Redefined.',
  description: 'Design your bespoke handcrafted timepiece. Every detail. Your choice. COD available across Pakistan.',
  openGraph: {
    title: 'UH Custom Watches — Time, Redefined.',
    description: 'Bespoke timepieces built to your exact specification.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-black text-white selection:bg-[#C5A059] selection:text-black overflow-x-hidden">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
