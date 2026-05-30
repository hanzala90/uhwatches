'use client';

import React, { useState, useRef } from 'react';
import {
  useWatchStore, WatchModel, EngravingFont, CaseColor,
  MovementTier, MovementType, CaseBackType, BuckleType, HandsType
} from '@/store/useWatchStore';
import { OCT_DIALS } from '@/components/OctDialSVG';
import { Type, Image as LucideImage, ChevronRight, ChevronLeft, CheckCircle2, Zap, Star } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const TOTAL_STEPS = 6;

const ConfiguratorPanel = () => {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    baseModel, setBaseModel, caseShape, setCaseShape,
    engraving, setEngravingText, setEngravingFont,
    designOptions, setDialURL, setCaseColor, setOctDialId,
    structuralOptions, setMovementTier, setMovement, setCustomHands, setCaseBack, setBuckle, setHands,
    totalPrice, setUploadedImage, uploadedImage,
    uploadedImageScale, uploadedImageX, uploadedImageY, uploadedImageRotation,
    setUploadedImageScale, setUploadedImageX, setUploadedImageY, setUploadedImageRotation
  } = useWatchStore();


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOrder = () => router.push('/checkout');

  const nextStep = () => setStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // --- Step Components --- //

  const Step1 = () => (
    <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#C5A059] mb-4 font-semibold">1. Foundation</p>
          <h3 className="text-2xl font-light text-white mb-2">Type</h3>
          <p className="text-white/50 text-sm">Build your custom timepiece.</p>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-white/40">Case Shape</p>
          <div className="grid grid-cols-2 gap-3">
            {(['round', 'square', 'octagonal', 'octagonal-round'] as const).map((shape) => (
              <button
                key={shape}
                onClick={() => setCaseShape(shape)}
                className={cn(
                  "py-4 rounded-xl border text-sm font-medium capitalize transition-all duration-300",
                  caseShape === shape ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:bg-white/10"
                )}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/10">
          <p className="text-[10px] uppercase tracking-widest text-white/40">Strap Type</p>
          <div className="grid grid-cols-1 gap-3">
            {([  
              { id: 'leather', label: 'Leather Strap', desc: 'Genuine leather, hand-stitched', img: '/images/strap_black.png', price: 10000 },
              { id: 'metal', label: 'Metal Bracelet', desc: 'Stainless steel link bracelet', img: '/images/cases/metal-case-preview.png', price: 15000 },
              { id: 'sports', label: 'Sports Rubber Band', desc: 'Premium silicone sport strap', img: '/images/cases/sports-case-preview.jpeg', price: 12000 },
            ] as { id: WatchModel; label: string; desc: string; img: string; price: number }[]).map((model) => (
              <button
                key={model.id}
                onClick={() => setBaseModel(model.id)}
                className={cn(
                  "py-3 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center gap-4 px-4 overflow-hidden",
                  baseModel === model.id ? "bg-white/10 border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.2)]" : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:bg-white/10"
                )}
              >
                <div className="w-16 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-gray-900">
                  <img src={model.img} alt={model.label} className="w-full h-full object-cover" />
                </div>
                <div className="text-left flex-1">
                  <p className={cn("font-semibold text-sm", baseModel === model.id ? "text-white" : "text-white/70")}>{model.label}</p>
                  <p className="text-xs text-white/40">{model.desc}</p>
                </div>
                <span className="text-[10px] text-white/40 shrink-0">PKR {model.price.toLocaleString('en-US')}</span>
                {baseModel === model.id && <CheckCircle2 size={16} className="text-[#C5A059] shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Case Color */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <p className="text-[10px] uppercase tracking-widest text-white/40">Case Color</p>
          <div className="grid grid-cols-4 gap-3">
            {([
              { id: 'silver', label: 'Silver', color: '#C0C0C0' },
              { id: 'gold', label: 'Gold', color: '#C5A059' },
              { id: 'black', label: 'Black', color: '#1a1a1a' },
              { id: 'rose-gold', label: 'Rose Gold', color: '#B76E79' },
            ] as { id: CaseColor; label: string; color: string }[]).map((c) => (
              <button
                key={c.id}
                onClick={() => setCaseColor(c.id)}
                title={c.label}
                className={cn(
                  "flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all duration-300",
                  designOptions.caseColor === c.id ? "border-[#C5A059] bg-white/10" : "border-white/10 hover:border-white/30"
                )}
              >
                <div className="w-8 h-8 rounded-full border border-white/20 shadow-lg" style={{ background: c.color }} />
                <span className="text-[9px] uppercase tracking-widest text-white/60">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );




  const Step2 = () => (
    <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#C5A059] mb-4 font-semibold">2. The Face</p>
          <h3 className="text-2xl font-light text-white mb-2">Dial Selection</h3>
          <p className="text-white/50 text-sm">Choose the background canvas of your watch.</p>
        </div>

        {/* Show oct-dial selector when case is octagonal */}
        {(caseShape === 'octagonal' || caseShape === 'octagonal-round') ? (
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-white/40">Octagonal Dial Style</p>
            <div className="grid grid-cols-2 gap-3">
              {OCT_DIALS.map(dial => (
                <button
                  key={dial.id}
                  onClick={() => setOctDialId(dial.id)}
                  className={cn(
                    "flex flex-col items-start gap-2 p-3 rounded-xl border-2 transition-all duration-300",
                    designOptions.octDialId === dial.id
                      ? "border-[#C5A059] bg-[#C5A059]/10 shadow-[0_0_15px_rgba(197,160,89,0.2)]"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  )}
                >
                  {/* Mini SVG preview */}
                  <svg viewBox="-105 -105 210 210" className="w-full h-20 rounded-lg overflow-hidden" xmlns="http://www.w3.org/2000/svg">
                    <dial.Component r={105} />
                  </svg>
                  <p className={cn("font-semibold text-xs", designOptions.octDialId === dial.id ? "text-[#C5A059]" : "text-white/70")}>{dial.label}</p>
                  <p className="text-white/40 text-[9px]">{dial.sublabel}</p>
                  {designOptions.octDialId === dial.id && <CheckCircle2 size={14} className="text-[#C5A059]" />}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'black', url: '/images/dial_black.png', label: 'Black Roman', sublabel: 'Gold indices' },
              { id: 'silver', url: '/images/dial_silver.png', label: 'Silver Sport', sublabel: 'Brushed sunburst' },
            ].map(dial => (
              <button
                key={dial.id}
                onClick={() => setDialURL(dial.url)}
                className={cn(
                  "h-36 rounded-2xl border-2 transition-all duration-300 overflow-hidden relative group flex flex-col items-end justify-end p-2 bg-cover bg-center",
                  designOptions.dialURL === dial.url ? "border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.4)]" : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
                )}
                style={{ backgroundImage: `url(${dial.url})` }}
              >
                {designOptions.dialURL === dial.url && (
                  <div className="absolute top-2 left-2"><CheckCircle2 size={16} className="text-[#C5A059]" /></div>
                )}
                <div className="bg-black/80 backdrop-blur-sm text-left w-full px-2 py-1.5 rounded-lg">
                  <p className="text-white text-[11px] font-semibold leading-tight">{dial.label}</p>
                  <p className="text-white/50 text-[9px] uppercase tracking-wider">{dial.sublabel}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const Step3 = () => (
    <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#C5A059] mb-4 font-semibold">3. Movement</p>
          <h3 className="text-2xl font-light text-white mb-2">The Heart</h3>
          <p className="text-white/50 text-sm">Select your movement and hands preference.</p>
        </div>

        {/* Tier selection */}
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-white/40">Movement Tier</p>
          <div className="grid grid-cols-2 gap-3">
            {([
              { id: 'basic' as MovementTier, label: 'Basic', sublabel: 'Quartz — Reliable & accurate', icon: <Zap size={20} />, price: 'Included' },
              { id: 'premium' as MovementTier, label: 'Premium', sublabel: 'Mechanical / Automatic', icon: <Star size={20} />, price: '+ PKR 3,000+' },
            ]).map(tier => (
              <button
                key={tier.id}
                onClick={() => setMovementTier(tier.id)}
                className={cn(
                  "flex flex-col items-start gap-3 p-4 rounded-2xl border-2 transition-all duration-300 text-left",
                  structuralOptions.movementTier === tier.id
                    ? "border-[#C5A059] bg-[#C5A059]/10 shadow-[0_0_20px_rgba(197,160,89,0.2)]"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                )}
              >
                <span className={structuralOptions.movementTier === tier.id ? 'text-[#C5A059]' : 'text-white/50'}>{tier.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{tier.label}</p>
                  <p className="text-white/50 text-xs mt-0.5">{tier.sublabel}</p>
                  <p className="text-[#C5A059] text-[10px] mt-1 font-medium">{tier.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Premium sub-options */}
        {structuralOptions.movementTier === 'premium' && (
          <div className="space-y-3 pt-4 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-widest text-white/40">Select Movement</p>
            <div className="grid grid-cols-2 gap-3">
              {([
                { id: 'mechanical' as MovementType, label: 'Mechanical', price: '+ PKR 3,000' },
                { id: 'automatic' as MovementType, label: 'Automatic', price: '+ PKR 6,000' },
              ]).map(m => (
                <button
                  key={m.id}
                  onClick={() => setMovement(m.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 py-4 rounded-xl border-2 transition-all duration-300 bg-cover bg-center relative",
                    structuralOptions.movement === m.id ? "border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.3)]" : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                  )}
                  style={{ backgroundImage: `url(/images/movement_${m.id}.png)`, minHeight: '90px' }}
                >
                  <div className="absolute inset-0 bg-black/60 rounded-xl" />
                  <span className="relative text-white font-semibold text-sm">{m.label}</span>
                  <span className="relative text-[#C5A059] text-[10px]">{m.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Hands toggle */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Custom Hands</p>
              <p className="text-white/50 text-xs mt-0.5">Default hands are included. Upgrade for a signature style.</p>
            </div>
            <button
              onClick={() => setCustomHands(!structuralOptions.customHands)}
              className={cn(
                "relative w-12 h-6 rounded-full transition-all duration-300 shrink-0",
                structuralOptions.customHands ? "bg-[#C5A059]" : "bg-white/20"
              )}
            >
              <span className={cn("absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300", structuralOptions.customHands ? "left-7" : "left-1")} />
            </button>
          </div>

          {structuralOptions.customHands && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              {([
                { id: 'baton' as HandsType, label: 'Baton', sublabel: 'Sleek & minimal' },
                { id: 'sword' as HandsType, label: 'Sword', sublabel: 'Bold & tapered — +PKR 800' },
              ]).map(h => (
                <button
                  key={h.id}
                  onClick={() => setHands(h.id)}
                  className={cn(
                    "flex flex-col items-start gap-1 p-3 rounded-xl border-2 transition-all duration-300",
                    structuralOptions.hands === h.id ? "border-[#C5A059] bg-white/10" : "border-white/10 hover:border-white/30"
                  )}
                >
                  <p className="text-white font-semibold text-sm">{h.label}</p>
                  <p className="text-white/50 text-[10px]">{h.sublabel}</p>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );

  const Step4 = () => (
    <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#C5A059] mb-4 font-semibold">4. Hardware</p>
          <h3 className="text-2xl font-light text-white mb-2">Buckle</h3>
          <p className="text-white/50 text-sm">Refine the clasp hardware.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-white/40">Buckle Style</p>
            <div className="grid grid-cols-3 gap-3">
              {(['standard', 'deployment', 'butterfly'] as BuckleType[]).map((b) => (
                <button
                  key={b} onClick={() => setBuckle(b)}
                  className={cn(
                    "aspect-square rounded-xl border-2 transition-all duration-300 bg-cover bg-center",
                    structuralOptions.buckle === b ? "border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.4)]" : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                  )}
                  style={{ backgroundImage: `url(/images/buckle_${b}.png)` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );


  const Step5 = () => (
    <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#C5A059] mb-4 font-semibold">5. Personal Touch</p>
          <h3 className="text-2xl font-light text-white mb-2">Bespoke Engraving</h3>
          <p className="text-white/50 text-sm">Add custom photos or laser-engraved text.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-white/70">
                <LucideImage size={18} />
                <h4 className="uppercase tracking-widest text-xs font-semibold">Custom Photo (+ PKR 1,000)</h4>
              </div>
              {uploadedImage && (
                <button
                  onClick={() => { setUploadedImage(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                  className="text-[10px] text-red-400 hover:text-red-300 uppercase tracking-widest"
                >
                  Remove
                </button>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />

            {uploadedImage ? (
              <div className="space-y-4">
                <div className="w-full aspect-video rounded-xl border border-white/20 bg-black overflow-hidden relative">
                  <img
                    src={uploadedImage}
                    alt="Custom Dial"
                    className="w-full h-full object-contain opacity-80"
                    style={{
                      transform: `translate(${uploadedImageX}px, ${uploadedImageY}px) scale(${uploadedImageScale}) rotate(${uploadedImageRotation}deg)`,
                      transition: 'transform 0.05s ease-out'
                    }}
                  />
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/20">
                    <CheckCircle2 className="text-[#25D366] w-10 h-10 opacity-60" />
                  </div>
                </div>

                {/* Image adjustment sliders */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Image Settings</p>
                    <button
                      onClick={() => {
                        setUploadedImageScale(1);
                        setUploadedImageX(0);
                        setUploadedImageY(0);
                        setUploadedImageRotation(0);
                      }}
                      className="text-[9px] uppercase tracking-widest text-white/40 hover:text-[#C5A059] transition-colors"
                    >
                      Reset Adjustments
                    </button>
                  </div>

                  {/* Scale / Zoom */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-white/50">
                      <span>Zoom (Scale)</span>
                      <span className="font-mono text-white/90">{(uploadedImageScale * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.05"
                      value={uploadedImageScale}
                      onChange={(e) => setUploadedImageScale(parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/10 accent-[#C5A059] rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Offset X */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-white/50">
                      <span>Position X</span>
                      <span className="font-mono text-white/90">{uploadedImageX > 0 ? `+${uploadedImageX}` : uploadedImageX}px</span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="1"
                      value={uploadedImageX}
                      onChange={(e) => setUploadedImageX(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 accent-[#C5A059] rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Offset Y */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-white/50">
                      <span>Position Y</span>
                      <span className="font-mono text-white/90">{uploadedImageY > 0 ? `+${uploadedImageY}` : uploadedImageY}px</span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="1"
                      value={uploadedImageY}
                      onChange={(e) => setUploadedImageY(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 accent-[#C5A059] rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Rotation */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-white/50">
                      <span>Rotation</span>
                      <span className="font-mono text-white/90">{uploadedImageRotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="1"
                      value={uploadedImageRotation}
                      onChange={(e) => setUploadedImageRotation(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 accent-[#C5A059] rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 border border-dashed border-white/20 rounded-xl text-white/50 hover:text-white hover:border-[#C5A059] transition-all duration-300 bg-white/5 flex flex-col items-center gap-3"
              >
                <LucideImage size={24} className="opacity-50" />
                <span className="text-xs font-medium uppercase tracking-widest">Upload Custom Artwork</span>
              </button>
            )}
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-white/70 mb-2">
              <Type size={18} />
              <h4 className="uppercase tracking-widest text-xs font-semibold">Engraving (+ PKR 1,500)</h4>
            </div>

            <input
              type="text"
              placeholder="e.g. UMAIR'S LEGACY"
              maxLength={20}
              value={engraving.text}
              onChange={(e) => setEngravingText(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[#C5A059] transition-colors shadow-inner text-white placeholder-white/30 font-medium"
            />

            {engraving.text && (
              <div className="flex space-x-2 pt-2">
                {(['minimal', 'cursive', 'serif'] as EngravingFont[]).map((font) => (
                  <button
                    key={font}
                    onClick={() => setEngravingFont(font)}
                    className={cn(
                      "flex-1 py-3 rounded-lg text-xs font-medium capitalize transition-colors border",
                      engraving.font === font ? "bg-white text-black border-white" : "text-white/40 border-white/10 hover:bg-white/5 hover:text-white/70"
                    )}
                  >
                    {font}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  const Step6 = () => (
    <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#C5A059] mb-4 font-semibold">6. Final Review</p>
          <h3 className="text-2xl font-light text-white mb-2">Your Bespoke Timepiece</h3>
          <p className="text-white/50 text-sm">Review your configuration before locking in your order.</p>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-white/10 text-sm">
            <span className="text-white/60">Base Watch</span>
            <span className="font-semibold text-white capitalize">{baseModel.replace('-', ' ')} Strap / {caseShape.replace('-', ' ')} Case</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-white/10 text-sm">
            <span className="text-white/60">Movement</span>
            <span className="font-semibold text-white capitalize">{structuralOptions.movementTier} — {structuralOptions.movement}</span>
          </div>
          {(uploadedImage || engraving.text) && (
            <div className="flex justify-between items-center pb-4 border-b border-white/10 text-sm text-[#C5A059]">
              <span>Personalization Added</span>
              <span className="font-semibold">Yes</span>
            </div>
          )}

          <div className="pt-2 flex justify-between items-end">
            <span className="text-xs uppercase tracking-widest text-white/50">Estimated Total</span>
            <span className="text-3xl font-light text-white">PKR {totalPrice.toLocaleString('en-US')}</span>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="w-full flex flex-col h-[600px] lg:h-[800px] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">

      {/* Progress Header */}
      <div className="w-full px-6 md:px-8 py-5 md:py-6 border-b border-white/10 bg-black/40 backdrop-blur-md shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-sm font-bold md:font-semibold tracking-widest uppercase text-white/90">Configure</h2>
          <span className="text-sm md:text-xs text-white/50 font-mono font-medium">STEP {step} OF {TOTAL_STEPS}</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C5A059] transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Dynamic Step Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
        {step === 5 && <Step5 />}
        {step === 6 && <Step6 />}
      </div>

      {/* Footer Navigation */}
      <div className="w-full p-6 border-t border-white/10 bg-black/60 backdrop-blur-xl shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 transition-colors border border-white/10"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div className="flex flex-col hidden sm:flex">
            <span className="text-[10px] uppercase tracking-widest text-white/40">Running Total</span>
            <span className="font-medium text-[#C5A059]">PKR {totalPrice.toLocaleString('en-US')}</span>
          </div>
        </div>

        {step < TOTAL_STEPS ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all"
          >
            Next Step <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleOrder}
            className="flex items-center gap-2 bg-[#C5A059] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all"
          >
            Checkout
          </button>
        )}
      </div>

    </div>
  );
};

export default ConfiguratorPanel;
