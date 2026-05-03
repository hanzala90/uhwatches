import React from 'react';

export default function CraftsmanshipPage() {
  return (
    <div className="w-full flex-1 flex flex-col items-center pt-20 pb-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-24 text-center">
          <h2 className="text-5xl font-light tracking-widest text-[#C5A059] uppercase mb-6">The Anatomy of Time</h2>
          <p className="text-white/50 max-w-3xl text-lg font-light leading-relaxed">Every element of a UH Custom Watch is carefully considered, from the heartbeat of the movement to the glass securing its face. We offer full customization down to the core hardware. Explore the intricate details that make our timepieces truly yours.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[2rem] hover:bg-white/[0.05] transition-all group">
            <h3 className="text-[#C5A059] text-3xl font-light mb-6">Movément</h3>
            <p className="text-white/60 text-base leading-relaxed mb-8">The engine of your timepiece. Choose between the precision of Japanese Quartz, the traditional engagement of a mechanical winding movement, or the effortless luxury of a self-winding automatic heart.</p>
            <ul className="text-sm text-white/40 space-y-3 uppercase tracking-widest font-semibold group-hover:text-white/70 transition-colors">
              <li className="flex items-center space-x-3"><span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span><span>Japanese Quartz</span></li>
              <li className="flex items-center space-x-3"><span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span><span>Mechanical Winding</span></li>
              <li className="flex items-center space-x-3"><span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span><span>Premium Automatic</span></li>
            </ul>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[2rem] hover:bg-white/[0.05] transition-all group">
            <h3 className="text-[#C5A059] text-3xl font-light mb-6">Crystal Glass</h3>
            <p className="text-white/60 text-base leading-relaxed mb-8">The window to your personal design. Protect your chosen dial with durable flat Mineral, a vintage-inspired Domed shape, or opt for the virtually unscratchable clarity of Sapphire crystal.</p>
            <ul className="text-sm text-white/40 space-y-3 uppercase tracking-widest font-semibold group-hover:text-white/70 transition-colors">
              <li className="flex items-center space-x-3"><span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span><span>Flat Mineral</span></li>
              <li className="flex items-center space-x-3"><span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span><span>Vintage Domed</span></li>
              <li className="flex items-center space-x-3"><span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span><span>Sapphire Crystal</span></li>
            </ul>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[2rem] hover:bg-white/[0.05] transition-all group">
            <h3 className="text-[#C5A059] text-3xl font-light mb-6">Case Back</h3>
            <p className="text-white/60 text-base leading-relaxed mb-8">The hidden secret of your watch. Keep it classic with a solid steel back perfect for personalized engravings, or reveal the intricate internal mechanics with a transparent Exhibition case back.</p>
            <ul className="text-sm text-white/40 space-y-3 uppercase tracking-widest font-semibold group-hover:text-white/70 transition-colors">
              <li className="flex items-center space-x-3"><span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span><span>Solid Metal Back</span></li>
              <li className="flex items-center space-x-3"><span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span><span>Exhibition / Transparent</span></li>
            </ul>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[2rem] hover:bg-white/[0.05] transition-all group">
            <h3 className="text-[#C5A059] text-3xl font-light mb-6">Hardware Buckles</h3>
            <p className="text-white/60 text-base leading-relaxed mb-8">The finishing touch. Fasten your timepiece with the standard pin buckle, a secure deployment mechanism, or step up to an elegant hidden butterfly clasp for a seamless strap look.</p>
            <ul className="text-sm text-white/40 space-y-3 uppercase tracking-widest font-semibold group-hover:text-white/70 transition-colors">
              <li className="flex items-center space-x-3"><span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span><span>Standard Pin</span></li>
              <li className="flex items-center space-x-3"><span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span><span>Deployment Clasp</span></li>
              <li className="flex items-center space-x-3"><span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span><span>Hidden Butterfly</span></li>
            </ul>
          </div>
        </div>
    </div>
  );
}
