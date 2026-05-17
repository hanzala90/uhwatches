'use client';

import React, { useState } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useWatchStore, CaseColor } from '@/store/useWatchStore';

// Dynamically import the heavy SVG preview
const WatchPreviewSVG = dynamic(() => import('@/components/WatchPreviewSVG'), { ssr: false, loading: () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-12 h-12 rounded-full border-2 border-[#C5A059]/30 border-t-[#C5A059] animate-spin" />
  </div>
) });

const DIALS = [
  { id: 'black',  url: '/images/dial_black.png',  label: 'Black Roman' },
  { id: 'silver', url: '/images/dial_silver.png', label: 'Silver Sport' },
  { id: 'blue',   url: '/images/dial_blue.png',   label: 'Navy Blue' },
  { id: 'gold',   url: '/images/dial_gold.png',   label: 'Gold Edition' },
];

const CASE_COLORS: { id: CaseColor; color: string; label: string }[] = [
  { id: 'silver',   color: '#C0C0C0', label: 'Silver' },
  { id: 'gold',     color: '#C5A059', label: 'Gold' },
  { id: 'black',    color: '#1a1a1a', label: 'Black' },
  { id: 'rose-gold',color: '#B76E79', label: 'Rose' },
];

export default function ConfiguratorTeaser() {
  const { setDialURL, setCaseColor } = useWatchStore();
  const [activeDial, setActiveDial] = useState(DIALS[0].id);
  const [activeColor, setActiveColor] = useState<string>('silver');

  const handleDial = (dial: typeof DIALS[0]) => {
    setActiveDial(dial.id);
    setDialURL(dial.url);
  };

  const handleColor = (c: { id: CaseColor; color: string; label: string }) => {
    setActiveColor(c.id);
    setCaseColor(c.id);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-24 md:py-36 px-6 max-w-7xl mx-auto">
        {/* Heading */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#C5A059] mb-4">Live Preview</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">
            See It Before<br />You Build It.
          </h2>
          <p className="text-white/40 mt-4 text-sm font-light">
            Tap a dial or color to preview your watch in real time.
          </p>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Watch preview */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden border border-white/6 bg-[#0d0d0d] flex items-center justify-center"
          >
            <WatchPreviewSVG />
          </m.div>

          {/* Right: Controls */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="space-y-8"
          >
            {/* Dial picker */}
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/40">Choose Dial</p>
              <div className="grid grid-cols-2 gap-3">
                {DIALS.map((dial) => (
                  <button
                    key={dial.id}
                    onClick={() => handleDial(dial)}
                    className={`relative h-28 rounded-xl overflow-hidden border-2 transition-all duration-300 group ${
                      activeDial === dial.id
                        ? 'border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.35)] scale-[1.03]'
                        : 'border-white/8 opacity-65 hover:opacity-100 hover:border-white/20'
                    }`}
                    style={{ backgroundImage: `url(${dial.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    {activeDial === dial.id && (
                      <div className="absolute top-2 left-2">
                        <CheckCircle2 size={16} className="text-[#C5A059]" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
                      <p className="text-white text-[11px] font-semibold">{dial.label}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Case color picker */}
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/40">Case Color</p>
              <div className="flex gap-3">
                {CASE_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleColor(c)}
                    title={c.label}
                    className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                      activeColor === c.id ? 'scale-110' : 'opacity-55 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full border-2 transition-all duration-300 shadow-lg ${
                        activeColor === c.id ? 'border-white shadow-[0_0_12px_rgba(255,255,255,0.3)]' : 'border-white/20'
                      }`}
                      style={{ background: c.color }}
                    />
                    <span className="text-[9px] text-white/40 uppercase tracking-widest">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-white/5">
              <Link
                href="#configurator"
                className="inline-flex items-center gap-3 bg-[#C5A059] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#d4b570] hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] transition-all duration-300 group"
              >
                Configure the Full Watch
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
              <p className="text-white/25 text-[11px] mt-3 tracking-wide">
                10,000+ possible configurations
              </p>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
