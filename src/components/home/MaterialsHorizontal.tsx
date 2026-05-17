'use client';

import React, { useRef, useEffect, useState } from 'react';
import { LazyMotion, domAnimation, m, useScroll, useTransform, useInView, animate } from 'framer-motion';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ─── Animated number counter ────────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.8, ease: 'easeOut',
      onUpdate(v) { if (ref.current) ref.current.textContent = Math.round(v) + suffix; },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Typewriter effect ───────────────────────────────────────────────────── */
function Typewriter({ phrases }: { phrases: string[] }) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[idx];
    const speed = isDeleting ? 45 : 90;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (display.length < phrase.length) {
          setDisplay(phrase.slice(0, display.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        if (display.length > 0) {
          setDisplay(display.slice(0, -1));
        } else {
          setIsDeleting(false);
          setIdx((i) => (i + 1) % phrases.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [display, isDeleting, idx, phrases]);

  return (
    <span className="border-r-2 border-[#C5A059] pr-1 text-[#C5A059]">
      {display || '\u00A0'}
    </span>
  );
}

/* ─── Panel definitions ───────────────────────────────────────────────────── */
const DIAL_IMAGES = [
  '/images/dial_black.png',
  '/images/dial_silver.png',
  '/images/dial_blue.png',
  '/images/dial_gold.png',
  '/images/dial_carbon.png',
  '/images/dial_skeleton.png',
  '/images/dial_white.png',
  '/images/dial_black.png',
  '/images/dial_silver.png',
  '/images/dial_blue.png',
  '/images/dial_gold.png',
  '/images/dial_carbon.png',
  '/images/dial_skeleton.png',
  '/images/dial_white.png',
  '/images/dial_black.png',
  '/images/dial_silver.png',
];

/* ─── Panel 1: Leather ───────────────────────────────────────────────────── */
function PanelLeather() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center" style={{ background: '#1A0E08' }}>
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        {/* Left text */}
        <div className="space-y-6">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#C5A059]">01 — Material</p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none uppercase">
            Hand-<br />Stitched<br /><span className="text-[#C5A059]">Leather</span>
          </h2>
          <p className="text-white/45 text-sm md:text-base font-light leading-relaxed max-w-xs">
            Vegetable-tanned full-grain leather, hand-stitched with waxed thread. Ages beautifully — like a good story.
          </p>
          {/* SVG stitch animation */}
          <svg viewBox="0 0 200 20" className="w-48 h-5">
            <m.path
              d="M0,10 Q10,2 20,10 Q30,18 40,10 Q50,2 60,10 Q70,18 80,10 Q90,2 100,10 Q110,18 120,10 Q130,2 140,10 Q150,18 160,10 Q170,2 180,10 Q190,18 200,10"
              fill="none" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>
        </div>
        {/* Right image */}
        <m.div ref={ref}
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-64 md:h-[420px] rounded-3xl overflow-hidden border border-white/5"
        >
          <Image src="/images/strap_black.png" alt="Leather strap" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1A0E08]/60" />
        </m.div>
      </div>
    </div>
  );
}

/* ─── Panel 2: Sapphire ──────────────────────────────────────────────────── */
function PanelSapphire() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center" style={{ background: '#040810' }}>
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        <div className="space-y-6">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#C5A059]">02 — Crystal</p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none uppercase">
            Scratch-<br />Proof<br /><span className="text-[#C5A059]">Sapphire</span>
          </h2>
          <p className="text-white/45 text-sm md:text-base font-light leading-relaxed max-w-xs">
            Hardness rated 9 on the Mohs scale. Only a diamond can scratch it.
          </p>
          {/* Mohs counter */}
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black text-[#C5A059]">
              <Counter to={9} />
            </span>
            <span className="text-white/40 text-sm tracking-widest uppercase">/ 10 Mohs Scale</span>
          </div>
          {/* Light ray SVG */}
          <svg ref={svgRef} viewBox="0 0 200 60" className="w-40 h-8 overflow-visible" aria-hidden>
            {[0,15,30,45,60].map((angle, i) => (
              <m.line key={i}
                x1="0" y1="30" x2="200" y2="30"
                stroke="rgba(197,220,255,0.3)" strokeWidth="1"
                style={{ transform: `rotate(${angle - 30}deg)`, transformOrigin: '0 30px' }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: i * 0.12 }}
              />
            ))}
          </svg>
        </div>
        <m.div
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative h-64 md:h-[420px] rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at center, #0a1628 0%, #010408 100%)' }}
        >
          <Image src="/images/glass_sapphire.png" alt="Sapphire crystal" fill className="object-cover opacity-60" />
          {/* Light gleam overlay */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, transparent 30%, rgba(150,200,255,0.15) 50%, transparent 70%)',
          }} />
        </m.div>
      </div>
    </div>
  );
}

/* ─── Panel 3: Movement ──────────────────────────────────────────────────── */
function PanelMovement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center" style={{ background: '#080808' }}>
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        <div className="space-y-6">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#C5A059]">03 — Movement</p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none uppercase">
            Swiss-<br />Grade<br /><span className="text-[#C5A059]">Movement</span>
          </h2>
          <p className="text-white/45 text-sm md:text-base font-light leading-relaxed max-w-xs">
            Choose from precision quartz, mechanical hand-wind, or self-winding automatic — each assembled with surgical care.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Quartz', 'Mechanical', 'Automatic'].map(t => (
              <span key={t} className="text-[10px] tracking-widest uppercase border border-[#C5A059]/30 text-[#C5A059]/70 px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>
        {/* Rotating movement image */}
        <m.div ref={ref}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-64 md:h-[420px] rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center bg-[#0a0a0a]"
        >
          <div style={{ animation: 'spin-slow 20s linear infinite' }} className="relative w-64 h-64">
            <Image src="/images/movement_automatic.png" alt="Watch movement" fill className="object-contain opacity-80" />
          </div>
          {/* Gear tooth SVG overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
            <m.circle cx="50%" cy="50%" r="100"
              fill="none" stroke="rgba(197,160,89,0.12)" strokeWidth="1"
              strokeDasharray="8 4"
              initial={{ pathLength: 0, rotate: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </svg>
        </m.div>
      </div>
    </div>
  );
}

/* ─── Panel 4: Dial Grid ─────────────────────────────────────────────────── */
function PanelDials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [activeSet, setActiveSet] = useState(DIAL_IMAGES.slice(0, 16));

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setActiveSet(prev => {
        const next = [...prev];
        const swapIdx = Math.floor(Math.random() * 16);
        const randomImg = DIAL_IMAGES[Math.floor(Math.random() * DIAL_IMAGES.length)];
        next[swapIdx] = randomImg;
        return next;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center" style={{ background: '#060606' }}>
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        <div className="space-y-6">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#C5A059]">04 — Dial</p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none uppercase">
            200+<br /><span className="text-[#C5A059]">Combos</span>
          </h2>
          <p className="text-white/45 text-sm md:text-base font-light leading-relaxed max-w-xs">
            Mix dials, hands, case shapes, and colors into your perfect configuration. No two watches are the same.
          </p>
        </div>
        {/* Animated dial grid */}
        <div ref={ref} className="grid grid-cols-4 gap-2 max-w-xs md:max-w-sm mx-auto md:mx-0">
          {activeSet.map((src, i) => (
            <m.div key={`${src}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-square rounded-xl overflow-hidden border border-white/5 bg-[#111]"
            >
              <Image src={src} alt="Dial" width={80} height={80} className="w-full h-full object-cover" />
            </m.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Panel 5: Engraving ─────────────────────────────────────────────────── */
function PanelEngraving() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const fonts = ['Minimal', 'Cursive', 'Serif'];

  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center" style={{ background: '#050505' }}>
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-center text-center gap-10 h-full justify-center">
        <p className="text-[10px] tracking-[0.45em] uppercase text-[#C5A059]">05 — Engraving</p>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none uppercase">
          Your Words.<br /><span className="text-[#C5A059]">Your Legacy.</span>
        </h2>
        <p className="text-white/40 text-sm font-light max-w-md">
          Add a personal message to the caseback. A date. A name. A promise.
        </p>
        {/* Typewriter input */}
        <div ref={ref}
          className="w-full max-w-md border border-white/10 rounded-2xl px-6 py-5 bg-white/3 text-left font-mono text-lg text-white/80 backdrop-blur-sm">
          <span className="text-white/30 text-xs tracking-widest uppercase block mb-2">Engraving Preview</span>
          <Typewriter phrases={['UH WATCHES', 'FOR MY FATHER', 'BORN 2024', "UMAIR'S LEGACY"]} />
        </div>
        {/* Font options */}
        <m.div className="flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}>
          {fonts.map((f, i) => (
            <m.button key={f}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="border border-white/10 text-white/60 px-5 py-2 rounded-full text-sm tracking-widest uppercase hover:border-[#C5A059]/50 hover:text-[#C5A059] transition-all duration-300"
            >
              {f}
            </m.button>
          ))}
        </m.div>
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function MaterialsHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-400vw']);

  if (reduced) {
    return (
      <section className="space-y-24 py-24 px-6 max-w-4xl mx-auto">
        {['Leather', 'Sapphire', 'Movement', 'Dials', 'Engraving'].map(t => (
          <div key={t} className="border-t border-white/5 pt-8">
            <h3 className="text-3xl font-black text-[#C5A059] uppercase">{t}</h3>
          </div>
        ))}
      </section>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      {/* mobile: vertical stack */}
      <div className="md:hidden flex flex-col">
        <PanelLeather />
        <PanelSapphire />
        <PanelMovement />
        <PanelDials />
        <PanelEngraving />
      </div>

      {/* desktop: horizontal pin */}
      <div ref={containerRef} className="hidden md:block" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <m.div
            style={{ x, willChange: 'transform' }}
            className="flex w-[500vw]"
          >
            <PanelLeather />
            <PanelSapphire />
            <PanelMovement />
            <PanelDials />
            <PanelEngraving />
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}
