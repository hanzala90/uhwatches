import dynamic from 'next/dynamic';
import WatchPreview from '@/components/WatchPreview';
import ConfiguratorPanel from '@/components/ConfiguratorPanel';
import HeroScroll from '@/components/home/HeroScroll';
import { MaterialsHorizontal, ConfiguratorTeaser } from '@/components/home/ClientSections';

// Standard dynamic (SSR ok)
const CustomizationGrid = dynamic(() => import('@/components/home/CustomizationGrid'));
const HowItWorks        = dynamic(() => import('@/components/home/HowItWorks'));
const FinalCTA          = dynamic(() => import('@/components/home/FinalCTA'));

export default function Home() {
  return (
    <div className="w-full bg-black">
      {/* S1 — Hero: 400vh sticky scroll sequence */}
      <HeroScroll />

      {/* S2 — Materials: horizontal pin on desktop, vertical on mobile */}
      <MaterialsHorizontal />

      {/* S3 — Customization: 6-card staggered grid */}
      <CustomizationGrid />

      {/* S4 — Live configurator teaser */}
      <ConfiguratorTeaser />

      {/* S5 — How it works */}
      <HowItWorks />

      {/* S6 — Full configurator tool */}
      <section
        id="configurator"
        className="w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 px-6 py-16 lg:py-28 scroll-mt-20"
      >
        <div className="w-full flex items-center justify-center order-1 sticky top-24 z-30 h-[48vh] lg:h-[calc(100vh-8rem)] self-start">
          <WatchPreview />
        </div>
        <div className="w-full flex lg:border-l border-white/5 lg:pl-10 order-2">
          <ConfiguratorPanel />
        </div>
      </section>

      {/* S7 — Final CTA */}
      <FinalCTA />
    </div>
  );
}
