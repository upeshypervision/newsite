import React from 'react';
import { HYPERVISION_INFO, STATISTICS } from '../data/hypervisionData';

export const About: React.FC = () => (
  <section id="about" className="site-section py-28">
    <div className="section-wrap">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-4">
          <p className="section-kicker">02 — The club</p>
          <h2 className="section-title">Who we<br /><em className="text-[#9bbcff]">are.</em></h2>
        </div>
        <div className="lg:col-span-8 lg:pt-12">
          <p className="font-display text-[clamp(31px,4vw,54px)] leading-[1.02] text-white max-w-3xl">A technical club with a point of view: make things, make them well, and make room for the next person.</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 text-[15px] leading-[1.75] text-[#aeb0b6]">
            <p>Founded in 2011 at the School of Computer Science, Hypervision brings together engineers, designers, researchers and organisers around work that moves beyond the classroom.</p>
            <p>We run the experiments, events and systems that give students a place to test their ambition — from hackathons and alumni sessions to autonomous systems and software shipped for real people.</p>
          </div>
          <div className="mt-14 pt-6 border-t rule grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {STATISTICS.slice(0, 4).map((stat) => <div key={stat.label}><div className="font-display text-5xl text-white">{stat.value}</div><div className="mt-2 text-[10px] font-mono uppercase tracking-[.12em] text-[#858891]">{stat.label}</div></div>)}
          </div>
        </div>
      </div>
      <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 border-t border-l rule">
        {['Learn by doing', 'People over hierarchy', 'Work that travels'].map((title, index) => <div key={title} className="p-6 border-r border-b rule"><span className="section-kicker">0{index + 1}</span><h3 className="mt-10 font-display text-3xl text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-[#92949c]">{["The fastest way to understand a system is to build one.", "Different disciplines make sharper work when they share the same table.", "Build for campus, then build it well enough to leave campus."][index]}</p></div>)}
      </div>
    </div>
  </section>
);
