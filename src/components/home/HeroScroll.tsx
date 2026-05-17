'use client';

import React, { useRef } from 'react';
import { LazyMotion, domAnimation, m, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ─── Floating dust particles (pure CSS) ──────────────────────────────────── */
function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#C5A059] bottom-0"
          style={{
            left: `${6 + i * 8}%`,
            width: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
            height: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
            opacity: i % 4 === 0 ? 0.55 : 0.28,
            animation: `particle-float ${3 + (i % 3)}s ${(i * 0.38).toFixed(2)}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Component label with line connector ─────────────────────────────────── */
function Label({
  text, side = 'right', opacity,
}: {
  text: string;
  side?: 'left' | 'right';
  opacity: MotionValue<number>;
}) {
  return (
    <m.div style={{ opacity }} className={`flex items-center gap-2 ${side === 'left' ? 'flex-row-reverse' : ''}`}>
      <div className="h-px w-8 bg-[#C5A059]/50" />
      <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-[#C5A059] font-semibold whitespace-nowrap select-none">
        {text}
      </span>
    </m.div>
  );
}

/* ─── SVG Watch face ──────────────────────────────────────────────────────── */
function WatchFace() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="hd" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#1c1c1c" />
          <stop offset="100%" stopColor="#060606" />
        </radialGradient>
        <filter id="hand-drop">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.5" />
        </filter>
      </defs>
      {/* Dial base */}
      <circle cx="100" cy="100" r="98" fill="url(#hd)" />
      {/* Chapter ring */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(197,160,89,0.2)" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(197,160,89,0.12)" strokeWidth="0.4" />
      {/* Hour markers */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a) => {
        const isQuarter = a % 90 === 0;
        const r1 = 82, r2 = r1 - (isQuarter ? 14 : 8);
        const rad = ((a - 90) * Math.PI) / 180;
        return (
          <line key={a}
            x1={100 + Math.cos(rad) * r1} y1={100 + Math.sin(rad) * r1}
            x2={100 + Math.cos(rad) * r2} y2={100 + Math.sin(rad) * r2}
            stroke={isQuarter ? '#C5A059' : 'rgba(197,160,89,0.55)'}
            strokeWidth={isQuarter ? 2.5 : 1.2}
            strokeLinecap="round"
          />
        );
      })}
      {/* XII text */}
      <text x="100" y="38" textAnchor="middle" fontSize="9" fontFamily="Georgia,serif" fill="rgba(197,160,89,0.7)" fontWeight="bold">XII</text>
      {/* Brand */}
      <text x="100" y="72" textAnchor="middle" fontSize="7" fontFamily="'Helvetica Neue',sans-serif" fill="rgba(255,255,255,0.25)" letterSpacing="3">UH CUSTOM</text>
      {/* Hour hand — pointing to 10 */}
      <line x1="100" y1="100" x2="68" y2="63" stroke="#f0f0f0" strokeWidth="5.5" strokeLinecap="round" filter="url(#hand-drop)" />
      {/* Minute hand — pointing to 2 (10:10) */}
      <line x1="100" y1="100" x2="132" y2="62" stroke="#f0f0f0" strokeWidth="3.5" strokeLinecap="round" filter="url(#hand-drop)" />
      {/* Second hand */}
      <line x1="100" y1="110" x2="100" y2="44" stroke="#C5A059" strokeWidth="1.2" strokeLinecap="round" />
      {/* Center cap */}
      <circle cx="100" cy="100" r="4.5" fill="#C5A059" />
      <circle cx="100" cy="100" r="2" fill="#000" />
    </svg>
  );
}

/* ─── Main Hero Section ───────────────────────────────────────────────────── */
export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const prog = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.5 });

  /* watch core */
  const watchScale   = useTransform(prog, [0, 0.2, 0.45, 0.7, 1.0], [0.28, 1.0, 2.2, 1.0, 1.0]);
  const watchOpacity = useTransform(prog, [0, 0.1], [0, 1]);
  const watchBlurRaw = useTransform(prog, [0, 0.2], [20, 0]);
  const watchFilter  = useTransform(watchBlurRaw, (v) => `blur(${v}px)`);

  /* strap splits */
  const strapTopY = useTransform(prog, [0.45, 0.68, 0.72, 1], [0, -120, -120, 0]);
  const strapBotY = useTransform(prog, [0.45, 0.68, 0.72, 1], [0,  120,  120, 0]);

  /* case ring */
  const caseRingScale   = useTransform(prog, [0.45, 0.68, 0.72, 1], [1, 1.15, 1.15, 1]);
  const caseRingOpacity = useTransform(prog, [0.45, 0.68, 0.72, 1], [1, 0.3,  0.3,  1]);

  /* dial */
  const dialY = useTransform(prog, [0.45, 0.68, 0.72, 1], [0, -80, -80, 0]);

  /* labels */
  const labelOpacity = useTransform(prog, [0.5, 0.6, 0.67, 0.71], [0, 1, 1, 0]);

  /* beat texts */
  const beat2Opacity = useTransform(prog, [0.22, 0.32, 0.43, 0.46], [0, 1, 1, 0]);
  const beat2Y       = useTransform(prog, [0.22, 0.32], [40, 0]);
  const beat3Opacity = useTransform(prog, [0.5,  0.6,  0.67, 0.71], [0, 1, 1, 0]);
  const beat4Opacity = useTransform(prog, [0.75, 0.88], [0, 1]);
  const beat4Y       = useTransform(prog, [0.75, 0.88], [30, 0]);
  const ctaOpacity   = useTransform(prog, [0.84, 0.96], [0, 1]);
  const ctaScale     = useTransform(prog, [0.84, 0.96], [0.88, 1]);

  /* glow */
  const glowOp = useTransform(prog, [0.2, 0.42, 0.46], [0, 0.16, 0]);

  /* particle fade */
  const partOp = useTransform(prog, [0, 0.14, 0.22], [1, 1, 0]);

  /* scroll hint */
  const hintOp = useTransform(prog, [0, 0.07, 0.16], [1, 1, 0]);

  /* beat indicator dots */
  const makeDotOp = (i: number) =>
    useTransform(prog, [i * 0.25, i * 0.25 + 0.04, (i + 1) * 0.25], [0.18, 1, 0.18]);

  if (reduced) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-black px-4 text-center">
        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tight">Time, <span className="text-[#C5A059]">Redefined.</span></h2>
        <p className="text-white/50 mt-6 text-lg">Every detail. Your choice.</p>
        <Link href="#configurator" className="mt-10 inline-flex items-center gap-2 bg-[#C5A059] text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm">
          Start Configuring →
        </Link>
      </section>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      {/* 400vh scroll container */}
      <div ref={containerRef} style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">

          {/* Ambient gold glow */}
          <m.div style={{ opacity: glowOp }}
            className="absolute w-[600px] h-[600px] rounded-full bg-[#C5A059] blur-[160px] pointer-events-none" />

          {/* Particles */}
          <m.div style={{ opacity: partOp }} className="absolute inset-0 pointer-events-none">
            <Particles />
          </m.div>

          {/* ── Watch assembly ───────────────────────────────────────────── */}
          <m.div
            style={{ scale: watchScale, filter: watchFilter, opacity: watchOpacity }}
            className="relative w-[280px] h-[420px] md:w-[340px] md:h-[500px] flex flex-col items-center justify-center"
          >
            {/* STRAP TOP */}
            <m.div style={{ y: strapTopY }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[72px] h-[120px] z-10 overflow-hidden">
              <img src="/images/strap_black.png" alt="" className="w-full h-full object-cover object-bottom" style={{ objectPosition: 'bottom center' }} />
            </m.div>

            {/* CASE + DIAL — the center block */}
            <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] z-20 flex items-center justify-center">
              {/* Case ring */}
              <m.div style={{ scale: caseRingScale, opacity: caseRingOpacity }}
                className="absolute inset-0">
                <img src="/images/watch_leather.png" alt="Watch case" className="w-full h-full object-contain" />
              </m.div>
              {/* Dial face */}
              <m.div style={{ y: dialY }}
                className="absolute inset-[16%] z-10">
                <WatchFace />
              </m.div>
            </div>

            {/* STRAP BOTTOM */}
            <m.div style={{ y: strapBotY }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[72px] h-[120px] z-10 overflow-hidden">
              <img src="/images/strap_black.png" alt="" className="w-full h-full object-cover object-top" style={{ objectPosition: 'top center' }} />
            </m.div>
          </m.div>

          {/* ── Component labels (beat 3) ────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center hidden md:flex">
            <div className="relative w-[600px] h-[500px]">
              <m.div style={{ opacity: labelOpacity }} className="absolute top-[10%] right-[8%]">
                <Label text="Dial" opacity={labelOpacity} />
              </m.div>
              <m.div style={{ opacity: labelOpacity }} className="absolute top-[45%] left-[2%]">
                <Label text="Case" side="left" opacity={labelOpacity} />
              </m.div>
              <m.div style={{ opacity: labelOpacity }} className="absolute top-[5%] left-[12%]">
                <Label text="Strap" side="left" opacity={labelOpacity} />
              </m.div>
              <m.div style={{ opacity: labelOpacity }} className="absolute bottom-[12%] left-[4%]">
                <Label text="Movement" side="left" opacity={labelOpacity} />
              </m.div>
            </div>
          </div>

          {/* ── Beat 2: BUILT AROUND YOU ────────────────────────────────── */}
          <m.div style={{ opacity: beat2Opacity, y: beat2Y }}
            className="absolute bottom-[16%] left-0 right-0 flex flex-col items-center pointer-events-none select-none px-4">
            <p className="text-white/75 text-lg md:text-3xl font-light tracking-[0.45em] uppercase">Built Around</p>
            <p className="text-[#C5A059] text-5xl md:text-8xl font-black tracking-tight uppercase leading-none">You.</p>
          </m.div>

          {/* ── Beat 3: Every component ──────────────────────────────────── */}
          <m.div style={{ opacity: beat3Opacity }}
            className="absolute bottom-[10%] left-0 right-0 flex flex-col items-center pointer-events-none select-none px-4">
            <p className="text-white/55 text-sm md:text-lg font-light tracking-[0.28em] uppercase text-center">
              Every component. <span className="text-white font-normal">Your choice.</span>
            </p>
          </m.div>

          {/* ── Beat 4: Time Redefined + CTA ─────────────────────────────── */}
          <m.div style={{ opacity: beat4Opacity, y: beat4Y }}
            className="absolute bottom-[14%] left-0 right-0 flex flex-col items-center gap-7 pointer-events-none px-4">
            <div className="text-center">
              <p className="text-white/60 text-xl md:text-4xl font-thin tracking-[0.18em] uppercase">Time,</p>
              <p className="text-[#C5A059] text-4xl md:text-7xl font-bold tracking-tight uppercase leading-none">Redefined.</p>
            </div>
            <m.div style={{ opacity: ctaOpacity, scale: ctaScale }} className="pointer-events-auto">
              <Link href="#configurator"
                className="inline-flex items-center gap-3 bg-[#C5A059] text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#d4b570] hover:shadow-[0_0_40px_rgba(197,160,89,0.45)] transition-all duration-300">
                Start Configuring →
              </Link>
            </m.div>
          </m.div>

          {/* ── Scroll hint ──────────────────────────────────────────────── */}
          <m.div style={{ opacity: hintOp }}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none">
            <span className="text-[9px] tracking-[0.45em] uppercase text-white/25">Scroll to explore</span>
            <m.div animate={{ y: [0, 9, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-7 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          </m.div>

          {/* ── Beat progress dots ───────────────────────────────────────── */}
          <div className="absolute right-5 md:right-7 top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <m.div key={i} style={{ opacity: makeDotOp(i), scaleY: useTransform(prog, [i * 0.25, i * 0.25 + 0.05, (i + 1) * 0.25], [1, 2, 1]) }}
                className="w-[2px] h-5 bg-[#C5A059] rounded-full origin-center" />
            ))}
          </div>

        </div>
      </div>
    </LazyMotion>
  );
}
