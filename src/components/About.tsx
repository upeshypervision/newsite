import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="site-section py-16 sm:py-20 bg-[#050c16] text-white">
      <div className="section-wrap">
        <div className="border border-white/10 bg-[#081322] p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle blue accent corner */}
          <div className="absolute top-0 left-0 w-2 h-full bg-[#1ab7f2]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold">
                  01 // Society Manifesto
                </span>
                <span className="text-white/20">&bull;</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#788e9f]">
                  Est. 2011
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Learn by building.<br />
                <span className="text-[#1ab7f2]">Ship what matters.</span>
              </h2>

              <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#9ab0c4] max-w-2xl">
                Hypervision is UPES&apos;s oldest student-led technical society. We bring together developers, avionics researchers, and community hackers to engineer high-throughput hackathon matrices, drone flight firmware with NIT Kurukshetra &amp; MeitY, and production tools for 330+ competing teams.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono uppercase tracking-wider text-[#1ab7f2]">
                <span className="bg-[#050c16] border border-[#1ab7f2]/30 px-3 py-1">
                  01 / Build in Public
                </span>
                <span className="bg-[#050c16] border border-[#1ab7f2]/30 px-3 py-1">
                  02 / Autonomous Systems
                </span>
                <span className="bg-[#050c16] border border-[#1ab7f2]/30 px-3 py-1">
                  03 / Zero Figureheads
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 lg:border-l lg:border-white/10 lg:pl-8">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#788e9f]">
                Want the full picture?
              </span>
              <a href="/board" className="editorial-button primary w-full text-center">
                Read Full Story &amp; Board &rarr;
              </a>
              <a href="#projects" className="editorial-button w-full text-center">
                View What We Ship
              </a>
              <a href="#events" className="editorial-button text-[#1ab7f2] border-white/10 hover:border-[#1ab7f2] w-full text-center">
                Check Event Calendar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
