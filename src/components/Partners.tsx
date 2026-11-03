import React from 'react';
import { SPONSORS } from '../data/hypervisionData';

export const Partners: React.FC = () => {
  return (
    <section id="sponsors" className="py-24 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/[0.08] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              06 / Institutional Allies
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              Partners & Sponsors
            </h2>
          </div>
          <p className="text-sm font-light text-neutral-400 max-w-sm">
            Endorsed by national research bodies, government initiatives, technology corporations, and creative networks.
          </p>
        </div>

        {/* 6 High-Fidelity Official Partner Badges with Glass Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPONSORS.map((sponsor) => (
            <div
              key={sponsor.name}
              className="glass-card p-8 rounded-sm flex flex-col justify-between group"
            >
              <div>
                <div className="h-20 flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  {/* Official Scraped Partner Logo */}
                  <div className="h-12 max-w-[160px] flex items-center glass-pill p-2 rounded-sm">
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 glass-pill px-2 py-0.5">
                    {sponsor.category}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {sponsor.name}
                </h3>
                <p className="mt-2 text-xs text-neutral-300/80 font-light leading-relaxed">
                  {sponsor.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>{sponsor.tier}</span>
                <span className="text-neutral-300 uppercase">Official Partner</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
