'use client';

import React, { useRef } from 'react';
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Choose Foundation',
    desc: 'Case shape, strap type, and base material.',
    time: '~2 min',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="20" cy="20" r="14" />
        <rect x="12" y="12" width="16" height="16" rx="2" />
        <circle cx="20" cy="20" r="4" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Define Details',
    desc: 'Dial, movement, glass type, and hands.',
    time: '~5 min',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="20" cy="20" r="12" />
        <line x1="20" y1="20" x2="20" y2="10" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="20" x2="27" y2="15" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'We Build It',
    desc: 'Handcrafted and delivered to your door.',
    time: '~72 hrs',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M8 20 L16 28 L32 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function Step({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center gap-6 relative"
    >
      {/* Number */}
      <m.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-[72px] leading-none font-thin text-[#C5A059]/15 select-none absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        {step.num}
      </m.div>

      {/* Icon circle */}
      <div className="relative z-10 w-16 h-16 rounded-full border border-[#C5A059]/25 bg-[#C5A059]/5 flex items-center justify-center text-[#C5A059] mt-8">
        {step.icon}
        {/* Animated ring */}
        <m.div
          className="absolute inset-0 rounded-full border border-[#C5A059]/20"
          initial={{ scale: 1, opacity: 0 }}
          animate={inView ? { scale: 1.5, opacity: 0 } : {}}
          transition={{ duration: 1.5, delay: index * 0.15 + 0.2, repeat: Infinity, repeatDelay: 1.5 }}
        />
      </div>

      {/* Content */}
      <div className="space-y-2 z-10">
        <p className="text-white font-semibold text-base tracking-wide">{step.title}</p>
        <p className="text-white/40 text-sm font-light max-w-[180px] leading-relaxed">{step.desc}</p>
        <span className="inline-block text-[#C5A059] text-[10px] tracking-[0.3em] uppercase border border-[#C5A059]/20 px-3 py-1 rounded-full">
          {step.time}
        </span>
      </div>
    </m.div>
  );
}

function ConnectorLine({ index }: { index: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <svg ref={ref} viewBox="0 0 120 2" className="w-24 hidden lg:block mt-12" preserveAspectRatio="none" aria-hidden>
      <m.line
        x1="0" y1="1" x2="120" y2="1"
        stroke="rgba(197,160,89,0.25)" strokeWidth="1"
        strokeDasharray="4 3"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, delay: index * 0.2 + 0.3, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-24 md:py-36 px-6 bg-[#060606] border-t border-b border-white/4">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20 md:mb-28"
          >
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#C5A059] mb-4">Process</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">
              How It Works.
            </h2>
            <p className="text-white/35 mt-4 text-sm font-light">Simple. Clear. Built for you.</p>
          </m.div>

          {/* Steps row */}
          <div className="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-0">
            {STEPS.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="flex-1 max-w-[260px] mx-auto lg:mx-0">
                  <Step step={step} index={i} />
                </div>
                {i < STEPS.length - 1 && <ConnectorLine index={i} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
