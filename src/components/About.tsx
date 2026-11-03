import React from 'react';
import { HYPERVISION_INFO, STATISTICS } from '../data/hypervisionData';
import { HypervisionLogo } from './HypervisionLogo';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/[0.08] gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              01 / Orientation
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              Who We Are
            </h2>
          </div>
          <div className="text-neutral-400 text-sm font-mono max-w-xs md:text-right">
            <span>School of Computer Science (SoCS)</span>
            <span className="block text-neutral-300">UPES Bidholi Campus, Dehradun</span>
          </div>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 items-start">
          <div className="lg:col-span-7 space-y-6 text-neutral-300 text-lg leading-relaxed font-light">
            <p className="text-2xl sm:text-3xl font-normal text-white tracking-tight font-display">
              &ldquo;{HYPERVISION_INFO.motto}&rdquo;

            </p>
            <p>
              Founded in 2011, Hypervision is the premier technical society of the School of Computer Science (SoCS), UPES. We connect academic learning with industry needs to foster innovation, collaboration, and career-ready technologists.
            </p>
            <p>
              Over fifteen continuous years, HyperVision has expanded from an inaugural 60-student sprint into an institutional innovation backbone—hosting national hackathons, coordinating high-concurrency national qualifier matrices like the Internal Smart India Hackathon (SIH) with 330+ participating teams, and conducting autonomous vehicle research under the Government of India's MeitY SwaYaan initiative with NIT Kurukshetra.
            </p>
          </div>

          {/* Right Column Glass Panel */}
          <div className="lg:col-span-5 glass-card-static p-8 rounded-sm space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-white/[0.08]">
              <HypervisionLogo size={52} />
              <div>
                <h3 className="font-display text-lg font-bold text-white tracking-tight uppercase">
                  UPES HyperVision
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Premier Technical Society, SoCS UPES
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono text-neutral-300">
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-neutral-500">Affiliation</span>
                <span className="text-right text-white">School of Computer Science, UPES</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-neutral-500">Established</span>
                <span className="text-white">2011 (15-Year Active Track)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-neutral-500">Flagship Competitions</span>
                <span className="text-right text-white">Code Hustle & SIH UPES Qualifiers</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-neutral-500">National Initiative</span>
                <span className="text-right text-white">MeitY SwaYaan & NIT Kurukshetra</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-neutral-500">Official Contact</span>
                <span className="text-right text-cyan-400 font-semibold">{HYPERVISION_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Statistics Grid with Glass Cards */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATISTICS.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 glass-card rounded-sm"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-200">
                  {stat.label}
                </div>
                <div className="mt-1 text-[11px] text-neutral-400 leading-tight">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
