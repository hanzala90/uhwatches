'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWatchStore } from '@/store/useWatchStore';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ModelConfig {
  cx: number; cy: number; r: number;
  isSquare?: boolean; squareW?: number; squareH?: number; squareRx?: number;
  handCx: number; handCy: number;
  hourLen: number; minLen: number; secLen: number;
  indexR: number;
}

// ─── Per-model calibration ────────────────────────────────────────────────────

const MODEL_CONFIGS: Record<string, ModelConfig> = {
  leather: { cx: 250, cy: 300, r: 115, handCx: 250, handCy: 300, hourLen: 68, minLen: 95, secLen: 110, indexR: 100 },
  metal:   { cx: 250, cy: 300, r: 115, handCx: 250, handCy: 300, hourLen: 68, minLen: 95, secLen: 110, indexR: 100 },
  sports:  { cx: 250, cy: 300, r: 115, handCx: 250, handCy: 300, hourLen: 68, minLen: 95, secLen: 110, indexR: 100 },
};

const SQUARE_CONFIG: Partial<ModelConfig> & { isSquare: true } = {
  isSquare: true, squareW: 220, squareH: 220, squareRx: 28,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function degToRad(deg: number) { return (deg * Math.PI) / 180; }

const HOUR_DEG = 10 * 30 + 10 * 0.5 - 90; // 215
const MIN_DEG  = 10 * 6 - 90;              // -30
const SEC_DEG  = 30 * 6 - 90;             // 90

function r4(n: number) { return Math.round(n * 10000) / 10000; }

function indexPath(cx: number, cy: number, indexR: number, angleDeg: number, isHour: boolean) {
  const outer = indexR;
  const inner = isHour ? indexR - 14 : indexR - 8;
  const w     = isHour ? 3 : 1.5;
  const rad   = degToRad(angleDeg);
  const cos   = Math.cos(rad);
  const sin   = Math.sin(rad);
  const ox = r4(cx + outer * cos); const oy = r4(cy + outer * sin);
  const ix = r4(cx + inner * cos); const iy = r4(cy + inner * sin);
  const px = r4(-sin * w);         const py = r4( cos * w);
  return `M${ox+px},${oy+py} L${ox-px},${oy-py} L${ix-px},${iy-py} L${ix+px},${iy+py}Z`;
}

// ─── Hand Component ───────────────────────────────────────────────────────────

interface HandProps {
  cx: number; cy: number; angleDeg: number; length: number; width: number;
  style: 'baton' | 'mercedes' | 'sword'; isHour?: boolean; color?: string; isSec?: boolean;
}

const Hand: React.FC<HandProps> = ({ cx, cy, angleDeg, length, width, style, isHour = false, color = '#f0f0f0', isSec = false }) => {
  const transform = `rotate(${angleDeg}, ${cx}, ${cy})`;

  if (isSec) {
    return (
      <g transform={transform}>
        <rect x={cx - 22} y={cy - 1} width={22} height={2} fill={color} rx={1} />
        <rect x={cx} y={cy - 1} width={length} height={2} fill={color} rx={1} />
        <circle cx={cx - 14} cy={cy} r={5} fill={color} />
        <circle cx={cx} cy={cy} r={3} fill="#cccccc" stroke="#888" strokeWidth={0.8} />
      </g>
    );
  }

  if (style === 'baton') {
    return (
      <g transform={transform}>
        <rect x={cx - 8} y={cy - width / 2} width={length + 8} height={width}
          fill={color} stroke="rgba(0,0,0,0.3)" strokeWidth={0.8} rx={width / 2} />
        <rect x={cx + 4} y={cy - width / 2 + 1.5} width={length - 12} height={width - 3}
          fill="rgba(255,255,255,0.15)" rx={1} />
      </g>
    );
  }

  if (style === 'sword') {
    const tip = cx + length, base = cx - 8, hw = width / 2, midX = cx + length * 0.4;
    return (
      <g transform={transform}>
        <path d={`M${base},${cy} L${midX},${cy-hw*1.3} L${tip},${cy} L${midX},${cy+hw*1.3}Z`}
          fill={color} stroke="rgba(0,0,0,0.25)" strokeWidth={0.6} />
        <line x1={base} y1={cy} x2={tip} y2={cy} stroke="rgba(255,255,255,0.3)" strokeWidth={0.8} />
      </g>
    );
  }

  // mercedes
  if (isHour) {
    const neckX = cx + length * 0.55, padR = width * 1.6, hw = width / 2;
    return (
      <g transform={transform}>
        <path d={`M${cx-6},${cy} L${neckX},${cy-hw*0.6} L${neckX},${cy+hw*0.6}Z`}
          fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth={0.6} />
        <circle cx={neckX} cy={cy} r={padR} fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth={0.6} />
        <line x1={neckX} y1={cy} x2={neckX} y2={cy-padR} stroke="#888" strokeWidth={1} />
        <line x1={neckX} y1={cy} x2={neckX-padR*0.866} y2={cy+padR*0.5} stroke="#888" strokeWidth={1} />
        <line x1={neckX} y1={cy} x2={neckX+padR*0.866} y2={cy+padR*0.5} stroke="#888" strokeWidth={1} />
        <line x1={neckX+padR} y1={cy} x2={cx+length} y2={cy} stroke={color} strokeWidth={hw*0.5} />
      </g>
    );
  }
  const tip = cx + length, hw = width / 2;
  return (
    <g transform={transform}>
      <path d={`M${cx-6},${cy-hw*0.5} L${tip-4},${cy-hw*0.35} L${tip},${cy} L${tip-4},${cy+hw*0.35} L${cx-6},${cy+hw*0.5}Z`}
        fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth={0.6} />
    </g>
  );
};

// ─── Glass Overlay ────────────────────────────────────────────────────────────

const GlassOverlay: React.FC<{
  glass: string; cx: number; cy: number; r: number;
  isSquare?: boolean; squareW?: number; squareH?: number; squareRx?: number;
}> = ({ glass, cx, cy, r, isSquare, squareW = 220, squareH = 220, squareRx = 28 }) => {
  const id = `gl-${glass}`;
  const shape = isSquare
    ? <rect x={cx-squareW/2} y={cy-squareH/2} width={squareW} height={squareH} rx={squareRx} />
    : <circle cx={cx} cy={cy} r={r} />;

  if (glass === 'mineral') return (
    <g><defs><clipPath id={id}>{shape}</clipPath></defs>
      <g clipPath={`url(#${id})`}>
        <ellipse cx={cx-r*0.1} cy={cy-r*0.25} rx={r*0.6} ry={r*0.3}
          fill="rgba(255,255,255,0.06)" style={{ filter:'blur(4px)' }} />
      </g>
    </g>
  );

  if (glass === 'domed') return (
    <g>
      <defs>
        <clipPath id={id}>{shape}</clipPath>
        <radialGradient id={`${id}g`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
        </radialGradient>
      </defs>
      <g clipPath={`url(#${id})`}>
        {isSquare
          ? <rect x={cx-squareW/2} y={cy-squareH/2} width={squareW} height={squareH} rx={squareRx} fill={`url(#${id}g)`} />
          : <circle cx={cx} cy={cy} r={r} fill={`url(#${id}g)`} />}
        <ellipse cx={cx-r*0.15} cy={cy-r*0.3} rx={r*0.5} ry={r*0.18}
          fill="rgba(255,255,255,0.14)" style={{ filter:'blur(3px)' }} />
      </g>
    </g>
  );

  if (glass === 'sapphire') return (
    <g>
      <defs>
        <clipPath id={id}>{shape}</clipPath>
        <radialGradient id={`${id}g`} cx="30%" cy="25%" r="75%">
          <stop offset="0%" stopColor="rgba(180,210,255,0.15)" />
          <stop offset="50%" stopColor="rgba(100,160,255,0.04)" />
          <stop offset="100%" stopColor="rgba(180,210,255,0.10)" />
        </radialGradient>
        <filter id={`${id}f`}><feGaussianBlur stdDeviation="2" /></filter>
      </defs>
      <g clipPath={`url(#${id})`}>
        {isSquare
          ? <rect x={cx-squareW/2} y={cy-squareH/2} width={squareW} height={squareH} rx={squareRx} fill={`url(#${id}g)`} />
          : <circle cx={cx} cy={cy} r={r} fill={`url(#${id}g)`} />}
        <ellipse cx={cx-r*0.1} cy={cy-r*0.28} rx={r*0.55} ry={r*0.2}
          fill="rgba(150,200,255,0.18)" filter={`url(#${id}f)`} />
        <ellipse cx={cx+r*0.15} cy={cy+r*0.2} rx={r*0.28} ry={r*0.14}
          fill="rgba(80,120,200,0.07)" filter={`url(#${id}f)`} />
      </g>
    </g>
  );
  return null;
};

// ─── Indices Ring ─────────────────────────────────────────────────────────────

const IndicesRing: React.FC<{ cx: number; cy: number; indexR: number; dialURL: string }> = ({ cx, cy, indexR, dialURL }) => {
  const isLight = dialURL.includes('white') || dialURL.includes('silver');
  const color = isLight ? 'rgba(0,0,0,0.75)' : 'rgba(212,175,55,0.9)';
  const dimColor = isLight ? 'rgba(0,0,0,0.3)' : 'rgba(212,175,55,0.4)';
  return (
    <g>
      {Array.from({ length: 60 }, (_, i) => {
        const isHour = i % 5 === 0;
        return <path key={i} d={indexPath(cx, cy, indexR, i*6-90, isHour)} fill={isHour ? color : dimColor} />;
      })}
    </g>
  );
};

// ─── Case Back View ───────────────────────────────────────────────────────────

const CaseBackView: React.FC<{
  caseShape: string;
  structuralOptions: { caseBack: string; movement: string; buckle: string };
}> = ({ caseShape, structuralOptions }) => {
  const isSquare = caseShape === 'square';
  const cx = 250, cy = 300, r = 130, sw = 240, sh = 240, srx = 32;

  return (
    <svg viewBox="0 0 500 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"
      style={{ filter:'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' }}>
      <defs>
        <clipPath id="cb-clip">
          {isSquare ? <rect x={cx-sw/2} y={cy-sh/2} width={sw} height={sh} rx={srx}/> : <circle cx={cx} cy={cy} r={r}/>}
        </clipPath>
        <radialGradient id="cb-metal" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#aaa"/><stop offset="50%" stopColor="#666"/><stop offset="100%" stopColor="#333"/>
        </radialGradient>
      </defs>

      <rect x={212} y={40} width={76} height={520} rx={10} fill="#111"/>
      <rect x={220} y={40} width={3} height={520} fill="rgba(255,255,255,0.05)"/>

      {isSquare
        ? <rect x={cx-sw/2-18} y={cy-sh/2-18} width={sw+36} height={sh+36} rx={srx+10}
            fill="url(#cb-metal)" style={{ filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }}/>
        : <circle cx={cx} cy={cy} r={r+18} fill="url(#cb-metal)"
            style={{ filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }}/>}

      <g clipPath="url(#cb-clip)">
        {structuralOptions.caseBack === 'exhibition' ? (
          <image href={`/images/movement_${structuralOptions.movement}.png`}
            x={cx-120} y={cy-120} width={240} height={240} preserveAspectRatio="xMidYMid slice"/>
        ) : (
          <>
            <circle cx={cx} cy={cy} r={r} fill="#555"/>
            {[100,80,60,40].map((rr,i) => (
              <circle key={i} cx={cx} cy={cy} r={rr} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>
            ))}
            <text x={cx} y={cy-12} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={11}
              fontFamily="'Courier New',monospace" letterSpacing={3}>UH CUSTOM</text>
            <text x={cx} y={cy+8} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={8}
              fontFamily="'Courier New',monospace" letterSpacing={2}>HANDCRAFTED</text>
            <text x={cx} y={cy+26} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize={7}
              fontFamily="'Courier New',monospace">SN-0042-PK</text>
          </>
        )}
        <image href={`/images/caseback_${structuralOptions.caseBack}.png`}
          x={cx-120} y={cy-120} width={240} height={240} preserveAspectRatio="xMidYMid slice"
          opacity={0.5} style={{ mixBlendMode:'multiply' } as React.CSSProperties}/>
      </g>

      <image href={`/images/buckle_${structuralOptions.buckle}.png`} x={200} y={440} width={100} height={100} preserveAspectRatio="xMidYMid meet"/>

      {(isSquare
        ? [[cx-sw/2+14, cy-sh/2+14],[cx+sw/2-14, cy-sh/2+14],[cx-sw/2+14, cy+sh/2-14],[cx+sw/2-14, cy+sh/2-14]]
        : [[cx-90,cy-90],[cx+90,cy-90],[cx-90,cy+90],[cx+90,cy+90]]
      ).map(([sx,sy],i) => (
        <g key={i}>
          <circle cx={sx} cy={sy} r={5} fill="#444" stroke="#222" strokeWidth={0.8}/>
          <line x1={sx-3} y1={sy} x2={sx+3} y2={sy} stroke="#666" strokeWidth={0.8}/>
        </g>
      ))}
    </svg>
  );
};

// ─── Main SVG Watch Preview ───────────────────────────────────────────────────

const WatchPreviewSVG: React.FC = () => {
  const { baseModel, caseShape, designOptions, structuralOptions, engraving, uploadedImage } = useWatchStore();
  const caseColor = (designOptions as any).caseColor || 'silver';

  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dialLoaded, setDialLoaded] = useState(false);
  const [dialKey, setDialKey] = useState(0);
  const prevDialURL = useRef(designOptions.dialURL);

  // Fade transition on dial change
  useEffect(() => {
    if (prevDialURL.current !== designOptions.dialURL) {
      setDialLoaded(false);
      setDialKey(k => k + 1);
      prevDialURL.current = designOptions.dialURL;
    }
  }, [designOptions.dialURL]);

  const handleFlip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => { setIsFlipped(f => !f); setIsAnimating(false); }, 350);
  };

  const isSquareCase = caseShape === 'square';
  const baseConfig   = MODEL_CONFIGS[baseModel] ?? MODEL_CONFIGS.leather;
  const cfg: ModelConfig = isSquareCase ? { ...baseConfig, ...SQUARE_CONFIG } : baseConfig;
  const { cx, cy, r, handCx, handCy, hourLen, minLen, secLen, indexR } = cfg;
  const sqW = cfg.squareW ?? 220, sqH = cfg.squareH ?? 220, sqRx = cfg.squareRx ?? 28;

  const dialClipId = `dc-${caseShape}`;
  const secColor   = structuralOptions.movement === 'automatic' ? '#cc0000' : '#d4af37';
  const engFont    = engraving.font === 'cursive' ? 'cursive' : engraving.font === 'serif' ? 'Georgia,serif' : '"Helvetica Neue",sans-serif';

  const baseImgSrc = (caseShape !== 'round' && caseShape !== 'skeleton')
    ? `/images/watch_${baseModel}_${caseShape}.png`
    : `/images/watch_${baseModel}.png`;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#111]/50 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/5 relative group">

      {/* Controls */}
      <div className="absolute top-4 right-4 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={handleFlip}
          className="text-[#C5A059] hover:text-white text-[10px] tracking-widest uppercase font-bold bg-black/60 border border-[#C5A059]/30 px-4 py-2 rounded-full transition-all hover:bg-[#C5A059]/20">
          {isFlipped ? 'View Front' : 'Flip Watch'}
        </button>
      </div>

      {/* Flip wrapper */}
      <div className="w-full flex h-full justify-center items-center p-4" style={{ perspective:'1200px' }}>
        <div className="w-full max-w-[420px] h-full" style={{
          transform: isAnimating ? (isFlipped ? 'rotateY(90deg)' : 'rotateY(-90deg)') : 'rotateY(0deg)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          transformStyle: 'preserve-3d',
        }}>
          {isFlipped ? (
            <CaseBackView caseShape={caseShape} structuralOptions={structuralOptions} />
          ) : (
            /* ── FRONT VIEW ── */
            <svg viewBox="0 0 500 600" xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              style={{ filter:'drop-shadow(0 20px 50px rgba(0,0,0,0.55))' }}>
              <defs>
                <clipPath id={dialClipId}>
                  {isSquareCase
                    ? <rect x={cx-sqW/2} y={cy-sqH/2} width={sqW} height={sqH} rx={sqRx}/>
                    : <circle cx={cx} cy={cy} r={r}/>}
                </clipPath>
                <filter id="hand-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.5"/>
                </filter>
                <radialGradient id="bezel-grad" cx="38%" cy="32%" r="68%">
                  <stop offset="0%"   stopColor="#e0e0e0"/>
                  <stop offset="45%"  stopColor="#a0a0a0"/>
                  <stop offset="100%" stopColor="#5a5a5a"/>
                </radialGradient>
              </defs>

              {/* Layer 1 — base watch photo (round only, no blend mode) */}
              {!isSquareCase && (
                <image href={baseImgSrc} x={0} y={50} width={500} height={500}
                  preserveAspectRatio="xMidYMid meet" />
              )}

              {/* Layer 1b — square case drawn in pure SVG (no white bg image) */}
              {isSquareCase && (() => {
                const metalColors: Record<string, [string,string,string]> = {
                  silver:    ['#d8d8d8','#a0a0a0','#606060'],
                  gold:      ['#e8c96a','#C5A059','#7a5c1e'],
                  black:     ['#555','#2a2a2a','#111'],
                  'rose-gold':['#e8a090','#c07060','#8a3828'],
                };
                const [c1,c2,c3] = metalColors[caseColor] ?? metalColors.silver;
                const lugW = 38, lugH = 28, lugRx = 7;
                // strap
                const strapColor = baseModel === 'metal' ? c2 : baseModel === 'sports' ? '#333' : '#222';
                return (
                  <g>
                    {/* Top strap */}
                    <rect x={cx-14} y={40} width={28} height={cy-sqH/2-22} rx={6} fill={strapColor} />
                    <rect x={cx-10} y={40} width={3} height={cy-sqH/2-22} rx={2} fill="rgba(255,255,255,0.08)" />
                    {/* Bottom strap */}
                    <rect x={cx-14} y={cy+sqH/2+22} width={28} height={560-(cy+sqH/2+22)} rx={6} fill={strapColor} />
                    {/* Outer bezel */}
                    <defs>
                      <linearGradient id="sq-bezel" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={c1}/>
                        <stop offset="50%" stopColor={c2}/>
                        <stop offset="100%" stopColor={c3}/>
                      </linearGradient>
                    </defs>
                    <rect x={cx-sqW/2-22} y={cy-sqH/2-22} width={sqW+44} height={sqH+44} rx={sqRx+10}
                      fill={`url(#sq-bezel)`}
                      style={{filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.6))'}} />
                    {/* Top lug left */}
                    <rect x={cx-sqW/2-6} y={cy-sqH/2-22-lugH} width={lugW} height={lugH+4} rx={lugRx} fill={`url(#sq-bezel)`}/>
                    {/* Top lug right */}
                    <rect x={cx+sqW/2+6-lugW} y={cy-sqH/2-22-lugH} width={lugW} height={lugH+4} rx={lugRx} fill={`url(#sq-bezel)`}/>
                    {/* Bottom lug left */}
                    <rect x={cx-sqW/2-6} y={cy+sqH/2+18} width={lugW} height={lugH+4} rx={lugRx} fill={`url(#sq-bezel)`}/>
                    {/* Bottom lug right */}
                    <rect x={cx+sqW/2+6-lugW} y={cy+sqH/2+18} width={lugW} height={lugH+4} rx={lugRx} fill={`url(#sq-bezel)`}/>
                    {/* Inner bezel step */}
                    <rect x={cx-sqW/2-8} y={cy-sqH/2-8} width={sqW+16} height={sqH+16} rx={sqRx+2}
                      fill="none" stroke={c3} strokeWidth={3}/>
                    {/* Crown */}
                    <rect x={cx+sqW/2+22} y={cy-10} width={14} height={20} rx={5} fill={c2}/>
                    <rect x={cx+sqW/2+24} y={cy-7} width={10} height={14} rx={3} fill={c1}/>
                  </g>
                );
              })()}



              {/* Layer 3 — dial */}
              <g clipPath={`url(#${dialClipId})`}>
                {isSquareCase ? (
                  // Square dial drawn in SVG — proper square shape
                  <g>
                    <rect x={cx-sqW/2} y={cy-sqH/2} width={sqW} height={sqH} rx={sqRx}
                      fill="#111" />
                    {/* Dial texture from image, clipped */}
                    <image key={dialKey}
                      href={designOptions.dialURL || '/images/dial_black.png'}
                      x={cx-sqW/2} y={cy-sqH/2} width={sqW} height={sqH}
                      preserveAspectRatio="xMidYMid slice"
                      onLoad={() => setDialLoaded(true)}
                      style={{ opacity: dialLoaded ? 1 : 0, transition:'opacity 0.4s ease' } as React.CSSProperties}/>
                    {/* Square inner chapter ring */}
                    <rect x={cx-sqW/2+8} y={cy-sqH/2+8} width={sqW-16} height={sqH-16} rx={sqRx-4}
                      fill="none" stroke="rgba(197,160,89,0.3)" strokeWidth={1}/>
                  </g>
                ) : (
                  <image key={dialKey}
                    href={designOptions.dialURL || '/images/dial_black.png'}
                    x={cx-r} y={cy-r} width={r*2} height={r*2}
                    preserveAspectRatio="xMidYMid slice"
                    onLoad={() => setDialLoaded(true)}
                    style={{ opacity: dialLoaded ? 1 : 0, transition:'opacity 0.4s ease' } as React.CSSProperties}/>
                )}
              </g>

              {/* Layer 4 — uploaded custom image */}
              {uploadedImage && (
                <g clipPath={`url(#${dialClipId})`}>
                  <image href={uploadedImage}
                    x={isSquareCase ? cx-sqW/2 : cx-r} y={isSquareCase ? cy-sqH/2 : cy-r}
                    width={isSquareCase ? sqW : r*2} height={isSquareCase ? sqH : r*2}
                    preserveAspectRatio="xMidYMid slice" opacity={0.85}/>
                </g>
              )}

              {/* Layer 5 — indices ring */}
              <g clipPath={`url(#${dialClipId})`}>
                <IndicesRing cx={cx} cy={cy} indexR={indexR} dialURL={designOptions.dialURL}/>
              </g>

              {/* Layer 6 — inner bezel ring (round only — square already has it) */}
              {!isSquareCase && (
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5}/>
              )}

              {/* Layer 7 — hands */}
              <g filter="url(#hand-shadow)">
                <Hand cx={handCx} cy={handCy} angleDeg={HOUR_DEG} length={hourLen} width={7} style={structuralOptions.hands as any} isHour color="#f0f0f0"/>
                <Hand cx={handCx} cy={handCy} angleDeg={MIN_DEG}  length={minLen}  width={5} style={structuralOptions.hands as any} color="#f0f0f0"/>
                <Hand cx={handCx} cy={handCy} angleDeg={SEC_DEG}  length={secLen}  width={2} style={structuralOptions.hands as any} isSec color={secColor}/>
              </g>

              {/* Center cap */}
              <circle cx={handCx} cy={handCy} r={4} fill="#cccccc" stroke="#666" strokeWidth={1}/>

              {/* Layer 8 — glass shimmer */}
              <GlassOverlay glass={structuralOptions.glass} cx={cx} cy={cy} r={r}
                isSquare={isSquareCase} squareW={sqW} squareH={sqH} squareRx={sqRx}/>

              {/* Layer 9 — engraving */}
              {engraving.text && (
                <text x={cx} y={cy+r+30} textAnchor="middle" fontSize={16} fontWeight={600}
                  fontFamily={engFont} fill="rgba(200,200,200,0.7)" letterSpacing={2}>
                  {engraving.text}
                </text>
              )}

              {/* Loading shimmer */}
              {!dialLoaded && (
                <g clipPath={`url(#${dialClipId})`}>
                  {isSquareCase
                    ? <rect x={cx-sqW/2} y={cy-sqH/2} width={sqW} height={sqH} rx={sqRx} fill="#1a1a1a"/>
                    : <circle cx={cx} cy={cy} r={r} fill="#1a1a1a"/>}
                  <text x={cx} y={cy+4} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={11} fontFamily="monospace">
                    loading…
                  </text>
                </g>
              )}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPreviewSVG;
