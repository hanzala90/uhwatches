import React from 'react';
import WatchPreview from '@/components/WatchPreview';
import ConfiguratorPanel from '@/components/ConfiguratorPanel';
import { ArrowDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full flex justify-center flex-col items-center">
      {/* Full Viewport Hero Section */}
      <section className="w-full min-h-[90vh] md:min-h-screen flex flex-col justify-center items-center text-center relative px-4 z-10 overflow-hidden">
        
        {/* Cinematic Background & Image Overlays */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 mix-blend-screen scale-150 blur-sm">
           {/* Fallback image representing cinematic feel */}
           <img src="/images/watch_gold.png" alt="Luxury Watch" className="w-[120%] h-[120%] object-cover object-center translate-y-20 opacity-50" />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-[#C5A059] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>
        
        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center max-w-4xl pt-24 mt-8 md:mt-0">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter mb-6 uppercase">
            Build <br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFF] to-[#C5A059]">Your Legacy</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl font-light px-4 tracking-wide leading-relaxed mb-12">
            Experience the pinnacle of horology. Craft a bespoke timepiece from our signature collections, and meticulously customize every facet down to the structural core.
          </p>
          
          <a 
            href="#configurator" 
            className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] transition-all duration-300"
          >
            Start Configuring
          </a>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40 animate-bounce">
           <span className="text-[10px] tracking-widest uppercase">Scroll to Explore</span>
           <ArrowDown size={14} />
        </div>
      </section>

      {/* Main Configurator Area */}
      <section id="configurator" className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-6 py-24 relative z-10 scroll-mt-24">
        {/* Left Side: Preview Canvas */}
        <div className="w-full flex items-center justify-center order-2 lg:order-1 pt-8 lg:pt-0 sticky top-32 self-start">
           <WatchPreview />
        </div>

        {/* Right Side: Configuration Options */}
        <div className="w-full flex lg:border-l border-white/5 lg:pl-10 order-1 lg:order-2">
           <ConfiguratorPanel />
        </div>
      </section>
    </div>
  );
}
