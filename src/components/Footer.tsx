import React, { useState } from 'react';
import { HYPERVISION_INFO } from '../data/hypervisionData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <>
      {/* Hack Club "Ready?" Call To Action (Image 3 Inspiration) */}
      <section className="py-20 sm:py-28 bg-[#03060f] border-t border-white/10 text-white text-center relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1ab7f208_1px,transparent_1px),linear-gradient(to_bottom,#1ab7f208_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

        <div className="section-wrap relative z-10 max-w-xl mx-auto px-4">
          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white">
            Ready?
          </h2>

          <div className="mt-6">
            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-[#071322] border border-white/20 focus-within:border-[#1ab7f2] p-1.5 shadow-2xl transition-all max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@stu.upes.ac.in"
                className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-[#597187] focus:outline-none font-mono"
              />
              <button
                type="submit"
                className="editorial-button primary !min-h-[38px] !px-5 text-xs font-bold shrink-0"
              >
                {submitted ? 'Joined!' : 'Join!'}
              </button>
            </form>
          </div>

          <p className="mt-5 text-sm sm:text-base text-[#9ab0c4]">
            Get started with building something real.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#events"
              className="editorial-button primary text-xs !min-h-[40px] !px-6"
            >
              Explore current programs &rarr;
            </a>
            <a
              href="/board"
              className="editorial-button text-xs !min-h-[40px]"
            >
              Meet the Board
            </a>
          </div>

          <p className="mt-4 text-[11px] font-mono text-[#597187]">
            For all UPES students &amp; builders. By participating, you agree to our{' '}
            <a href="/privacy" className="underline hover:text-white">
              terms &amp; liability waiver
            </a>.
          </p>
        </div>
      </section>

      {/* Main Hack Club-style Developer Footer */}
      <footer className="bg-[#020409] pt-14 pb-10 border-t border-white/10 text-[#8fa2b6]">
        <div className="section-wrap">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            {/* Left Brand Column with Hack Flag */}
            <div className="lg:col-span-5">
              <a href="/" className="inline-flex items-center gap-2 group no-underline mb-4">
                <div className="hack-flag text-sm font-extrabold tracking-wider">
                  HYPERVISION
                </div>
              </a>
              <p className="text-xs sm:text-sm text-[#9ab0c4] font-medium">
                For builders, by builders.
              </p>
              <p className="mt-2 text-xs text-[#788e9f] leading-relaxed max-w-sm">
                The premier student-led technical innovation society at the School of Computer Science, UPES Dehradun. Active since 2011.
              </p>
              <p className="mt-3 text-xs font-mono text-[#597187]">
                Bidholi Campus, Energy Acres, Dehradun 248007
              </p>

              {/* Social Channels */}
              <div className="mt-5 flex items-center gap-3">
                <a
                  href={HYPERVISION_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 bg-[#071322] border border-white/10 hover:border-[#1ab7f2] flex items-center justify-center text-xs font-mono text-[#1ab7f2] hover:text-white transition-colors"
                  title="GitHub"
                >
                  GH
                </a>
                <a
                  href={HYPERVISION_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 bg-[#071322] border border-white/10 hover:border-[#1ab7f2] flex items-center justify-center text-xs font-mono text-[#1ab7f2] hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  IN
                </a>
                <a
                  href={HYPERVISION_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 bg-[#071322] border border-white/10 hover:border-[#1ab7f2] flex items-center justify-center text-xs font-mono text-[#1ab7f2] hover:text-white transition-colors"
                  title="Instagram"
                >
                  IG
                </a>
                <a
                  href={`mailto:${HYPERVISION_INFO.email}`}
                  className="w-8 h-8 bg-[#071322] border border-white/10 hover:border-[#1ab7f2] flex items-center justify-center text-xs font-mono text-[#1ab7f2] hover:text-white transition-colors"
                  title="Email Contact"
                >
                  @
                </a>
              </div>
            </div>

            {/* Column 1: Initiatives */}
            <div className="lg:col-span-2">
              <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] mb-3 font-semibold">
                Initiatives
              </p>
              <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
                <li>
                  <a
                    href="https://code-hustle-11.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Code Hustle 24H
                  </a>
                </li>
                <li>
                  <a href="/#projects" className="hover:text-white transition-colors">
                    SwaYaan Drones
                  </a>
                </li>
                <li>
                  <a href="/#projects" className="hover:text-white transition-colors">
                    SIH Matrix Engine
                  </a>
                </li>
                <li>
                  <a href="/#events" className="hover:text-white transition-colors">
                    Pehchaan Fest
                  </a>
                </li>
                <li>
                  <a href="/events" className="hover:text-white transition-colors">
                    Event Archives
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Society Navigation */}
            <div className="lg:col-span-2">
              <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] mb-3 font-semibold">
                Society
              </p>
              <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
                <li>
                  <a href="/#about" className="hover:text-white transition-colors">
                    About Society
                  </a>
                </li>
                <li>
                  <a href="/#projects" className="hover:text-white transition-colors">
                    What We Ship
                  </a>
                </li>
                <li>
                  <a href="/#events" className="hover:text-white transition-colors">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="/#team" className="hover:text-white transition-colors">
                    The Family
                  </a>
                </li>
                <li>
                  <a href="/board" className="text-[#1ab7f2] hover:text-white transition-colors">
                    Board Hierarchy
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Resources */}
            <div className="lg:col-span-3">
              <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] mb-3 font-semibold">
                Compliance &amp; Terms
              </p>
              <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors font-semibold text-white">
                    Liability Disclaimer
                  </a>
                </li>
                <li>
                  <a href="/privacy#liability" className="hover:text-white transition-colors">
                    No-Warranty Policy
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Sponsor Releases
                  </a>
                </li>
                <li>
                  <a href="/admin" className="text-[#597187] hover:text-[#1ab7f2] transition-colors">
                    CMS Admin Desk
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Liability Box */}
          <div className="mt-8 p-4 border border-white/10 bg-[#040810] text-[#788e9f] text-[10px] leading-relaxed font-mono">
            <strong className="text-white block uppercase tracking-wider mb-1">
              LEGAL LIABILITY DISCLAIMER:
            </strong>
            UPES Hypervision is an independent student technical society affiliated with the School of Computer Science, UPES Dehradun. UPES Hypervision, UPES administration, faculty coordinators, and corporate sponsors disclaim all legal liability and warranties for external participant software, hardware experiments, or third-party engagements. Participation is strictly at your own discretion. Codified in full at{' '}
            <a href="/privacy" className="text-[#1ab7f2] underline hover:text-white">
              hypervision.in/privacy
            </a>.
          </div>

          {/* Copyright strip */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#597187]">
            <span>&copy; 2011 &ndash; 2026 UPES Hypervision &bull; School of Computer Science, UPES</span>
            <div className="flex items-center gap-4">
              <a
                href={HYPERVISION_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Open source on GitHub
              </a>
              <span>&bull;</span>
              <a href="#top" className="hover:text-white transition-colors">
                Back to top &uarr;
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};