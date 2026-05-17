import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 relative z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-1">
            <span className="text-[#C5A059] text-lg font-black tracking-tight">UH</span>
            <span className="text-white text-sm font-light tracking-[0.3em] uppercase">Custom</span>
          </div>
          <p className="text-white/25 text-xs font-light leading-relaxed max-w-xs">
            Bespoke timepieces crafted to your exact specification. Every detail. Your choice.
          </p>
          <p className="text-white/15 text-[10px] tracking-[0.3em] uppercase">
            Crafted in Islamabad. Built for you.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-5">Explore</p>
          {[
            { href: '#configurator', label: 'Configure Your Watch' },
            { href: '/collection', label: 'Collection' },
            { href: '/craftsmanship', label: 'Craftsmanship' },
            { href: '/checkout', label: 'Pre-Order' },
          ].map(l => (
            <div key={l.href}>
              <Link href={l.href} className="text-white/35 text-xs tracking-widest uppercase hover:text-[#C5A059] transition-colors duration-200">
                {l.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Trust */}
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-5">Our Promise</p>
          {['COD Available across Pakistan', '72-hour handcrafted build', 'Custom laser engraving', 'Direct from maker — no middleman'].map(t => (
            <div key={t} className="flex items-center gap-2">
              <span className="text-[#C5A059] text-xs">✦</span>
              <span className="text-white/30 text-xs font-light">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/4 px-6 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/15 text-[10px] tracking-widest uppercase">© 2026 UH Custom Watches. All rights reserved.</p>
        <p className="text-white/10 text-[10px] tracking-widest uppercase">COD · 72hr Build · Custom Engraving</p>
      </div>
    </footer>
  );
}
