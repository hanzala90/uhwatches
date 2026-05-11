'use client';

import React from 'react';
import { useWatchStore, WatchModel, MovementType } from '@/store/useWatchStore';
import { ChevronRight } from 'lucide-react';

const combinations = [
  {
    id: 1,
    name: 'Minimal Black Dress',
    model: 'leather' as WatchModel,
    movement: 'quartz' as MovementType,
    dialURL: '/images/dial_black.png',
    previewImage: '/images/watch_leather.png',
    specs: { Dial: 'Black Roman gold indices', Case: 'Round silver stainless', Strap: 'Black leather hand-stitched' }
  },
  {
    id: 2,
    name: 'Silver Sport',
    model: 'metal' as WatchModel,
    movement: 'automatic' as MovementType,
    dialURL: '/images/dial_silver.png',
    previewImage: '/images/watch_metal.png',
    specs: { Dial: 'Silver brushed sunburst', Case: 'Round silver polished', Strap: 'Stainless steel bracelet' }
  },
  {
    id: 3,
    name: 'Black Sport Rubber',
    model: 'sports' as WatchModel,
    movement: 'quartz' as MovementType,
    dialURL: '/images/dial_black.png',
    previewImage: '/images/watch_sports.png',
    specs: { Dial: 'Black matte luminous', Case: 'Round matte black', Strap: 'Premium silicone band' }
  },
  {
    id: 4,
    name: 'Silver Leather Classic',
    model: 'leather' as WatchModel,
    movement: 'mechanical' as MovementType,
    dialURL: '/images/dial_silver.png',
    previewImage: '/images/watch_leather.png',
    specs: { Dial: 'Silver sunburst Roman', Case: 'Round silver exhibition', Strap: 'Brown leather vintage' }
  },
  {
    id: 5,
    name: 'Octagonal Black Steel',
    model: 'metal' as WatchModel,
    movement: 'automatic' as MovementType,
    dialURL: '/images/dial_black.png',
    previewImage: '/images/watch_metal_octagonal.png',
    specs: { Dial: 'Black gold indices', Case: 'Octagonal silver steel', Strap: 'Stainless steel bracelet' }
  },
  {
    id: 6,
    name: 'Sports Silver Octagonal',
    model: 'sports' as WatchModel,
    movement: 'quartz' as MovementType,
    dialURL: '/images/dial_silver.png',
    previewImage: '/images/watch_sports_octagonal.png',
    specs: { Dial: 'Silver sunburst sport', Case: 'Octagonal black matte', Strap: 'Black silicone sport' }
  },
];

const FullStoreGallery = () => {
  const { applyCombination } = useWatchStore();

  const handleSelect = (model: WatchModel, dialURL: string, movement: MovementType) => {
    applyCombination(model, dialURL, movement);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20 border-t border-white/5 mt-12">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-4xl font-light tracking-widest text-[#C5A059] uppercase mb-4">Complete Collection</h2>
        <p className="text-white/50 max-w-lg text-sm">Discover our masterfully curated timepieces — the perfect starting point for your custom design.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {combinations.map((item) => (
          <div key={item.id} className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 p-8 flex flex-col items-center cursor-pointer will-change-transform transform hover:-translate-y-2">

            <div className="relative w-full aspect-square mb-8 flex justify-center items-center">
              <img
                src={item.previewImage}
                alt={item.name}
                className="relative z-10 w-[95%] object-contain transition-transform duration-700 group-hover:scale-105 pointer-events-none"
              />
            </div>

            <h3 className="text-2xl font-light text-white mb-2 text-center leading-tight">{item.name}</h3>

            <div className="w-full space-y-1 mb-8 mt-4 text-xs text-white/50 bg-black/20 p-4 rounded-xl border border-white/5 flex-1">
              <p className="flex justify-between items-center"><span className="text-[#C5A059]/70 uppercase tracking-widest text-[9px] font-bold">Dial</span> <span className="text-right flex-1 ml-4 truncate">{item.specs.Dial}</span></p>
              <p className="flex justify-between items-center"><span className="text-[#C5A059]/70 uppercase tracking-widest text-[9px] font-bold">Case</span> <span className="text-right flex-1 ml-4 truncate">{item.specs.Case}</span></p>
              <p className="flex justify-between items-center"><span className="text-[#C5A059]/70 uppercase tracking-widest text-[9px] font-bold">Strap</span> <span className="text-right flex-1 ml-4 truncate">{item.specs.Strap}</span></p>
            </div>

            <div className="w-full flex items-center justify-center">
              <button
                onClick={(e) => { e.stopPropagation(); handleSelect(item.model, item.dialURL, item.movement); }}
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
