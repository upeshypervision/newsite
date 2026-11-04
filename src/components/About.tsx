import React, { useState } from 'react';

export const About: React.FC = () => {
  const [activeRule, setActiveRule] = useState<number>(0);

  const rules = [
    {
      num: '01',
      title: 'Build in Public',
      tagline: 'Code > Slide Decks',
      desc: 'No pitch presentations. Every project is evaluated on live uptime, public GitHub repositories, and real competition traffic.',
    },
    {
      num: '02',
      title: 'Autonomous Systems',
      tagline: 'Hardware on the Edge',
      desc: 'Optical flow telemetry, onboard lidar mapping, and drone avionics firmware engineered alongside NIT Kurukshetra & MeitY.',
    },
    {
      num: '03',
      title: 'Zero Figureheads',
      tagline: 'Builders Only',
      desc: 'From first-year tinkerers to executive leads, every single member ships production code, solders payloads, or arbitrates high-stakes rounds.',
    },
  ];

  return (
    <section id="about" className="site-section py-20 sm:py-28 bg-[#040812] text-white">
      <div className="section-wrap">
        {/* Asymmetrical 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Bold Creed & Proof Points (7 cols) */}
          <div className="lg:col-span-7">
            {/* Header Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono uppercase tracking-[.2em] text-[#1ab7f2] font-semibold">
                01 // Manifesto
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#788e9f]">
                Est. 2011 &bull; 15 Years of Legacy
              </span>
            </div>

            {/* Punchy Headline */}
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white leading-[0.95]">
              No slide decks.<br />
              <span className="text-[#1ab7f2]">Just working systems.</span>
            </h2>

            {/* Concise Human Copy */}
            <p className="mt-5 text-base sm:text-lg text-[#9ab0c4] leading-relaxed max-w-xl">
              Hypervision is UPES&apos;s oldest student technical society. We bring developers, avionics researchers, and builders together to engineer 24-hour hackathons, autonomous drone firmware with MeitY, and production tools for 330+ teams.
            </p>

            {/* Fast Proof Metrics */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="block font-display text-2xl sm:text-3xl font-black text-white">15</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#788e9f]">Years at UPES</span>
              </div>
              <div>
                <span className="block font-display text-2xl sm:text-3xl font-black text-[#1ab7f2]">330+</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#788e9f]">Teams Arbitrated</span>
              </div>
              <div>
                <span className="block font-display text-2xl sm:text-3xl font-black text-white">MeitY</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#788e9f]">Research Partner</span>
              </div>
            </div>

            {/* Single Clean Primary Action */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="/board"
                className="editorial-button primary text-xs rounded-full !px-6"
              >
                Read Official Board Hierarchy &rarr;
              </a>
              <a
                href="#projects"
                className="text-xs font-mono uppercase tracking-wider text-[#8fa2b6] hover:text-white transition-colors"
              >
                Explore Systems &darr;
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Code of Engineering (5 cols) */}
          <div className="lg:col-span-5 bg-[#071322] border border-white/10 rounded-3xl p-6 sm:p-7 relative shadow-xl">
            {/* Header of code block */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2] font-bold">
                ENGINEERING INVARIANTS
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#597187]">
                3 Core Rules
              </span>
            </div>

            {/* Interactive Stacked Rules */}
            <div className="space-y-3">
              {rules.map((rule, idx) => {
                const isSelected = activeRule === idx;
                return (
                  <div
                    key={rule.num}
                    onMouseEnter={() => setActiveRule(idx)}
                    onClick={() => setActiveRule(idx)}
                    className={`p-4 rounded-2xl transition-all duration-200 cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#0b1a2e] border border-[#1ab7f2]/50 shadow-lg'
                        : 'bg-[#040812]/60 border border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#1ab7f2]' : 'text-[#597187]'}`}>
                          {rule.num} //
                        </span>
                        <h3 className="font-display font-bold text-base text-white">
                          {rule.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#788e9f] hidden sm:inline-block">
                        {rule.tagline}
                      </span>
                    </div>

                    <p className={`text-xs leading-relaxed transition-colors ${
                      isSelected ? 'text-[#c0d4e6]' : 'text-[#788e9f]'
                    }`}>
                      {rule.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom campus stamp */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#597187] uppercase tracking-wider">
              <span>UPES Bidholi Campus</span>
              <span>SoCS &bull; Dehradun</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
