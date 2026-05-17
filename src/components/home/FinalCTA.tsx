'use client';

import React, { useRef } from 'react';
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion';
import Link from 'next/link';

const WORDS_1 = 'YOUR WATCH.'.split('');
const WORDS_2 = 'YOUR RULES.'.split('');

function SplitText({ chars, delay = 0, className = '' }: { chars: string[]; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className={`flex flex-wrap justify-center ${className}`} aria-hidden>
      {chars.map((ch, i) => (
        <m.span
          key={i}
          initial={{ y: 80, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: delay + i * 0.03, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={ch === ' ' ? 'mr-4' : ''}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </m.span>
      ))}
    </div>
  );
}

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={ref}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, #111 0%, #000 75%)' }}
      >
        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
          {[200, 380, 560, 740].map((r, i) => (
            <m.div
              key={i}
              className="absolute rounded-full border border-white/[0.03]"
              style={{ width: r, height: r }}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>

        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
          <div className="w-[500px] h-[500px] rounded-full bg-[#C5A059] blur-[200px] opacity-[0.05]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-8 max-w-4xl">
          {/* Line 1 */}
          <div className="overflow-hidden">
            <SplitText
              chars={WORDS_1}
              delay={0}
              className="text-5xl md:text-8xl lg:text-9xl font-thin text-white tracking-tight leading-none"
            />
          </div>
          {/* Line 2 */}
          <div className="overflow-hidden">
            <SplitText
              chars={WORDS_2}
              delay={0.08}
              className="text-5xl md:text-8xl lg:text-9xl font-thin text-[#C5A059] tracking-tight leading-none"
            />
          </div>

          {/* Subtext */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/35 text-sm md:text-base font-light tracking-wide max-w-md mx-auto"
          >
            Configure every detail from case to crown.
          </m.p>

          {/* Buttons */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="#configurator"
              className="inline-flex items-center gap-3 bg-[#C5A059] text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#d4b570] hover:shadow-[0_0_40px_rgba(197,160,89,0.45)] transition-all duration-300 group"
            >
              Start Configuring
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 border border-white/15 text-white/70 px-10 py-4 rounded-full font-medium uppercase tracking-widest text-sm hover:border-white/40 hover:text-white transition-all duration-300"
            >
              View Collection
            </Link>
          </m.div>

          {/* Trust signals */}
          <m.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-6"
          >
            {['COD Available', '72hr Build', 'Custom Engraving'].map((t, i) => (
              <m.div
                key={t}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-2 text-white/30 text-xs tracking-widest uppercase"
              >
                <span className="text-[#C5A059]">✦</span>
                {t}
              </m.div>
            ))}
          </m.div>
        </div>

        {/* Bottom tagline */}
        <m.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 text-[10px] text-white/15 tracking-[0.45em] uppercase select-none"
        >
          Crafted in Islamabad. Built for you.
        </m.p>
      </section>
    </LazyMotion>
  );
}
