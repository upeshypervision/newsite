import React from 'react';
import { SPONSORS } from '../data/hypervisionData';

export const Partners: React.FC = () => {
  // Triple the sponsors list to ensure seamless infinite looping without gaps
  const sponsors = [...SPONSORS, ...SPONSORS, ...SPONSORS];

  return (
    <section id="sponsors" className="sponsor-strip py-8 overflow-hidden relative border-y border-white/10 bg-[#03070e]">
      <div className="section-wrap mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-[10px] font-mono uppercase tracking-[.18em] text-[#1ab7f2]">
          Industry Partners & Research Ecosystem
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[.12em] text-[#597187]">
          Supporting student innovation since 2011
        </span>
      </div>

      {/* Infinite Marquee Slider with Edge Fade Mask */}
      <div className="relative w-full overflow-hidden">
        {/* Left and right fade gradient overlays */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-[#03070e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-[#03070e] to-transparent z-10 pointer-events-none" />

        <div className="partner-track flex items-center py-2">
          {sponsors.map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className="w-[180px] sm:w-[220px] h-16 shrink-0 border-l border-white/10 flex items-center justify-center px-8"
              title={`${sponsor.name} — ${sponsor.category}`}
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="sponsor-logo max-w-full max-h-10 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
