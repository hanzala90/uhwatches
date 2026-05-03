'use client';

import React from 'react';
import { useWatchStore, WatchModel, MovementType, GlassType } from '@/store/useWatchStore';
import { ShoppingBag, ChevronRight } from 'lucide-react';

const combinations = [
  {
    id: 1,
    name: 'Minimal Black Dress Combo',
    model: 'classic' as WatchModel,
    movement: 'quartz' as MovementType,
    glass: 'mineral' as GlassType,
    dialURL: '/images/dial_carbon.png',
    previewImage: '/images/watch_classic.png',
    specs: { Dial: 'Black simple stick index (28mm)', Case: 'Silver stainless alloy (40mm)', Strap: 'Black PU leather (20mm)' }
  },
  {
    id: 2,
    name: 'Rolex-Style Gold Budget',
    model: 'gold' as WatchModel,
    movement: 'automatic' as MovementType,
    glass: 'sapphire' as GlassType,
    dialURL: '/images/dial_gold.png',
    previewImage: '/images/watch_gold.png',
    specs: { Dial: 'Gold sunburst (28mm)', Case: 'Gold plated alloy fluted bezel', Strap: 'Gold plated steel bracelet' }
  },
  {
    id: 3,
    name: 'Sport Black Silicone',
    model: 'metal' as WatchModel,
    movement: 'quartz' as MovementType,
    glass: 'mineral' as GlassType,
    dialURL: '/images/dial_carbon.png',
    previewImage: '/images/watch_metal.png',
    specs: { Dial: 'Black sporty luminous dial', Case: 'Black alloy matte case', Strap: 'Black silicone strap' }
  },
  {
    id: 4,
    name: 'Transparent "Luxury Look"',
    model: 'classic' as WatchModel,
    movement: 'mechanical' as MovementType,
    glass: 'sapphire' as GlassType,
    dialURL: '/images/dial_white.png',
    previewImage: '/images/watch_classic.png',
    specs: { Dial: 'Semi-transparent acrylic dial', Case: 'Silver exhibition case', Strap: 'Brown leather strap' }
  },
  {
    id: 5,
    name: 'Vintage Brown Classic',
    model: 'classic' as WatchModel,
    movement: 'mechanical' as MovementType,
    glass: 'domed' as GlassType,
    dialURL: '/images/dial_gold.png',
    previewImage: '/images/watch_classic.png',
    specs: { Dial: 'Beige vintage Roman dial', Case: 'Bronze-tone alloy case', Strap: 'Brown leather vintage strap' }
  },
  {
    id: 6,
    name: 'Silver Mesh Minimal',
    model: 'metal' as WatchModel,
    movement: 'quartz' as MovementType,
    glass: 'mineral' as GlassType,
    dialURL: '/images/dial_white.png',
    previewImage: '/images/watch_metal.png',
    specs: { Dial: 'Silver sunburst index (28mm)', Case: 'Silver polished alloy (40mm)', Strap: 'Stainless steel mesh strap' }
  },
  {
    id: 7,
    name: 'Matte Black Street Style',
    model: 'metal' as WatchModel,
    movement: 'quartz' as MovementType,
    glass: 'mineral' as GlassType,
    dialURL: '/images/dial_carbon.png',
    previewImage: '/images/watch_metal.png',
    specs: { Dial: 'Black matte sporty luminous dial', Case: 'Matte black alloy case', Strap: 'Black nylon strap (NATO style)' }
  },
  {
    id: 8,
    name: 'Gold Fashion Ladies',
    model: 'gold' as WatchModel,
    movement: 'quartz' as MovementType,
    glass: 'mineral' as GlassType,
    dialURL: '/images/dial_gold.png',
    previewImage: '/images/watch_gold.png',
    specs: { Dial: 'Rose gold glitter dial (28mm)', Case: 'Rose gold alloy slim case', Strap: 'Rose gold mesh bracelet' }
  },
  {
    id: 9,
    name: 'Blue Sunburst Steel',
    model: 'metal' as WatchModel,
    movement: 'automatic' as MovementType,
    glass: 'sapphire' as GlassType,
    dialURL: '/images/dial_blue.png',
    previewImage: '/images/watch_metal.png',
    specs: { Dial: 'Blue sunburst index dial', Case: 'Silver stainless alloy case', Strap: 'Stainless steel bracelet' }
  },
  {
    id: 10,
    name: 'Brown Vintage Explorer',
    model: 'classic' as WatchModel,
    movement: 'mechanical' as MovementType,
    glass: 'domed' as GlassType,
    dialURL: '/images/dial_white.png',
    previewImage: '/images/watch_classic.png',
    specs: { Dial: 'Cream explorer vintage dial', Case: 'Bronze antique alloy case', Strap: 'Brown distressed leather strap' }
  }
];

const FullStoreGallery = () => {
  const { applyCombination } = useWatchStore();

  const handleSelect = (model: WatchModel, dialURL: string, movement: MovementType, glass: GlassType) => {
    applyCombination(model, dialURL, movement, glass);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to configurator
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20 border-t border-white/5 mt-12">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-4xl font-light tracking-widest text-[#C5A059] uppercase mb-4">Complete Collection</h2>
        <p className="text-white/50 max-w-lg text-sm">Discover our masterfully curated timepieces. Pre-configured for immediate checkout, or serve as the perfect starting point for your custom design.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {combinations.map((item) => (
          <div key={item.id} className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 p-8 flex flex-col items-center cursor-pointer will-change-transform transform hover:-translate-y-2">
            
            {/* Minimal CSS composition trick for thumbnail preview */}
            <div className="relative w-full aspect-square mb-8 flex justify-center items-center mix-blend-screen">
               {/* Background Dial Texture */}
               <div 
                 className="absolute w-[45%] h-[45%] rounded-full z-0 pointer-events-none" 
                 style={{ backgroundImage: `url(${item.dialURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }} 
               />
               {/* Overlay Watch Frame */}
               <img 
                 src={item.previewImage} 
                 alt={item.name} 
                 className="relative z-10 w-[95%] object-contain mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105 pointer-events-none" 
               />
            </div>

            <h3 className="text-2xl font-light text-white mb-2 text-center leading-tight">{item.name}</h3>
            
            <div className="w-full space-y-1 mb-8 mt-4 text-xs text-white/50 bg-black/20 p-4 rounded-xl border border-white/5 flex-1">
              <p className="flex justify-between items-center"><span className="text-[#C5A059]/70 uppercase tracking-widest text-[9px] font-bold">Dial</span> <span className="text-right flex-1 ml-4 truncate" title={item.specs.Dial}>{item.specs.Dial}</span></p>
              <p className="flex justify-between items-center"><span className="text-[#C5A059]/70 uppercase tracking-widest text-[9px] font-bold">Case</span> <span className="text-right flex-1 ml-4 truncate" title={item.specs.Case}>{item.specs.Case}</span></p>
              <p className="flex justify-between items-center"><span className="text-[#C5A059]/70 uppercase tracking-widest text-[9px] font-bold">Strap</span> <span className="text-right flex-1 ml-4 truncate" title={item.specs.Strap}>{item.specs.Strap}</span></p>
            </div>
            
            <div className="w-full flex items-center justify-center">
              <button 
                onClick={(e) => { e.stopPropagation(); handleSelect(item.model, item.dialURL, item.movement, item.glass); }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 border border-white/10 text-white hover:bg-white hover:text-black hover:border-white rounded-xl transition-all font-bold uppercase tracking-widest text-[10px]"
              >
                <span>Customize Watch</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FullStoreGallery;
