'use client';

import React from 'react';
import WatchPreviewSVG from './WatchPreviewSVG';
import WatchPreview3D from './WatchPreview3D';

const WatchPreview = () => {
  const [is3D, setIs3D] = React.useState(false);

  return (
    <div className="w-full h-full relative">
      {/* 3D toggle — shown on hover via the child or here as overlay */}
      <div className="absolute top-4 left-4 z-20 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIs3D(v => !v)}
          className="text-white/70 hover:text-white text-[10px] tracking-widest uppercase font-bold bg-black/60 border border-white/10 px-4 py-2 rounded-full transition-all hover:bg-white/10"
        >
          {is3D ? '2D Mode' : 'Real 3D Mode'}
        </button>
      </div>

      {is3D ? (
        <div className="w-full h-full">
          <WatchPreview3D />
        </div>
      ) : (
        <WatchPreviewSVG />
      )}
    </div>
  );
};

export default WatchPreview;
