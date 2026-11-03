import React from 'react';
import { HYPERVISION_INFO } from '../data/hypervisionData';

export const Footer: React.FC = () => {
  return (
    <>
      {/* Call to action */}
      <section className="py-20 sm:py-28 bg-[#040810] border-t border-white/10 text-white">
        <div className="section-wrap flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <p className="section-kicker">Next Cohort</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl sm:text-7xl font-bold tracking-tight leading-tight">
              Build the<br />
              <span className="text-[#1ab7f2]">next system.</span>
            </h2>
            <p className="mt-4 text-base text-[#8fa2b6] max-w-md">
              Whether you write low-level C++, build web applications, train transformers, or manage high-stakes event operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#top" className="editorial-button">
              Back to Top &uarr;
            </a>
          </div>
        </div>
      </section>

      {/* Main footer */}
      <footer className="bg-[#02060c] pt-16 pb-10 border-t border-white/10 text-[#8fa2b6]">
        <div className="section-wrap">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-2">
              <p className="text-white font-display text-2xl font-bold tracking-tight">
                HYPERVISION<span className="text-[#1ab7f2]">.</span>
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#788e9f]">
                The flagship technical innovation society at the School of Computer Science, UPES Dehradun. Established in 2011.
              </p>
              <p className="mt-4 text-xs font-mono text-[#597187]">
                Bidholi Campus, Energy Acres, P.O. Bidholi via Prem Nagar, Dehradun 248007
              </p>
            </div>

            <div>
              <p className="text-[10px] font-mono uppercase tracking-[.18em] text-[#1ab7f2] mb-4">
                Directory
              </p>
              <div className="grid gap-2.5 text-xs font-mono uppercase tracking-wider">
                <a href="/#about" className="hover:text-white transition-colors">
                  About Society
                </a>
                <a href="/#projects" className="hover:text-white transition-colors">
                  Engineering Projects
                </a>
                <a href="/#events" className="hover:text-white transition-colors">
                  Active Calendar
                </a>
                <a href="/board" className="hover:text-white transition-colors">
                  Board & Leadership
                </a>
                <a href="/admin" className="text-[#597187] hover:text-[#1ab7f2] transition-colors">
                  Content CMS Desk
                </a>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-mono uppercase tracking-[.18em] text-[#1ab7f2] mb-4">
                Channels
              </p>
              <div className="grid gap-2.5 text-xs font-mono uppercase tracking-wider">
                <a
                  href={HYPERVISION_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn [Profile]
                </a>
                <a
                  href={HYPERVISION_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram [Media]
                </a>
                <a
                  href={HYPERVISION_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub [Org]
                </a>
                <a
                  href={`mailto:${HYPERVISION_INFO.email}`}
                  className="hover:text-white transition-colors text-ellipsis overflow-hidden"
                >
                  Email Contact
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-[#597187]">
            <span>&copy; 2026 UPES Hypervision &bull; All Rights Reserved</span>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy, Terms &amp; Legal Liability
              </a>
              <a href="/events" className="hover:text-white transition-colors">
                Event Archives
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
