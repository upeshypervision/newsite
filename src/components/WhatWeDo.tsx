import React from 'react';
import { CAPABILITIES } from '../data/hypervisionData';
import { Brain, Bot, Globe, Shield, Cloud, Terminal } from 'lucide-react';

const icons = [Brain, Bot, Globe, Shield, Cloud, Terminal];

export const WhatWeDo: React.FC = () => {
  return (
    <section id="capabilities" className="py-24 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/[0.08] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              02 / Disciplines
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              What We Do
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            Six engineering faculties working in synergy to develop production-grade platforms, sovereign avionics, and deep algorithmic research.
          </p>
        </div>

        {/* 6-Item Bento Grid with Frosted Glassmorphism */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={cap.number}
                className="group relative glass-card p-8 rounded-sm flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                    <span className="font-mono text-sm font-semibold text-neutral-400 group-hover:text-cyan-400 transition-colors">
                      {cap.number}
                    </span>
                    <div className="p-2 rounded-sm glass-pill group-hover:border-cyan-400/40 transition-colors">
                      <IconComponent
                        className="w-4 h-4 text-neutral-300 group-hover:text-cyan-400 transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                    {cap.title}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-300/80 font-light leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                {/* Zero-Pill Unboxed Metadata Tags */}
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                  {cap.technologies.map((tech, tIdx) => (
                    <React.Fragment key={tech}>
                      <span className="group-hover:text-neutral-300 transition-colors">{tech}</span>
                      {tIdx < cap.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-neutral-700">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
