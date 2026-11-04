import React from 'react';

export const About: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Build in Public',
      desc: 'No slide decks. Every project is evaluated on working uptime, open-source repositories, and real competition traffic.',
    },
    {
      num: '02',
      title: 'Autonomous Systems',
      desc: 'Optical flow telemetry, onboard lidar mapping, and drone avionics firmware engineered alongside NIT Kurukshetra & MeitY.',
    },
    {
      num: '03',
      title: 'Zero Figureheads',
      desc: 'From first-year tinkerers to executive leads, every member ships code, solders payloads, or arbitrates high-stakes rounds.',
    },
  ];

  return (
    <section id="about" className="site-section py-20 sm:py-28 bg-[#040812] text-white">
      <div className="section-wrap">
        {/* Curvy Hack Club-inspired Manifesto Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#081322] to-[#040912] border border-white/10 p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          {/* Subtle cyan glow accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1ab7f2]/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10">
            {/* Kicker */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono uppercase tracking-[.2em] text-[#1ab7f2] font-semibold">
                01 // Society Manifesto
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#788e9f]">
                Est. 2011 &bull; 15 Years of Engineering
              </span>
            </div>

            {/* Display headline */}
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none max-w-3xl">
              Learn by building.<br />
              <span className="text-[#1ab7f2]">Ship what matters.</span>
            </h2>

            {/* Lead paragraph */}
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#9ab0c4] max-w-3xl">
              Hypervision is UPES&apos;s oldest student-led technical society. We bring together developers, avionics researchers, and community hackers to engineer high-throughput hackathon matrices, drone flight firmware with NIT Kurukshetra &amp; MeitY, and production tools for 330+ competing teams.
            </p>

            {/* 3 Pillars: Curvy Cards */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {pillars.map((pillar) => (
                <div
                  key={pillar.num}
                  className="bg-[#050c18] border border-white/10 hover:border-[#1ab7f2]/50 p-6 rounded-2xl transition-all hover:-translate-y-1"
                >
                  <span className="text-xs font-mono font-bold text-[#1ab7f2] block mb-2">
                    {pillar.num} //
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8fa2b6] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/board"
                  className="editorial-button primary text-xs rounded-full !px-6"
                >
                  Read Full Board Hierarchy &rarr;
                </a>
                <a
                  href="#projects"
                  className="editorial-button text-xs rounded-full !px-5"
                >
                  Explore Systems
                </a>
                <a
                  href="#events"
                  className="editorial-button text-xs text-[#1ab7f2] border-[#1ab7f2]/30 hover:border-[#1ab7f2] rounded-full !px-5"
                >
                  Join Calendar
                </a>
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-[#597187]">
                UPES School of Computer Science &bull; Bidholi Campus
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};