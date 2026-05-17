'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 120);
      setLastY(y);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [lastY]);

  return (
    <LazyMotion features={domAnimation}>
      <m.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/85 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <nav className="w-full max-w-7xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1 group">
            <span className="text-[#C5A059] text-lg font-black tracking-tight">UH</span>
            <span className="text-white text-sm font-light tracking-[0.3em] uppercase">Custom</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10 text-[10px] font-semibold tracking-[0.35em] uppercase text-white/45">
            <Link href="/collection" className="hover:text-white transition-colors duration-200">Collection</Link>
            <Link href="/craftsmanship" className="hover:text-white transition-colors duration-200">Craftsmanship</Link>
            <Link href="#configurator" className="hover:text-white transition-colors duration-200">Configure</Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#configurator"
              className="text-[10px] font-bold tracking-[0.3em] uppercase bg-[#C5A059] text-black px-5 py-2.5 rounded-full hover:bg-[#d4b570] transition-all duration-200"
            >
              Start Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/70 hover:text-white p-2"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 px-6 py-8 flex flex-col gap-6"
          >
            {[
              { href: '/collection', label: 'Collection' },
              { href: '/craftsmanship', label: 'Craftsmanship' },
              { href: '#configurator', label: 'Configure' },
            ].map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-white/60 text-sm tracking-[0.3em] uppercase font-medium hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="#configurator" onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex justify-center bg-[#C5A059] text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest">
              Start Configuring →
            </Link>
          </m.div>
        )}
      </m.header>
    </LazyMotion>
  );
}
