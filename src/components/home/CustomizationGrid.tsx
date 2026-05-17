'use client';

import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

const CATEGORIES = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="12" />
        <rect x="9" y="9" width="14" height="14" rx="2" />
        <circle cx="16" cy="16" r="4" />
      </svg>
    ),
    name: 'Case Shape',
    desc: 'The silhouette of your timepiece',
    tags: ['Round', 'Square', 'Octagonal', 'Oct-Round'],
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="11" />
        <circle cx="16" cy="16" r="5" />
        <line x1="16" y1="5" x2="16" y2="9" />
        <line x1="16" y1="23" x2="16" y2="27" />
        <line x1="5" y1="16" x2="9" y2="16" />
        <line x1="23" y1="16" x2="27" y2="16" />
        <line x1="16" y1="16" x2="16" y2="10" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="16" y1="16" x2="21" y2="13" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: 'Dial',
    desc: 'The face that tells your story',
    tags: ['Black', 'Silver', 'Navy', 'Cream', 'Teal'],
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="9" />
        <circle cx="16" cy="16" r="4" />
        <path d="M16 7 A9 9 0 0 1 25 16" strokeDasharray="3 2" />
        <path d="M16 25 A9 9 0 0 1 7 16" strokeDasharray="3 2" />
      </svg>
    ),
    name: 'Movement',
    desc: 'The soul that powers the hands',
    tags: ['Quartz', 'Mechanical', 'Automatic'],
  },
  {
    num: '04',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="10" width="20" height="14" rx="3" />
        <path d="M10 10 V8 Q10 6 12 6 H20 Q22 6 22 8 V10" />
        <line x1="6" y1="17" x2="26" y2="17" strokeOpacity="0.4" />
      </svg>
    ),
    name: 'Strap',
    desc: 'Comfort meets character',
    tags: ['Leather', 'Metal', 'Sports Rubber'],
  },
  {
    num: '05',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="11" />
        <path d="M10 20 Q13 12 16 14 Q19 16 22 12" strokeLinecap="round" />
      </svg>
    ),
    name: 'Case Color',
    desc: 'Silver, gold, black, or rose',
    tags: ['Silver', 'Gold', 'Black', 'Rose Gold'],
  },
  {
    num: '06',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 24 L12 20 L20 12 L26 18 L18 26 Z" />
        <path d="M20 12 L26 6 L30 10 L24 16" />
        <line x1="8" y1="24" x2="4" y2="28" strokeOpacity="0.4" />
      </svg>
    ),
    name: 'Engraving',
    desc: 'Your words, laser-etched forever',
    tags: ['Minimal', 'Cursive', 'Serif'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function CustomizationGrid() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-24 md:py-36 px-6 max-w-7xl mx-auto">
        {/* Heading */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 max-w-xl"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#C5A059] mb-4">Every Detail</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">
            Your Choice.
          </h2>
          <p className="text-white/40 mt-4 text-sm md:text-base font-light leading-relaxed">
            Six dimensions of customization. Infinite combinations.
          </p>
        </m.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <m.div
              key={cat.num}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6, boxShadow: '0 0 40px rgba(197,160,89,0.08)', transition: { duration: 0.25 } }}
              className="group relative h-[320px] rounded-[20px] border border-white/6 bg-[#111] p-7 flex flex-col justify-between overflow-hidden cursor-default"
            >
              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-[20px] border border-transparent group-hover:border-[#C5A059]/40 transition-colors duration-300 pointer-events-none" />

              {/* Top: number */}
              <div className="text-[60px] leading-none font-thin text-[#C5A059]/20 select-none group-hover:text-[#C5A059]/35 transition-colors duration-300">
                {cat.num}
              </div>

              {/* Middle */}
              <div className="space-y-3">
                <div className="text-white/50 group-hover:text-[#C5A059] transition-colors duration-300">
                  {cat.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm tracking-widest uppercase">{cat.name}</p>
                  <p className="text-white/35 text-xs mt-1 font-light">{cat.desc}</p>
                </div>
              </div>

              {/* Bottom: tags */}
              <m.div
                className="flex flex-wrap gap-1.5 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
              >
                {cat.tags.map((tag) => (
                  <span key={tag}
                    className="text-[9px] tracking-widest uppercase border border-white/8 text-white/30 px-2.5 py-1 rounded-full group-hover:border-[#C5A059]/25 group-hover:text-[#C5A059]/60 transition-all duration-300">
                    {tag}
                  </span>
                ))}
              </m.div>

              {/* Background glow */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#C5A059] blur-3xl opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none" />
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
