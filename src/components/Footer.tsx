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
      {/* Hack Club "Ready?" Call To Action */}
      <section className="py-20 sm:py-28 bg-[#03060f] border-t border-white/10 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1ab7f208_1px,transparent_1px),linear-gradient(to_bottom,#1ab7f208_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

        <div className="section-wrap relative z-10 max-w-xl mx-auto px-4">
          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white">
            Ready?
          </h2>

          <div className="mt-6">
            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-[#071322] border border-white/20 focus-within:border-[#1ab7f2] p-1.5 shadow-2xl transition-all max-w-md mx-auto rounded-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@stu.upes.ac.in"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-[#597187] focus:outline-none font-mono"
              />
              <button
                type="submit"
                className="editorial-button primary !min-h-[38px] !px-6 text-xs font-bold shrink-0 rounded-full"
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
              className="editorial-button primary text-xs !min-h-[40px] !px-6 rounded-full"
            >
              Explore current programs &rarr;
            </a>
            <a
              href="/board"
              className="editorial-button text-xs !min-h-[40px] !px-6 rounded-full"
            >
              Meet the Board
            </a>
          </div>

          <p className="mt-4 text-[11px] font-mono text-[#597187]">
            For all UPES students &amp; builders &bull; Open to all batches
          </p>
        </div>
      </section>

      {/* Main Hack Club-style Developer Footer */}
      <footer className="bg-[#020409] pt-14 pb-10 border-t border-white/10 text-[#8fa2b6]">
        <div className="section-wrap">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            {/* Left Brand Column */}
            <div className="lg:col-span-5">
              <a href="/" className="inline-flex items-center gap-3 group no-underline mb-4">
                <img
                  src="/logo.png"
                  alt="Hypervision"
                  className="w-10 h-10 object-contain rounded-full"
                />
                <span className="font-display font-black text-2xl tracking-tight text-white uppercase group-hover:text-[#1ab7f2] transition-colors">
                  HYPERVISION<span className="text-[#1ab7f2]">.</span>
                </span>
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

              {/* Social Channels with Proper SVG Icons */}
              <div className="mt-5 flex items-center gap-3">
                {/* GitHub */}
                <a
                  href={HYPERVISION_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-[#071322] border border-white/15 hover:border-[#1ab7f2] hover:bg-[#1ab7f2] rounded-full flex items-center justify-center text-[#8fa2b6] hover:text-[#020813] transition-all shadow-md group"
                  title="GitHub"
                  aria-label="GitHub Organization"
                >
                  <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={HYPERVISION_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-[#071322] border border-white/15 hover:border-[#1ab7f2] hover:bg-[#1ab7f2] rounded-full flex items-center justify-center text-[#8fa2b6] hover:text-[#020813] transition-all shadow-md group"
                  title="LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={HYPERVISION_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-[#071322] border border-white/15 hover:border-[#1ab7f2] hover:bg-[#1ab7f2] rounded-full flex items-center justify-center text-[#8fa2b6] hover:text-[#020813] transition-all shadow-md group"
                  title="Instagram"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${HYPERVISION_INFO.email}`}
                  className="w-10 h-10 bg-[#071322] border border-white/15 hover:border-[#1ab7f2] hover:bg-[#1ab7f2] rounded-full flex items-center justify-center text-[#8fa2b6] hover:text-[#020813] transition-all shadow-md group"
                  title="Email Contact"
                  aria-label="Email Hypervision"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2 transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
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
                    Privacy Policy &amp; Terms
                  </a>
                </li>
                <li>
                  <a href="/privacy#liability" className="hover:text-white transition-colors">
                    Liability &amp; Warranty Terms
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Sponsor Guidelines
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

          {/* Copyright strip */}
          <div className="mt-8 pt-2 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#597187]">
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