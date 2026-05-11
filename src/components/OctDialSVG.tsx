'use client';
// ─── Octagonal Dial SVG Components ───────────────────────────────────────────
// Each dial is drawn in pure SVG, matching the reference images from
// public/images/Ocatagonal-round/
// All dials are designed for a 220×220 viewBox centered at (0,0)
// The parent WatchPreviewSVG positions/clips them.

import React from 'react';

// ─── Shared helpers ───────────────────────────────────────────────────────────

/** Horizontal engraved grooves pattern — shared across 4 dials */
function Grooves({ w, h, color = 'rgba(255,255,255,0.05)' }: { w: number; h: number; color?: string }) {
  const lines = [];
  for (let y = -h / 2 + 4; y < h / 2; y += 4.5) {
    lines.push(<line key={y} x1={-w / 2} y1={y} x2={w / 2} y2={y} stroke={color} strokeWidth={0.6} />);
  }
  return <g>{lines}</g>;
}

/** Rectangular baton index at a given hour angle */
function BatonIndex({
  angle, r, w = 8, h = 22, fill = '#e0e0e0', stroke = '#aaa', isLarge = false,
}: {
  angle: number; r: number; w?: number; h?: number; fill?: string; stroke?: string; isLarge?: boolean;
}) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * r;
  const y = Math.sin(rad) * r;
  const bw = isLarge ? w * 1.5 : w;
  const bh = isLarge ? h * 1.4 : h;
  return (
    <g transform={`translate(${x},${y}) rotate(${angle + 90})`}>
      <rect x={-bw / 2} y={-bh / 2} width={bw} height={bh} rx={1.5} fill={fill} stroke={stroke} strokeWidth={0.5} />
      <rect x={-bw / 2 + 1.5} y={-bh / 2 + 1.5} width={bw - 3} height={bh - 3} rx={1} fill="rgba(255,255,255,0.15)" />
    </g>
  );
}

/** Dot minute index at a given angle */
function DotIndex({ angle, r }: { angle: number; r: number }) {
  const rad = (angle * Math.PI) / 180;
  return <circle cx={Math.cos(rad) * r} cy={Math.sin(rad) * r} r={1.8} fill="rgba(255,255,255,0.5)" />;
}

/** Date window at 3 o'clock */
function DateWindow({ x, y, bg = '#fff', text = '18' }: { x: number; y: number; bg?: string; text?: string }) {
  return (
    <g>
      <rect x={x - 14} y={y - 9} width={28} height={18} rx={2} fill="#111" stroke="#555" strokeWidth={0.8} />
      <rect x={x - 12} y={y - 7} width={24} height={14} rx={1} fill={bg} />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize={9} fontFamily="'Helvetica Neue',sans-serif" fontWeight="bold" fill="#111">{text}</text>
    </g>
  );
}

// ─── Dial 1: Gold Cream — horizontal ridges, gold baton indices ───────────────
export function Dial_GoldCream({ r }: { r: number }) {
  const scale = r / 105;
  const W = r * 2, H = r * 2;
  const hours = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <g transform={`scale(${scale})`}>
      {/* Base */}
      <circle cx={0} cy={0} r={105} fill="url(#gc-grad)" />
      <defs>
        <radialGradient id="gc-grad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#e8d5a0" />
          <stop offset="60%" stopColor="#c9aa62" />
          <stop offset="100%" stopColor="#a07830" />
        </radialGradient>
      </defs>
      {/* Grooves */}
      <Grooves w={210} h={210} color="rgba(0,0,0,0.08)" />
      {/* Minute dots */}
      {Array.from({ length: 60 }, (_, i) => i % 5 !== 0 && (
        <DotIndex key={i} angle={i * 6 - 90} r={92} />
      ))}
      {/* Baton indices */}
      {hours.map((a) => (
        <BatonIndex key={a} angle={a - 90} r={78} fill="#c9aa62" stroke="#8a6010" isLarge={a === 0} />
      ))}
      {/* 9 o'clock flat baton */}
      <rect x={-92} y={-6} width={22} height={12} rx={2} fill="#c9aa62" stroke="#8a6010" strokeWidth={0.5} />
      {/* Date window */}
      <DateWindow x={52} y={0} bg="#e8d5a0" text="18" />
      {/* Brand */}
      <text x={0} y={-28} textAnchor="middle" fontSize={8} fontFamily="Georgia,serif" fill="rgba(0,0,0,0.4)" letterSpacing={2}>UH CUSTOM</text>
    </g>
  );
}

// ─── Dial 2: Slate Grey Chrono — tachymeter ring, two sub-dials ──────────────
export function Dial_GreyChrono({ r }: { r: number }) {
  const scale = r / 105;
  return (
    <g transform={`scale(${scale})`}>
      <defs>
        <radialGradient id="gch-grad" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#7a8088" />
          <stop offset="100%" stopColor="#4a5058" />
        </radialGradient>
        <radialGradient id="sub-grad" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#5a6068" />
          <stop offset="100%" stopColor="#3a4048" />
        </radialGradient>
      </defs>
      {/* Outer tachymeter ring */}
      <circle cx={0} cy={0} r={105} fill="#383c40" />
      {Array.from({ length: 60 }, (_, i) => {
        const a = ((i * 6 - 90) * Math.PI) / 180;
        const isMaj = i % 5 === 0;
        const r1 = 100, r2 = isMaj ? 88 : 93;
        return (
          <line key={i}
            x1={Math.cos(a) * r1} y1={Math.sin(a) * r1}
            x2={Math.cos(a) * r2} y2={Math.sin(a) * r2}
            stroke="rgba(255,255,255,0.6)" strokeWidth={isMaj ? 1.5 : 0.8} />
        );
      })}
      {/* Tachymeter numbers */}
      {[60, 55, 50, 45, 40, 35, 30, 25].map((n, i) => {
        const a = (i * 45 - 90) * Math.PI / 180;
        return <text key={n} x={Math.cos(a) * 80} y={Math.sin(a) * 80 + 3} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,0.7)" fontFamily="monospace">{n}</text>;
      })}
      {/* Main dial */}
      <circle cx={0} cy={0} r={78} fill="url(#gch-grad)" />
      {/* Baton indices */}
      {[0,60,120,180,240,300].map(a => (
        <BatonIndex key={a} angle={a - 90} r={66} w={7} h={20} fill="#c8ccd0" stroke="#888" />
      ))}
      {/* Date at 3 */}
      <DateWindow x={42} y={0} text="24" />
      {/* Sub-dial 12h at ~10 o'clock */}
      <circle cx={-28} cy={-28} r={26} fill="url(#sub-grad)" stroke="rgba(255,255,255,0.2)" strokeWidth={0.8} />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i * 15 - 90) * Math.PI / 180;
        return <line key={i} x1={-28 + Math.cos(a) * 22} y1={-28 + Math.sin(a) * 22} x2={-28 + Math.cos(a) * 25} y2={-28 + Math.sin(a) * 25} stroke="rgba(255,255,255,0.5)" strokeWidth={0.6} />;
      })}
      {[6, 12, 18, 24].map((n, i) => {
        const a = (i * 90 - 90) * Math.PI / 180;
        return <text key={n} x={-28 + Math.cos(a) * 17} y={-28 + Math.sin(a) * 17 + 3} textAnchor="middle" fontSize={5} fill="rgba(255,255,255,0.7)">{n}</text>;
      })}
      <circle cx={-28} cy={-28} r={2} fill="#ccc" />
      {/* Sub-dial 60s at ~7 o'clock */}
      <circle cx={-28} cy={28} r={26} fill="url(#sub-grad)" stroke="rgba(255,255,255,0.2)" strokeWidth={0.8} />
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i * 6 - 90) * Math.PI / 180;
        return <line key={i} x1={-28 + Math.cos(a) * 22} y1={28 + Math.sin(a) * 22} x2={-28 + Math.cos(a) * 25} y2={28 + Math.sin(a) * 25} stroke="rgba(255,255,255,0.4)" strokeWidth={0.5} />;
      })}
      {[15,30,45,60].map((n, i) => {
        const a = (i * 90 - 90) * Math.PI / 180;
        return <text key={n} x={-28 + Math.cos(a) * 17} y={28 + Math.sin(a) * 17 + 3} textAnchor="middle" fontSize={5} fill="rgba(255,255,255,0.7)">{n}</text>;
      })}
      <circle cx={-28} cy={28} r={2} fill="#ccc" />
      {/* Brand */}
      <text x={28} y={-20} textAnchor="middle" fontSize={6} fontFamily="'Helvetica Neue',sans-serif" fill="rgba(255,255,255,0.3)" letterSpacing={1}>UH</text>
    </g>
  );
}

// ─── Dial 3: Black Sport Wheel — 5-spoke, green accents ──────────────────────
export function Dial_BlackWheelGreen({ r }: { r: number }) {
  const scale = r / 105;
  const spokes = 5;
  return (
    <g transform={`scale(${scale})`}>
      <defs>
        <radialGradient id="bwg-grad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#282828" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
      </defs>
      {/* Rim */}
      <circle cx={0} cy={0} r={105} fill="#111" />
      <circle cx={0} cy={0} r={104} fill="none" stroke="#1a1a1a" strokeWidth={4} />
      <circle cx={0} cy={0} r={100} fill="none" stroke="#333" strokeWidth={2} />
      {/* Inner disc */}
      <circle cx={0} cy={0} r={90} fill="url(#bwg-grad)" />
      {/* Spokes */}
      {Array.from({ length: spokes }, (_, i) => {
        const a = (i * 72 - 90) * Math.PI / 180;
        const x2 = Math.cos(a) * 80, y2 = Math.sin(a) * 80;
        return (
          <g key={i}>
            <line x1={0} y1={0} x2={x2} y2={y2} stroke="#1e1e1e" strokeWidth={28} strokeLinecap="round" />
            <line x1={0} y1={0} x2={x2} y2={y2} stroke="#2a2a2a" strokeWidth={22} strokeLinecap="round" />
          </g>
        );
      })}
      {/* Centre hub */}
      <circle cx={0} cy={0} r={22} fill="#111" />
      <circle cx={0} cy={0} r={14} fill="#1a1a1a" />
      {[-6, 0, 6].map((ox, i) => (
        <circle key={i} cx={ox} cy={0} r={3} fill="#333" stroke="#222" strokeWidth={0.5} />
      ))}
      <circle cx={0} cy={0} r={5} fill="#0a0a0a" />
      {/* Green caliper accent */}
      <path d="M 28,-8 L 52,-20 L 65,-8 L 52,8 L 28,8 Z" fill="#39e01a" opacity={0.9} />
      <path d="M 28,8 L 52,20 L 65,10 L 54,22 L 30,18 Z" fill="#39e01a" opacity={0.75} />
      {/* Perforations */}
      {Array.from({ length: 3 }, (_, s) => {
        const baseA = (s * 72 + 36 - 90) * Math.PI / 180;
        return Array.from({ length: 4 }, (_, d) => {
          const dist = 40 + d * 14;
          return (
            <circle key={`${s}-${d}`}
              cx={Math.cos(baseA) * dist} cy={Math.sin(baseA) * dist}
              r={3.5} fill="#111" />
          );
        });
      })}
      {/* Brand */}
      <text x={0} y={55} textAnchor="middle" fontSize={7} fontFamily="'Helvetica Neue',sans-serif" fill="rgba(255,255,255,0.15)" letterSpacing={2}>UH SPORT</text>
    </g>
  );
}

// ─── Dial 4: Olive Green — horizontal ridges, luminous indices ────────────────
export function Dial_OliveGreen({ r }: { r: number }) {
  const scale = r / 105;
  const hours = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <g transform={`scale(${scale})`}>
      <defs>
        <radialGradient id="og-grad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#5a7048" />
          <stop offset="70%" stopColor="#3d5230" />
          <stop offset="100%" stopColor="#2a3a20" />
        </radialGradient>
      </defs>
      <circle cx={0} cy={0} r={105} fill="url(#og-grad)" />
      <Grooves w={210} h={210} color="rgba(0,0,0,0.12)" />
      {/* Dot ring */}
      {Array.from({ length: 60 }, (_, i) => i % 5 !== 0 && (
        <DotIndex key={i} angle={i * 6 - 90} r={92} />
      ))}
      {/* Luminous baton indices */}
      {hours.map((a) => (
        <BatonIndex key={a} angle={a - 90} r={78}
          fill={a === 0 ? '#e8e8e8' : '#c8d8b0'} stroke="#788060" isLarge={a === 0}
          w={a === 0 ? 10 : 8} h={a === 0 ? 28 : 22} />
      ))}
      {/* 9 o'clock flat */}
      <rect x={-92} y={-6} width={22} height={12} rx={2} fill="#c8d8b0" stroke="#788060" strokeWidth={0.5} />
      {/* Date */}
      <DateWindow x={52} y={0} bg="#dce8d0" text="18" />
      <text x={0} y={-30} textAnchor="middle" fontSize={8} fontFamily="Georgia,serif" fill="rgba(255,255,255,0.25)" letterSpacing={2}>UH CUSTOM</text>
    </g>
  );
}

// ─── Dial 5: Teal / Mint — horizontal ridges, gold indices ───────────────────
export function Dial_TealGold({ r }: { r: number }) {
  const scale = r / 105;
  const hours = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <g transform={`scale(${scale})`}>
      <defs>
        <radialGradient id="tg-grad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#72c8c0" />
          <stop offset="60%" stopColor="#48a89e" />
          <stop offset="100%" stopColor="#2e7872" />
        </radialGradient>
      </defs>
      <circle cx={0} cy={0} r={105} fill="url(#tg-grad)" />
      <Grooves w={210} h={210} color="rgba(0,0,0,0.07)" />
      {/* Logo bar at 12 area */}
      <rect x={-22} y={-52} width={44} height={8} rx={2} fill="rgba(0,0,0,0.2)" />
      <rect x={-10} y={-52} width={20} height={8} rx={1} fill="rgba(0,0,0,0.3)" />
      {/* Dot ring */}
      {Array.from({ length: 60 }, (_, i) => i % 5 !== 0 && (
        <DotIndex key={i} angle={i * 6 - 90} r={92} />
      ))}
      {/* Gold baton indices */}
      {hours.map((a) => (
        <BatonIndex key={a} angle={a - 90} r={78}
          fill="#d4a840" stroke="#9a7010" isLarge={a === 0}
          w={a === 0 ? 10 : 8} h={a === 0 ? 28 : 22} />
      ))}
      {/* 9 o'clock flat */}
      <rect x={-92} y={-6} width={22} height={12} rx={2} fill="#d4a840" stroke="#9a7010" strokeWidth={0.5} />
      {/* Date */}
      <DateWindow x={52} y={0} bg="#f0f0f0" text="1" />
      <text x={0} y={30} textAnchor="middle" fontSize={7} fontFamily="'Helvetica Neue',sans-serif" fill="rgba(0,0,0,0.25)" letterSpacing={3}>UH CUSTOM</text>
    </g>
  );
}

// ─── Dial 6: Navy Blue — horizontal ridges, silver indices ───────────────────
export function Dial_NavyBlue({ r }: { r: number }) {
  const scale = r / 105;
  const hours = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <g transform={`scale(${scale})`}>
      <defs>
        <radialGradient id="nb-grad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#2a3a54" />
          <stop offset="60%" stopColor="#18253a" />
          <stop offset="100%" stopColor="#0a1220" />
        </radialGradient>
      </defs>
      <circle cx={0} cy={0} r={105} fill="url(#nb-grad)" />
      <Grooves w={210} h={210} color="rgba(255,255,255,0.04)" />
      {/* Dot ring */}
      {Array.from({ length: 60 }, (_, i) => i % 5 !== 0 && (
        <DotIndex key={i} angle={i * 6 - 90} r={92} />
      ))}
      {/* Silver baton indices */}
      {hours.map((a) => (
        <BatonIndex key={a} angle={a - 90} r={78}
          fill="#c8cdd8" stroke="#808898" isLarge={a === 0}
          w={a === 0 ? 10 : 8} h={a === 0 ? 28 : 22} />
      ))}
      {/* 9 o'clock flat */}
      <rect x={-92} y={-6} width={22} height={12} rx={2} fill="#c8cdd8" stroke="#808898" strokeWidth={0.5} />
      {/* Date */}
      <DateWindow x={52} y={0} bg="#f0f0f0" text="18" />
      <text x={0} y={55} textAnchor="middle" fontSize={7} fontFamily="'Helvetica Neue',sans-serif" fill="rgba(255,255,255,0.2)" letterSpacing={3}>UH CUSTOM</text>
    </g>
  );
}

// ─── Registry ─────────────────────────────────────────────────────────────────
export const OCT_DIALS = [
  { id: 'oct-gold-cream',    label: 'Cream Gold',    sublabel: 'Ridged baton indices',     Component: Dial_GoldCream },
  { id: 'oct-grey-chrono',   label: 'Grey Chrono',   sublabel: 'Slate dual sub-dials',     Component: Dial_GreyChrono },
  { id: 'oct-black-wheel',   label: 'Black Sport',   sublabel: 'Wheel & green caliper',    Component: Dial_BlackWheelGreen },
  { id: 'oct-olive-green',   label: 'Olive Diver',   sublabel: 'Luminous indices',         Component: Dial_OliveGreen },
  { id: 'oct-teal-gold',     label: 'Teal & Gold',   sublabel: 'Mint ridged gold indices', Component: Dial_TealGold },
  { id: 'oct-navy-blue',     label: 'Navy Blue',     sublabel: 'Silver lume indices',      Component: Dial_NavyBlue },
] as const;

export type OctDialId = typeof OCT_DIALS[number]['id'];
