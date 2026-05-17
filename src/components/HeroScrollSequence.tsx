'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import Link from 'next/link';

// ─── Particle dust (pure CSS, no JS) ─────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${8 + i * 7.5}%`,
    delay: `${(i * 0.4) % 3}s`,
    duration: `${3 + (i % 3)}s`,
    size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
    opacity: i % 4 === 0 ? 0.6 : 0.35,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#C5A059] bottom-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `floatUp ${p.duration} ${p.delay} infinite ease-in-out`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Thin connector label ─────────────────────────────────────────────────────
function ComponentLabel({
  label, x, y, opacity, side = 'right',
}: {
  label: string;
  x: string;
  y: string;
  opacity: MotionValue<number>;
  side?: 'left' | 'right';
}) {
  return (
    <motion.div
      style={{ opacity, position: 'absolute', top: y, left: x, zIndex: 30 }}
      className="flex items-center gap-2"
    >
      {side === 'left' && (
        <>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-semibold whitespace-nowrap">{label}</span>
          <div className="w-8 h-px bg-[#C5A059]/60" />
        </>
      )}
      {side === 'right' && (
        <>
          <div className="w-8 h-px bg-[#C5A059]/60" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-semibold whitespace-nowrap">{label}</span>
        </>
      )}
    </motion.div>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function HeroScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });

  // ── Watch core transforms ──────────────────────────────────────────────────
  const watchScale = useTransform(smooth, [0, 0.2, 0.45, 0.7, 1], [0.3, 1, 2.2, 1.0, 1.0]);
  const watchOpacity = useTransform(smooth, [0, 0.12], [0, 1]);
  const watchBlurNum = useTransform(smooth, [0, 0.2], [20, 0]);
  const watchFilter = useTransform(watchBlurNum, (v) => `blur(${v}px)`);

  // ── Beat 2 text ────────────────────────────────────────────────────────────
  const beat2Opacity = useTransform(smooth, [0.22, 0.35, 0.43, 0.46], [0, 1, 1, 0]);
  const beat2Y = useTransform(smooth, [0.22, 0.35], [40, 0]);

  // ── Beat 3: explode offsets ─────────────────────────────────────────────────
  const dialY = useTransform(smooth, [0.45, 0.68], [0, -80]);
  const strapTopY = useTransform(smooth, [0.45, 0.68], [0, -120]);
  const strapBotY = useTransform(smooth, [0.45, 0.68], [0, 120]);
  const caseScale = useTransform(smooth, [0.45, 0.68], [1, 1.15]);
  const caseOpacity = useTransform(smooth, [0.45, 0.68], [1, 0.35]);
  const handLRotate = useTransform(smooth, [0.45, 0.68], [0, -35]);
  const handRRotate = useTransform(smooth, [0.45, 0.68], [0, 35]);

  const beat3Opacity = useTransform(smooth, [0.5, 0.6, 0.67, 0.7], [0, 1, 1, 0]);

  // ── Beat 4: reassemble / CTA ───────────────────────────────────────────────
  const beat4Opacity = useTransform(smooth, [0.75, 0.88], [0, 1]);
  const beat4Y = useTransform(smooth, [0.75, 0.88], [30, 0]);
  const ctaOpacity = useTransform(smooth, [0.82, 0.95], [0, 1]);
  const ctaScale = useTransform(smooth, [0.82, 0.95], [0.85, 1]);

  // ── Labels opacity ─────────────────────────────────────────────────────────
  const labelOpacity = useTransform(smooth, [0.52, 0.62, 0.66, 0.7], [0, 1, 1, 0]);

  // ── Particle fade ──────────────────────────────────────────────────────────
  const particleOpacity = useTransform(smooth, [0, 0.15, 0.25], [1, 1, 0]);

  // ── Background: faint gold glow in beat2 ──────────────────────────────────
  const glowOpacity = useTransform(smooth, [0.2, 0.45, 0.5], [0, 0.18, 0]);

  return (
    /* Outer: 400vh scroll container */
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">

        {/* Ambient glow */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute w-[700px] h-[700px] rounded-full bg-[#C5A059] blur-[180px] pointer-events-none"
        />

        {/* Particles */}
        <motion.div style={{ opacity: particleOpacity }} className="absolute inset-0 pointer-events-none">
          <Particles />
        </motion.div>

        {/* ── Watch illustration layers ───────────────────────────────────── */}
        <motion.div
          style={{ scale: watchScale, filter: watchFilter, opacity: watchOpacity }}
          className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] flex items-center justify-center"
        >
          {/* STRAP TOP */}
          <motion.div
            style={{ y: strapTopY }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[80px] z-10"
          >
            <img
              src="/images/strap_black.png"
              alt="strap top"
              className="w-full h-full object-cover object-bottom"
              style={{ clipPath: 'inset(0 0 50% 0)' }}
            />
          </motion.div>

          {/* STRAP BOTTOM */}
          <motion.div
            style={{ y: strapBotY }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80px] h-[80px] z-10"
          >
            <img
              src="/images/strap_black.png"
              alt="strap bottom"
              className="w-full h-full object-cover object-top"
              style={{ clipPath: 'inset(50% 0 0 0)' }}
            />
          </motion.div>

          {/* CASE ring */}
          <motion.div
            style={{ scale: caseScale, opacity: caseOpacity }}
            className="absolute inset-0 z-20"
          >
            <img src="/images/watch_leather.png" alt="watch case" className="w-full h-full object-contain" />
          </motion.div>

          {/* DIAL overlay */}
          <motion.div
            style={{ y: dialY }}
            className="absolute inset-[12%] z-30"
          >
            {/* SVG dial face */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <radialGradient id="hero-dial" cx="40%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#1e1e1e" />
                  <stop offset="100%" stopColor="#080808" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="98" fill="url(#hero-dial)" />
              <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(197,160,89,0.3)" strokeWidth="0.8" />
              {/* Indices */}
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((a) => {
                const r = 80, rad = ((a - 90) * Math.PI) / 180;
                const x1 = 100 + Math.cos(rad) * r;
                const y1 = 100 + Math.sin(rad) * r;
                const x2 = 100 + Math.cos(rad) * (r - (a % 90 === 0 ? 12 : 7));
                const y2 = 100 + Math.sin(rad) * (r - (a % 90 === 0 ? 12 : 7));
                return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C5A059" strokeWidth={a % 90 === 0 ? 2.5 : 1.2} strokeLinecap="round" />;
              })}
              {/* Hour hand — 10:10 */}
              <line x1="100" y1="100" x2="67" y2="62" stroke="#f0f0f0" strokeWidth="5" strokeLinecap="round" />
              {/* Minute hand */}
              <line x1="100" y1="100" x2="133" y2="60" stroke="#f0f0f0" strokeWidth="3.5" strokeLinecap="round" />
              {/* Second hand */}
              <line x1="100" y1="100" x2="105" y2="148" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
              {/* Center cap */}
              <circle cx="100" cy="100" r="4" fill="#C5A059" />
            </svg>
          </motion.div>

          {/* HANDS (separate overlay for beat-3 animation) */}
          <motion.div
            style={{ rotate: handLRotate, y: dialY }}
            className="absolute inset-[12%] z-40 origin-center pointer-events-none opacity-0"
          />
        </motion.div>

        {/* ── Component labels (beat 3) ──────────────────────────────────── */}
        <ComponentLabel label="Dial" x="58%" y="28%" opacity={labelOpacity} side="right" />
        <ComponentLabel label="Case" x="18%" y="47%" opacity={labelOpacity} side="left" />
        <ComponentLabel label="Strap" x="58%" y="18%" opacity={labelOpacity} side="right" />
        <ComponentLabel label="Movement" x="15%" y="62%" opacity={labelOpacity} side="left" />

        {/* ── Beat 2 text: BUILT AROUND YOU ─────────────────────────────── */}
        <motion.div
          style={{ opacity: beat2Opacity, y: beat2Y }}
          className="absolute bottom-[18%] left-0 right-0 flex flex-col items-center pointer-events-none select-none"
        >
          <p className="text-white/80 text-xl md:text-3xl font-light tracking-[0.4em] uppercase">Built Around</p>
          <p className="text-[#C5A059] text-5xl md:text-8xl font-black tracking-tight uppercase leading-none">You.</p>
        </motion.div>

        {/* ── Beat 3 text: Every component. ─────────────────────────────── */}
        <motion.div
          style={{ opacity: beat3Opacity }}
          className="absolute bottom-[12%] left-0 right-0 flex flex-col items-center pointer-events-none select-none"
        >
          <p className="text-white/60 text-base md:text-xl font-light tracking-[0.25em] uppercase text-center px-4">
            Every component. <span className="text-white">Your choice.</span>
          </p>
        </motion.div>

        {/* ── Beat 4: Time, Redefined + CTA ─────────────────────────────── */}
        <motion.div
          style={{ opacity: beat4Opacity, y: beat4Y }}
          className="absolute bottom-[15%] left-0 right-0 flex flex-col items-center gap-6 pointer-events-none"
        >
          <p className="text-white text-3xl md:text-6xl font-light tracking-[0.1em] uppercase text-center">
            Time, <span className="text-[#C5A059] font-bold">Redefined.</span>
          </p>
          <motion.div style={{ opacity: ctaOpacity, scale: ctaScale }} className="pointer-events-auto">
            <Link
              href="#configurator"
              className="inline-flex items-center gap-3 bg-[#C5A059] text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#d4b570] hover:shadow-[0_0_40px_rgba(197,160,89,0.5)] transition-all duration-300"
            >
              Start Configuring →
            </Link>
          </motion.div>
        </motion.div>

        {/* Beat 1 scroll hint */}
        <motion.div
          style={{ opacity: useTransform(smooth, [0, 0.08, 0.18], [1, 1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/30">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
          />
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-none">
          {['', '', '', ''].map((_, i) => (
            <motion.div
              key={i}
              style={{
                opacity: useTransform(
                  smooth,
                  [i * 0.25, i * 0.25 + 0.05, (i + 1) * 0.25],
                  [0.2, 1, 0.2]
                ),
                scaleY: useTransform(
                  smooth,
                  [i * 0.25, i * 0.25 + 0.05, (i + 1) * 0.25],
                  [1, 1.8, 1]
                ),
              }}
              className="w-px h-6 bg-[#C5A059] rounded-full origin-center"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
