import React from 'react';
import { HYPERVISION_INFO } from '../data/hypervisionData';

interface HeroProps { onOpenJoin: () => void; }

export const Hero: React.FC<HeroProps> = ({ onOpenJoin }) => (
  <section className="site-section relative min-h-[760px] flex items-end overflow-hidden pt-32 pb-16 hero-glow">
    <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
    <div className="section-wrap relative z-10 w-full">
      <div className="max-w-5xl">
        <p className="section-kicker mb-8">01 — School of Computer Science / UPES / Est. 2011</p>
        <h1 className="font-display text-[clamp(76px,14vw,190px)] leading-[.78] tracking-[-.065em] text-white">
          Build<br /><em className="text-[#a9b1c2]">what&apos;s</em><br /><span className="text-[#22d3ee]">next.</span>
        </h1>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <p className="md:col-span-6 max-w-xl text-[17px] leading-[1.65] text-[#c1c3c8]">
            Hypervision is the student-led technical club at UPES where ambitious people turn research, experiments and late-night ideas into work that holds up in the real world.
          </p>
          <div className="md:col-span-6 flex flex-wrap gap-3 md:justify-end">
            <a href="#events" className="editorial-button primary">See what&apos;s happening</a>
            <button onClick={onOpenJoin} className="editorial-button">Join the club</button>
          </div>
        </div>
      </div>
      <div className="mt-20 pt-5 border-t rule flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[.12em] text-[#858891]">
        <span>{HYPERVISION_INFO.motto}</span>
        <span>Dehradun, India / 30.34° N 78.03° E</span>
      </div>
    </div>
  </section>
);
