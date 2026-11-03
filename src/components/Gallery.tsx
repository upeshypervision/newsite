import React from 'react';

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="site-section py-24 sm:py-32 bg-[#050c16]">
      <div className="section-wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b rule">
          <div>
            <p className="section-kicker">05 // Visual Archive</p>
            <h2 className="section-title">
              In the<br />
              <span className="text-[#1ab7f2]">arena.</span>
            </h2>
          </div>
          <p className="section-intro">
            The people, hardware benches, MAC Auditorium late nights, and the energy behind fifteen years of student engineering.
          </p>
        </div>

        {/* Clean Editorial Placeholder Exhibition */}
        <div className="mt-12 border border-white/10 bg-[#081322] p-8 sm:p-14 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[.18em] text-[#1ab7f2] bg-[#050c16] border border-[#1ab7f2]/30 px-3 py-1 mb-6">
              Exhibition in Curation
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              A permanent retrospective of our hackathons and labs is currently being assembled.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#8fa2b6]">
              Our design and media team is digitizing high-resolution photography spanning Code Hustle marathons, Pehchaan symposiums, MeitY drone tests, and alumni rooms.
            </p>
            <div className="mt-8 flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[#597187]">
              <span>Coverage: 2011 &ndash; 2026</span>
              <span>MAC Auditorium &amp; Research Labs</span>
            </div>
          </div>

          {/* Decorative architectural grid background */}
          <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-10 pointer-events-none hidden md:block">
            <div className="w-full h-full bg-[radial-gradient(#1ab7f2_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        </div>
      </div>
    </section>
  );
};
