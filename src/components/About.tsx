import React from 'react';
import { STATISTICS } from '../data/hypervisionData';

export const About: React.FC = () => {
  return (
    <section id="about" className="site-section py-24 sm:py-32 bg-[#050c16] text-white relative">
      <div className="section-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="section-kicker">01 // Identity & Purpose</p>
            <h2 className="section-title mt-4">
              Learn by<br />
              <span className="text-[#1ab7f2]">building.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#8fa2b6] max-w-md">
              Hypervision is UPES&apos;s longest-standing student-led technical society. We don&apos;t run slide-deck clubs. We engineer software, build avionics hardware, host 330+ team national qualifiers, and ship real systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/board" className="editorial-button">
                Meet the Board
              </a>
              <a href="/#projects" className="editorial-button primary">
                View Working Projects
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <div className="border-l-2 border-[#1ab7f2] pl-6 py-1">
              <p className="font-display text-2xl sm:text-3xl font-semibold leading-snug text-white">
                &ldquo;Everything we build is rooted in one conviction: students evolve into world-class engineers through hands-on creation, serious pressure, and shared curiosity.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[15px] leading-relaxed text-[#8fa2b6]">
              <p>
                Founded in 2011 at the School of Computer Science, Hypervision brings together developers, avionics researchers, designers, and organizers to bridge the gap between classroom theory and production engineering.
              </p>
              <p>
                From partnering with NIT Kurukshetra and MeitY on autonomous drones to engineering the real-time scoring platforms for 24-hour hackathons, the community exists to turn raw ambition into working code.
              </p>
            </div>

            {/* Clean Typographic Stats Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
              {STATISTICS.slice(0, 4).map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[.12em] text-[#1ab7f2]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Technical Principles */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 bg-[#07111e]">
          <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
            <span className="font-mono text-xs text-[#1ab7f2] font-semibold tracking-wider">01 // PRINCIPLE</span>
            <h3 className="mt-4 font-display text-2xl font-bold text-white">Build in public</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#8fa2b6]">
              Prototypes get battle-tested faster when people can test, audit, and push edge cases to breaking points.
            </p>
          </div>

          <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
            <span className="font-mono text-xs text-[#1ab7f2] font-semibold tracking-wider">02 // PRINCIPLE</span>
            <h3 className="mt-4 font-display text-2xl font-bold text-white">Autonomous rigor</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#8fa2b6]">
              From microcontrollers and avionics firmware to real-time WebSockets and distributed queues, we value depth over buzzwords.
            </p>
          </div>

          <div className="p-8">
            <span className="font-mono text-xs text-[#1ab7f2] font-semibold tracking-wider">03 // PRINCIPLE</span>
            <h3 className="mt-4 font-display text-2xl font-bold text-white">Leave a trail</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#8fa2b6]">
              Every tool, event rubric, and project scaffold is documented so the next cohort starts three steps ahead.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
